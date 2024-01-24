import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneNumber } from './phoneNumber';

describe('PhoneNumberComponent', () => {
  let component: PhoneNumber;
  let fixture: ComponentFixture<PhoneNumber>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhoneNumber]
    });
    fixture = TestBed.createComponent(PhoneNumber);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
