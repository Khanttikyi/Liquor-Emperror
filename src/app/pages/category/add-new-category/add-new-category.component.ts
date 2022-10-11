import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-new-category',
  templateUrl: './add-new-category.component.html',
  styleUrls: ['./add-new-category.component.scss'],
})
export class AddNewcategoryComponent implements OnInit {
  isCreate: boolean = true
  categoryForm: FormGroup
  categoryCode: any = ""
  date = new Date;
  currentTimeInSeconds = Math.floor(Date.now() / 1000);
  @Input() data: any = {}
  constructor(private modalCtrl: ModalController, private modal: NgbModal) { }

  ngOnInit() {
    this.loadForm()
  }

  ngAfterViewInit() {
    this.categoryCode = this.data ? this.data.categoryCode : "CA-" + this.currentTimeInSeconds
    // console.log(this.categoryCode);

  }
  loadForm() {
    console.log("data", this.data)
    this.categoryForm = new FormGroup({
      categoryCode: new FormControl(this.categoryCode || null),
      categoryName: new FormControl(this.data ? this.data.categoryName : null, Validators.required),
      categoryDescription: new FormControl(this.data ? this.data.categoryDescription : null, Validators.required),
      createddate: new FormControl(this.data ? this.data.createddate : formatDate(this.date, 'dd-MM-yyyy', 'en')),
      updateddate: new FormControl(formatDate(this.date, 'dd-MM-yyyy', 'en')),
    })
  }
  cancel() {
    this.modal.dismissAll()
  }
  createCategory() {
    let value = { ...this.categoryForm.value, categoryCode: this.categoryCode }
    this.modal.dismissAll({ data: value })
  }


  //for View
  isControlValid(controlName: string): boolean {
    const control = this.categoryForm.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.categoryForm.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  controlHasError(validation, controlName): boolean {
    const control = this.categoryForm.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  isControlTouched(controlName): boolean {
    const control = this.categoryForm.controls[controlName];
    return control.dirty || control.touched;
  }
}
