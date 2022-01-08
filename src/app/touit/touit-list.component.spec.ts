import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TouitListComponent } from './touit-list.component';

describe('TouitListComponent', () => {
  let component: TouitListComponent;
  let fixture: ComponentFixture<TouitListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TouitListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TouitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
