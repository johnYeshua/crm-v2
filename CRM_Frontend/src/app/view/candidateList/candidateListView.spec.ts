import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateListView } from './candidateListView';

describe('CandidateListComponent', () => {
  let component: CandidateListView;
  let fixture: ComponentFixture<CandidateListView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateListView ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidateListView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
