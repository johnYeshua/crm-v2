import {Component, Input} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BsModalService} from "ngx-bootstrap/modal";
import {AccountService} from "../../../service/account.service";
import {RedirectController} from "../../../tools/redirect-controller";
import {RoleCheck} from "../../../tools/role-check";
import {FormControl, FormGroup} from "@angular/forms";
import {InputCheck} from "../../../tools/input-check";

@Component({
  selector: 'app-phone-number',
  templateUrl: './phoneNumber.html',
  styleUrls: ['./phoneNumber.css']
})
export class PhoneNumber
{
  @Input() currentUser:any;
  @Input() isMyAccount:boolean

  inputCheck:InputCheck = new InputCheck();

  constructor(private accountService:AccountService, private redirectController:RedirectController)
  {
  }

  updatePhone():void
  {
    (document.getElementById('errorMessage') as HTMLInputElement).innerHTML = '';
    let newPhone = (document.getElementById('newPhone') as HTMLInputElement).value;
    let check = this.inputCheck.isPhoneNumber(newPhone);
    if(check == 'yes')
    {
      this.currentUser.phone = newPhone;
      this.accountService.updateUser(this.currentUser).subscribe(
          data =>
          {
            if(this.isMyAccount = true)
            {
              window.sessionStorage.setItem("SNVA_CRM_USER", JSON.stringify(this.currentUser));
            }
            this.redirectController.redirect("Update Phone Number Successful", '', '', 'auto');
            this.saveStatus();
          },
          error =>
          {
            this.redirectController.redirect("Update Phone Number Failed", error.message, '', 'auto');
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
    localStorage.setItem('SNVA_CRM_AccountDetail', 'phoneNumber');
  }
}
