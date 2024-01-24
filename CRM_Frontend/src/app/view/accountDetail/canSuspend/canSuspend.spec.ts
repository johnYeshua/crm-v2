import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanSuspend } from './canSuspend';

describe('CanSuspendComponent', () => {
  let component: CanSuspend;
  let fixture: ComponentFixture<CanSuspend>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CanSuspend]
    });
    fixture = TestBed.createComponent(CanSuspend);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
