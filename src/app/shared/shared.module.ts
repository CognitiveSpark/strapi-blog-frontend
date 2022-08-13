import { NgModule }              from '@angular/core';
import { CommonModule }          from '@angular/common';
import {ReactiveFormsModule}     from '@angular/forms';
import {RouterModule}            from '@angular/router';
import {PostFormComponent}       from './components/post-form/post-form.component';
import { OrderedPostsComponent } from './components/ordered-posts/ordered-posts.component';


@NgModule({
  declarations: [
    PostFormComponent,
    OrderedPostsComponent,
  ],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		RouterModule
	],
  exports: [
    PostFormComponent,
  ]
})
export class SharedModule { }
