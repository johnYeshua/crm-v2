import { Component } from '@angular/core';

@Component({
  selector: 'app-confirm-view',
  templateUrl: './responeMessage.html',
  styleUrls: ['./responeMessage.css']
})
export class ResponeMessage
{
  message:string = 'reply message';
  error:string = '';
}
