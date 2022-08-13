import {HttpClient}                                                    from '@angular/common/http';
import {Component, OnDestroy, OnInit}                                  from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {distinctUntilChanged, of, pluck, Subscription, switchMap, tap} from 'rxjs';
import {environment}                                                                  from '../../../../environments/environment';
import {StrapiLocale, StrapiPost, StrapiPostsResponse, StrapiUser} from '../../../../interfaces';
import {
  AuthService
}                                                                                     from '../../../services/auth-service/auth.service';
import {
  LocaleService
} from '../../../services/locale-service/locale.service';
import {PostsService} from '../../../services/posts-service/posts.service';
import {
  UserService
} from '../../../services/user-service/user.service';

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
  public isAuth: boolean = false;
  public authUser!: StrapiUser | null;

  private pageCount!: number;
  private readonly subscriptions: Subscription = new Subscription();
  private paginationPage!: number;
  private currentLocale: string = '';

  constructor(
    private postsService: PostsService,
    private localeService: LocaleService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(this.paginationPageWatcher());
    this.subscriptions.add(this.getLocales());
    this.subscriptions.add(this.checkIsAuth());

    this.postsService.getOrderedPosts()
      .subscribe((res: any) => {
        // res.map((item) => {
        //
        // })
      })
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();

    this.authUser = null;
  }

  private checkIsAuth(): Subscription {
    this.isAuth = this.authService.isAuthenticated()

    return this.userService.getCurrentUser()
      .subscribe((user: StrapiUser) => {
        this.authUser = user;
      })
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
          this.getPosts(this.paginationPage, locale);
        })
      )
      .subscribe()
  }

  private getPosts(page?: number, locale?: string): Subscription {
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

    this.getPosts(+page);
  }

  public changeLocale(code: string): void {
    this.router.navigate([code, 'blog', this.paginationPage]);

    this.getPosts(5, code);
  }
}
