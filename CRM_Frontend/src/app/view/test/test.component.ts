import {Component, OnInit} from '@angular/core';
import {RedirectController} from "../../tools/redirect-controller";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit
{
  constructor(private redirectController:RedirectController)
  {
  }

  ngOnInit(): void
  { }

  test()
  {
    let data = "<div class='col-6'>FirstName -> Yicheng to yicheng</div>"
    this.redirectController.redirect('Candidate updated successfully!', data, 'admin/manage/candidate', 'gotoCandidateList');
  }
}
