import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PurchaseListPage } from './purchase-list.page';

const routes: Routes = [
  {
    path: '',
    component: PurchaseListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PurchaseListPageRoutingModule {}
