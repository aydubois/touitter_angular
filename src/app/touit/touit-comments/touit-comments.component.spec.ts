import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TouitCommentsComponent } from './touit-comments.component';

describe('TouitCommentsComponent', () => {
  let component: TouitCommentsComponent;
  let fixture: ComponentFixture<TouitCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TouitCommentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TouitCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
