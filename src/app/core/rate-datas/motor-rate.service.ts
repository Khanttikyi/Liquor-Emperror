import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { BizOperationService } from "../biz.operation.service";
const API_HEALTH_URL = `${environment.apiUrl}/motor/`;

@Injectable({
  providedIn: 'root'
})
export class MotorRateService extends BizOperationService<any, number>{
  constructor(protected httpClient: HttpClient) {
    super(httpClient, API_HEALTH_URL);
  }

  getOne(currency: string, si: number, typeOfCoverage: string, typeOfVehicle: string, cc: string = "") {
    let query = "premium-rate?currency=" + currency + "&si=" + si + "&typeOfCoverage=" + typeOfCoverage + "&typeOfVehicle=" + typeOfVehicle + "&cc=" + cc
    return this.httpClient.get(API_HEALTH_URL+query)
  }
  getThrid(currency: string, typeOfCoverage: string, typeOfVehicle: string, cc: string = "") {
    let query = "third-party/premium-rate?currency=" + currency + "&typeOfCoverage=" + typeOfCoverage + "&typeOfVehicle=" + typeOfVehicle + "&cc=" + cc
    return this.httpClient.get(API_HEALTH_URL+query)
  }
}