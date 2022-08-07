import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubBrandPageRoutingModule } from './sub-brand-routing.module';

import { SubBrandPage } from './sub-brand.page';
import { CRUDTableModule } from 'src/app/_metronic/shared/crud-table';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CRUDTableModule,
    SubBrandPageRoutingModule
  ],
  declarations: [SubBrandPage]
})
export class SubBrandPageModule {}
