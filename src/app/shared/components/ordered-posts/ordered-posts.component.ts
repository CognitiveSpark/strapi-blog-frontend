import {Component, OnDestroy, OnInit}  from '@angular/core';
import {map, pluck, Subscription}      from 'rxjs';
import {StrapiOrderedPost, StrapiPost} from '../../../../interfaces';
import {PostsService}                  from '../../../services/posts-service/posts.service';

@Component({
  selector: 'app-ordered-posts',
  templateUrl: './ordered-posts.component.html',
  styleUrls: ['./ordered-posts.component.css']
})
export class OrderedPostsComponent implements OnInit, OnDestroy {
  public posts: StrapiPost[] = [];

  private subscriptions: Subscription = new Subscription();

  constructor(
    private postsService: PostsService
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(this.getOrderedPosts());
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private getOrderedPosts(): Subscription {
    return this.postsService.getOrderedPosts()
      .pipe(
        pluck('data', 'attributes', 'Orderer'),
        map((posts: StrapiOrderedPost[]) => {
          return posts.map((post: StrapiOrderedPost) => post.post.data);
        })
      )
      .subscribe((posts: any) => {
        console.log(posts);
        this.posts = posts;
      });
  }
}
