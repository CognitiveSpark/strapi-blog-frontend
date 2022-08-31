import {HttpClient}                     from '@angular/common/http';
import { Injectable }                   from '@angular/core';
import {Router}                         from '@angular/router';
import {Observable}                     from 'rxjs';
import {environment}                    from '../../../environments/environment';
import {SignIn, SignUp, StrapiResponse} from '../../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  get token(): string | null {
    return <string>localStorage.getItem('x-access-token');
  }

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  public logOut(): void {
    localStorage.clear();
    this.router.navigate(['/'])
  }

  public signUp(signUpData: SignUp): Observable<StrapiResponse> {
    return this.http.post<StrapiResponse>(`${environment.strapi}/api/auth/local/register`, signUpData);
  }

  public signIn(signInData: SignIn): Observable<StrapiResponse> {
    return this.http.post<StrapiResponse>(`${environment.strapi}/api/auth/local`, signInData);
  }

  public logout(): void {
    localStorage.clear();
  }

  public isAuthenticated(): boolean {
    return !!this.token;
  }

  public setToken(response: StrapiResponse): void {
    const accessToken = response.jwt!;

    localStorage.setItem('x-access-token', accessToken.toString());
  }
}
