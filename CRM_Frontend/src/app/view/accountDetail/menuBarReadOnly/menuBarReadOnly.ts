import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-menu-bar-read-only',
  templateUrl: './menuBarReadOnly.html',
  styleUrls: ['./menuBarReadOnly.css']
})
export class MenuBarReadOnly
{
  @Input() firstName:any;
  @Input() lastName:any;
}
