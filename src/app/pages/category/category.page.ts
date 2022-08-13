import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MaterialTableViewComponent } from 'src/app/_metronic/shared/crud-table/components/material-table-view/material-table-view.component';
import { DatabaseService } from 'src/app/_metronic/shared/crud-table/services/database.service';
import { AddNewcategoryComponent } from './add-new-category/add-new-category.component';
import { categoryCol, CategoryDisplayCol } from './category-const';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {
  categoryList: any = [];
  ELEMENT_COL: any = categoryCol;
  displayedColumns: any = CategoryDisplayCol;
  @ViewChild(MaterialTableViewComponent) matTable: MaterialTableViewComponent
  constructor(private cdf: ChangeDetectorRef, private modalCtrl: ModalController, private modalService: NgbModal, private database: DatabaseService) { }

  ngOnInit() {
    this.getcategoryList()
  }
  getcategoryList() {
    this.database.getData('CATEGORY').then((res) => {
      console.log(res);
      this.categoryList = res
      this.cdf.detectChanges()
      this.matTable.reChangeData()
    })



  }
  async addNewCategory(data?) {
    const modalRef = this.modalService.open(AddNewcategoryComponent, { size: 'sm', backdrop: false });
    modalRef.componentInstance.type = 'modal'
    modalRef.componentInstance.isCreate = data ? false : true
    modalRef.componentInstance.data = data
    modalRef.result.then(() => { }, (res) => {
      if (res) {
        let result = res.data
        console.log(result);

        if (data) {
          this.database.update('CATEGORY', result)
          this.getcategoryList()
        } else {
          this.database.create('CATEGORY', result)
          this.getcategoryList()
        }
      }
    })
  }
  actionBtn(event) {
    console.log(event);
    if (event.cmd == 'edit') {
      this.addNewCategory(event.data)
    }
    else {
      this.database.remove("CATEGORY", event.data.categoryCode, "categoryCode")
      this.getcategoryList()
    }

  }
}
