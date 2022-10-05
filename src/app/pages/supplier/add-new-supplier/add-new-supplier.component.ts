import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-new-supplier',
  templateUrl: './add-new-supplier.component.html',
  styleUrls: ['./add-new-supplier.component.scss'],
})
export class AddNewSupplierComponent implements OnInit {
  isCreate: boolean = true
  supplierForm: FormGroup
  supplierCode: any = ""
  currentTimeInSeconds = Math.floor(Date.now() / 1000);
  @Input() data: any = {}
  constructor(private modalCtrl: ModalController, private modal: NgbModal) { }

  ngOnInit() {
    this.loadForm()
  }

  ngAfterViewInit() {
    this.supplierCode = this.data ? this.data.supplierCode : "SUP-" + this.currentTimeInSeconds
    // console.log(this.categoryCode);

  }
  loadForm() {
    this.supplierForm = new FormGroup({
      supplierCode: new FormControl(this.supplierCode || null),
      supplierName: new FormControl(this.data ? this.data.supplierName : null, Validators.required),
      supplierAddress: new FormControl(this.data ? this.data.supplierAddress : null, Validators.required),
      supplierPhoneno: new FormControl(this.data ? this.data.supplierPhoneno : null, Validators.required),
      description: new FormControl(this.data ? this.data.description : null, Validators.required),
    })
  }
  cancel() {
    this.modal.dismissAll()
  }
  createSupplier() {
    let value = { ...this.supplierForm.value, supplierCode: this.supplierCode }
    this.modal.dismissAll({ data: value })
  }


  //for View
  isControlValid(controlName: string): boolean {
    const control = this.supplierForm.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.supplierForm.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  controlHasError(validation, controlName): boolean {
    const control = this.supplierForm.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  isControlTouched(controlName): boolean {
    const control = this.supplierForm.controls[controlName];
    return control.dirty || control.touched;
  }

}
