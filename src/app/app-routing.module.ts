import { NgModule }                              from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {StrapiLocale}                            from '../interfaces';
import {AuthComponent}                           from './features/auth-feature/auth/auth.component';
import {BlogModule}                              from './features/blog-feature/blog.module';
import {DashboardModule}                         from './features/dashboard-feature/dashboard.module';
import {LoginModule}                             from './features/login-feature/login.module';
import {RegistrationModule}                      from './features/registration-feature/registration.module';
import {AuthGuard}                               from './guards/auth-guard/auth.guard';
import {SignedInGuard}                           from './guards/signed-in-guard/signed-in.guard';
import {NotFoundComponent}                       from './not-found/not-found.component';

const routes: Routes = [
  {
    path: 'dashboard', canActivate: [AuthGuard], loadChildren: () => DashboardModule
  },
  {
    path: 'blog', pathMatch: 'full', redirectTo: `/en/blog/1`
  },
  {
    path: ':locale/blog', loadChildren: () => BlogModule
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
