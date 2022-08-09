import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MaterialTableViewComponent } from 'src/app/_metronic/shared/crud-table/components/material-table-view/material-table-view.component';
import { DatabaseService } from 'src/app/_metronic/shared/crud-table/services/database.service';
import { AddNewSubBrandComponent } from './add-new-sub-brand/add-new-sub-brand.component';
import { SubBrandCol, SubBrandDisplayCol } from './sub-brand-const';

@Component({
  selector: 'app-sub-brand',
  templateUrl: './sub-brand.page.html',
  styleUrls: ['./sub-brand.page.scss'],
})
export class SubBrandPage implements OnInit {

  brandList: any = [];
  brandOption: any = [];
  ELEMENT_COL: any = SubBrandCol;
  displayedColumns: any = SubBrandDisplayCol;
  @ViewChild(MaterialTableViewComponent) matTable: MaterialTableViewComponent
  constructor(private cdf: ChangeDetectorRef, private modalCtrl: ModalController, private modalService: NgbModal, private database: DatabaseService) {
    this.getBrand()
  }

  ngOnInit() {
    this.getSubBrandList()
  }
  getSubBrandList() {
    this.database.getData('SUB_BRAND_DATA').then((res) => {
      console.log(res);
      this.brandList = res

      this.brandList.forEach(element => {
        let brand = this.brandOption.find((p) => p.code == element.brandCode);
        element.brandName =brand.value 
      });
      this.cdf.detectChanges()
      this.matTable.reChangeData()
    })



  }
  async addNewBrand(data?) {
    const modalRef = this.modalService.open(AddNewSubBrandComponent, { size: 'lg', backdrop: false });
    modalRef.componentInstance.type = 'modal'
    modalRef.componentInstance.isCreate = data ? false : true
    modalRef.componentInstance.data = data
    modalRef.result.then(() => { }, (res) => {
      if (res) {
        let result = res.data
        console.log(result);
        if (data) {
          this.database.update('SUB_BRAND_DATA', result)
          this.getSubBrandList()
        } else {
          this.database.create('SUB_BRAND_DATA', result)
          this.getSubBrandList()
        }
      }
    })
  }
  actionBtn(event) {
    console.log(event);
    if (event.cmd == 'edit') {
      this.addNewBrand(event.data)
    }
    else {
      this.database.remove("SUB_BRAND_DATA", event.data, "brandCode")
      this.getSubBrandList()
    }

  }
  getBrand() {
    this.database.getData('BRAND_DATA').then((res) => {
      let data = this.getFormatOpt(res)
      this.brandOption = data
    })

  }

  getFormatOpt(res) {
    return res.map(x => {
      return { 'code': x.brandCode, 'value': x.brandName }
    })
  }
}
