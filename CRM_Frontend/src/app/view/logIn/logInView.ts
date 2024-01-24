import { Component } from '@angular/core';
import {User} from "../../model/user";
import {AuthenticationService} from "../../service/authentication.service";
import {RedirectController} from "../../tools/redirect-controller";
import {InputCheck} from "../../tools/input-check";
import {RoleCheck} from "../../tools/role-check";

@Component({
  selector: 'app-log-in',
  templateUrl: './logInView.html',
  styleUrls: ['./logInView.css']
})
export class LogInView
{
  user:User = new User();
  inputCheck = new InputCheck();
  constructor(private app: AuthenticationService, private redirectController:RedirectController, private roleCheck:RoleCheck) {}
  logIn()
  {
    let usernameCheck = this.inputCheck.isUsername(this.user.username);
    let passwordCheck = this.inputCheck.isPassword(this.user.password);
    if( usernameCheck != 'yes')
    {
      (document.getElementById('errorMessage') as HTMLInputElement).innerHTML =
        '<div class="card cardBackGround border-danger text-danger text_font">' + usernameCheck + '</div>'
    }
    else if( passwordCheck != 'yes')
    {
      (document.getElementById('errorMessage') as HTMLInputElement).innerHTML =
        '<div class="card cardBackGround border-danger text-danger text_font">' + passwordCheck + '</div>'
    }
    else
    {
      this.app.authenticate(this.user).subscribe(data=>
        {
          console.log("[User start]");
          console.log(data);
          console.log("[User end]");
          data.password = this.user.password;
          window.sessionStorage.setItem("SNVA_CRM_USER", JSON.stringify(data));
          this.redirectController.redirect("Welcome Back " + data.username, '', this.jumpPage(data.role), 'auto');
        },
        error =>
        {
          this.redirectController.redirect("Sorry, Login Failed", 'Please Check you ID and Password', '', 'auto');
        })
    }
  }
  jumpPage(role:string):string
  {
    return this.roleCheck.getFrontendRoleType(role) + '/homepage';
  }
  resetPassword()
  { }
}
