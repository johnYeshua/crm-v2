import {Component, OnInit} from '@angular/core';
import {User} from "../../model/user";
import {ActivatedRoute} from "@angular/router";
import {AccountService} from "../../service/account.service";
import {InputCheck} from "../../tools/input-check";
import {RedirectController} from "../../tools/redirect-controller";
import {RoleCheck} from "../../tools/role-check";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";

import { FormControl, FormGroup } from '@angular/forms';
import CountryRegion from 'countryregionjs'
import { CountryRegionResponse } from 'src/models';
import { ApiResponse } from 'src/models';

@Component({
  selector: 'app-account-detail-view',
  templateUrl: './accountDetailView.html',
  styleUrls: ['./accountDetailView.css']
})
export class AccountDetailView implements OnInit
{
  userId:any = 1;
  currentUser:User = new User();
  erroeMessage:string = 'Loading data, please wait';

  currentStatus:string = '';
  authorization:string = '';
  canSuspend:boolean = false;
  inputCheck:InputCheck = new InputCheck();
  isMyAccount:boolean = false;
  constructor(private router:ActivatedRoute, private modalService: BsModalService, private accountService:AccountService, private redirectController:RedirectController, private roleCheck:RoleCheck)
  {
  }

  ngOnInit(): void
  {
    this.userId = this.router.snapshot.params['id'];
    this.loadStatus();
    // @ts-ignore
    let myAccount = JSON.parse( window.sessionStorage.getItem('SNVA_CRM_USER') );
    if(this.userId == 'myAccount' || this.userId == myAccount.userId)
    {
      this.currentUser =  myAccount;
      this.authorization = "readAndWrite";
      this.canSuspend = false;
      this.isMyAccount = true;
    }
    else
    {
      this.accountService.getUserById(this.userId).subscribe(
        data=>
        {
          this.currentUser = data;
          this.authorization = this.roleCheck.updateAccountCheck(myAccount.role, this.currentUser.role);
          this.canSuspend = this.roleCheck.deleteAccountCheck(myAccount.role, this.currentUser.role);

          this.isMyAccount = false;

          if(this.authorization == "notAccess")
          {
            this.erroeMessage = "Access Forbidden 403";
          }
        },
        error =>
        {
          this.erroeMessage = "Can Not Load Account Information<br>Please Try Again";
        }
      )
    }

  }

  changeStatus( status:string )
  {
    this.currentStatus = status;
  }
  loadStatus()
  {
    let status = localStorage.getItem('SNVA_CRM_AccountDetail');
    if(status != null)
    {
      this.currentStatus = status;
      localStorage.removeItem('SNVA_CRM_AccountDetail');
    }
    else
    {
      this.currentStatus = "accountInfo";
    }

  }

}
