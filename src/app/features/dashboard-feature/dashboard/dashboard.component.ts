import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormControl, FormGroup}             from '@angular/forms';
import {Route, Router}                                         from '@angular/router';
import {Subscription, tap}                                     from 'rxjs';
import {StrapiLocale, StrapiPostResponse, StrapiPostsResponse} from '../../../../interfaces';
import {LocaleService}                                         from '../../../services/locale-service/locale.service';
import {PostsService}                                          from '../../../services/posts-service/posts.service';

interface PostForm {
  Title: FormControl,
  Content: FormControl,
  Locale: FormControl,
  Thumbnail: FormControl
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild('thumbnail')
  private thumbnailField!: ElementRef;
  private subscription: Subscription = new Subscription();


  public locales: StrapiLocale[] = [];
  public postForm: FormGroup<PostForm> = new FormGroup<PostForm>({
    'Title': new FormControl<string>(''),
    'Content': new FormControl<string>(''),
    'Locale': new FormControl<string>(''),
    'Thumbnail': new FormControl<File | null>(null),
  });

  constructor(
    private postsService: PostsService,
    private localeService: LocaleService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subscription.add(this.getLocales());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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

  public handleFileInput(file: any): void {
    console.log(file);
    const files: FileList = file.files;

    this.postForm.get('Thumbnail')?.setValue(files.item(0));
  }

  public onCreate(): void {
    const {Title, Content, Locale, Thumbnail} = this.postForm.value;
    const formData: FormData = new FormData();
    const imageId: string = Title.toLowerCase().replaceAll(' ', '-');

    if(Thumbnail) {
      formData.append(`files.Thumbnail`, Thumbnail, Thumbnail.name);
      formData.append(`ref`, 'api::post.post');
      formData.append(`refId`, imageId);
      formData.append(`field`, 'Thumbnail');
    }

    const stringifyData: string = JSON.stringify({
      Title,
      Content,
      locale: Locale
    })
    formData.append('data', stringifyData);

    this.postsService.createPost(formData)
      .subscribe((data: StrapiPostResponse) => {
        console.log('✅ Post successfully created! Post: ', data);

        this.postForm.reset();
        this.thumbnailField.nativeElement.value = null;
      })
  }

  public onLogOut(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
