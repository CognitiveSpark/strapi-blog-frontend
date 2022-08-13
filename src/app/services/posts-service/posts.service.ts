import {HttpClient}                                                               from '@angular/common/http';
import { Injectable }                                                             from '@angular/core';
import {Form}                                                                     from '@angular/forms';
import {Params}                                       from '@angular/router';
import {BehaviorSubject, map, Observable, pluck, tap} from 'rxjs';
import {environment}                                  from '../../../environments/environment';
import {
  StrapiPostsResponse,
  StrapiPostCreated,
  StrapiPostResponse,
  StrapiLocale,
  StrapiPost, StrapiOrderedPostsResponse
} from '../../../interfaces';
import {AuthService} from '../auth-service/auth.service';

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

  public getOrderedPosts(): Observable<StrapiOrderedPostsResponse> {
    return this.http.get<StrapiOrderedPostsResponse>(`${environment.strapi}/api/order-single?populate[Orderer][populate][0]=post.author&populate[Orderer][populate][1]=post.Thumbnail`)
      // .pipe(
      //   pluck('data', 'attributes', 'Orderer'),
      // )
  }

  public createPost(post: FormData): Observable<StrapiPostResponse> {
    return this.http.post<StrapiPostResponse>(`${environment.strapi}/api/posts?populate=*`, post, {
      headers: this.postHeaders
    })
  }

  public updatePost(postId: number, post: FormData): Observable<StrapiPostResponse> {
    return this.http.put<StrapiPostResponse>(`${environment.strapi}/api/posts/${postId}`, post, {
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
