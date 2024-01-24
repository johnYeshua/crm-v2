import {Component, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {AccountService} from "../../../service/account.service";
import {RedirectController} from "../../../tools/redirect-controller";
import {User} from "../../../model/user";
import {InputCheck} from "../../../tools/input-check";
import {RoleCheck} from "../../../tools/role-check";

@Component({
  selector: 'app-add-new-user',
  templateUrl: './addNewUser.html',
  styleUrls: ['./addNewUser.css']
})
export class AddNewUser implements OnInit
{
  inputCheck:InputCheck = new InputCheck();
  roleList:string[] = new Array();

  constructor(public bsModalRef: BsModalRef, private accountService:AccountService, private redirectController:RedirectController, private roleCheck:RoleCheck)
  { }

  ngOnInit(): void
  {
    // @ts-ignore
    let myAccount = JSON.parse( window.sessionStorage.getItem('SNVA_CRM_USER') );
    this.roleList = this.roleCheck.getAddAccountType(myAccount.role);
  }

  submit()
  {
    (document.getElementById('errorMessage') as HTMLInputElement).innerHTML = '';
    let username  = (document.getElementById("username" ) as HTMLInputElement ).value;
    let firstname = (document.getElementById("firstName") as HTMLInputElement ).value;
    let lastname  = (document.getElementById("lastName" ) as HTMLInputElement ).value;
    let phone     = (document.getElementById("phone"    ) as HTMLInputElement ).value;
    let role      = (document.getElementById("role"     ) as HTMLSelectElement).value;

    let check:string;
    check = this.inputCheck.isUsername(username);
    if(check != 'yes')
    {
      (document.getElementById('errorMessage') as HTMLInputElement).innerHTML =
        '<div class="card cardBackGround border-danger text-danger">' + check + '</div>'
    }
    check = this.inputCheck.isfullName(firstname,lastname);
    if(check != 'yes')
    {
      (document.getElementById('errorMessage') as HTMLInputElement).innerHTML =
        '<div class="card cardBackGround border-danger text-danger">' + check + '</div>'
    }
    check = this.inputCheck.isPhoneNumber(phone);
    if(check != 'yes')
    {
      (document.getElementById('errorMessage') as HTMLInputElement).innerHTML =
        '<div class="card cardBackGround border-danger text-danger">' + check + '</div>'
    }

    if(role == '')
    {
      check = "no";
      (document.getElementById('errorMessage') as HTMLInputElement).innerHTML =
        '<div class="card cardBackGround border-danger text-danger"> Please Choose A Role</div>'
    }

    if(check == 'yes')
    {
      let user:User = new User();
      user.username = username;
      user.firstName = firstname;
      user.lastName = lastname;
      user.password = username;
      user.phone = phone;
      user.role = this.roleCheck.getBackendRoleName(role);

      this.accountService.addNewUser(user).subscribe(
        data =>
        {
          console.log(data)
          this.redirectController.redirect("Add New Account Successful", '', '', 'auto');
        },
        error =>
        {
          console.log(error)
          this.redirectController.redirect("Add New Account Failed", error.message, '', 'auto');
        });
      console.log(user);
    }
  }
}
