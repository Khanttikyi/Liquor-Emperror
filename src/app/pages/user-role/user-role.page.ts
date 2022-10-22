import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MaterialTableViewComponent } from 'src/app/_metronic/shared/crud-table/components/material-table-view/material-table-view.component';
import { DatabaseService } from 'src/app/_metronic/shared/crud-table/services/database.service';
import { AddUserRoleComponent } from './add-user-role/add-user-role.component';
import { userRoleCol, UserRoleDisplayCol } from './user-role-const';

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.page.html',
  styleUrls: ['./user-role.page.scss'],
})
export class UserRolePage implements OnInit {
  userList: any = [];
  ELEMENT_COL: any = userRoleCol;
  displayedColumns: any = UserRoleDisplayCol;
  @ViewChild(MaterialTableViewComponent) matTable: MaterialTableViewComponent
  constructor(private cdf: ChangeDetectorRef, private modalCtrl: ModalController, private modalService: NgbModal, private database: DatabaseService) { }

  ngOnInit() {
    this.getuserList()
  }
  getuserList() {
    this.database.getData('USER_ROLE').then((res) => {
      console.log(res);
      this.userList = res
      this.cdf.detectChanges()
      this.matTable.reChangeData()
    })



  }
  async addNewUserRole(data?) {
    const modalRef = this.modalService.open(AddUserRoleComponent, { size: 'md', backdrop: false });
    modalRef.componentInstance.type = 'modal'
    modalRef.componentInstance.isCreate = data ? false : true
    modalRef.componentInstance.data = data
    modalRef.result.then(() => { }, (res) => {
      if (res) {
        let result = res.data
        // console.log(result);
        if (data) {
          this.database.update('USER_ROLE', result)
          this.getuserList()
        } else {
          this.database.create('USER_ROLE', result)
          this.getuserList()
        }
      }
    })
  }
  actionBtn(event) {
    // console.log(event);
    if (event.cmd == 'edit') {
      this.addNewUserRole(event.data)
    }
    else {
      this.database.remove("USER_ROLE", event.data.userId, "userId")
      this.getuserList()
    }

  }
}

