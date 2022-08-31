import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      map((res) => {
        return res;
      }),
      catchError((error: HttpErrorResponse) => {
        let errorMsg: string = '';

        if (error.error instanceof ErrorEvent) {
          console.log('This is client side error');
          errorMsg = `Error: ${error.error.message}`;
        } else {
          console.log('This is server side error');
          errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;

          console.log('🐞 Full error: ', error.error.error);

          this.errorsHandler(error.error.error);
        }

        return throwError(() => errorMsg);
      })
    );
  }

  private errorsHandler(error: any): void {
    switch (error.status) {
      case 400:
        console.error(`❗️ Error 400: ${error.message}`);
        break;

      case 401:
        console.error(`❗️ Error 401: ${error.message}`);

        localStorage.clear();
        this.router.navigate(['/login'], {
          queryParams: {
            loginAgain: true,
          },
        });
        break;

      case 403:
        console.error(`❗️ Error 403: ${error.message}`);
        break;
    }
  }
}
