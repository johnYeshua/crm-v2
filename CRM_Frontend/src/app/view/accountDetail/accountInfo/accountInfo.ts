import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { User } from 'src/app/model/user';
import { AccountService } from 'src/app/service/account.service';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";

import {DeleteUserConfirmView} from "../../popView/deleteUserConfirmView/deleteUserConfirmView";

@Component({
  selector: 'app-account-info',
  templateUrl: './accountInfo.html',
  styleUrls: ['./accountInfo.css']
})
//http://localhost:4200/SuperAdmin/check/user/detail/1
export class AccountInfo implements OnInit
{
  account: User;
  id: number;
  account_data: any;
  role: string;


  @Input() currentUser:any;
  @Input() canSuspend:any;

  bsModalRef: BsModalRef;

  imageUrl: string | ArrayBuffer | null = "https://media.istockphoto.com/id/522855255/vector/male-profile-flat-blue-simple-icon-with-long-shadow.jpg?s=612x612&w=0&k=20&c=EQa9pV1fZEGfGCW_aEK5X_Gyob8YuRcOYCYZeuBzztM=";

  constructor(private accountService: AccountService, private route: ActivatedRoute, private router:Router, private modalService: BsModalService){}
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    //account data fetching 
    this.id = this.route.snapshot.params['id'];
    console.log("Id : " +this.id);
    this.account = new User();
    this.accountService.getUserById(this.id).subscribe(
      data=>{
        this.account = data;
      }
    );
    
  }
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.readImage(file);
    }
  }

  readImage(file: File): void {
    const reader = new FileReader();
    reader.onload = (e) => {
      // Ensure that e.target.result is not undefined before assignment
      if (e.target?.result) {
        this.imageUrl = e.target.result;
      }
    };
    reader.readAsDataURL(file);
  }

  onBack(){
    this.role = this.account.role;
    // {path:":role/manage/user"   
    this.router.navigate([this.role + '/manage/user']);
    console.log('Back to clicked!');
  }

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
