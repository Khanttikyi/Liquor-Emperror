import { formatDate } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatabaseService } from 'src/app/_metronic/shared/crud-table/services/database.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.page.html',
  styleUrls: ['./purchase.page.scss'],
})
export class PurchasePage implements OnInit {
  purchaseForm: FormGroup
  purchaseCode: any = ""
  voucherCode: any = ""
  isCreate: boolean = true;
  todaydate = new Date();
  supplierOption: any[] = []
  categoryOption: any[] = []
  subBrandOption: any[] = []
  subBrandList: any[] = []
  brandOption: any[] = []
  disabled: boolean = true
  brandList: any[] = []
  sizeOption: any[] = []
  isChecked: boolean = false
  isWholeSale: boolean = false
  date = new Date;
  @Input() data: any = {}

  currentTimeInSeconds = Math.floor(Date.now() / 1000);
  constructor(private modalCtrl: ModalController, private modal: NgbModal, private database: DatabaseService, private cdf: ChangeDetectorRef) {
    this.purchaseCode = "PU-" + this.currentTimeInSeconds
    this.voucherCode = "VC-" + this.currentTimeInSeconds
    this.getSupplier()
    this.getCategory()
    this.getSize()
    this.getBrand()
    this.getSubBrand()
  }

  ngOnInit() {

    this.loadForm()
    this.database.getPurchaseData('PU-001').then((res) => {
      // // console.log(res);

    })
  }
  getCategory() {
    this.database.getData('CATEGORY').then((res) => {
      let dataC = this.getFormatOptC(res)
      this.categoryOption = dataC
      // console.log("this.categoryOption", this.categoryOption);

    })
  }
  getBrand() {
    this.database.getData('BRAND_DATA').then((res) => {
      let dataC = this.getFormatOptB(res)
      this.brandOption = dataC
      // console.log("this.categoryOption", this.categoryOption);

    })
  }
  getSubBrand() {
    this.database.getData('SUB_BRAND_DATA').then((res) => {
      let dataC = this.getFormatOptSub(res)
      this.subBrandOption = dataC
      // console.log("this.categoryOption", this.categoryOption);

    })
  }
  getFormatOptSub(res) {
    return res.map(x => {
      return { 'code': x.subBrandCode, 'value': x.name }
    })
  }

  getFormatOptC(res) {
    return res.map(x => {
      return { 'code': x.categoryCode, 'value': x.categoryName }
    })
  }


  getSize() {
    this.database.getData('SIZE').then((res) => {
      let dataC = this.getFormatOptS(res)
      this.sizeOption = dataC
      // console.log("this.sizeOption", this.sizeOption);

    })
  }

  selectCategory(data) {
    let category = this.categoryOption.find((p) => p.code == data);
    let code = category.code;

    this.database.getBrandByCategoryCode(code).then((res) => {

      // console.log("res", res);
      this.brandOption = this.getFormatOptB(res);
      // console.log("fdsfsdf", res);
    })
  }
  selectBrand(data) {
    console.log('data', this.brandOption);
    let subbrand = this.brandOption.find((p) => p.code == data);
    console.log('data', subbrand);
    let code = subbrand.code;
    // console.log('selectcate', this.subBrandList);
    this.database.getSubBrandByBrandCode(code).then((res) => {
      // console.log("res", res);
      this.subBrandOption = this.getFormatOptSub(res);
      // console.log("fdsfsdf", res);
    })
  }
  
  getFormatOptB(res) {
    return res.map(x => {
      return { 'code': x.brandCode, 'value': x.brandName }
    })
  }
  getFormatOptS(res) {
    return res.map(x => {
      return { 'code': x.code, 'value': x.value }
    })
  }
  getSupplier() {
    this.database.getData('SUPPLIER').then((res) => {
      let data = this.getFormatOpt(res)
      this.supplierOption = data
      // console.log(this.supplierOption);

    })
  }

  ngAfterViewInit() {

    // this.purchaseForm.controls.voucherCode.setValue(this.voucherCode)
    // this.purchaseForm.controls.purchaseCode.setValue(this.purchaseCode)

  }
  getFormatOpt(res) {
    return res.map(x => {
      return { 'code': x.supplierCode, 'value': x.supplierName }
    })
  }
  loadForm() {
    console.log("purchasecode", this.data)
  //   if(this.categoryOption.length>0){
  //   if (this.data.categoryCode) {
  //     this.selectCategory(this.data.categoryCode)
  //   }
  //   if (this.data.brandCode) {
  //     this.selectBrand(this.data.brandCode)
  //   }
  // }
    this.purchaseForm = new FormGroup({
      voucherCode: new FormControl(this.data ? this.data.voucherCode : this.voucherCode),
      purchaseCode: new FormControl(this.data ? this.data.purchaseCode : this.purchaseCode),
      date: new FormControl(formatDate(this.todaydate, 'dd-MM-yyyy', 'en')),
      supplierName: new FormControl(this.data ? this.data.supplierName : null),
      supplierPhone: new FormControl(this.data ? this.data.supplierPhone : null),
      supplierAddress: new FormControl(this.data ? this.data.supplierAddress : null),
      brandCode: new FormControl(this.data ? this.data.brandCode : null),
      categoryCode: new FormControl(this.data ? this.data.categoryCode : null),
      subBrandCode: new FormControl(this.data ? this.data.subBrandCode : null),
      size: new FormControl(this.data ? this.data.size : null),
      quantity: new FormControl(this.data ? this.data.quantity : null),
      purchase: new FormControl(this.data ? this.data.purchase : null),
      isRetail: new FormControl(this.data ? this.data.isRetail : null),
      isWholeSale: new FormControl(this.data ? this.data.isWholeSale : null),
      retailPrice: new FormControl(this.data ? this.data.retailPrice : null),
      wholeSalePrice: new FormControl(this.data ? this.data.wholeSalePrice : null),
      totalAmount: new FormControl(this.data ? this.data.totalAmount : null),
      createddate: new FormControl(this.data ? this.data.createddate : formatDate(this.date, 'dd-MM-yyyy', 'en')),
      updateddate: new FormControl(formatDate(this.date, 'dd-MM-yyyy', 'en')),
    })
    if (this.data  && this.data.isRetail == "true") {
      this.isChecked = true;
      this.cdf.detectChanges();
    }
    if (this.data && this.data.isWholeSale == "true") {
      this.isWholeSale = true;
      this.cdf.detectChanges();
    }
  }
  createPurchase() {
    let value = { ...this.purchaseForm.value }
    console.log("datavalue", value);
    this.modal.dismissAll({ data: value })

  }
  cancel() {
    // this.purchaseForm.reset()
    this.modal.dismissAll()
  }

  dataChanged(e) {
    console.log('e', this.purchaseForm.controls['quantity'].value)
    let amount = e * this.purchaseForm.controls['quantity'].value;
    console.log("dat", amount);
    this.purchaseForm.controls['totalAmount'].setValue(amount);
  }



  //for View
  isControlValid(controlName: string): boolean {
    const control = this.purchaseForm.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.purchaseForm.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  controlHasError(validation, controlName): boolean {
    const control = this.purchaseForm.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  isControlTouched(controlName): boolean {
    const control = this.purchaseForm.controls[controlName];
    return control.dirty || control.touched;
  }
}
