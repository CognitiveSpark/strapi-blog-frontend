import { NgModule }         from '@angular/core';
import { CommonModule }     from '@angular/common';
import {RouterModule}       from '@angular/router';
import {LoginModule}        from '../login-feature/login.module';
import {RegistrationModule} from '../registration-feature/registration.module';
import { AuthComponent }    from './auth/auth.component';


@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    LoginModule,
    RegistrationModule,
    RouterModule,
  ]
})
export class AuthModule { }
