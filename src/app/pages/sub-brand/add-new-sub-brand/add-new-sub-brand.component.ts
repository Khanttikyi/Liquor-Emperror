import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatabaseService } from 'src/app/_metronic/shared/crud-table/services/database.service';
import { AddSizeComponent } from '../add-size/add-size.component';

@Component({
  selector: 'app-add-new-sub-brand',
  templateUrl: './add-new-sub-brand.component.html',
  styleUrls: ['./add-new-sub-brand.component.scss'],
})
export class AddNewSubBrandComponent implements OnInit {
  isCreate: boolean = true
  subBrandForm: FormGroup
  subBrandCode: any = ""
  currentTimeInSeconds = Math.floor(Date.now() / 1000);
  @Input() data: any = {}
  brandOption: any[] = []
  sizeOption: any[] = []
  constructor(private modalCtrl: ModalController, private modal: NgbModal, private database: DatabaseService) {

    this.getBrand()
    this.getSize()
  }

  ngOnInit() {
    this.loadForm()
  }
  getBrand() {
    this.database.getData('BRAND_DATA').then((res) => {
      let data = this.getFormatOpt(res)
      this.brandOption = data
      console.log(this.brandOption);

    })
  }

  ngAfterViewInit() {
    this.subBrandCode = this.data ? this.data.subBrandCode : "SB-" + this.currentTimeInSeconds
    console.log(this.subBrandCode);

  }
  loadForm() {
    this.subBrandForm = new FormGroup({
      subBrandCode: new FormControl(this.subBrandCode || null),
      brandCode: new FormControl(this.data ? this.data.brandCode : null, Validators.required),
      description: new FormControl(this.data ? this.data.description : null, Validators.required),
      name: new FormControl(this.data ? this.data.name : null, Validators.required),
      size: new FormControl(this.data ? this.data.size : null, Validators.required),

    })
  }
  cancel() {
    this.modal.dismissAll()
  }
  createBrand() {
    let value = { ...this.subBrandForm.value, subBrandCode: this.subBrandCode }
    this.modal.dismissAll({ data: value })
  }
  createSize() {
    const modalRef = this.modal.open(AddSizeComponent, { size: 'sm', backdrop: false });
    modalRef.componentInstance.type = 'modal'
    modalRef.result.then((res) => {
      if (res) {
        this.database.create('SIZE',res)
        this.getSize()
      }
    })
  }
  getSize(){
    this.database.getData('SIZE').then((res) => {
      console.log(res);
      
      this.sizeOption = res
    })
  }

  getFormatOpt(res) {
    return res.map(x => {
      return { 'code': x.brandCode, 'value': x.brandName }
    })
  }

  //for View
  isControlValid(controlName: string): boolean {
    const control = this.subBrandForm.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.subBrandForm.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  controlHasError(validation, controlName): boolean {
    const control = this.subBrandForm.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  isControlTouched(controlName): boolean {
    const control = this.subBrandForm.controls[controlName];
    return control.dirty || control.touched;
  }
}
