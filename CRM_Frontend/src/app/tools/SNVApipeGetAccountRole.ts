import { Pipe, PipeTransform } from '@angular/core';
import {AccountRoleList} from "../data/AccountRoleList";

@Pipe({
    name: 'SNVApipeGetAccountRole'
})
export class SNVApipeGetAccountRole implements PipeTransform
{
    private accountRoleList:AccountRoleList = new AccountRoleList();

    transform(s: any)
    {
        if (s == this.accountRoleList.BACKEND_ROLE[0])
        {
            return this.accountRoleList.FRONTEND_ROLE[0]
        }
        else if(s == this.accountRoleList.BACKEND_ROLE[1])
        {
            return this.accountRoleList.FRONTEND_ROLE[1];
        }
        else if(s == this.accountRoleList.BACKEND_ROLE[2])
        {
            return this.accountRoleList.FRONTEND_ROLE[2];
        }
        else if(s == this.accountRoleList.BACKEND_ROLE[3])
        {
            return this.accountRoleList.FRONTEND_ROLE[3];
        }
        else if(s == this.accountRoleList.BACKEND_ROLE[4])
        {
            return this.accountRoleList.FRONTEND_ROLE[4];
        }
        else if(s == this.accountRoleList.BACKEND_ROLE[5])
        {
            return this.accountRoleList.FRONTEND_ROLE[5];
        }
        else if(s == this.accountRoleList.BACKEND_ROLE[6])
        {
            return this.accountRoleList.FRONTEND_ROLE[6];
        }
        else
        {
            return '';
        }
    }
}
