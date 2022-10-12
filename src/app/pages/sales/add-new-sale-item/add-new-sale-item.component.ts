import { formatDate } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MaterialTableViewComponent } from 'src/app/_metronic/shared/crud-table/components/material-table-view/material-table-view.component';
import { DatabaseService } from 'src/app/_metronic/shared/crud-table/services/database.service';
import { AddItemToListComponent } from '../add-item-to-list/add-item-to-list.component';
import { addItemCol, AddItemDisplayCol } from './add-sale-item-const';

@Component({
  selector: 'app-add-new-sale-item',
  templateUrl: './add-new-sale-item.component.html',
  styleUrls: ['./add-new-sale-item.component.scss'],
})
export class AddNewSaleItemComponent implements OnInit {
  saleForm: FormGroup
  purchaseCode: any = ""
  voucherCode: any = ""
  isCreate: boolean = true;
  todaydate = new Date();
  supplierOption: any[] = []
  categoryOption: any[] = []
  subBrandOption: any[] = []
  saleItemList: any = [];
  subBrandList: any[] = []
  brandOption: any[] = []
  disabled: boolean = true
  brandList: any[] = []
  sizeOption: any[] = []
  isChecked: boolean = false
  isWholeSale: boolean = false
  isRetail: boolean = false
  isDisabled: boolean = true;
  date = new Date;
  @Input() data: any = {}
  ELEMENT_COL: any = addItemCol;
  displayedColumns: any = AddItemDisplayCol;

  currentTimeInSeconds = Math.floor(Date.now() / 1000);
  @ViewChild(MaterialTableViewComponent) matTable: MaterialTableViewComponent
  constructor(private modalCtrl: ModalController, private modal: NgbModal, private database: DatabaseService, private cdf: ChangeDetectorRef) {
    this.purchaseCode = "PU-" + this.currentTimeInSeconds
    this.voucherCode = "VC-" + this.currentTimeInSeconds
    this.getSupplier()
    this.getCategory()
    this.getSize()
    this.getBrand()
    this.getSubBrand()
  }

  ngOnInit() {

    this.loadForm()
    this.database.getPurchaseData('PU-001').then((res) => {
      // // console.log(res);

    })
  }
  chkRetail(){

    this.isRetail = true;

    this.isDisabled = false;

  }
  getCategory() {
    this.database.getData('CATEGORY').then((res) => {
      let dataC = this.getFormatOptC(res)
      this.categoryOption = dataC
      // console.log("this.categoryOption", this.categoryOption);

    })
  }
  getBrand() {
    this.database.getData('BRAND_DATA').then((res) => {
      let dataC = this.getFormatOptB(res)
      this.brandOption = dataC
      // console.log("this.categoryOption", this.categoryOption);

    })
  }
  getSubBrand() {
    this.database.getData('SUB_BRAND_DATA').then((res) => {
      let dataC = this.getFormatOptSub(res)
      this.subBrandOption = dataC
      // console.log("this.categoryOption", this.categoryOption);

    })
  }
  getFormatOptSub(res) {
    return res.map(x => {
      return { 'code': x.subBrandCode, 'value': x.name }
    })
  }

  getFormatOptC(res) {
    return res.map(x => {
      return { 'code': x.categoryCode, 'value': x.categoryName }
    })
  }


  getSize() {
    this.database.getData('SIZE').then((res) => {
      let dataC = this.getFormatOptS(res)
      this.sizeOption = dataC
      // console.log("this.sizeOption", this.sizeOption);

    })
  }

  selectCategory(data) {
    let category = this.categoryOption.find((p) => p.code == data);
    let code = category.code;

    this.database.getBrandByCategoryCode(code).then((res) => {

      // console.log("res", res);
      this.brandOption = this.getFormatOptB(res);
      // console.log("fdsfsdf", res);
    })
  }
  selectBrand(data) {
    console.log('data', this.brandOption);
    let subbrand = this.brandOption.find((p) => p.code == data);
    console.log('data', subbrand);
    let code = subbrand.code;
    // console.log('selectcate', this.subBrandList);
    this.database.getSubBrandByBrandCode(code).then((res) => {
      // console.log("res", res);
      this.subBrandOption = this.getFormatOptSub(res);
      // console.log("fdsfsdf", res);
    })
  }
  
  getFormatOptB(res) {
    return res.map(x => {
      return { 'code': x.brandCode, 'value': x.brandName }
    })
  }
  getFormatOptS(res) {
    return res.map(x => {
      return { 'code': x.code, 'value': x.value }
    })
  }
  getSupplier() {
    this.database.getData('SUPPLIER').then((res) => {
      let data = this.getFormatOpt(res)
      this.supplierOption = data
      // console.log(this.supplierOption);

    })
  }

  ngAfterViewInit() {
    this.getSaleItemList();
    // this.purchaseForm.controls.voucherCode.setValue(this.voucherCode)
    // this.purchaseForm.controls.purchaseCode.setValue(this.purchaseCode)

  }
  getSaleItemList() {
    this.database.getData('SALES').then((res) => {
      console.log("sale", res);

      // res.forEach(element => {
      //   let brand = this.brandOption.find((p) => p.code == element.brandCode);
      //   let sub = this.subBrandOption.find((p) => p.code == element.subBrandCode);
      //   element.brandName = brand.value
      //   element.subBrandName = sub.value
      // });
      this.saleItemList = res
      this.cdf.detectChanges()
      this.matTable.reChangeData()
    })



  }

  getFormatOpt(res) {
    return res.map(x => {
      return { 'code': x.supplierCode, 'value': x.supplierName }
    })
  }
  loadForm() {
    console.log("purchasecode", this.data)
  //   if(this.categoryOption.length>0){
  //   if (this.data.categoryCode) {
  //     this.selectCategory(this.data.categoryCode)
  //   }
  //   if (this.data.brandCode) {
  //     this.selectBrand(this.data.brandCode)
  //   }
  // }
    this.saleForm = new FormGroup({
      voucherCode: new FormControl(this.data ? this.data.voucherCode : this.voucherCode),
      purchaseCode: new FormControl(this.data ? this.data.purchaseCode : this.purchaseCode),
      date: new FormControl(formatDate(this.todaydate, 'dd-MM-yyyy', 'en')),
      supplierName: new FormControl(this.data ? this.data.supplierName : null),
      supplierPhone: new FormControl(this.data ? this.data.supplierPhone : null),
      supplierAddress: new FormControl(this.data ? this.data.supplierAddress : null),
      brandCode: new FormControl(this.data ? this.data.brandCode : null),
      categoryCode: new FormControl(this.data ? this.data.categoryCode : null),
      subBrandCode: new FormControl(this.data ? this.data.subBrandCode : null),
      size: new FormControl(this.data ? this.data.size : null),
      quantity: new FormControl(this.data ? this.data.quantity : null),
      purchase: new FormControl(this.data ? this.data.purchase : null),
      isRetail: new FormControl(this.data ? this.data.isRetail : null),
      isWholeSale: new FormControl(this.data ? this.data.isWholeSale : null),
      retailPrice: new FormControl(this.data ? this.data.retailPrice : null),
      wholeSalePrice: new FormControl(this.data ? this.data.wholeSalePrice : null),
      totalAmount: new FormControl(this.data ? this.data.totalAmount : null),
      createddate: new FormControl(this.data ? this.data.createddate : formatDate(this.date, 'dd-MM-yyyy', 'en')),
      updateddate: new FormControl(formatDate(this.date, 'dd-MM-yyyy', 'en')),
    })
    if (this.data  && this.data.isRetail == "true") {
      this.isChecked = true;
      this.cdf.detectChanges();
    }
    if (this.data && this.data.isWholeSale == "true") {
      this.isWholeSale = true;
      this.cdf.detectChanges();
    }
  }
  createSaleItem() {
    let value = { ...this.saleForm.value }
    console.log("datavalue", value);
    this.modal.dismissAll({ data: value })

  }
  async createItem(data?) {
    const modalRef = this.modal.open(AddItemToListComponent, { size: 'xl2', backdrop: false });
    modalRef.componentInstance.type = 'modal'
    modalRef.componentInstance.isCreate = data ? false : true
    modalRef.componentInstance.data = data
    modalRef.result.then(() => { }, (res) => {
      if (res) {
        let result = res.data
        //console.log(result);
        if (data) {
          this.database.update('PURCHASE', result)
          this.getSaleItemList()
        } else {
          this.database.create('PURCHASE', result)
          this.getSaleItemList()
        }
      }
    })
  }
  
  cancel() {
    // this.purchaseForm.reset()
    this.modal.dismissAll()
  }

  dataChanged(e) {
    console.log('e', this.saleForm.controls['quantity'].value)
    let amount = e * this.saleForm.controls['quantity'].value;
    console.log("dat", amount);
    this.saleForm.controls['totalAmount'].setValue(amount);
  }



  //for View
  isControlValid(controlName: string): boolean {
    const control = this.saleForm.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.saleForm.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  controlHasError(validation, controlName): boolean {
    const control = this.saleForm.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  isControlTouched(controlName): boolean {
    const control = this.saleForm.controls[controlName];
    return control.dirty || control.touched;
  }
}
