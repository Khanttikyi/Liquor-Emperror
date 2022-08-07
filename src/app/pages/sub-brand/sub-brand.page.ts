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
  ELEMENT_COL: any = SubBrandCol;
  displayedColumns: any = SubBrandDisplayCol;
  @ViewChild(MaterialTableViewComponent) matTable: MaterialTableViewComponent
  constructor(private cdf: ChangeDetectorRef, private modalCtrl: ModalController, private modalService: NgbModal, private database: DatabaseService) { }

  ngOnInit() {
    this.getBrandList()
  }
  getBrandList() {
    this.database.getSubBrandData().then((res) => {
      console.log(res);
      this.brandList = res
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
          this.getBrandList()
        } else {
          this.database.create('SUB_BRAND_DATA', result)
          this.getBrandList()
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
      this.getBrandList()
    }

  }

}
