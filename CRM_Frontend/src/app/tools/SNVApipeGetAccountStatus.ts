import { Pipe, PipeTransform } from '@angular/core';
import {AccountStatusList} from "../data/AccountStatusList";

@Pipe({
    name: 'SNVApipeGetAccountStatus'
})
export class SNVApipeGetAccountStatus implements PipeTransform
{
    private accountStatusList:AccountStatusList = new AccountStatusList();
    transform(s: any)
    {
        if (s == this.accountStatusList.BACKEND_STATUS[0])
        {
            return this.accountStatusList.FRONTEND_STATUS[0]
        }
        else if(s == this.accountStatusList.BACKEND_STATUS[1])
        {
            return this.accountStatusList.FRONTEND_STATUS[1];
        }
        else
        {
            return '';
        }
    }
}
