import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DatabaseService } from 'src/app/_metronic/shared/crud-table/services/database.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.page.html',
  styleUrls: ['./purchase.page.scss'],
})
export class PurchasePage implements OnInit {
  purchaseForm: FormGroup
  purchaseCode: any = ""
  currentTimeInSeconds = Math.floor(Date.now() / 1000);
  constructor(private database:DatabaseService) { }

  ngOnInit() {
    this.loadForm()
    this.database.getPurchaseData('PU-001').then((res)=>{
      console.log(res);
      
    })
  }
  
  ngAfterViewInit() {
    this.purchaseCode = "PU-" + this.currentTimeInSeconds
    this.purchaseForm.controls.voucherCode.setValue(this.purchaseCode)
    this.purchaseForm.controls.purchaseCode.setValue(this.purchaseCode)
    
  }
  loadForm() {
    this.purchaseForm = new FormGroup({
      voucherCode: new FormControl(),
      purchaseCode: new FormControl(),
      date:new FormControl(),
      supplierName: new FormControl(),
      supplierPhone: new FormControl(),
      supplierAddress:new FormControl(),
      brandCode:new FormControl(),
      subBrandCode:new FormControl(),
      size:new FormControl(),
      quantity:new FormControl(),
      purchase:new FormControl(),
      isRetail:new FormControl(),
      isWholeSale:new FormControl(),
      retailPrice:new FormControl(),
      wholeSalePrice:new FormControl(),
      totalAmount:new FormControl(),
    })
  }
  createPurchase(){

  }
  cancel(){
    this.purchaseForm.reset()
  }

  //for View
  isControlValid(controlName: string): boolean {
    const control = this.purchaseForm.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.purchaseForm.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  controlHasError(validation, controlName): boolean {
    const control = this.purchaseForm.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  isControlTouched(controlName): boolean {
    const control = this.purchaseForm.controls[controlName];
    return control.dirty || control.touched;
  }
}
