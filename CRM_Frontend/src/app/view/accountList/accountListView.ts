import {Component, OnInit} from '@angular/core';
import {MenuData} from "../../data/menuData";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {AddNewUser} from "../popView/addNewUser/addNewUser";
import { User } from 'src/app/model/user';
import { AccountService } from 'src/app/service/account.service';
import {RoleCheck} from "../../tools/role-check";
@Component({
  selector: 'app-account-list',
  templateUrl: './accountListView.html',
  styleUrls: ['./accountListView.css']
})
export class AccountListView implements OnInit
{
  menuData:MenuData = new MenuData();
  currentRole:string = 'Role';
  currentStatus:string = 'Status';
  accountList:User[] = [];
  currentAccountList:User[] = [];
  showAccountList:User[] = [];
  userRole:string = 'admin';
  canAddAccount:boolean = false;
  page:number = 1;
  pageSize:number = 1;
  pages:any = [];
  myRole:string ='';

  temp: boolean = true;
  constructor(private modalService: BsModalService, private accountService:AccountService, public roleCheck:RoleCheck)
  {
  }
  ngOnInit()
  {
    this.getAllAccount();
    // @ts-ignore
    let myAccount = JSON.parse( window.sessionStorage.getItem('SNVA_CRM_USER') );
    this.myRole = myAccount.role;
    this.userRole = this.roleCheck.getFrontendRoleType(myAccount.role);
    this.canAddAccount = this.roleCheck.addAccountCheck(myAccount.role);
  }

  getAllAccount(){
    this.accountService.getAllUser().subscribe(data =>
    {
      this.accountList = data.filter(a => this.canCheck(a));
      this.filter();
      console.log(this.accountList);
    })
  }
  filterSetRole(role:string)
  {
    if(role == this.menuData.USER_ROLE[0])
    {
      this.currentRole = this.menuData.USER_ROLE_VALUE[0]
    }
    else if(role == this.menuData.USER_ROLE[1])
    {
      this.currentRole = this.menuData.USER_ROLE_VALUE[1]
    }
    else if(role == this.menuData.USER_ROLE[2])
    {
      this.currentRole = this.menuData.USER_ROLE_VALUE[2]
    }
    else if(role == this.menuData.USER_ROLE[3])
    {
      this.currentRole = this.menuData.USER_ROLE_VALUE[3]
    }
    else if(role == this.menuData.USER_ROLE[4])
    {
      this.currentRole = this.menuData.USER_ROLE_VALUE[4]
    }
    else if(role == this.menuData.USER_ROLE[6])
    {
      this.currentRole = this.menuData.USER_ROLE_VALUE[6]
    }
    else if(role == this.menuData.USER_ROLE[7])
    {
      this.currentRole = this.menuData.USER_ROLE_VALUE[7]
    }
    else if(role == this.menuData.USER_ROLE[8])
    {
      this.currentRole = this.menuData.USER_ROLE_VALUE[8]
    }
    else if(role == this.menuData.USER_ROLE[9])
    {
      this.currentRole = this.menuData.USER_ROLE_VALUE[9]
    }
    else
    {
      this.currentRole = role;
    }
    this.filter();
  }
  filterSetStatus(status:string)
  {
    if(status == 'All Status')
    {
      this.currentStatus = 'Status';
    }
    else
    {
      this.currentStatus = status;
    }
    this.filter();
  }
  showAddNewAccountView()
  {
    this.modalService.show(AddNewUser, {class: 'modal-md popBox-h'});
  }
  showAccountDetail(userId:number)
  {
    window.location.href = this.userRole + "/check/user/detail/" +userId;
  }

  filter()
  {
    this.currentAccountList = this.accountList.filter(a => this.compare(a));
    this.showAccountList = this.currentAccountList.slice(0, 10);
    this.page = 1;
    this.pageSize = this.getMaxPage();
  }

  canCheck(user:User)
  {
    if(this.roleCheck.updateAccountCheck(this.myRole,user.role) != 'notAccess')
    {
      return true;
    }
    return false;
  }

  compare(user:User)
  {
    if(this.roleCheck.getFilterRoleCheck(user.role,this.currentRole) && this.roleCheck.getFilterStatusCheck(user.accountNonLocked, this.currentStatus))
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  prevPage()
  {
    if(this.page > 1)
    {
      this.page = this.page - 1;
      this.showAccountList = this.currentAccountList.slice((this.page-1)*10, this.page*10);
    }
  }
  nextPage()
  {
    if(this.page < this.pageSize)
    {
      this.page = this.page + 1;
      this.showAccountList = this.currentAccountList.slice((this.page-1)*10, this.page*10);
    }
  }
  clickedPage(page: number){
    this.page = page;
    this.showAccountList = this.currentAccountList.slice((this.page-1)*10, this.page*10);
  }
  getMaxPage():number
  {
    let n = parseInt((this.currentAccountList.length/10).toString());
    
    for(let i = 1; i <= n; i++){
       this.pages.push(i); 
      }
    if(n*10 < this.currentAccountList.length)
    {
      return n+1;
    }
    return n;
  }
}
