import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MaterialTableViewComponent } from 'src/app/_metronic/shared/crud-table/components/material-table-view/material-table-view.component';
import { DatabaseService } from 'src/app/_metronic/shared/crud-table/services/database.service';
import { AddNewItemPriceComponent } from './add-new-item-price/add-new-item-price.component';
import { itempriceCol, ItemPriceDisplayCol } from './item-price-const';

@Component({
  selector: 'app-item-price',
  templateUrl: './item-price.page.html',
  styleUrls: ['./item-price.page.scss'],
})
export class ItemPricePage implements OnInit {
  itemPriceList: any = [];
  itemPriceOption: any = []
  ELEMENT_COL: any = itempriceCol;
  displayedColumns: any = ItemPriceDisplayCol;
  @ViewChild(MaterialTableViewComponent) matTable: MaterialTableViewComponent
  constructor(private cdf: ChangeDetectorRef, private modalCtrl: ModalController, private modalService: NgbModal, private database: DatabaseService) { 
    this.getSubBrand() 
  }

  ngOnInit() {
    this.getItemPriceList()
  }
  getItemPriceList() {
    this.database.getData('ITEM_PRICE').then((res) => {
      console.log("itemprice",res);
      console.log("itemPriceOption", this.itemPriceOption);
      res.forEach(element => {
       
        let sub = this.itemPriceOption.find((p) => p.code == element.subBrandCode);
       console.log("sub", sub);
        element.subBrandName = sub.value
      });
      this.itemPriceList = res
      this.cdf.detectChanges()
      this.matTable.reChangeData()
    })
  }

  getSubBrand() {
    this.database.getData('SUB_BRAND_DATA').then((res) => { 
      let data = this.getFormatOptName(res)
      this.itemPriceOption = data
    })

  }
  getFormatOptName(res) {
    return res.map(x => {
      return { 'code': x.subBrandCode, 'value': x.name }
    })
  }
  async addNewItemPrice(data?) {
    const modalRef = this.modalService.open(AddNewItemPriceComponent, { size: 'sm', backdrop: false });
    modalRef.componentInstance.type = 'modal'
    modalRef.componentInstance.isCreate = data ? false : true
    modalRef.componentInstance.data = data
    modalRef.result.then(() => { }, (res) => {
      if (res) {
        let result = res.data
        // console.log(result);

        if (data) {
          this.database.update('ITEM_PRICE', result)
          this.getItemPriceList()
        } else {
          this.database.create('ITEM_PRICE', result)
          this.getItemPriceList()
        }
      }
    })
  }
  actionBtn(event) {
    // console.log(event);
    if (event.cmd == 'edit') {
      this.addNewItemPrice(event.data)
    }
    else {
      this.database.remove("CATEGORY", event.data.categoryCode, "categoryCode")
      this.getItemPriceList()
    }

  }
}

