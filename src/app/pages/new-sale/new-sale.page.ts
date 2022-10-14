import { formatDate } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MaterialTableViewComponent } from 'src/app/_metronic/shared/crud-table/components/material-table-view/material-table-view.component';
import { DatabaseService } from 'src/app/_metronic/shared/crud-table/services/database.service';
import { AddItemToListComponent } from '../sales/add-item-to-list/add-item-to-list.component';
import { addItemCol, AddItemDisplayCol } from '../sales/add-new-sale-item/add-sale-item-const';

@Component({
  selector: 'app-new-sale',
  templateUrl: './new-sale.page.html',
  styleUrls: ['./new-sale.page.scss'],
})
export class NewSalePage implements OnInit {
  saleForm: FormGroup
  voucherCode: any = ""
  isCreate: boolean = true;
  todaydate = new Date();
  saleItemList: any = [];
  disabled: boolean = true
  isChecked: boolean = false
  isTax: boolean = false;
  isDiscount: boolean = false;
  isPaid: boolean = false;
  date = new Date;
  @Input() data: any = {}
  ELEMENT_COL: any = addItemCol;
  displayedColumns: any = AddItemDisplayCol;

  currentTimeInSeconds = Math.floor(Date.now() / 1000);
  @ViewChild(MaterialTableViewComponent) matTable: MaterialTableViewComponent
  constructor(private modalCtrl: ModalController,private modal:NgbModal,private database: DatabaseService, private cdf: ChangeDetectorRef) {
    this.voucherCode = "VC-" + this.currentTimeInSeconds
  }

  ngOnInit() {
    this.loadForm()
    this.database.getPurchaseData('PU-001').then((res) => {
    })
  }
  
  chkTax(){
    alert("hello");
  }
  ngAfterViewInit() {
    this.getSaleItemList();
  }
  getSaleItemList() {
    this.database.getData('SALES').then((res) => {
      console.log("sale", res);
      this.saleItemList = res
      this.cdf.detectChanges()
      // this.matTable.reChangeData()
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
      date: new FormControl(formatDate(this.todaydate, 'dd-MM-yyyy', 'en')),
      staffName: new FormControl(this.data ? this.data.staffName : null),
      totalAmount: new FormControl(this.data ? this.data.totalAmount : 0),
      totalDiscount: new FormControl(this.data ? this.data.totalDiscount : 0),
      totalTax: new FormControl(this.data ? this.data.totalTax : 0),
      isTax: new FormControl(this.data ? this.data.isTax : null),
      netAmount: new FormControl(this.data ? this.data.netAmount : 0),
      isDiscount: new FormControl(this.data ? this.data.isDiscount : null),
      isPaid: new FormControl(this.data ? this.data.isPaid : null),
      paidAmount: new FormControl(this.data ? this.data.paidAmount : 0),
      changeAmount: new FormControl(this.data ? this.data.changeAmount : 0),
      createddate: new FormControl(this.data ? this.data.createddate : formatDate(this.date, 'dd-MM-yyyy', 'en')),
      updateddate: new FormControl(formatDate(this.date, 'dd-MM-yyyy', 'en')),
    })
    if (this.data  && this.data.isPaid == "true") {
      this.isChecked = true;
      this.cdf.detectChanges();
    }
    if (this.data && this.data.isDiscount == "true") {
      this.isChecked = true;
      this.cdf.detectChanges();
    }
  }
  createSaleItem() {
    let value = { ...this.saleForm.value }
    console.log("datavalue", value);
    this.modal.dismissAll({ data: value })

  }
  async newSaleItem(data?) {
    const modalRef = this.modal.open(AddItemToListComponent, { size: 'lg', backdrop: false });
    modalRef.componentInstance.type = 'modal'
    modalRef.componentInstance.isCreate = data ? false : true
    modalRef.componentInstance.data = data
    modalRef.result.then(() => { }, (res) => {
      // if (res) {
      //   let result = res.data
      //   //console.log(result);
      //   if (data) {
      //     this.database.update('PURCHASE', result)
      //     this.getSaleItemList()
      //   } else {
      //     this.database.create('PURCHASE', result)
      //     this.getSaleItemList()
      //   }
      // }
    })
  }
  
  
  cancel() {
    // this.purchaseForm.reset()
    this.modal.dismissAll()
  }
  actionBtn(event) {
    // console.log(event);
    if (event.cmd == 'edit') {
      this.newSaleItem(event.data)
    }
    else {
      this.database.remove("BRAND_DATA", event.data.brandCode, "brandCode")
      this.getSaleItemList()
    }

  }
  createPurchase(){

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

