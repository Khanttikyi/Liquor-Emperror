import { formatDate } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatabaseService } from 'src/app/_metronic/shared/crud-table/services/database.service';

@Component({
  selector: 'app-add-user-role',
  templateUrl: './add-user-role.component.html',
  styleUrls: ['./add-user-role.component.scss'],
})
export class AddUserRoleComponent implements OnInit {
  isCreate: boolean = true
  userRoleForm: FormGroup
  userId: any = ""
  date = new Date;
  roleOption: any = []
  userOption: any = []
  currentTimeInSeconds = Math.floor(Date.now() / 1000);
  @Input() data: any = {}
  constructor(private modalCtrl: ModalController, private cdf: ChangeDetectorRef, private modal: NgbModal, private database: DatabaseService) { }

  ngOnInit() {
    this.getRole()
    this.getUser()
    this.loadForm()
  }
  getRole() {
    this.database.getData('ROLE').then((res) => {
      console.log(res);
      this.roleOption = this.getFormatOpt(res)
      this.cdf.detectChanges()
    })

  }
  getFormatOpt(res) {
    return res.map(x => {
      return { 'code': x.roleCode, 'value': x.roleValue }
    })
  }
  getUser() {
    this.database.getData('USER').then((res) => {
      console.log(res);
      this.userOption = this.getFormatOptUser(res)
      this.cdf.detectChanges()
    })

  }
  getFormatOptUser(res) {
    return res.map(x => {
      return { 'code': x.userId, 'value': x.userName }
    })
  }
  ngAfterViewInit() {
    this.userId = this.data ? this.data.userId : "USER-" + this.currentTimeInSeconds
    // console.log(this.userId);

  }
  loadForm() {
    console.log("data", this.data)
    this.userRoleForm = new FormGroup({
      userId: new FormControl(this.userId || null),
      userName: new FormControl(this.data ? this.data.userName : null, Validators.required),
      userRole: new FormControl(this.data ? this.data.userRole : null, Validators.required),
      createddate: new FormControl(this.data ? this.data.createddate : formatDate(this.date, 'dd-MM-yyyy', 'en')),
      updateddate: new FormControl(formatDate(this.date, 'dd-MM-yyyy', 'en')),
    })
  }
  cancel() {
    this.modal.dismissAll()
  }
  createUserRole() {
    let value = { ...this.userRoleForm.value, userId: this.userId }
    this.modal.dismissAll({ data: value })
  }


  //for View
  isControlValid(controlName: string): boolean {
    const control = this.userRoleForm.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.userRoleForm.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  controlHasError(validation, controlName): boolean {
    const control = this.userRoleForm.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  isControlTouched(controlName): boolean {
    const control = this.userRoleForm.controls[controlName];
    return control.dirty || control.touched;
  }
}
