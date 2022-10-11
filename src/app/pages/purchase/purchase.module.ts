import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PurchasePageRoutingModule } from './purchase-routing.module';

import { PurchasePage } from './purchase.page';
import { CRUDTableModule } from 'src/app/_metronic/shared/crud-table';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CRUDTableModule,
    ReactiveFormsModule,
    PurchasePageRoutingModule
  ],
  declarations: []
})
export class PurchasePageModule {}
