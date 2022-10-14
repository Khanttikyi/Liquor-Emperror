import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewSalePageRoutingModule } from './new-sale-routing.module';

import { NewSalePage } from './new-sale.page';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgbModule,
    ReactiveFormsModule,
    NewSalePageRoutingModule
  ],
  declarations: [NewSalePage]
})
export class NewSalePageModule {}
