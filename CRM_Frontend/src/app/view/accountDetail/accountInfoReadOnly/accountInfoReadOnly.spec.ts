import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountInfoReadOnly } from './accountInfoReadOnly';

describe('AccountInfoReadOnlyComponent', () => {
  let component: AccountInfoReadOnly;
  let fixture: ComponentFixture<AccountInfoReadOnly>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountInfoReadOnly]
    });
    fixture = TestBed.createComponent(AccountInfoReadOnly);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
