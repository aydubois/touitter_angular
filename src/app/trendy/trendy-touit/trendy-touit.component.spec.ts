import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendyTouitComponent } from './trendy-touit.component';

describe('TrendyTouitComponent', () => {
  let component: TrendyTouitComponent;
  let fixture: ComponentFixture<TrendyTouitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrendyTouitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendyTouitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
