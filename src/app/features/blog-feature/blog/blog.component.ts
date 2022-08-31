import {Component, OnDestroy, OnInit}                                  from '@angular/core';
import {ActivatedRoute, Params, Router}                                from '@angular/router';
import {distinctUntilChanged, of, pluck, Subscription, switchMap, tap} from 'rxjs';
import {StrapiLocale, StrapiPost, StrapiPostsResponse}                 from '../../../../interfaces';
import {
  LocaleService
}                                                                      from '../../../services/locale-service/locale.service';
import {PostsService}                                                  from '../../../services/posts-service/posts.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit, OnDestroy {
  public posts: StrapiPost[] = [];
  public locales: StrapiLocale[] = [];
  public disableNextButton: boolean = false;
  public disablePrevButton: boolean = false;

  private pageCount!: number;
  private readonly subscriptions: Subscription = new Subscription();
  private paginationPage!: number;
  private currentLocale: string = '';

  constructor(
    private postsService: PostsService,
    private localeService: LocaleService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(this.paginationPageWatcher());
    this.subscriptions.add(this.getLocales());
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private getLocales(): Subscription {
    return this.localeService.getLocales()
      .pipe(
        tap((locales: StrapiLocale[]) => {
          this.locales = locales;
        }),
      )
      .subscribe()
  }

  private paginationPageWatcher(): Subscription {
    return this.activatedRoute.params
      .pipe(
        tap(({page, locale}) => {
          this.paginationPage = page;
          this.currentLocale = locale;
          this.getAllPosts(this.paginationPage, locale);
        })
      )
      .subscribe()
  }

  private getAllPosts(page?: number, locale?: string): Subscription {
    return this.postsService.getPosts(page, undefined, locale)
      .pipe(
        tap(({ data, meta }: StrapiPostsResponse) => {
          const pageNum: number | undefined = meta.pagination?.page;
          this.posts = data;
          this.pageCount = meta.pagination?.pageCount || 0;

          pageNum === 1 ?
            this.disablePrevButton = true :
            this.disablePrevButton = false;

          pageNum === meta.pagination?.pageCount ?
            this.disableNextButton = true :
            this.disableNextButton = false;
        })
      )
      .subscribe(console.log);
  }

  public navigate(next: boolean): void {
    let currentPageId: number = this.paginationPage;
    let page: string;

    if(next) {
      page = `${++currentPageId}`;
    } else {
      page = `${--currentPageId}`;
    }

    if(currentPageId <= 0) {
      page = '1';
    }

    this.router.navigate([this.currentLocale, 'blog', page]);

    this.getAllPosts(+page);
  }

  public changeLocale(code: string): void {
    this.router.navigate([code, 'blog', this.paginationPage]);

    this.getAllPosts(5, code);
  }
}
