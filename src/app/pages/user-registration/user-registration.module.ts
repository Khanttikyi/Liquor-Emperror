import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserRegistrationPageRoutingModule } from './user-registration-routing.module';

import { UserRegistrationPage } from './user-registration.page';
import { CRUDTableModule } from 'src/app/_metronic/shared/crud-table';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CRUDTableModule,
    UserRegistrationPageRoutingModule
  ],
  declarations: [UserRegistrationPage]
})
export class UserRegistrationPageModule {}
