import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserRolePageRoutingModule } from './user-role-routing.module';

import { UserRolePage } from './user-role.page';
import { CRUDTableModule } from 'src/app/_metronic/shared/crud-table';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CRUDTableModule,
    UserRolePageRoutingModule
  ],
  declarations: [UserRolePage]
})
export class UserRolePageModule {}
