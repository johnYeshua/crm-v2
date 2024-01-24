import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorPage } from './errorPage';

describe('ErrorPageComponent', () => {
  let component: ErrorPage;
  let fixture: ComponentFixture<ErrorPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorPage]
    });
    fixture = TestBed.createComponent(ErrorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
