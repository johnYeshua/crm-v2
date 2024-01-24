import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewUser } from './addNewUser';

describe('AddNewUserComponent', () => {
  let component: AddNewUser;
  let fixture: ComponentFixture<AddNewUser>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewUser]
    });
    fixture = TestBed.createComponent(AddNewUser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
