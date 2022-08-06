import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class MasterDataService {
  masterType$: Observable<any>;
  masterTypeSubject: BehaviorSubject<any>;

  constructor(private http: HttpClient,) {
    this.masterTypeSubject = new BehaviorSubject<any>(undefined);
    this.masterType$ = this.masterTypeSubject.asObservable();
  }

  getType() {
    this.http.get(environment.apiUrl + "/codetype").pipe(map((res: any) => {
      return res.map(x => x.codeType)
    })).toPromise().then(res => {
      this.masterTypeSubject.next(res);
    })
  }

  getDataByType(type: string, address?: boolean) {
    if (address)
      return this.http.get(environment.apiUrl + "/address-code?codeType=" + type + "&lang_cd=EN")
    else
      return this.http.get(environment.apiUrl + "/codebook?code_type=" + type + "&lang_cd=EN")
  }

  getMasterValue(data) {
    return this.http.post(environment.apiUrl + "/codebook", data)
  }

  getAddressDataByType(type: string, parentId: string) {
    return this.http.get(environment.apiUrl + "/address-code?codeType=" + type + "&parentCode=" + parentId + "&lang_cd=EN")
  }
}