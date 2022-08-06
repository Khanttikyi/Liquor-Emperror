import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Lead } from "src/app/pages/lead-detail/lead.dto";
import { environment } from "../../../../environments/environment";
import { BizOperationService } from "../../../core/biz.operation.service";

const API_UPLOAD_URL = `${environment.apiUrl}/attachment-uploader`;
@Injectable({
  providedIn: 'root'
})
export class AttachmentUploadService extends BizOperationService<any, number>{
  constructor(protected httpClient: HttpClient) {
    super(httpClient, API_UPLOAD_URL);
  }
}

const API_DOWNLOAD_URL = `${environment.apiUrl}/attachment-downloader`;
@Injectable({
  providedIn: 'root'
})
export class AttachmentDownloadService extends BizOperationService<any, number>{
  constructor(protected httpClient: HttpClient) {
    super(httpClient, API_DOWNLOAD_URL);
  }

  getDownload(id, fileName: string) {
    this.httpClient.get(API_DOWNLOAD_URL + "/" + id, { responseType: 'blob' }).toPromise().then((res) => {
      if (res)
        this.downloadFile(res, fileName)
    })
  }

  downloadFile(data, fileName) {
    var a = document.createElement("a");
    a.href = URL.createObjectURL(data);
    a.download = fileName;
    a.click();
    a.remove()
  }
}

const ATTAcHMENT_REF=`${environment.apiUrl}/attachment-ref`;
@Injectable({
  providedIn: 'root'
})
export class AttachmentServiceRef extends BizOperationService<any, number>{
  constructor(protected httpClient: HttpClient) {
    super(httpClient, ATTAcHMENT_REF);
  }
  getAttachmentListRef(refDocNo,refDocType ){
    return this.httpClient.get(ATTAcHMENT_REF + "?refDocNo=" + refDocNo + "&refDocType=" + refDocType)
  }
}