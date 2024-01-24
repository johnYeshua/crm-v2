import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateDetailView } from './candidateDetailView';

describe('CandidateDetailViewComponent', () => {
  let component: CandidateDetailView;
  let fixture: ComponentFixture<CandidateDetailView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateDetailView ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidateDetailView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
