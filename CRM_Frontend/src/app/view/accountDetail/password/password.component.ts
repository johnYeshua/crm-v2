import {Component, Input} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BsModalService} from "ngx-bootstrap/modal";
import {AccountService} from "../../../service/account.service";
import {RedirectController} from "../../../tools/redirect-controller";
import {RoleCheck} from "../../../tools/role-check";
import {FormControl, FormGroup} from "@angular/forms";
import {InputCheck} from "../../../tools/input-check";

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent
{
  @Input() currentUser:any;
  @Input() isMyAccount:boolean

  inputCheck:InputCheck = new InputCheck();

  constructor(private accountService:AccountService, private redirectController:RedirectController)
  { }
  resetPassword():void
  {
    (document.getElementById('errorMessage') as HTMLInputElement).innerHTML = '';
    let check:string = "yes";
    // check original password.
    if(this.isMyAccount == true)
    {
      let originalPassword = (document.getElementById("originalPassword") as HTMLInputElement).value
      // @ts-ignore
      let myAccount = JSON.parse( window.sessionStorage.getItem('SNVA_CRM_USER') );
      if(originalPassword == myAccount.password)
      {
        check = 'yes';
      }
      else
      {
        check = "Wrong Original Password"
      }
    }
    console.log("check original:" + check)

    // check password format.
    let newPassword     = (document.getElementById("newPassword"    ) as HTMLInputElement).value
    if(check == 'yes')
    {
      check = this.inputCheck.isPassword(newPassword);
      console.log("check password:" + check);
    }

    // check confirm password
    if(check == 'yes')
    {
      let confirmPassword = (document.getElementById("confirmPassword") as HTMLInputElement).value
      if(confirmPassword != newPassword)
      {
        check = "confirm password does not match"
      }
    }

    console.log("check confirm:" + check);
    if(check == 'yes')
    {
      this.currentUser.password = newPassword;
      this.accountService.resetPassword(this.currentUser).subscribe(
          data =>
          {
            if(this.isMyAccount == true)
            {
              window.sessionStorage.setItem("SNVA_CRM_USER", JSON.stringify(this.currentUser));
            }
            this.redirectController.redirect("Reset Password Successful", '', '', 'auto');
            this.saveStatus();
          },
          error =>
          {
            this.redirectController.redirect("Reset Password Failed", error.message, '', 'auto');
            this.saveStatus();
          });
    }
    else
    {
      (document.getElementById('errorMessage') as HTMLInputElement).innerHTML =
          '<div class="card cardBackGround border-danger text-danger">' + check + '</div>'
    }
  }

  saveStatus()
  {
    localStorage.setItem('SNVA_CRM_AccountDetail', 'resetPassword');
  }

}
