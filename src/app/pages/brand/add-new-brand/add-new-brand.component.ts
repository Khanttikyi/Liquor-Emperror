import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-new-brand',
  templateUrl: './add-new-brand.component.html',
  styleUrls: ['./add-new-brand.component.scss'],
})
export class AddNewBrandComponent implements OnInit {
  isCreate: boolean = true
  brandForm: FormGroup
  brandCode: any = ""
  currentTimeInSeconds = Math.floor(Date.now() / 1000);
  @Input() data: any = {}
  constructor(private modalCtrl: ModalController, private modal: NgbModal) { }

  ngOnInit() {
    this.loadForm()
  }

  ngAfterViewInit() {
    this.brandCode = this.data ? this.data.brandCode : "B-" + this.currentTimeInSeconds
    console.log(this.brandCode);

  }
  loadForm() {
    this.brandForm = new FormGroup({
      brandCode: new FormControl(this.brandCode || null),
      brandName: new FormControl(this.data ? this.data.brandName : null, Validators.required),
      brandDescription: new FormControl(this.data ? this.data.brandDescription : null, Validators.required),
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
