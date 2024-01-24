import {Component, Input} from '@angular/core';
import {DeleteUserConfirmView} from "../../popView/deleteUserConfirmView/deleteUserConfirmView";

@Component({
  selector: 'app-account-info-read-only',
  templateUrl: './accountInfoReadOnly.html',
  styleUrls: ['./accountInfoReadOnly.css']
})
export class AccountInfoReadOnly
{
  @Input() currentUser:any;
}
