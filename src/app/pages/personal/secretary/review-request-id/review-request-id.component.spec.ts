import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewRequestIdComponent } from './review-request-id.component';

describe('ReviewRequestIdComponent', () => {
  let component: ReviewRequestIdComponent;
  let fixture: ComponentFixture<ReviewRequestIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewRequestIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewRequestIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
