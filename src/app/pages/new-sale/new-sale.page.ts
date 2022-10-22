import { formatDate } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
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
  saleVoucherCode: any = ""
  saleCode: any = ""
  isCreate: boolean = true;
  todaydate = new Date();
  saleItemList: any = [

  ];
  saleItem: any = [

  ]
  tempArray: any = []
  isItemUpdate: boolean = false
  subBrandOption: any = []
  disabled: boolean = true
  totalAmount: number = 0
  isChecked: boolean = false
  isTax: boolean = false;
  isDiscount: boolean = false;
  isPaid: boolean = false;
  totalDiscount: number = 0
  balance: number = 0
  date = new Date;
  staffName: string
  totalTax: number = 0

  @Input() data: any

  ELEMENT_COL: any = addItemCol;
  displayedColumns: any = AddItemDisplayCol;

  currentTimeInSeconds = Math.floor(Date.now() / 1000);
  @ViewChild(MaterialTableViewComponent) matTable: MaterialTableViewComponent
  constructor(private modalCtrl: ModalController, private modal: NgbModal, private database: DatabaseService, private cdf: ChangeDetectorRef, private navCtrl: NavController, private router: ActivatedRoute) {
    this.getSubBrand()

    this.saleVoucherCode = "VC-" + this.currentTimeInSeconds
    this.saleCode = "SA-" + this.currentTimeInSeconds
    this.staffName = "aye"

  }

  ngOnInit() {
    this.router.queryParams.subscribe(async (params) => {
      console.log("paramsdata", params);
      if (params["data"]) {
        this.data = JSON.parse(params["data"])
        console.log("jsonarray", this.data);
        let salecode = this.data.saleCode;
        this.database.getItemList(salecode).then((res) => {
          this.saleItem = res;
          console.log('getItemList', res);
          this.cdf.detectChanges()
        })

      }
    })
    this.loadForm()
    this.database.getPurchaseData('PU-001').then((res) => {
    })
  }

  chkTax() {
    alert("hello");
  }
  ngAfterViewInit() {
    // this.getSaleItemList();
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
    console.log("saledata", this.data)
    this.saleForm = new FormGroup({
      saleCode: new FormControl(this.data ? this.data.saleCode : this.saleCode),
      saleVoucherCode: new FormControl(this.data ? this.data.saleVoucherCode : this.saleVoucherCode),
      saledate: new FormControl(formatDate(this.todaydate, 'dd-MM-yyyy', 'en')),
      staffName: new FormControl(this.data ? this.data.staffName : this.staffName),
      netAmount: new FormControl(this.data ? this.data.netAmount : 0),
      totalDiscount: new FormControl(this.data ? this.data.totalDiscount : 0),
      totalTax: new FormControl(this.data ? this.data.totalTax : 0),
      isTax: new FormControl(this.data ? this.data.isTax : null),
      balance: new FormControl(this.data ? this.data.balance : 0),
      isDiscount: new FormControl(this.data ? this.data.isDiscount : null),
      isPaid: new FormControl(this.data ? this.data.isPaid : null),
      paidAmount: new FormControl(this.data ? this.data.paidAmount : 0),
      changeAmount: new FormControl(this.data ? this.data.changeAmount : 0),
      createddate: new FormControl(this.data ? this.data.createddate : formatDate(this.date, 'dd-MM-yyyy', 'en')),
      updateddate: new FormControl(formatDate(this.date, 'dd-MM-yyyy', 'en')),
    })

    if (this.data ? this.data.isDiscount == 'true' : false) {
      this.isDiscount = true
      this.cdf.detectChanges();
      // this.totalDiscount = this.data.totalDiscount;
    } else {
      this.isDiscount = false
      this.cdf.detectChanges();
    }
    if (this.data ? this.data.isPaid == 'true' : false) {
      this.isPaid = true
      this.cdf.detectChanges();
    } else {
      this.isPaid = false
      this.cdf.detectChanges();
    }
    if (this.data ? this.data.isTax == 'true' : false) {
      this.isTax = true
      this.cdf.detectChanges();
      // console.log("totaltax", this.data.totalTax)
      // this.totalTax = this.data.totalTax 
    } else {
      this.isTax = false
    }
    if (this.data && this.data.isPaid == "true") {
      this.isChecked = true;
      this.cdf.detectChanges();
    }
    if (this.data && this.data.isDiscount == "true") {
      this.isChecked = true;
      this.cdf.detectChanges();
    }
  }
  createSaleItem() {
    let value = { ...this.saleForm.value, saleItem: this.saleItem }
    if (this.data) {
      this.database.update('SALES', value, this.isItemUpdate);
    } else {
      this.database.create('SALES', value);
    }
    this.navCtrl.back();
  }
  async newSaleItem(data?) {
    console.log(data);

    const modalRef = this.modal.open(AddItemToListComponent, { size: 'lg', backdrop: false });
    modalRef.componentInstance.type = 'modal'
    modalRef.componentInstance.isCreate = data ? false : true
    modalRef.componentInstance.data = data
    modalRef.componentInstance.parentData = { "saleVoucherCode": this.data ? this.data.saleVoucherCode : this.saleVoucherCode, "saleCode": this.data ? this.data.saleCode : this.saleCode }
    modalRef.result.then(() => { }, (res) => {
      if (res) {
        let item = this.subBrandOption.find((p) => p.code == res.data.subBrandCode);
        res.data.subBrandCode = item.value
        let result = res.data
        // //console.log(result);
        if (data) {
          this.saleItem.push(result)
          this.cdf.detectChanges()
          this.calculateSaleAmount()
        } else {
          this.saleItem.push(result)
          this.cdf.detectChanges()
          this.calculateSaleAmount()
        }
      }
    })
  }
  calculateSaleAmount() {
    this.totalAmount = 0
    if (this.saleItem.length > 0) {
      this.saleItem.forEach(element => {
        this.totalAmount += Number(element.amount)
      });
      this.saleForm.controls.netAmount.setValue(this.totalAmount.toString())
      this.saleForm.controls.balance.setValue(this.totalAmount.toString())
    }
  }
  calDiscount() {

  }
  calculateDiscount() {
    let discount = this.saleForm.controls.totalDiscount.value
    let total = 0
    if (discount > 0) {
      total = (this.saleForm.controls.netAmount.value - discount)
      this.saleForm.controls.balance.setValue(total.toString())
      this.cdf.detectChanges()
    }
  }
  calculateTax() {
    console.log(this.isTax);

    let totalamount = Number(this.saleForm.controls.netAmount.value)
    let dis = Number(this.saleForm.controls.totalDiscount.value)
    console.log("dis", dis);
    let tax = totalamount * 0.05
    console.log("TAX", tax);

    let total = totalamount + (tax - dis)

    if (this.isTax) {
      this.saleForm.controls.totalTax.setValue(tax.toString())
      this.saleForm.controls.balance.setValue(total.toString())
      this.cdf.detectChanges()
    } else {
      this.saleForm.controls.totalTax.setValue(0)
      this.saleForm.controls.balance.setValue(totalamount.toString())
      this.cdf.detectChanges()
    }
  }

  calculatePaid() {
    let paid = Number(this.saleForm.controls.paidAmount.value)
    let balanceamt = Number(this.saleForm.controls.balance.value)
    if (this.isPaid) {
      //console.log("HERE");

      if (paid > balanceamt) {
        let change = paid - balanceamt
        this.saleForm.controls.changeAmount.setValue(change.toString())
      }
      this.cdf.detectChanges()
    } else {
      this.saleForm.controls.paidAmount.setValue(0)
      this.saleForm.controls.changeAmount.setValue(0)
      this.cdf.detectChanges()
    }
  }
  getSubBrand() {
    this.database.getData('SUB_BRAND_DATA').then((res) => {
      let data = this.getFormatOptSub(res)
      this.subBrandOption = data
    })
  }
  getFormatOptSub(res) {
    return res.map(x => {
      return { 'code': x.subBrandCode, 'value': x.name }
    })
  }

  cancel() {
    this.navCtrl.back();
  }

  async updateItem(data?) {
    console.log("updateITem", data);
    const modalRef = this.modal.open(AddItemToListComponent, { size: 'lg', backdrop: false });
    modalRef.componentInstance.type = 'modal'
    modalRef.componentInstance.isCreate = data ? false : true
    modalRef.componentInstance.data = data
    modalRef.componentInstance.parentData = { "saleVoucherCode": this.data ? this.data.saleVoucherCode : this.saleVoucherCode, "saleCode": this.data ? this.data.saleCode : this.saleCode }
    modalRef.result.then(() => { }, (res) => {
      if (res) {
        // let item = this.subBrandOption.find((p) => p.code == res.data.subBrandCode);
        // res.data.subBrandCode = item.value
        let result = res.data
        this.tempArray = result
        var foundIndex = this.saleItem.findIndex(x => x.itemCode == this.tempArray.itemCode);
        this.saleItem[foundIndex] = this.tempArray;
        if (data) {
          this.isItemUpdate = true
          this.saleItem.forEach((element, index) => {
            if (element.itemCode === this.saleItem.itemCode) {
              this.saleItem[index] = this.saleItem;
            }
          });
          this.cdf.detectChanges()
          this.calculateSaleAmount()
        } else {
          this.isItemUpdate = false
          this.saleItem.push(result)
          this.cdf.detectChanges()
          this.calculateSaleAmount()
        }
      }
    })
  }
  deleteItem(data) {

    let index = this.saleItem.findIndex((x) => x.subBrandCode == data.subBrandCode);
    if (index > -1) { // only splice array when item is found
      this.saleItem.splice(index, 1); // 2nd parameter means remove one item only
    }
    if (this.saleItem.length > 0) {
      for (let data of this.saleItem) {
        this.database.remove('SALES_ITEM', data.itemCode, 'itemCode')
      }
    }

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

