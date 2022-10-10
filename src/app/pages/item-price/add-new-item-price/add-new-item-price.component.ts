import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatabaseService } from 'src/app/_metronic/shared/crud-table/services/database.service';

@Component({
  selector: 'app-add-new-item-price',
  templateUrl: './add-new-item-price.component.html',
  styleUrls: ['./add-new-item-price.component.scss'],
})
export class AddNewItemPriceComponent implements OnInit {
  isCreate: boolean = true
  itemPriceForm: FormGroup
  subBrandCode: any = ""
  currentTimeInSeconds = Math.floor(Date.now() / 1000);
  @Input() data: any = {}
  subBrandOption: any[] = []
  sizeOption: any[] = []
  constructor(private modalCtrl: ModalController, private modal: NgbModal, private database: DatabaseService) {

    this.getSubBrand()
    this.getBrand()
    this.getSize()
  }

  ngOnInit() {
    this.loadForm()
  }
  getSubBrand() {
    this.database.getData('SUB_BRAND_DATA').then((res) => {
      let data = this.getFormatOpt(res)
      this.subBrandOption = data
      // console.log(this.brandOption);

    })
  }
  getBrand() {
    this.database.getData('BRAND_DATA').then((res) => {
      let data = this.getFormatOptB(res)
      this.subBrandOption = data
      // console.log(this.brandOption);

    })
  }
  getFormatOptB(res) {
    return res.map(x => {
      return { 'code': x.brandCode, 'value': x.brandName }
    })
  }

  ngAfterViewInit() {
    this.subBrandCode = this.data ? this.data.subBrandCode : "SB-" + this.currentTimeInSeconds
    // console.log(this.subBrandCode);

  }
  loadForm() {
    this.itemPriceForm = new FormGroup({
      subBrandCode: new FormControl(this.subBrandCode || null),
      brandCode: new FormControl(this.data ? this.data.brandCode : null, Validators.required),
      retailPrice: new FormControl(this.data ? this.data.retailPrice : null, Validators.required),
      wholeSalePrice: new FormControl(this.data ? this.data.wholeSalePrice : null, Validators.required),
      size: new FormControl(this.data ? this.data.size : null, Validators.required),

    })
  }
  cancel() {
    this.modal.dismissAll()
  }
  createItemPrice() {
    let value = { ...this.itemPriceForm.value, subBrandCode: this.subBrandCode }
    this.modal.dismissAll({ data: value })
  }
  createSize() {
    const modalRef = this.modal.open(AddNewItemPriceComponent, { size: 'sm', backdrop: false });
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
      // console.log(res);
      
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
    const control = this.itemPriceForm.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.itemPriceForm.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  controlHasError(validation, controlName): boolean {
    const control = this.itemPriceForm.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  isControlTouched(controlName): boolean {
    const control = this.itemPriceForm.controls[controlName];
    return control.dirty || control.touched;
  }
}
