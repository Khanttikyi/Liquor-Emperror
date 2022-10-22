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
  userList: any = [];
  ELEMENT_COL: any = userCol;
  displayedColumns: any = UserDisplayCol;
  @ViewChild(MaterialTableViewComponent) matTable: MaterialTableViewComponent
  constructor(private cdf: ChangeDetectorRef, private modalCtrl: ModalController, private modalService: NgbModal, private database: DatabaseService) { }

  ngOnInit() {
    this.getUserList()
  }
  getUserList() {
    this.database.getData('USER').then((res) => {
      // console.log(res);
      this.userList = res
      this.cdf.detectChanges()
      this.matTable.reChangeData()
    })



  }
  async addNewUser(data?) {
    const modalRef = this.modalService.open(AddUserComponent, { size: 'lg', backdrop: false });
    modalRef.componentInstance.type = 'modal'
    modalRef.componentInstance.isCreate = data ? false : true
    modalRef.componentInstance.data = data
    modalRef.result.then(() => { }, (res) => {
      if (res) {
        let result = res.data
        // console.log(result);
        if (data) {
          this.database.update('USER', result)
          this.getUserList()
        } else {
          this.database.create('USER', result)
          this.getUserList()
        }
      }
    })
  }
  actionBtn(event) {
    // console.log(event);
    if (event.cmd == 'edit') {
      this.addNewUser(event.data)
    }
    else {
      this.database.remove("USER", event.data.UserCode, "UserCode")
      this.getUserList()
    }

  }
}

