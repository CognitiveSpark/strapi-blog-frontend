import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {PostFormComponent}    from '../../shared/components/post-form/post-form.component';
import {SharedModule}         from '../../shared/shared.module';
import { BlogComponent }      from './blog/blog.component';
import { PostComponent }      from './components/post/post.component';
import {PostResolver}         from './resolvers/post-resolver/post.resolver';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: '/en/blog/1'
  },
  {
    path: ':page',
    component: BlogComponent,
    children: [
      {
        resolve: {
          post: PostResolver
        },
        path: ':post-id',
        component: PostComponent
      },
			{
				path: ':post-id/edit',
				component: PostFormComponent
			}
    ]
  },
];

@NgModule({
	declarations: [
		BlogComponent,
		PostComponent
	],
	exports: [
		BlogComponent
	],
	imports: [
		RouterModule.forChild(routes),
		CommonModule,
		SharedModule
	]
})
export class BlogModule {}
