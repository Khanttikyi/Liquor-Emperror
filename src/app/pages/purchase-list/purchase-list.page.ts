import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MaterialTableViewComponent } from 'src/app/_metronic/shared/crud-table/components/material-table-view/material-table-view.component';
import { DatabaseService } from 'src/app/_metronic/shared/crud-table/services/database.service';
import { PurchasePage } from '../purchase/purchase.page';
import { purchaseCol, purchaseDisplayCol } from './purchase-const';

@Component({
  selector: 'app-purchase-list',
  templateUrl: './purchase-list.page.html',
  styleUrls: ['./purchase-list.page.scss'],
})
export class PurchaseListPage implements OnInit {
  brandOption: any = []
  subBrandOption: any = []
  isCreate: boolean = true
  purchaseList: any = [];
  ELEMENT_COL: any = purchaseCol;
  displayedColumns: any = purchaseDisplayCol;
  @ViewChild(MaterialTableViewComponent) matTable: MaterialTableViewComponent
  constructor(private cdf: ChangeDetectorRef, private modalCtrl: ModalController, private modalService: NgbModal, private database: DatabaseService) {
    this.getBrand()
    this.getSubBrand()
  }

  ngOnInit() {
    this.getPurchaseList()
  }
  getPurchaseList() {
    this.database.getData('PURCHASE').then((res) => {
      console.log(res);

      res.forEach(element => {
        let brand = this.brandOption.find((p) => p.code == element.brandCode);
        let sub = this.subBrandOption.find((p) => p.code == element.subBrandCode);
        element.brandName = brand.value
        element.subBrandName = sub.value
      });
      this.purchaseList = res
      this.cdf.detectChanges()
      this.matTable.reChangeData()
    })



  }

  getBrand() {
    this.database.getData('BRAND_DATA').then((res) => {
      let data = this.getFormatOpt(res)
      this.brandOption = data
    })

  }

  getSubBrand() {
    this.database.getData('SUB_BRAND_DATA').then((res) => { 
      let data = this.getFormatOptName(res)
      this.subBrandOption = data
    })

  }
  getFormatOpt(res) {
    return res.map(x => {
      return { 'code': x.brandCode, 'value': x.brandName }
    })
  }
  getFormatOptName(res) {
    return res.map(x => {
      return { 'code': x.subBrandCode, 'value': x.name }
    })
  }
  async newPurchase(data?) {
    const modalRef = this.modalService.open(PurchasePage, { size: 'xl2', backdrop: false });
    modalRef.componentInstance.type = 'modal'
    modalRef.componentInstance.isCreate = data ? false : true
    modalRef.componentInstance.data = data
    modalRef.result.then(() => { }, (res) => {
      if (res) {
        let result = res.data
        console.log(result);
        if (data) {
          this.database.update('PURCHASE', result)
          this.getPurchaseList()
        } else {
          this.database.create('PURCHASE', result)
          this.getPurchaseList()
        }
      }
    })
  }
  actionBtn(event) {
    // console.log(event);
    if (event.cmd == 'edit') {
      this.newPurchase(event.data)
    }
    else {
      this.database.remove("BRAND_DATA", event.data.brandCode, "brandCode")
      this.getPurchaseList()
    }

  }
}
