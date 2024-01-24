import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuBarReadOnly } from './menuBarReadOnly';

describe('MenuBarReadOnlyComponent', () => {
  let component: MenuBarReadOnly;
  let fixture: ComponentFixture<MenuBarReadOnly>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuBarReadOnly]
    });
    fixture = TestBed.createComponent(MenuBarReadOnly);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
