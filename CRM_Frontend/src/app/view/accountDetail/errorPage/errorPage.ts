import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-error-page',
  templateUrl: './errorPage.html',
  styleUrls: ['./errorPage.css']
})
export class ErrorPage
{
  @Input() erroeMessage:any;
}
