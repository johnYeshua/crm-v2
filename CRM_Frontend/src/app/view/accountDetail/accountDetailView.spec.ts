import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDetailView } from './accountDetailView';

describe('AccountDetailViewComponent', () => {
  let component: AccountDetailView;
  let fixture: ComponentFixture<AccountDetailView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountDetailView ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountDetailView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
