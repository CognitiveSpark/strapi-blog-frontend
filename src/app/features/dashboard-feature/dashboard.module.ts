import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import {ReactiveFormsModule}  from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule}         from '../../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
];


@NgModule({
  declarations: [
    DashboardComponent,
  ],
	imports: [
		RouterModule.forChild(routes),
		CommonModule,
		ReactiveFormsModule,
		SharedModule
	]
})
export class DashboardModule { }
