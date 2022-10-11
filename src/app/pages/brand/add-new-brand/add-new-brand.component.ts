import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatabaseService } from 'src/app/_metronic/shared/crud-table/services/database.service';

@Component({
  selector: 'app-add-new-brand',
  templateUrl: './add-new-brand.component.html',
  styleUrls: ['./add-new-brand.component.scss'],
})
export class AddNewBrandComponent implements OnInit {
  isCreate: boolean = true
  brandForm: FormGroup
  brandCode: any = ""
  categoryOption: any[] = [] 
  date = new Date;
  currentTimeInSeconds = Math.floor(Date.now() / 1000);
  @Input() data: any = {}
  constructor(private modalCtrl: ModalController, private modal: NgbModal, private database: DatabaseService) { 
    this.getCategory()
  }

  ngOnInit() {
   console.log("thisdata", this.data)
    this.loadForm()
    
  }
  getCategory() {
    this.database.getData('CATEGORY').then((res) => {
      //let data = this.getFormatOpt(res)
      this.categoryOption = res
      console.log("this.categoryOption", this.categoryOption);

    })
  }

  getFormatOpt(res) {
    return res.map(x => {
      return { 'code': x.categoryCode, 'value': x.categoryName }
    })
  }

  ngAfterViewInit() {
    this.brandCode = this.data ? this.data.brandCode : "B-" + this.currentTimeInSeconds
    // console.log(this.brandCode);

  }
  loadForm() {
    console.log("brand", this.data)
    this.brandForm = new FormGroup({
      categoryCode: new FormControl(this.data ? this.data.categoryCode : null),
      brandCode: new FormControl(this.brandCode || null),
      brandName: new FormControl(this.data ? this.data.brandName : null, Validators.required),
      brandDescription: new FormControl(this.data ? this.data.brandDescription : null, Validators.required),
      createddate: new FormControl(this.data ? this.data.createddate : formatDate(this.date, 'dd-MM-yyyy', 'en')),
      updateddate: new FormControl(formatDate(this.date, 'dd-MM-yyyy', 'en')),
    })
  }
  cancel() {
    this.modal.dismissAll()
  }
  createBrand() {
    
    let value = { ...this.brandForm.value, brandCode: this.brandCode }
    this.modal.dismissAll({ data: value })
  }


  //for View
  isControlValid(controlName: string): boolean {
    const control = this.brandForm.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.brandForm.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  controlHasError(validation, controlName): boolean {
    const control = this.brandForm.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  isControlTouched(controlName): boolean {
    const control = this.brandForm.controls[controlName];
    return control.dirty || control.touched;
  }
}
