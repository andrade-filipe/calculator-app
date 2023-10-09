import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExceptionComponent } from './exception.component';

describe('ExceptionComponent', () => {
  let component: ExceptionComponent;
  let fixture: ComponentFixture<ExceptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExceptionComponent]
    });
    fixture = TestBed.createComponent(ExceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
