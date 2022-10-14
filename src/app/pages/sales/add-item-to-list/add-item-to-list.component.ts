import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatabaseService } from 'src/app/_metronic/shared/crud-table/services/database.service';

@Component({
  selector: 'app-add-item-to-list',
  templateUrl: './add-item-to-list.component.html',
  styleUrls: ['./add-item-to-list.component.scss'],
})
export class AddItemToListComponent implements OnInit {
  isCreate: boolean = true
  addItemForm: FormGroup
  subBrandCode: any = ""
  brandOption: any = []
  itemCode: any = ""
  currentTimeInSeconds = Math.floor(Date.now() / 1000);
  @Input() data: any = {}
  subBrandOption: any[] = []
  sizeOption: any[] = []
  date = new Date;
  constructor(private modalCtrl: ModalController, private modal: NgbModal, private database: DatabaseService) {

    this.getSubBrand()
    // this.getBrand()
    // this.getSize()
    
  }

  ngOnInit() {
    this.loadForm()
  }
  selectBrand(data) {
   
    let subbrand = this.brandOption.find((p) => p.code == data);
   
    let code = subbrand.code;
    
    this.database.getSubBrandByBrandCode(code).then((res) => {
     
      this.subBrandOption = this.getFormatOptSub(res);
    // console.log("fdsfsdf", res);
    })
  }
  getFormatOptSub(res) {
    return res.map(x => {
      return { 'code': x.subBrandCode, 'value': x.name }
    })
  }
  getSubBrand() {
    this.database.getData('SUB_BRAND_DATA').then((res) => {
      let data = this.getFormatOptSub(res)
      this.subBrandOption = data
     console.log("dfffff", data);

    })
  }
  // getBrand() {
  //   this.database.getData('BRAND_DATA').then((res) => {
  //     let data = this.getFormatOptB(res)
  //     this.brandOption = data
  //     // // console.log(this.brandOption);

  //   })
  // }
  // getFormatOptB(res) {
  //   return res.map(x => {
  //     return { 'code': x.brandCode, 'value': x.brandName }
  //   })
  // }
  // selectSize(data) {
   
  //   let brand = this.addItemForm.controls.brandCode.value;
   
  //   let subbrand = this.addItemForm.controls.subBrandCode.value;
  //   let code = data.code;
    
  //   this.database.getSizeBySubBrand(brand,subbrand,code).then((res) => {
  //     console.log("a", res);
  //     this.addItemForm.controls['retailPrice'].setValue(res[0].retailPrice);
  //     this.addItemForm.controls['wholeSalePrice'].setValue(res[0].wholeSalePrice);
  //   })
  // }

  // ngAfterViewInit() {
  //  this.itemCode = this.data ? this.data.itemCode : "PR-" + this.currentTimeInSeconds
  //   // // console.log(this.subBrandCode);

  // }
  loadForm() {
    //console.log("this.data", this.data)
    this.addItemForm = new FormGroup({
      itemCode: new FormControl(),
      subBrandCode: new FormControl(),
      price: new FormControl(),
      size: new FormControl(),
      quantity: new FormControl( ),
      amount: new FormControl( ),
      remark: new FormControl(),
      createddate: new FormControl(this.data ? this.data.createddate : formatDate(this.date, 'dd-MM-yyyy', 'en')),
      updateddate: new FormControl(formatDate(this.date, 'dd-MM-yyyy', 'en')),

    })
  }
  cancel() {
    this.modal.dismissAll()
  }
  // createItem() {
  //   let value = { ...this.addItemForm.value, itemPriceCode: this.itemCode }
  //   this.modal.dismissAll({ data: value })
  // }
  // // createSize() {
  // //   const modalRef = this.modal.open(AddNewItemPriceComponent, { size: 'lg', backdrop: false });
  // //   modalRef.componentInstance.type = 'modal'
  // //   modalRef.result.then((res) => {
  // //     if (res) {
  // //       this.database.create('SIZE',res)
  // //       this.getSize()
  // //     }
  // //   })
  // // }
  // getSize(){
  //   this.database.getData('SIZE').then((res) => {
  //     // // console.log(res);
      
  //     this.sizeOption = res
  //   })
  // }

  // getFormatOpt(res) {
  //   return res.map(x => {
  //     return { 'code': x.brandCode, 'value': x.brandName }
  //   })
  // }

  //for View
  isControlValid(controlName: string): boolean {
    const control = this.addItemForm.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.addItemForm.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  controlHasError(validation, controlName): boolean {
    const control = this.addItemForm.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  isControlTouched(controlName): boolean {
    const control = this.addItemForm.controls[controlName];
    return control.dirty || control.touched;
  }
}
