import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MaterialTableViewComponent } from 'src/app/_metronic/shared/crud-table/components/material-table-view/material-table-view.component';
import { DatabaseService } from 'src/app/_metronic/shared/crud-table/services/database.service';
import { purchaseCol, purchaseDisplayCol } from '../purchase-list/purchase-const';
import { stockCol, stockDisplayCol } from './stock-const';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.page.html',
  styleUrls: ['./stock.page.scss'],
})
export class StockPage implements OnInit {

  brandOption: any = []
  subBrandOption: any = []
  isCreate: boolean = true
  purchaseList: any = [];
  ELEMENT_COL: any = stockCol;
  displayedColumns: any = stockDisplayCol;
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
        if(element.quantity){
          element.status = "INSTOCK"
        }
        else{
          element.status = "OUTOFSTOCK"
        }
        element.brandName = brand.value
        element.subBrandName = sub.value
        
      });
      this.purchaseList = res
      console.log("purchaselist", this.purchaseList);
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

