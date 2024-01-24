import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponeMessage } from './responeMessage';

describe('ConfirmViewComponent', () => {
  let component: ResponeMessage;
  let fixture: ComponentFixture<ResponeMessage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponeMessage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponeMessage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
