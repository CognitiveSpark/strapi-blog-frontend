import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgModule, Provider}                  from '@angular/core';
import { BrowserModule }                     from '@angular/platform-browser';
import {AppRoutingModule}                    from './app-routing.module';
import { AppComponent }                      from './app.component';
import {AuthModule}                          from './features/auth-feature/auth.module';
import {BlogModule}       from './features/blog-feature/blog.module';
import {ErrorInterceptor} from './interceptors/error-interceptor/error.interceptor';
import { NotFoundComponent }                 from './not-found/not-found.component';

const ERROR_INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: ErrorInterceptor,
};

@NgModule({
	declarations: [
		AppComponent,
		NotFoundComponent,
	],
	imports: [
		AppRoutingModule,
		BlogModule,
		BrowserModule,
		HttpClientModule,
		AuthModule
	],
	providers: [ERROR_INTERCEPTOR_PROVIDER],
	bootstrap: [AppComponent]
})
export class AppModule { }
