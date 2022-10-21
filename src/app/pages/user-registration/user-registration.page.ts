import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MaterialTableViewComponent } from 'src/app/_metronic/shared/crud-table/components/material-table-view/material-table-view.component';
import { DatabaseService } from 'src/app/_metronic/shared/crud-table/services/database.service';
import { AddUserComponent } from './add-user/add-user.component';
import { userCol, UserDisplayCol } from './user-const';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.page.html',
  styleUrls: ['./user-registration.page.scss'],
})
export class UserRegistrationPage implements OnInit {
  categoryList: any = [];
  ELEMENT_COL: any = userCol;
  displayedColumns: any = UserDisplayCol;
  @ViewChild(MaterialTableViewComponent) matTable: MaterialTableViewComponent
  constructor(private cdf: ChangeDetectorRef, private modalCtrl: ModalController, private modalService: NgbModal, private database: DatabaseService) { }

  ngOnInit() {
    this.getcategoryList()
  }
  getcategoryList() {
    this.database.getData('CATEGORY').then((res) => {
      // console.log(res);
      this.categoryList = res
      this.cdf.detectChanges()
      this.matTable.reChangeData()
    })



  }
  async addNewCategory(data?) {
    const modalRef = this.modalService.open(AddUserComponent, { size: 'sm', backdrop: false });
    modalRef.componentInstance.type = 'modal'
    modalRef.componentInstance.isCreate = data ? false : true
    modalRef.componentInstance.data = data
    modalRef.result.then(() => { }, (res) => {
      if (res) {
        let result = res.data
        // console.log(result);

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
    // console.log(event);
    if (event.cmd == 'edit') {
      this.addNewCategory(event.data)
    }
    else {
      this.database.remove("CATEGORY", event.data.categoryCode, "categoryCode")
      this.getcategoryList()
    }

  }
}

