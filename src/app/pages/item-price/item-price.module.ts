import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemPricePageRoutingModule } from './item-price-routing.module';

import { ItemPricePage } from './item-price.page';
import { CRUDTableModule } from 'src/app/_metronic/shared/crud-table';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CRUDTableModule,
    ItemPricePageRoutingModule
  ],
  declarations: [ItemPricePage]
})
export class ItemPricePageModule {}
