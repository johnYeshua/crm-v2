import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogInView } from './logInView';

describe('LogInComponent', () => {
  let component: LogInView;
  let fixture: ComponentFixture<LogInView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogInView ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogInView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
