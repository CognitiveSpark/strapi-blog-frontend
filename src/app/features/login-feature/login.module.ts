import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import {ReactiveFormsModule}  from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent}       from './login/login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule
  ],
})
export class LoginModule { }
