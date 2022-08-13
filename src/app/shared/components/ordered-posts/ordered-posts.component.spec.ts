import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderedPostsComponent } from './ordered-posts.component';

describe('OrderedPostsComponent', () => {
  let component: OrderedPostsComponent;
  let fixture: ComponentFixture<OrderedPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderedPostsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderedPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
