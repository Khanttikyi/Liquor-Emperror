import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubBrandPageRoutingModule } from './sub-brand-routing.module';

import { SubBrandPage } from './sub-brand.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubBrandPageRoutingModule
  ],
  declarations: [SubBrandPage]
})
export class SubBrandPageModule {}
