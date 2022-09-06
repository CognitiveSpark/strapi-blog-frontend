import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup}                        from '@angular/forms';
import {ActivatedRoute, Params}                              from '@angular/router';
import {of, Subscription, switchMap, tap}                                              from 'rxjs';
import {
  StrapiLocale,
  StrapiPost,
  StrapiPostAttributes,
  StrapiPostResponse,
  StrapiPostsResponse,
  StrapiUser
} from '../../../../interfaces';
import {LocaleService}                                                                 from '../../../services/locale-service/locale.service';
import {PostsService}                                        from '../../../services/posts-service/posts.service';
import {UserService}                                         from '../../../services/user-service/user.service';


interface PostForm {
  Title: FormControl,
  Content: FormControl,
  Locale: FormControl,
  Thumbnail: FormControl,
  Order?: FormControl
}

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit, OnDestroy {
  @ViewChild('thumbnail')
  private thumbnailField!: ElementRef;
  private subscription: Subscription = new Subscription();
  private order!: number;

  public busyOrders: number[] = [];
  public locales: StrapiLocale[] = [];
  public editMode: boolean = false;
  public postForm: FormGroup<PostForm> = new FormGroup<PostForm>({
    'Title': new FormControl<string>(''),
    'Content': new FormControl<string>(''),
    'Locale': new FormControl<string>(''),
    'Thumbnail': new FormControl<File | null>(null),
  });

  constructor(
    private postsService: PostsService,
    private localeService: LocaleService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.subscription.add(this.getLocales());
    this.subscription.add(this.getPostsOrders());
    this.subscription.add(this.ifEditMode());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public ifEditMode(): Subscription {
    return this.activatedRoute.params
      .pipe(
        switchMap((params: Params) => {
          const postId: number = params['post-id'];

          if(postId) {
            // ✏️ Activate edit mode
            this.editMode = true;

            return this.postsService.getPostById(postId);
          } else {
            return of(params);
          }
        }),
        tap((res: Params | StrapiPostResponse) => {
          if(res.data) {
            this.setFormData(res.data);
          }
        })
      )
      .subscribe(console.log);
  }

  private setFormData(res: StrapiPost) {
    this.postForm.addControl('Order', new FormControl())

    for (const fieldKey in res.attributes) {
      if(this.postForm.value.hasOwnProperty(fieldKey) && fieldKey !== 'Thumbnail') {
        this.postForm.get(fieldKey)?.setValue(res.attributes[fieldKey as keyof StrapiPostAttributes]);
      }
    }

    console.log(this.postForm.value);
  }

  public handleFileInput(file: any): void {
    console.log(file);
    const files: FileList = file.files;

    this.postForm.get('Thumbnail')?.setValue(files.item(0));
  }

  private getPostsOrders(): Subscription {
    return this.postsService.getPostsOrder()
      .pipe(
        tap((orders: number[]) => {
          this.busyOrders = orders;
        })
      )
      .subscribe();
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

  public onCreate(): void {
    this.userService
      .getCurrentUser()
      .pipe(
        switchMap((author: StrapiUser) => {
          const {Title, Content, Locale, Thumbnail} = this.postForm.value;
          const formData: FormData = new FormData();
          const imageId: string = Title.toLowerCase().replaceAll(' ', '-');
          this.order = this.busyOrders.length > 0 ? Math.max(...this.busyOrders) + 1 : 1;

          this.busyOrders.push(this.order);

          if(Thumbnail) {
            formData.append(`files.Thumbnail`, Thumbnail, Thumbnail.name);
            formData.append(`ref`, 'api::post.post');
            formData.append(`refId`, imageId);
            formData.append(`field`, 'Thumbnail');
          }

          const stringifyData: string = JSON.stringify({
            Title,
            Content,
            locale: Locale,
            author,
            Order: this.order
          })
          formData.append('data', stringifyData);

          return this.postsService.createPost(formData)
        })
      )
      .subscribe((data: StrapiPostResponse) => {
        console.log('✅ Post successfully created! Post: ', data);

        this.postForm.reset();
        this.thumbnailField.nativeElement.value = null;
      })
  }

  public onUpdate(): void {
    // this.postsService.updatePost()
    //   .subscribe(console.log);
  }
}
