import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SupplierPageRoutingModule } from './supplier-routing.module';

import { SupplierPage } from './supplier.page';
import { CRUDTableModule } from 'src/app/_metronic/shared/crud-table';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CRUDTableModule,
    ReactiveFormsModule,
    SupplierPageRoutingModule
  ],
  declarations: [SupplierPage]
})
export class SupplierPageModule {}
