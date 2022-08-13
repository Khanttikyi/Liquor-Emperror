import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PurchaseListPageRoutingModule } from './purchase-list-routing.module';

import { PurchaseListPage } from './purchase-list.page';
import { CRUDTableModule } from 'src/app/_metronic/shared/crud-table';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CRUDTableModule,
    PurchaseListPageRoutingModule
  ],
  declarations: [PurchaseListPage]
})
export class PurchaseListPageModule {}
