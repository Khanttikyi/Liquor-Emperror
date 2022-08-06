import { Component, Input } from "@angular/core";
import { InputValidation } from "../../../../../pages/form-component/field.interface";

@Component({
  selector: 'app-print-error',
  template: `<div class="text-danger error-message help-text-message" *ngIf="control && control.errors && (control.invalid)">
  <div *ngIf="control.errors.required"><small>{{getMsg('required')}}</small></div>
  <div *ngIf="control.errors.minlength"><small>{{getMsg('min')}}</small></div>
  <div *ngIf="control.errors.maxlength"><small>{{getMsg('max')}}</small></div>
  <div *ngIf="control.errors.min"><small>{{getMsg('min')}}</small></div>
  <div *ngIf="control.errors.max"><small>{{getMsg('max')}}</small></div>
  <div *ngIf="control.errors.email"><small>Email format is invalid</small></div>
</div>`,
  providers: []
})
export class PrintError {
  @Input("control") control: any;
  @Input() valid: InputValidation[] = [];
  constructor() { 
  }


  getMsg(type: string) {
    if (this.valid.length > 0)
      return this.valid.find(x => x.type == type).message
    else{
      return "This input box is required!"
    }
  }


}