import { formatDate } from '@angular/common';
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
  brandOption: any = []
  itemPriceCode: any = ""
  currentTimeInSeconds = Math.floor(Date.now() / 1000);
  @Input() data: any = {}
  subBrandOption: any[] = []
  sizeOption: any[] = []
  date = new Date;
  constructor(private modalCtrl: ModalController, private modal: NgbModal, private database: DatabaseService) {
    this.getBrand()    
  }

  ngOnInit() {
    this.loadForm()
  }
  
  getBrand() {
    this.database.getBrand().then((res) => {
      let data = this.getFormatOptBrand(res)
      this.brandOption = data
    })
  }
  getFormatOptBrand(res) {
    return res.map(x => {
      return { 'code': x.brandCode, 'value': x.brandName }
    })
  }
  selectBrand(brandCode) {
    console.log("ddd", brandCode);
    this.database.getBrandByBrand(brandCode).then((res => {
      console.log("reeeee",res);
      this.subBrandOption = this.getFormatOptSub(res);
    }))
   
  }
  getFormatOptSub(res) {
    return res.map(x => {
      return { 'code': x.subBrandCode, 'value': x.name }
    })
  }

  selectSubBrand(subBrandCode) {
     this.database.getSizeBysubBrandCode(subBrandCode).then((res) => {
       console.log("this.getSizeBysubBrandCode",res);
       let data = this.getFormatOptB(res)
       this.sizeOption = data
     })
     
   }
   getFormatOptB(res) {
     return res.map(x => {
       return { 'code': x.code, 'value': x.value }
     })
   }

  selectSize(data) {
   
    let brand = this.itemPriceForm.controls.brandCode.value;
   
    let subbrand = this.itemPriceForm.controls.subBrandCode.value;
    let code = data.code;
    
    this.database.getSalePrice(brand,subbrand,code).then((res) => {
      console.log("a", res);
      this.itemPriceForm.controls['retailPrice'].setValue(res[0].retailPrice);
      this.itemPriceForm.controls['wholeSalePrice'].setValue(res[0].wholeSalePrice);
    })
  }

  ngAfterViewInit() {
   this.itemPriceCode = this.data ? this.data.itemPriceCode : "PR-" + this.currentTimeInSeconds
    // // console.log(this.subBrandCode);

  }
  loadForm() {
    //console.log("this.data", this.data)
    this.itemPriceForm = new FormGroup({
      itemPriceCode: new FormControl(this.itemPriceCode || null),
      subBrandCode: new FormControl(this.data ? this.data.subBrandCode : null),
      brandCode: new FormControl(this.data ? this.data.brandCode : null, Validators.required),
      retailPrice: new FormControl(this.data ? this.data.retailPrice : null, Validators.required),
      wholeSalePrice: new FormControl(this.data ? this.data.wholeSalePrice : null, Validators.required),
      size: new FormControl(this.data ? this.data.size : null, Validators.required),
      createddate: new FormControl(this.data ? this.data.createddate : formatDate(this.date, 'dd-MM-yyyy', 'en')),
      updateddate: new FormControl(formatDate(this.date, 'dd-MM-yyyy', 'en')),

    })
  }
  cancel() {
    this.modal.dismissAll()
  }
  createItemPrice() {
    let value = { ...this.itemPriceForm.value, itemPriceCode: this.itemPriceCode }
    this.modal.dismissAll({ data: value })
  }
  // createSize() {
  //   const modalRef = this.modal.open(AddNewItemPriceComponent, { size: 'lg', backdrop: false });
  //   modalRef.componentInstance.type = 'modal'
  //   modalRef.result.then((res) => {
  //     if (res) {
  //       this.database.create('SIZE',res)
  //       this.getSize()
  //     }
  //   })
  // }
  getSize(){
    this.database.getData('SIZE').then((res) => {
      // // console.log(res);
      
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
