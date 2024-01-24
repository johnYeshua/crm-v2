import {Component, Input} from '@angular/core';
import {User} from "../../../model/user";
import {DeleteUserConfirmView} from "../../popView/deleteUserConfirmView/deleteUserConfirmView";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {ActivatedRoute} from "@angular/router";
import {AccountService} from "../../../service/account.service";
import {RedirectController} from "../../../tools/redirect-controller";
import {RoleCheck} from "../../../tools/role-check";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-can-suspend',
  templateUrl: './canSuspend.html',
  styleUrls: ['./canSuspend.css']
})
export class CanSuspend {

  @Input() canSuspend:any;
  @Input() currentUser:any;

  bsModalRef: BsModalRef;

  constructor(private router:ActivatedRoute, private modalService: BsModalService)
  {}

  suspendConfirm()
  {
    console.log(this.currentUser);
    this.bsModalRef = this.modalService.show(DeleteUserConfirmView, {class: 'modal-lg popBox'});
    this.bsModalRef.content.message = "Suspend";
    this.bsModalRef.content.user = this.currentUser;
  }

  activeConfirm()
  {
    this.bsModalRef = this.modalService.show(DeleteUserConfirmView, {class: 'modal-lg popBox'});
    this.bsModalRef.content.message = "Active";
    this.bsModalRef.content.user = this.currentUser;
  }
}
