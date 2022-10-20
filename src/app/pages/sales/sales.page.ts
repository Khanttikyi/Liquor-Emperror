import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MaterialTableViewComponent } from 'src/app/_metronic/shared/crud-table/components/material-table-view/material-table-view.component';
import { DatabaseService } from 'src/app/_metronic/shared/crud-table/services/database.service';
import { AddNewSaleItemComponent } from './add-new-sale-item/add-new-sale-item.component';
import { saleItemCol, SaleItemDisplayCol } from './sales-const';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.page.html',
  styleUrls: ['./sales.page.scss'],
})
export class SalesPage implements OnInit {
  brandOption: any = []
  subBrandOption: any = []
  isCreate: boolean = true
  saleItemList: any = [];
  ELEMENT_COL: any = saleItemCol;
  displayedColumns: any = SaleItemDisplayCol;
  @ViewChild(MaterialTableViewComponent) matTable: MaterialTableViewComponent
  constructor(private cdf: ChangeDetectorRef,private navCtrl:NavController, private modalCtrl: ModalController, private modalService: NgbModal, private database: DatabaseService,private route: Router) {
    this.getBrand()
    this.getSubBrand()
  }

  ngOnInit() {
    this.getSaleItemList()
  }
  getSaleItemList() {
    this.database.getData('SALES').then((res) => {
      console.log("sale", res);

      // res.forEach(element => {
      //   let brand = this.brandOption.find((p) => p.code == element.brandCode);
      //   let sub = this.subBrandOption.find((p) => p.code == element.subBrandCode);
      //   element.brandName = brand.value
      //   element.subBrandName = sub.value
      // });
      this.saleItemList = res
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
  async newSaleItem(data?) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
      data: JSON.stringify(data)
      }
    };
    this.route.navigate(['/new-sale'],navigationExtras)
   // this.navCtrl.navigateForward('/new-sale')
    
  }
  actionBtn(event) {
    console.log("eventdata ",event);
    if (event.cmd == 'edit') {
      this.newSaleItem(event.data)
    }
    else {
      this.database.remove("BRAND_DATA", event.data.brandCode, "brandCode")
      this.getSaleItemList()
    }

  }
}
