import { Component } from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {RedirectController} from "../../../tools/redirect-controller";
import {RoleCheck} from "../../../tools/role-check";

@Component({
  selector: 'app-add-candidate-result-view',
  templateUrl: './gotoCandidateListConfirmView.html',
  styleUrls: ['./gotoCandidateListConfirmView.css']
})
export class GotoCandidateListConfirmView
{
    message:string = "";
    subMsg:string = "";
    url:string = '';
    constructor(public bsModalRef: BsModalRef, private roleCheck:RoleCheck)
    {
    }
    gotoCandidateList()
    {
        window.location.href = this.url;
    }
}
