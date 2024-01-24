import {Component, OnInit} from '@angular/core';


import { User } from './model/user'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent
{
  title = 'SNVA CRM';
  user:User = new User();
  isLogin:boolean = true;

  userID:number = 1;
  userName:string = '';
  userRole:string = 'superAdmin';

  constructor()
  {
    // @ts-ignore
    this.user = JSON.parse( window.sessionStorage.getItem('SNVA_CRM_USER') );
    if(this.user == null)
    {
      this.user = new User();
      this.isLogin = false;
    }
    else
    {
      console.log(this.user);
      this.userName = this.user.username;
      this.userRole = this.user.role;
      this.userID   = this.user.userId;
      this.isLogin = true;
    }
  }
}
