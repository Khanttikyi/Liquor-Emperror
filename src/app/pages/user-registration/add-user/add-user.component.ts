import { formatDate } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatabaseService } from 'src/app/_metronic/shared/crud-table/services/database.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  isCreate: boolean = true
  isMatch: boolean = false
  submited: boolean = false
  userForm: FormGroup
  userId: any = ""
  date = new Date;
  currentTimeInSeconds = Math.floor(Date.now() / 1000);
  roleOption: any = []
  @Input() data: any = {}
  public showPassword: boolean;
  public showConfirmPassword: boolean;
  constructor(private modalCtrl: ModalController, private modal: NgbModal, private database: DatabaseService, private cdf: ChangeDetectorRef) { }

  ngOnInit() {
    this.getRole()
    this.loadForm()
  }

  ngAfterViewInit() {
    this.userId = this.data ? this.data.userId : "USER-" + this.currentTimeInSeconds
    // console.log(this.userId);

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
  loadForm() {
    console.log("data", this.data)
    this.userForm = new FormGroup({
      userId: new FormControl(this.userId || null),
      userName: new FormControl(this.data ? this.data.userName : null, Validators.required),
      userPhone: new FormControl(this.data ? this.data.userPhone : null, Validators.required),
      userEmail: new FormControl(this.data ? this.data.userEmail : null, Validators.required),
      userRole: new FormControl(this.data ? this.data.userRole : null, Validators.required),
      password: new FormControl(this.data ? this.data.userPassword : null, Validators.required),
      confirmPassword: new FormControl(this.data ? this.data.confirmPassword : null, Validators.required),
      createddate: new FormControl(this.data ? this.data.createddate : formatDate(this.date, 'dd-MM-yyyy', 'en')),
      updateddate: new FormControl(formatDate(this.date, 'dd-MM-yyyy', 'en')),
    })
  }
  cancel() {
    this.modal.dismissAll()
  }
  createUser() {
    if (this.userForm.valid && this.isMatch) {
      let value = { ...this.userForm.value, userId: this.userId }
      this.modal.dismissAll({ data: value })
    }
  }


  //for View
  isControlValid(controlName: string): boolean {
    const control = this.userForm.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.userForm.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  controlHasError(validation, controlName): boolean {
    const control = this.userForm.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  isControlTouched(controlName): boolean {
    const control = this.userForm.controls[controlName];
    return control.dirty || control.touched;
  }

  confirmPassword() {
    if (this.userForm.value['password'] != null && this.userForm.value['confirmPassword'] != null) {
      const password = this.userForm.value['password'];
      const confirmPassword = this.userForm.value['confirmpassword'];
      var result = password === confirmPassword ? true : false;
      return this.submited ? !result : false;
    }
    if (this.submited) {
      return this.userForm.controls['confirmPassword'].invalid
    }
  }


  iscomfirmPassword(newPass, confirmpassword): any {
    const password = this.userForm.controls[newPass];
    const confirmPassword = this.userForm.controls[confirmpassword];

    // console.log(password.value, comfirmPassword.value)

    if (password.value == confirmPassword.value) {
      this.isMatch = true
      return confirmPassword.hasError('Match') && (confirmPassword.dirty || confirmPassword.touched);
    } else {
      this.isMatch = false
      return confirmPassword.hasError('Not Match') && (confirmPassword.dirty || confirmPassword.touched);
    }
  }
}
