import {Component, OnInit} from '@angular/core';
import {User} from "../../../model/user";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {AccountService} from "../../../service/account.service";
import {RedirectController} from "../../../tools/redirect-controller";

@Component({
  selector: 'app-message-view',
  templateUrl: './deleteUserConfirmView.html',
  styleUrls: ['./deleteUserConfirmView.css']
})
export class DeleteUserConfirmView
{
  message:string = "";
  user:User = new User();
  constructor(public bsModalRef: BsModalRef, private accountService:AccountService, private redirectController:RedirectController)
  {}

  deleteConfirm()
  {
    document.getElementById("yesButton");
    this.bsModalRef.hide();
    if(this.message == 'Suspend')
    {
      this.user.accountNonLocked = false;
    }

    if(this.message == 'Active')
    {
      this.user.accountNonLocked = true;
    }
    console.log(this.user);
    this.accountService.suspendUser(this.user).subscribe(
      data =>
      {
        console.log(data)
        this.redirectController.redirect(this.message + " Account Successful", '', '', 'auto');
      },
      error =>
      {
        console.log(error.message)
        this.redirectController.redirect(this.message + " Account Failed", error.message, '', 'auto');
      });
  }
}
