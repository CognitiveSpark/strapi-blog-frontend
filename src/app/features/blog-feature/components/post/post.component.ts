import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute}               from '@angular/router';
import {pluck, Subscription, tap}     from 'rxjs';
import {StrapiPost}                   from '../../../../../interfaces';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {
  public post!: StrapiPost;

  private readonly subscriptions: Subscription = new Subscription();

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscriptions.add(this.getPostData());
  }

  public ngOnDestroy(): void {

  }

  private getPostData(): Subscription {
    return this.activatedRoute.data
      .pipe(
        pluck('post', 'data'),
        tap((post: StrapiPost) => {
          this.post = post;
        })
      )
      .subscribe(console.log)
  }
}
