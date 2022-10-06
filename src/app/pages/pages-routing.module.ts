import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './_layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'category/category',
        loadChildren: () => import('./category/category.module').then( m => m.CategoryPageModule)
      },
      {
        path: 'sales',
        loadChildren: () => import('./sales/sales.module').then( m => m.SalesPageModule)
      },
      {
        path: 'category/brand',
        loadChildren: () => import('./brand/brand.module').then( m => m.BrandPageModule)
      },
      {
        path: 'category/sub-brand',
        loadChildren: () => import('./sub-brand/sub-brand.module').then( m => m.SubBrandPageModule)
      },
      {
        path: 'purchase',
        loadChildren: () => import('./purchase/purchase.module').then( m => m.PurchasePageModule)
      },
      {
        path: 'purchase-list',
        loadChildren: () => import('./purchase-list/purchase-list.module').then( m => m.PurchaseListPageModule)
      },    
      {
        path: 'category/supplier',
        loadChildren: () => import('./supplier/supplier.module').then( m => m.SupplierPageModule)
      },
      {
        path: 'stock',
        loadChildren: () => import('./stock/stock.module').then( m => m.StockPageModule)
      },
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'error/404',
      },
    ],
  },
  

  



 

  

 

  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
