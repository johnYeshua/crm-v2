import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menuBar.html',
  styleUrls: ['./menuBar.css']
})
export class MenuBar
{
  @Input() firstName:any;
  @Input() lastName:any;
  @Output() currentStatus = new EventEmitter<string>();

  changeStatus( status:string )
  {
    this.currentStatus.emit(status);
  }

}
