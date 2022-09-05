import {HttpClient}                                                               from '@angular/common/http';
import { Injectable }                                                             from '@angular/core';
import {Form}                                                                     from '@angular/forms';
import {Params}                                                                   from '@angular/router';
import {BehaviorSubject, Observable, tap}                                         from 'rxjs';
import {environment}                                                              from '../../../environments/environment';
import {StrapiPostsResponse, StrapiPostCreated, StrapiPostResponse, StrapiLocale} from '../../../interfaces';
import {AuthService}                                                              from '../auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private readonly postHeaders: {[name: string]: string} = {
    'Authorization': `bearer ${this.authService.token}`
  }

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  public createPost(post: FormData): Observable<StrapiPostResponse> {
    return this.http.post<StrapiPostResponse>(`${environment.strapi}/api/posts?populate=*`, post, {
      headers: this.postHeaders
    })
  }

  public getPostById(postId: number): Observable<any> {
    return this.http.get(`${environment.strapi}/api/posts/${postId}?populate=*`)
  }

  public getPosts(page: number = 1, pageSize: number = 5, locale: string = 'en'): Observable<StrapiPostsResponse> {
    return this.http.get<StrapiPostsResponse>(
      `${environment.strapi}/api/posts?pagination[page]=${page}&pagination[pageSize]=${pageSize}&locale=${locale}&populate=*`)
  }
}
