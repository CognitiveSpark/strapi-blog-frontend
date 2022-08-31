import {HttpClient}                       from '@angular/common/http';
import { Injectable }                     from '@angular/core';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {environment}                      from '../../../environments/environment';
import {StrapiLocale}                     from '../../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class LocaleService {
  public defaultLocale$: BehaviorSubject<StrapiLocale | null> = new BehaviorSubject<StrapiLocale | null>(null);

  constructor(private http: HttpClient,) { }

  public getLocales(): Observable<StrapiLocale[]> {
    return this.http.get<StrapiLocale[]>(`${environment.strapi}/api/i18n/locales`)
      .pipe(
        tap((locales: StrapiLocale[]) => {
          this.defaultLocale$.next(this.getDefaultLocale(locales));
        })
      )
  }

  public getDefaultLocale(locales: StrapiLocale[]): StrapiLocale {
    return locales.find((locale: StrapiLocale) => locale.isDefault)!;
  }
}
