import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuBar } from './menuBar';

describe('MenuBarComponent', () => {
  let component: MenuBar;
  let fixture: ComponentFixture<MenuBar>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuBar]
    });
    fixture = TestBed.createComponent(MenuBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
