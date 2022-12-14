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
        path: 'category',
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
