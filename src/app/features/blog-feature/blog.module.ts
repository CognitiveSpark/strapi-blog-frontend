import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {PostsService}         from '../../services/posts-service/posts.service';
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
      }
    ]
  },
];

@NgModule({
  declarations: [
    BlogComponent,
    PostComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class BlogModule {}
