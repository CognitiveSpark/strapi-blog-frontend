import { NgModule }          from '@angular/core';
import { CommonModule }      from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {PostFormComponent}   from './components/post-form/post-form.component';



@NgModule({
  declarations: [
    PostFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    PostFormComponent
  ]
})
export class SharedModule { }
