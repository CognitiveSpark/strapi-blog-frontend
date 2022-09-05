import {HttpClient}   from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable}   from 'rxjs';
import {environment}  from '../../../environments/environment';
import {AuthService}  from '../auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly headers: {[name: string]: string} = {
    'Authorization': `bearer ${this.authService.token}`
  }

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  public getCurrentUser(): Observable<any> {
    return this.http.get(`${environment.strapi}/api/users/me`, {
      headers: this.headers
    })
  }
}
