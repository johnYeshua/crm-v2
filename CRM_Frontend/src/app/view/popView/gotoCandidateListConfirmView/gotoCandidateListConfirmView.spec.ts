import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GotoCandidateListConfirmView } from './gotoCandidateListConfirmView';

describe('AddCandidateResultViewComponent', () => {
  let component: GotoCandidateListConfirmView;
  let fixture: ComponentFixture<GotoCandidateListConfirmView>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GotoCandidateListConfirmView]
    });
    fixture = TestBed.createComponent(GotoCandidateListConfirmView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
