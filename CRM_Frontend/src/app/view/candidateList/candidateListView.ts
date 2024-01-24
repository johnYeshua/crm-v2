import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Candidate } from 'src/app/model/candidate';
import { CandidateService } from 'src/app/service/candidate-service';
import {RoleCheck} from "../../tools/role-check";

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidateListView.html',
  styleUrls: ['./candidateListView.css']
})
export class CandidateListView implements OnInit
{
  allCandidate:Candidate[] | undefined;
  accountType:string = "";
  addCandidateRight:boolean = false;

  constructor(private candidateService:CandidateService,private router:Router, private roleCheck:RoleCheck){}
  ngOnInit():void
  {
    // @ts-ignore
    let myAccount = JSON.parse( window.sessionStorage.getItem('SNVA_CRM_USER') );
    this.accountType = this.roleCheck.getFrontendRoleType(myAccount.role);
    this.addCandidateRight = this.roleCheck.addCandidateCheck(myAccount.role);
    this.candidateService.getAllCandidates().subscribe(
      data=>
      {
        this.allCandidate=data;
      })
  }

  showCandidateDetail(candidateId:string)
  {
    window.location.href = this.accountType + "/check/candidate/detail/" + candidateId;
  }

  showAddNewAccountView()
  {
    window.location.href = this.accountType + "/check/candidate/detail/new";
  }
}
