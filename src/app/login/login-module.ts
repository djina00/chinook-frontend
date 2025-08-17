import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing-module';
import { LoginPage } from './login-page/login-page';
import { SharedModule } from '../shared/shared.module';
import { RegisterPage } from './register-page/register-page';


@NgModule({
  declarations: [
    LoginPage,
    RegisterPage
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    SharedModule
  ]
})
export class LoginModule { }
