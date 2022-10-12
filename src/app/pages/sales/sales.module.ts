import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalesPageRoutingModule } from './sales-routing.module';

import { SalesPage } from './sales.page';
import { CRUDTableModule } from 'src/app/_metronic/shared/crud-table';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CRUDTableModule,
    SalesPageRoutingModule
  ],
  declarations: [SalesPage]
})
export class SalesPageModule {}
