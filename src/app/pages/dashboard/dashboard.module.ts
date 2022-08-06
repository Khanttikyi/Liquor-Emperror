import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg';
import { EditModalComponent } from './edit-modal/edit-modal.component';
import { CRUDTableModule } from '../../_metronic/shared/crud-table';
@NgModule({
  declarations: [EditModalComponent],
  exports: [EditModalComponent],
  imports: [CommonModule,
    InlineSVGModule,
    FormsModule,
    ReactiveFormsModule,
    CRUDTableModule,
  ]
})
export class DashboardShareModule { }

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    InlineSVGModule,
    FormsModule,
    ReactiveFormsModule,
    CRUDTableModule,
    DashboardShareModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
      },
    ]),
  ],
})
export class DashboardModule { }


