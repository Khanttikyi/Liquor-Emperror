import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { NgPagination } from './components/paginator/ng-pagination/ng-pagination.component';
import { FormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SortIconComponent } from './components/sort-icon/sort-icon.component';
import { ActionButtonComponent } from './components/action-button/action-button.component';
import { MaterialTableViewComponent } from './components/material-table-view/material-table-view.component';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { OverlayModule } from '@angular/cdk/overlay';
import { StylePaginatorDirective } from './components/material-table-view/custom-paginator.directive';

@NgModule({
  declarations: [PaginatorComponent, NgPagination, SortIconComponent, ActionButtonComponent,MaterialTableViewComponent,StylePaginatorDirective],
  imports: [CommonModule, FormsModule, InlineSVGModule, DragDropModule,MatTableModule,MatPaginatorModule,MatSortModule,OverlayModule,],
  exports: [PaginatorComponent, NgPagination, SortIconComponent, ActionButtonComponent,MaterialTableViewComponent,StylePaginatorDirective],
  entryComponents: []
})
export class CRUDTableModule { }
