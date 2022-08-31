import { Injectable }     from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
}                         from '@angular/router';
import { Observable, of } from 'rxjs';
import {PostsService}     from '../../../../services/posts-service/posts.service';

@Injectable({
  providedIn: 'root'
})
export class PostResolver implements Resolve<boolean> {
  constructor(
    private postsService: PostsService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const postId: number = +route.paramMap.get('post-id')!;

    return this.postsService.getPostById(postId);
  }
}
