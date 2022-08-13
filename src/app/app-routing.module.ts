import { NgModule }                              from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthComponent}                           from './features/auth-feature/auth/auth.component';
import {BlogModule}                              from './features/blog-feature/blog.module';
import {PostComponent}                           from './features/blog-feature/components/post/post.component';
import {PostResolver}                            from './features/blog-feature/resolvers/post-resolver/post.resolver';
import {DashboardModule}                         from './features/dashboard-feature/dashboard.module';
import {LoginModule}                             from './features/login-feature/login.module';
import {RegistrationModule}                      from './features/registration-feature/registration.module';
import {AuthGuard}                               from './guards/auth-guard/auth.guard';
import {SignedInGuard}                           from './guards/signed-in-guard/signed-in.guard';
import {NotFoundComponent}                       from './not-found/not-found.component';
import {OrderedPostsComponent}                   from './shared/components/ordered-posts/ordered-posts.component';

const routes: Routes = [
  {
    path: 'dashboard', canActivate: [AuthGuard], loadChildren: () => DashboardModule
  },
  {
    path: 'blog', pathMatch: 'full', redirectTo: `/en/blog/1`
  },
  {
    path: ':locale/blog', loadChildren: () => BlogModule
  },  {
    path: ':locale/ordered-posts', component: OrderedPostsComponent, children: [
      {
        resolve: {
          post: PostResolver
        },
        path: ':post-id',
        component: PostComponent
      },
    ]
  },
  {
    path: '', canActivate: [SignedInGuard], component: AuthComponent, children: [
      {
        path: '', redirectTo: 'login', pathMatch: 'full'
      },
      {
        path: 'login', canActivate: [SignedInGuard], loadChildren: () => LoginModule
      },
      {
        path: 'registration', canActivate: [SignedInGuard], loadChildren: () => RegistrationModule
      },
    ]
  },
  { path: '**', pathMatch: 'full', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    relativeLinkResolution: 'legacy',
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
