import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MaterialTableViewComponent } from 'src/app/_metronic/shared/crud-table/components/material-table-view/material-table-view.component';
import { DatabaseService } from 'src/app/_metronic/shared/crud-table/services/database.service';
import { AddNewBrandComponent } from './add-new-brand/add-new-brand.component';
import { BrandCol, BrandDisplayCol } from './brand-const';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.page.html',
  styleUrls: ['./brand.page.scss'],
})
export class BrandPage implements OnInit {
  brandList: any = [];
  categoryList: any = [];
  categoryOption: any = [];
  ELEMENT_COL: any = BrandCol;
  displayedColumns: any = BrandDisplayCol;
  @ViewChild(MaterialTableViewComponent) matTable: MaterialTableViewComponent
  constructor(private cdf: ChangeDetectorRef, private modalCtrl: ModalController, private modalService: NgbModal, private database: DatabaseService) { 
    this.getCategoryList()
    this.getBrandList()
  }

  ngOnInit() {
    
    
  }
  getCategoryList() {
    this.database.getData('CATEGORY').then((res) => {
      this.categoryOption = res;
      console.log("CATEGORY", this.categoryOption);
      //this.brandList = res
      this.cdf.detectChanges()
      this.matTable.reChangeData()
    })
  }
  getBrandList() {
    console.log("ddddd", this.categoryOption)
    this.database.getData('BRAND_DATA').then((res) => {
      console.log("brandata", res);
      res.forEach(element => {
        
        let categorycode = this.categoryOption.find((p) => p.categoryCode == element.categoryCode);
        
       console.log("categorycode", categorycode);
        element.categoryName = categorycode.categoryName;
        
      });
      this.brandList = res
      console.log("list", this.brandList);
      this.cdf.detectChanges()
      this.matTable.reChangeData()
    })
  }
  

  async addNewBrand(data?) {
    const modalRef = this.modalService.open(AddNewBrandComponent, { size: 'lg', backdrop: false });
    modalRef.componentInstance.type = 'modal'
    modalRef.componentInstance.isCreate = data ? false : true
    modalRef.componentInstance.data = data
    modalRef.result.then(() => { }, (res) => {
      if (res) {
        let result = res.data
        // // console.log(result);

        if (data) {
          this.database.update('BRAND_DATA', result)
          this.getBrandList()
        } else {
          this.database.create('BRAND_DATA', result)
          this.getBrandList()
        }
      }
    })
  }
  actionBtn(event) {
    // // console.log(event);
    if (event.cmd == 'edit') {
      this.addNewBrand(event.data)
    }
    else {
      this.database.remove("BRAND_DATA", event.data.brandCode, "brandCode")
      this.getBrandList()
    }

  }
}
