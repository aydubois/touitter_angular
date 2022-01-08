import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TouitComponent } from './touit.component';

describe('TouitComponent', () => {
  let component: TouitComponent;
  let fixture: ComponentFixture<TouitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TouitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TouitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
