import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountListView } from './accountListView';

describe('AccountListComponent', () => {
  let component: AccountListView;
  let fixture: ComponentFixture<AccountListView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountListView ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountListView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
