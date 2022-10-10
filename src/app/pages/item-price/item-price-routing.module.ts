import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemPricePage } from './item-price.page';

const routes: Routes = [
  {
    path: '',
    component: ItemPricePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemPricePageRoutingModule {}
