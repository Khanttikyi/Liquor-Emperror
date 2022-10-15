import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
    this.getBrand()
  }

  ngOnInit() {
    this.itemCode = this.data ? this.data.itemCode : "ITEM-" + this.currentTimeInSeconds
    this.loadForm()
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
  
  getBrand() {
    this.database.getBrand().then((res) => {
      //console.log("this.res",res);
      let data = this.getFormatOptBrand(res)
      this.brandOption = data
     // console.log("this.branddata", this.brandOption);
    })
  }
  getSize() {
    this.database.getData('SIZE').then((res) => {
      let dataC = this.getFormatOptS(res)
      this.sizeOption = dataC
      // console.log("this.sizeOption", this.sizeOption);

    })
  }
  getFormatOptS(res) {
    return res.map(x => {
      return { 'code': x.code, 'value': x.value }
    })
  }
  getFormatOptBrand(res) {
    return res.map(x => {
      return { 'code': x.brandCode, 'value': x.brandName }
    })
  }
  selectItem(subBrandCode) {
   // console.log("item", dasubBrandCodeta);
    this.database.getSizeBysubBrandCode(subBrandCode).then((res) => {
      console.log("this.getSizeBysubBrandCode",res);
      let data = this.getFormatOptB(res)
      this.sizeOption = data
      //this.sizeOption = data
     // console.log("this.branddata", this.brandOption);

    })
    
  }
  getFormatOptB(res) {
    return res.map(x => {
      return { 'code': x.code, 'value': x.value }
    })
  }
  selectSize(size) {
    let brand = this.addItemForm.controls.brandCode.value;
   
    let subbrand = this.addItemForm.controls.subBrandCode.value;
    let code = size.code;
    
    this.database.getPriceBySize(brand,subbrand,code).then((res) => {
      
      this.addItemForm.controls['price'].setValue(res[0].retailPrice);
    
    })
  }
  dataChanged(e) {
    console.log('e', this.addItemForm.controls['quantity'].value)
    let amount = e * this.addItemForm.controls['price'].value;
    console.log("dat", amount);
    this.addItemForm.controls['amount'].setValue(amount);
  }

  ngAfterViewInit() {
  

  }
  loadForm() {
    this.addItemForm = new FormGroup({
      itemCode: new FormControl(),
      brandCode: new FormControl(),
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
  addItem(){
    this.modal.dismissAll({data:this.addItemForm.value})
  }
  createItem(){
    
  }
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
