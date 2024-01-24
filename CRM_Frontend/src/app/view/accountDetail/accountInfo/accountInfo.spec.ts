import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountInfo } from './accountInfo';

describe('AccountInfoComponent', () => {
  let component: AccountInfo;
  let fixture: ComponentFixture<AccountInfo>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountInfo]
    });
    fixture = TestBed.createComponent(AccountInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
