import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageView } from './homePageView';

describe('HomePageComponent', () => {
  let component: HomePageView;
  let fixture: ComponentFixture<HomePageView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePageView ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePageView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
