import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUserConfirmView } from './deleteUserConfirmView';

describe('MessageViewComponent', () => {
  let component: DeleteUserConfirmView;
  let fixture: ComponentFixture<DeleteUserConfirmView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteUserConfirmView ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteUserConfirmView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
