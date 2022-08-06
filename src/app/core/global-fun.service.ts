import { DecimalPipe } from "@angular/common";
import { Injectable } from "@angular/core";
import { isString } from "@ng-bootstrap/ng-bootstrap/util/util";
import { BehaviorSubject, of, Subject } from "rxjs";
import { map } from "rxjs/operators";
import { AlertService } from "../modules/loading-toast/alert-model/alert.service";
import { LatestCurrencyExchangeService } from "../pages/currency-exchange/currency-exchange.service";
import { IN_BOUND, OUT_BOUND } from "./const-data-value";
import { MotorRateService } from "./rate-datas/motor-rate.service";

@Injectable({
  providedIn: 'root',
})
export class GlobalFunctionService {
  testingFunResult = new BehaviorSubject(null)
  paPremiumResult = new Subject()
  smSumInsuredAmtResult = new BehaviorSubject(null)
  paCoverageResult = new BehaviorSubject(null)
  normalCoverageResult = new BehaviorSubject(null)
  motorTotalSiResult = new BehaviorSubject(null)
  paPolicyValidationResult = new BehaviorSubject(null)
  tempFormData = {}
  exChange: number = 1650

  optionResultChange = new Subject()

  constructor(private numberPipe: DecimalPipe, private alert: AlertService, private exChangeService: LatestCurrencyExchangeService, private motorService: MotorRateService) {

  }

  async getRate(type: string) {
    if (!type) return false
    try {
      let curType = type.toLowerCase()
      let res: any = await this.exChangeService.getByType(curType).toPromise()
      if (res) {
        return res.amount
      }
    } catch (error) {

    }

  }

  testingFun() {
    console.log("fun was called");
    this.testingFunResult.next('value testing')
  }
  async motorFormValidation(currentValue: string, activeForm: any, option?: any[], form?: boolean) {
    let total = activeForm['total_risk_si']
    let validAmt = 20000000
    let excess = activeForm['excess']
    let currency = activeForm['currency']
    console.log(validAmt, total);

    if (excess == "T-003" && currency == "mmk") {
      if (total > validAmt) {
        return true
      } else {
        this.alert.activate("Sum Insured amount should be greater than 20,000,000 MMK to have Excess Discount", "Validation")
        return false
      }
    }
    return true
  }


  async paPremiumCalculation(currentValue: string, activeForm: any, option?: any[], form?: boolean) {
    //console.log("call paPremiumCalculation",activeForm);
    let currency = ""
    // let term = "0"
    let sumIn = 0
    if (form)
      if (!this.sumInsuredValidation("form", activeForm, [], true)) {
        return false
      }

    // if (activeForm.pa_policy_term) {
    //   term = activeForm.pa_policy_term
    // } else if (this.tempFormData['pa_product_detail']) {
    //   term = this.tempFormData['pa_product_detail']['pa_policy_term'] || 0
    // }

    if (activeForm.sum_insured) {
      sumIn = activeForm.sum_insured
    }
    if (activeForm.currency) {
      currency = activeForm.currency
    }

    let fector = 1
    let getMonth = 12
    // if (term == '001') {
    //   fector = 1 / 4
    //   getMonth = 3
    // } else if (term == '002') {
    //   fector = 1 / 2
    //   getMonth = 6
    // }
    // let exChange = await this.getRate(currency)
    // if (exChange < 0) return false
    let stumDuty = currency == "MMK" ? 100 : 1
    let result = this.calculateDecimal((sumIn * (0.7 / 100)) / getMonth) + stumDuty
    // if()
    this.paPremiumResult.next(this.numberPipe.transform(result) + " " + currency + " / month")
    return true
  }

  sumInsuredValidation(currentValue: string, activeForm: any, option?: any[], form?: boolean) {
    console.log("call sumInsuredValidation", activeForm, form);
    let currency = ""
    let sumIn = 0
    if (activeForm.currency) {
      currency = activeForm.currency
    }
    if (activeForm.sum_insured) {
      sumIn = activeForm.sum_insured
    }
    if (currency == 'MMK') {
      if (500000 <= sumIn && sumIn <= 20000000) {
        return true
      } else {
        if (form)
          this.alert.activate("Sum Insured must be between 500000 MMK and  20000000 MMK", "Validation")
        return false
      }
    } else if (currency == 'USD') {
      if (1000 <= sumIn && sumIn <= 10000) {
        return true
      } else {
        if (form)
          this.alert.activate("Sum Insured must be between 1000 USD and  10000 USD", "Validation")
        return false
      }
    }
    return false
  }

  motorTotalSi(currentValue: string, activeForm: any, option?: any[], form?: boolean) {
    let vehicle_si = 0
    let trailer_one_si = 0
    let trailer_two_si = 0
    let trailer_three_si = 0
    if (activeForm.vehicle_si) {
      vehicle_si = parseInt(activeForm.vehicle_si)
    }
    if (activeForm.trailer_one_si) {
      trailer_one_si = parseInt(activeForm.trailer_one_si)
    }
    if (activeForm.trailer_two_si) {
      trailer_two_si = parseInt(activeForm.trailer_two_si)
    }
    if (activeForm.trailer_three_si) {
      trailer_three_si = parseInt(activeForm.trailer_three_si)
    }

    this.motorTotalSiResult.next(vehicle_si + trailer_one_si + trailer_two_si + trailer_three_si)
  }

  farmerPremium(currentValue: string, activeForm: any, option?: any[], form?: boolean) {
    let sumIn = 0
    let rate = 0.01
    if (activeForm.sum_insured) {
      sumIn = activeForm.sum_insured
    } else if (this.tempFormData['farmer_product_detail']) {
      sumIn = this.tempFormData['farmer_product_detail']['sum_insured'] || 0
    }
    let calculatedAmt = sumIn * rate
    this.paPremiumResult.next(this.numberPipe.transform(calculatedAmt) + " MMK")
    return true
  }

  getMotorRate(motorDetail) {
    let cc = ""
    let currency = ""
    let sumIn = 0
    let typeOfCoverage = ""
    let typeOfVehicle = ""
    if (motorDetail) {
      currency = motorDetail['currency'] || 0
    }
    if (motorDetail) {
      sumIn = motorDetail['total_risk_si'] || 0
    }
    if (motorDetail) {
      typeOfCoverage = motorDetail['coverage_type'] || 0
    }
    if (motorDetail) {
      typeOfVehicle = motorDetail['vehicle_type'] || 0
    }
    if (motorDetail) {
      cc = motorDetail['capacity'] || motorDetail['tonnage'] || 0
    }
    return this.motorService.getOne(currency, sumIn, typeOfCoverage, typeOfVehicle, cc)
  }

  getMotorThirdRate(motorDetail) {
    let cc = ""
    let currency = ""
    let sumIn = 0
    let typeOfCoverage = ""
    let typeOfVehicle = ""
    if (motorDetail) {
      currency = motorDetail['currency'] || 0
    }
    if (motorDetail) {
      sumIn = motorDetail['total_risk_si'] || 0
    }
    if (motorDetail) {
      typeOfCoverage = motorDetail['coverage_type'] || 0
    }
    if (motorDetail) {
      typeOfVehicle = motorDetail['vehicle_type'] || 0
    }
    if (motorDetail) {
      cc = motorDetail['capacity'] || motorDetail['tonnage'] || 0
    }
    return this.motorService.getThrid(currency, typeOfCoverage, typeOfVehicle, cc)
  }

  motorOwnDamage(motorDetail) {
    return this.getMotorRate(motorDetail).pipe(map((res: any) => {
      if (res)
        return res.rate
      return 0
    }))
  }

  motorThirdParty(motorDetail) {
    return this.getMotorThirdRate(motorDetail).pipe(map((res: any) => {
      if (res)
        return res.rate
      return 0
    }))
  }

  motorSRCC(motorDetail) {
    let currency = ""
    let typeOfVehicle = ""
    let sumIn = 0
    if (motorDetail) {
      currency = motorDetail['currency'] || 0
    }
    if (motorDetail) {
      typeOfVehicle = motorDetail['vehicle_type'] || 0
    }
    if (motorDetail) {
      sumIn = motorDetail['total_risk_si'] || 0
    }
    // return this.motorOwnDamage().pipe(map(res => {
    if (sumIn > 0) {
      let rate = 0
      if (currency == 'mmk' && (typeOfVehicle != "T-006" && typeOfVehicle != "T-003")) {
        rate = 0.00065
      } else if (currency == 'mmk' && (typeOfVehicle != "T-006" && typeOfVehicle != "T-003")) {
        rate = 0.00065
      } else if (currency == 'usd' && (typeOfVehicle != "T-006" && typeOfVehicle != "T-003")) {
        rate = 0.00065
      } else if (typeOfVehicle == "T-003") {
        rate = 0.0005
      }
      return of(sumIn * rate)
    }
    return of(0)
    // }))
  }

  motorWindScreen(motorDetail) {
    let windscreen_value = 0
    let currency = ""
    let typeOfCoverage = ""
    let typeOfVehicle = ""
    if (motorDetail) {
      windscreen_value = motorDetail['windscreen_value'] || 0
    }
    if (motorDetail) {
      currency = motorDetail['currency'] || 0
    }
    if (motorDetail) {
      typeOfCoverage = motorDetail['coverage_type'] || 0
    }
    if (motorDetail) {
      typeOfVehicle = motorDetail['vehicle_type'] || 0
    }
    let rate = 0.15
    if (currency == 'mmk' && (typeOfVehicle != "T-006" && typeOfVehicle != "T-003")) {
      rate = 0.065
    } else if (typeOfVehicle == "T-003") {
      rate = 0.05
    }
    return of(windscreen_value * rate)
  }

  motorMedicalExpense(motorDetail) {
    let currency = ""
    let typeOfVehicle = ""
    if (motorDetail) {
      currency = motorDetail['currency'] || 0
    }

    if (motorDetail) {
      typeOfVehicle = motorDetail['vehicle_type'] || 0
    }
    let fixed = 0
    if (currency == 'usd' && (typeOfVehicle != "T-006" && typeOfVehicle != "T-003")) {
      fixed = 20
    } else if (typeOfVehicle == "T-006") {
      fixed = 20
    }
    return of(fixed)
  }

  motorWarRisk(motorDetail) {
    let currency = ""
    let typeOfCoverage = ""
    let typeOfVehicle = ""
    let sumIn = 0
    if (motorDetail) {
      sumIn = motorDetail['total_risk_si'] || 0
    }
    if (motorDetail) {
      currency = motorDetail['currency'] || 0
    }

    if (motorDetail) {
      typeOfCoverage = motorDetail['coverage_type'] || 0
    }
    if (motorDetail) {
      typeOfVehicle = motorDetail['vehicle_type'] || 0
    }

    // return this.motorOwnDamage().pipe(map(res => {
    if (sumIn > 0) {
      let rate = 0.00065
      if (typeOfVehicle == "T-003") {
        rate = 0.0005
      }
      return of(sumIn * rate)
    }
    return of(0)
    // }))
  }

  motorActOfGod(motorDetail) {
    let currency = ""
    let typeOfCoverage = ""
    let typeOfVehicle = ""
    let sumIn = 0
    if (motorDetail) {
      sumIn = motorDetail['total_risk_si'] || 0
    }
    if (motorDetail) {
      currency = motorDetail['currency'] || 0
    }
    if (motorDetail) {
      typeOfCoverage = motorDetail['coverage_type'] || 0
    }
    if (motorDetail) {
      typeOfVehicle = motorDetail['vehicle_type'] || 0
    }

    // return this.motorOwnDamage().pipe(map(res => {
    if (sumIn > 0) {
      let rate = 0.005
      if (currency == 'mmk' && (typeOfVehicle != "T-006" && typeOfVehicle != "T-003")) {
        rate = 0.00065
      } else if (currency == 'usd' && (typeOfVehicle != "T-006" && typeOfVehicle != "T-003")) {
        rate = 0.00065
      } else if (typeOfVehicle == "T-003") {
        rate = 0.0005
      }
      return of(sumIn * rate)
    }
    return of(0)
    // }))
  }

  motorTheft(motorDetail) {
    let currency = ""
    let typeOfCoverage = ""
    let typeOfVehicle = ""
    if (motorDetail) {
      currency = motorDetail['currency'] || 0
    }

    if (motorDetail) {
      typeOfCoverage = motorDetail['coverage_type'] || 0
    }
    if (motorDetail) {
      typeOfVehicle = motorDetail['vehicle_type'] || 0
    }

    return this.motorOwnDamage(motorDetail).pipe(map(res => {
      if (res > 0) {
        let rate = 0
        if (currency == 'mmk' && (typeOfVehicle != "T-006" && typeOfVehicle != "T-003")) {
          rate = 0.15
        } else if (currency == 'usd' && (typeOfVehicle != "T-006" && typeOfVehicle != "T-003")) {
          rate = 0.15
        } else if (typeOfVehicle == "T-003") {
          rate = 0.15
        }
        return res * rate
      }
      return 0
    }))
  }

  motorEndorsement(motorDetail) {
    let currency = ""
    let typeOfCoverage = ""
    let typeOfVehicle = ""
    if (motorDetail) {
      currency = motorDetail['currency'] || 0
    }

    if (motorDetail) {
      typeOfCoverage = motorDetail['coverage_type'] || 0
    }
    if (motorDetail) {
      typeOfVehicle = motorDetail['vehicle_type'] || 0
    }

    return this.motorOwnDamage(motorDetail).pipe(map(res => {
      if (res > 0) {
        let rate = 0.30
        return res * rate
      }
      return 0
    }))
  }

  motorLuggage(motorDetail) {
    let currency = ""
    let typeOfVehicle = ""
    if (motorDetail) {
      currency = motorDetail['currency'] || 0
    }

    if (motorDetail) {
      typeOfVehicle = motorDetail['vehicle_type'] || 0
    }
    let fixed = 50
    if (currency == 'mmk' && (typeOfVehicle != "T-006" && typeOfVehicle != "T-003")) {
      fixed = 80000
    }
    // else if (typeOfVehicle == "T-006") {
    //   fixed = 50
    // }
    return of(fixed)
  }

  motorLiability() {
    return of(25)
  }

  motorPaidDriver(motorDriverDetail) {
    let length = 0
    if (motorDriverDetail) {
      length = motorDriverDetail.length
    }
    return of(30 * length)
  }

  ifMedicalExpense(motorDetail) {
    let currency = ""
    let typeOfCoverage = ""
    let typeOfVehicle = ""
    if (motorDetail) {
      currency = motorDetail['currency'] || 0
    }
    if (motorDetail) {
      typeOfCoverage = motorDetail['coverage_type'] || 0
    }
    if (motorDetail) {
      typeOfVehicle = motorDetail['vehicle_type'] || 0
    }
    if (currency == 'usd') {
      return true
    }
    // else if (typeOfVehicle == "T-005") {
    //   return false
    // }
    return false
  }

  ifWarRisk(motorDetail) {
    let currency = ""
    let typeOfCoverage = ""
    let typeOfVehicle = ""
    if (motorDetail) {
      currency = motorDetail['currency'] || 0
    }
    if (motorDetail) {
      typeOfCoverage = motorDetail['coverage_type'] || 0
    }
    if (motorDetail) {
      typeOfVehicle = motorDetail['vehicle_type'] || 0
    }
    if (typeOfVehicle == "T-006") {
      return false
    }
    return true
  }

  ifEndorsement(motorDetail) {
    let typeOfVehicle = ""
    if (motorDetail) {
      typeOfVehicle = motorDetail['vehicle_type'] || 0
    }
    if (typeOfVehicle == "T-006" || typeOfVehicle == "T-003") {
      return false
    }
    return true
  }
  ifLuggage(motorDetail) {
    let typeOfVehicle = ""
    if (motorDetail) {
      typeOfVehicle = motorDetail['vehicle_type'] || 0
    }
    if (typeOfVehicle == "T-003") {
      return false
    }
    return true
  }

  ifLiability(motorDetail) {
    let typeOfVehicle = ""
    if (motorDetail) {
      typeOfVehicle = motorDetail['vehicle_type'] || 0
    }
    if (typeOfVehicle == "T-006") {
      return true
    }
    return false
  }

  ifPaidDriver(motorDetail) {
    let typeOfVehicle = ""
    if (motorDetail) {
      typeOfVehicle = motorDetail['vehicle_type'] || 0
    }
    if (typeOfVehicle == "T-006") {
      return true
    }
    return false
  }

  ifCrossBorder(motorDetail) {
    let typeOfVehicle = ""
    if (motorDetail) {
      typeOfVehicle = motorDetail['vehicle_type'] || 0
    }
    if (typeOfVehicle == "T-006" || typeOfVehicle == "T-003") {
      return false
    }
    return true
  }

  smSumInsuredAmt(currentValue: any, activeForm: any, option?: any[]) {
    let type = ""
    const defVal = 1000000

    if (activeForm.sm_policy_type) {
      type = activeForm.sm_policy_type
    }

    if (type == "T-002") {
      this.smSumInsuredAmtResult.next(defVal)
    } else {
      if (typeof currentValue == 'string') {
        currentValue = parseInt(currentValue.replace("T-", ""))
      }
      currentValue = Number.isNaN(currentValue) ? 1 : currentValue
      let insuredVale = defVal * currentValue
      this.smSumInsuredAmtResult.next(insuredVale)
    }

  }

  paCoverage(currentValue: string, activeForm: any, option?: any[]) {
    console.log("call paCoverage");
    let sumIn = 0
    let currency = ""
    if (activeForm.currency) {
      currency = activeForm.currency
    } else if (this.tempFormData['pa_product_detail']) {
      currency = this.tempFormData['pa_product_detail']['currency'] || 0
    }
    if (activeForm.sum_insured) {
      sumIn = activeForm.sum_insured
    } else if (this.tempFormData['pa_product_detail']) {
      sumIn = this.tempFormData['pa_product_detail']['sum_insured'] || 0
    }
    this.paCoverageResult.next(this.numberPipe.transform(sumIn) + currency)
  }

  paPolicyValidation(value, option?: any[]) {
    let term = value
    let valid = option.find(x => x.codeId == term)
    if (valid) {
      this.paPolicyValidationResult.next(valid)
    }
  }

  normalCoverage(currentValue: string, activeForm: any, options?: any[]) {
    if (options) {
      let valid = options.find(x => x.codeId == currentValue)
      if (valid) {
        this.normalCoverageResult.next(valid.codeName)
      }
    } else {
      this.normalCoverageResult.next(currentValue)
    }
  }

  smPremium(currentValue: string, activeForm: any, option?: any[], form?: boolean) {
    let type = ""
    let policy = ""
    let sumInsured = ""
    if (activeForm.sm_policy_type) {
      type = activeForm.sm_policy_type
    }
    if (activeForm.sm_policy_term) {
      policy = activeForm.sm_policy_term
    } 
    if (activeForm.sm_sum_insured) {
      sumInsured = activeForm.sm_sum_insured
    } 
    let rate = 0
    if (type == 'T-001') {
      rate = 0.5 / 100
    } else {
      rate = policy == "T-001" ? 0.05 / 100 : 0.1 / 100
    }
    let calculatedAmt = parseInt(sumInsured) * rate
    if (calculatedAmt) {
      if (type == 'T-001') {
        calculatedAmt = this.calculateDecimal(calculatedAmt / 12)
      }
      this.paPremiumResult.next(this.numberPipe.transform(calculatedAmt) + " MMK / month")
    }
    return true
  }

  travelPremium(currentValue: string, activeForm: any, option?: any[], form?: boolean) {
    let searchData = []
    let plan = ''
    let duration = ''
    let unit = ''
    if (activeForm.travel_plan) {
      plan = activeForm.travel_plan
    }

    if (activeForm.travel_duration) {
      duration = activeForm.travel_duration
    }

    if (activeForm.insured_unit) {
      unit = activeForm.insured_unit
    }

    if (plan && duration && unit) {
      searchData = plan == 'T-001' ? IN_BOUND : OUT_BOUND
      let premium = searchData.find(x => x.travel_duration == duration && x.travel_unit == unit)
      if (premium) {
        this.paPremiumResult.next(this.numberPipe.transform(premium.rate) + " MMK")
      }

    }
    return true
    // travel_duration
  }
  
  calculateDecimal(value: any) {
    return Math.round(value * 100) / 100
  }

}