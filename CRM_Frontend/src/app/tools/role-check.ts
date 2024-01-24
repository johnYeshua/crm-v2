import {Injectable} from "@angular/core";
import {MenuData} from "../data/menuData";

@Injectable({
  providedIn: 'root'
})
export class RoleCheck
{

  private role = [
    'SU',        // 0
    'REC_ADMIN', // 1
    'TECH_ADMIN',// 2
    'BD_ADMIN',  // 3
    'REC_USER',  // 4
    'TECH_USER', // 5
    'BD_USER'];  // 6

  private fRole = [
    'SuperAdmin',      // 0
    'RecruiterManager',// 1
    'TrainingManager', // 2
    'BD Manager',      // 3
    'Recruiter',       // 4
    'Trainer',         // 5
    'BusinessDeveloper'// 6
  ];

  private type = ['SuperAdmin', 'Admin', 'User'];

  private roleURL = [
    ' ',      // 0
    '/createRec_admin' , // 1
    '/createTech_admin', // 2
    '/createBD_admin',   // 3
    '/createRecUser',    // 4
    '/createTechUser',   // 5
    '/createBDUser'      // 6
  ];

  getFrontendRoleName(s:string):string
  {
    if (s == this.role[0])
    {
      return this.fRole[0]
    }
    else if(s == this.role[1])
    {
      return this.fRole[1];
    }
    else if(s == this.role[2])
    {
      return this.fRole[2];
    }
    else if(s == this.role[3])
    {
      return this.fRole[3];
    }
    else if(s == this.role[4])
    {
      return this.fRole[4];
    }
    else if(s == this.role[5])
    {
      return this.fRole[5];
    }
    else if(s == this.role[6])
    {
      return this.fRole[6];
    }
    else
    {
      return '';
    }
  }

  getFrontendRoleType(s:string):string
  {
    if (s == this.role[0])
    {
      return this.type[0];
    }
    else if(s == this.role[1] || s == this.role[2] || s == this.role[3] )
    {
      return this.type[1];
    }
    else if(s == this.role[4] || s == this.role[5] || s == this.role[6])
    {
      return this.type[2];
    }
    else
    {
      return '';
    }
  }

  getBackendRoleName(s:string):string
  {
    if (s == this.fRole[0])
    {
      return this.role[0];
    }
    else if(s == this.fRole[1])
    {
      return this.role[1];
    }
    else if(s == this.fRole[2])
    {
      return this.role[2];
    }
    else if(s == this.fRole[3])
    {
      return this.role[3];
    }
    else if(s == this.fRole[4])
    {
      return this.role[4];
    }
    else if(s == this.fRole[5])
    {
      return this.role[5];
    }
    else if(s == this.fRole[6])
    {
      return this.role[6];
    }
    else
    {
      return '';
    }
  }

  seeAccountCheck(myRole:string):boolean
  {
    if(myRole == this.role[0] || myRole == this.role[1] || myRole == this.role[2] || myRole == this.role[3])
    {
      return true;
    }
    return false
  }

  updateAccountCheck(myRole:string, targetRole:string):string
  {
    if(myRole == this.role[0])
    {
      if(targetRole == this.role[1] || targetRole == this.role[2] ||  targetRole == this.role[3])
      {
        return "readAndWrite";
      }
      else
      {
        return "readOnly";
      }
    }
    else if(myRole == this.role[1])
    {
      if(targetRole == this.role[4])
      {
        return "readAndWrite";
      }
      else
      {
        return "notAccess";
      }
    }
    else if(myRole == this.role[2])
    {
      if(targetRole == this.role[5])
      {
        return "readAndWrite";
      }
      else
      {
        return "notAccess";
      }
    }
    else if(myRole == this.role[3])
    {
      if(targetRole == this.role[6])
      {
        return "readAndWrite";
      }
      else
      {
        return "notAccess";
      }
    }
    else if(myRole == this.role[4] || myRole == this.role[5] || myRole == this.role[6])
    {
      return "notAccess";
    }
    else
    {
      return 'notAccess';
    }
  }

  deleteAccountCheck(myRole:string, targetRole:string):boolean
  {
    if(myRole == this.role[0])
    {
      return true;
    }
    else if(myRole == this.role[1])
    {
      if(targetRole == this.role[4])
      {
        return true;
      }
      else
      {
        return false;
      }
    }
    else if(myRole == this.role[2])
    {
      if(targetRole == this.role[5])
      {
        return true;
      }
      else
      {
        return false;
      }
    }
    else if(myRole == this.role[3])
    {
      if(targetRole == this.role[6])
      {
        return true;
      }
      else
      {
        return false;
      }
    }
    else
    {
      return false;
    }
  }


  addCandidateCheck(myRole:string):boolean
  {
    if(myRole == this.role[1] || myRole == this.role[4])
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  updateCandidateP1Check(myRole:string):boolean
  {
    if(myRole == this.role[1] || myRole == this.role[4])
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  updateCandidateP2Check(myRole:string):boolean
  {
    if(myRole == this.role[2] || myRole == this.role[5])
    {
      return true;
    }
    else
    {
      return false;
    }
  }


  updateCandidateP3Check(myRole:string):boolean
  {
    if(myRole == this.role[3] || myRole == this.role[6])
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  addAccountCheck(myRole:string):boolean
  {
    if(myRole == this.role[0] || myRole == this.role[1] || myRole == this.role[2] || myRole == this.role[3])
    {
      return true;
    }
    else
    {
        return false;
    }
  }

  getAddAccountType(myRole:string):string[]
  {
    if(myRole == this.role[0])
    {
      return [this.fRole[1],this.fRole[2], this.fRole[3]];
    }
    else if(myRole == this.role[1])
    {
      return [this.fRole[4]];
    }
    else if(myRole == this.role[2])
    {
      return [this.fRole[5]];
    }
    else if(myRole == this.role[3])
    {
      return [this.fRole[6]];
    }
    else
    {
      return [];
    }
  }

  getCreateURLByRole(s:string):string
  {
    if (s == this.role[0])
    {
      return this.roleURL[0]
    }
    else if(s == this.role[1])
    {
      return this.roleURL[1];
    }
    else if(s == this.role[2])
    {
      return this.roleURL[2];
    }
    else if(s == this.role[3])
    {
      return this.roleURL[3];
    }
    else if(s == this.role[4])
    {
      return this.roleURL[4];
    }
    else if(s == this.role[5])
    {
      return this.roleURL[5];
    }
    else if(s == this.role[6])
    {
      return this.roleURL[6];
    }
    else
    {
      return '';
    }
  }

  getUserStatus(status:boolean):string
  {
    if(status == true)
    {
      return "Active";
    }
    else
    {
      return "Suspend";
    }
  }

  getFilterRoleCheck(myRole:string, role:string):boolean
  {

    let menuData:MenuData = new MenuData();
    if(role == menuData.USER_ROLE_VALUE[0])
    {
      return true;
    }
    else if(role == menuData.USER_ROLE_VALUE[1])
    {
      if(myRole == this.role[0])
      {
        return true;
      }
      else
      {
        return false;
      }
    }
    else if(role == menuData.USER_ROLE_VALUE[2])
    {
      if(myRole == this.role[1] || myRole == this.role[2] || myRole == this.role[3] )
      {
        return true;
      }
      else
      {
        return false;
      }
    }
    else if(role == menuData.USER_ROLE_VALUE[3])
    {
      if(myRole == this.role[4] || myRole == this.role[5] || myRole == this.role[6] )
      {
        return true;
      }
      else
      {
        return false;
      }
    }
    else if(role == menuData.USER_ROLE_VALUE[4])
    {
      if(myRole == this.role[1])
      {
        return true;
      }
      else
      {
        return false;
      }
    }
    else if(role == menuData.USER_ROLE_VALUE[5])
    {
      if(myRole == this.role[4])
      {
        return true;
      }
      else
      {
        return false;
      }
    }
    else if(role == menuData.USER_ROLE_VALUE[6])
    {
      if(myRole == this.role[2])
      {
        return true;
      }
      else
      {
        return false;
      }
    }
    else if(role == menuData.USER_ROLE_VALUE[7])
    {
      if(myRole == this.role[5])
      {
        return true;
      }
      else
      {
        return false;
      }
    }
    else if(role == menuData.USER_ROLE_VALUE[8])
    {
      if(myRole == this.role[3])
      {
        return true;
      }
      else
      {
        return false;
      }
    }
    else if(role == menuData.USER_ROLE_VALUE[9])
    {
      if(myRole == this.role[6])
      {
        return true;
      }
      else
      {
        return false;
      }
    }
    return false;
  }

  getFilterStatusCheck(myStatus:boolean, status:string):boolean
  {
    let menuData:MenuData = new MenuData();
    if(status == menuData.USER_STATUS_VALUE[0])
    {
      return true
    }
    else if(status == menuData.USER_STATUS_VALUE[1])
    {
      if(myStatus == true)
      {
        return true;
      }
      return false
    }
    else if(status == menuData.USER_STATUS_VALUE[2])
    {
      if(myStatus == false)
      {
        return true;
      }
      return false
    }
    return false

  }

}
