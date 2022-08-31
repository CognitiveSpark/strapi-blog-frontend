import { NgModule }              from '@angular/core';
import { CommonModule }          from '@angular/common';
import {ReactiveFormsModule}     from '@angular/forms';
import {RouterModule, Routes}    from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  {
    path: '',
    component: RegistrationComponent,
  },
];

@NgModule({
  declarations: [
    RegistrationComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule
  ],
})
export class RegistrationModule { }
