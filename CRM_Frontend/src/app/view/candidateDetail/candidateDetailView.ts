import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CandidateService } from 'src/app/service/candidate-service';
import { CandidateBack } from 'src/app/model/candidate-back';
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import {MenuData} from "../../data/menuData";
import {ApiResponse, CountryRegionResponse} from "../../../models";
import CountryRegion from "countryregionjs";
import {RoleCheck} from "../../tools/role-check";
import {RedirectController} from "../../tools/redirect-controller";
import {InputCheck} from "../../tools/input-check";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {ResponeMessage} from "../popView/responeMessage/responeMessage";
import {GotoCandidateListConfirmView} from "../popView/gotoCandidateListConfirmView/gotoCandidateListConfirmView";
import { saveAs } from 'file-saver';
import { HttpEventType } from '@angular/common/http';
import { CandidateAttachments } from 'src/app/model/candidate-attachments';
import {CandidateDetail} from "../../model/candidate-detail";

@Component({
  selector: 'app-candidate-detail-view',
  templateUrl: './candidateDetailView.html',
  styleUrls: ['./candidateDetailView.css']
})
export class CandidateDetailView implements OnInit
{


  bsConfig: Partial<BsDatepickerConfig>;
  menuData:MenuData = new MenuData();
  inputCheck:InputCheck = new InputCheck();
  pageStatus:string = "recruiter";
  candidateId:string="";
  currentCandidate:CandidateBack = new CandidateBack();
  file:File;
  workExpYear:number = 0;
  workExpMouth:number = 0;
  addressCity:string = '';
  addressState:string = '';
  addressCountry:string = ''
  myRole:string = '';

  loiSent     = 'No'
  loiAccepted = 'No'
  joinedBatch = 'No'

  candidateP1Right:boolean = false;
  candidateP2Right:boolean = false;
  candidateP3Right:boolean = false;

  isPdfResume:Boolean = true
  isPdfFile:Boolean = true
  attachments:CandidateAttachments[];

  tmpCandidate:CandidateBack = new CandidateBack();

  constructor(private router:ActivatedRoute,private candidateService:CandidateService, private route:Router, private redirectController:RedirectController, private roleCheck:RoleCheck)
  {
  }
  ngOnInit(): void
  {
    this.candidateId = this.router.snapshot.params['id'];
    this.bsConfig = Object.assign({}, {dateInputFormat: 'YYYY-MM-DD', showWeekNumbers: false});
    // @ts-ignore
    let myAccount = JSON.parse( window.sessionStorage.getItem('SNVA_CRM_USER') );
    this.myRole = this.roleCheck.getFrontendRoleType(myAccount.role);
    if(this.candidateId == 'new')
    {
      this.candidateService.setNextCandidateId().subscribe(
        data=>
        {
          this.currentCandidate.candidateId=data.candidateId;
          this.currentCandidate.recruiterName = myAccount.firstName + " " + myAccount.lastName;
          this.candidateP1Right = this.roleCheck.updateCandidateP1Check(myAccount.role);
          this.getCountries();
        })
    }
    else
    {
      this.candidateService.getCandidate(this.candidateId).subscribe(
        data=>
        {
        this.currentCandidate=data;
        this.tmpCandidate = this.deepCopyCandidate(data);
        this.candidateP1Right = this.roleCheck.updateCandidateP1Check(myAccount.role);
        this.candidateP2Right = this.roleCheck.updateCandidateP2Check(myAccount.role);
        this.candidateP3Right = this.roleCheck.updateCandidateP3Check(myAccount.role);
          if(data.details.LOISent)
          {
            this.loiSent = 'Yes';
          }
          if(data.details.joinedBatch)
          {
            this.joinedBatch  = 'Yes';
          }
          if(data.details.LOIAccepted)
          {
            this.loiAccepted= 'Yes';
          }
        if(this.candidateP1Right == true)
        {
          this.workExpYear  = parseInt(data.workExperience.substring(0,data.workExperience.indexOf('year(s)')));
          this.workExpMouth = parseInt(data.workExperience.substring(data.workExperience.indexOf(')')+2,data.workExperience.indexOf('mouth(s)')));
          this.addressCountry = data.details.addressCounty;
          this.addressState = data.details.addressState;
          this.addressCity = data.details.addressCity;
          this.getCountries();
          this.getStates();
          this.getLGAs();
          this.bsConfig = Object.assign({}, {dateInputFormat: 'YYYY-MM-DD', showWeekNumbers: false, showMouthNumber:true});
        }
        else
        {
          if(this.candidateP2Right || this.candidateP3Right)
          {
            this.pageStatus = 'techBD';
          }
        }
      })
    }

  }

  add(candidate:CandidateBack)
  {
    (document.getElementById('errorMessage') as HTMLInputElement).innerHTML = '';
    candidate.workExperience = this.workExpYear + ' year(s) ' + this.workExpMouth + ' mouth(s)';
    candidate.details.interviewDate = (document.getElementById('interviewDate') as HTMLInputElement).value;
    candidate.details.addressCounty = (document.getElementById('addressCountry') as HTMLInputElement).value;
    candidate.details.addressState  = (document.getElementById('addressState') as HTMLInputElement).value;
    candidate.details.addressCity   = (document.getElementById('addressCity') as HTMLInputElement).value;
    let check:string = this.checkForm(candidate);
    if(check == 'yes')
    {
      console.log(candidate);
      // @ts-ignore
      let myAccount = JSON.parse( window.sessionStorage.getItem('SNVA_CRM_USER') );
      this.candidateService.saveCandidate(candidate).subscribe(data=>
      {
        this.redirectController.redirect("Add Candidate Successful", '', this.myRole + '/manage/candidate', 'gotoCandidateList');
      },
        error =>
      {
        this.redirectController.redirect("Add Candidate Failed", '', this.myRole + '/manage/candidate', 'gotoCandidateList');
      })
    }
    else
    {
      (document.getElementById('errorMessage') as HTMLInputElement).innerHTML =
        '<div class="card cardBackGround border-danger text-danger text-center">' + check + '</div>'
    }
  }


  save(candidate:CandidateBack)
  {
    (document.getElementById('errorMessage') as HTMLInputElement).innerHTML = '';
    let check:string = 'yes';

    if(this.candidateP1Right == true)
    {
      candidate.workExperience = this.workExpYear + ' year(s) ' + this.workExpMouth + ' mouth(s)';
      let interviewDate = (document.getElementById('interviewDate') as HTMLInputElement).value;
      if(interviewDate != "")
      {
        candidate.details.interviewDate = interviewDate;
      }
      candidate.details.addressCounty = (document.getElementById('addressCountry') as HTMLInputElement).value;
      candidate.details.addressState  = (document.getElementById('addressState') as HTMLInputElement).value;
      candidate.details.addressCity   = (document.getElementById('addressCity') as HTMLInputElement).value;
      check = this.checkForm(candidate);
    }

    if(this.candidateP2Right == true)
    {
       if(candidate.details.interviewerFeedback == '')
       {
         check = 'Interview Feedback is Empty';
       }

      if(candidate.details.candidateInterviewStatus == '')
      {
        check = 'Please Choose Candidate Status';
      }
    }

    if(this.candidateP3Right == true)
    {
      let loiSent     = (document.getElementById("loiSent"    ) as HTMLSelectElement).value;
      let loiAccepted = (document.getElementById("loiAccepted") as HTMLSelectElement).value;
      let joinedBatch = (document.getElementById("joinBatch"  ) as HTMLSelectElement).value;
      let batchStartDate = (document.getElementById('batchStartDate') as HTMLInputElement).value;
      candidate.details.startDate = batchStartDate;

      if(loiSent == this.menuData.LOI_SENT[0])
      {
        candidate.details.LOISent = true;
      }
      else
      {
        candidate.details.LOISent = false;
      }

      if(loiAccepted == this.menuData.LOI_ACCEPTED[0])
      {
        candidate.details.LOIAccepted = true;
      }
      else
      {
        candidate.details.LOIAccepted = false;
      }

      if(joinedBatch == this.menuData.JOIN_BATCH[0])
      {
        candidate.details.joinedBatch = true;
      }
      else
      {
        candidate.details.joinedBatch = false;
      }


      if(candidate.details.joinedBatch == true && candidate.details.startDate == '')
      {
        check = 'Please Choose a Batch Start Date';
      }
    }

    let msg = this.updateMessage();

    if(check == 'yes' && msg != '')
    {
      this.candidateService.updateCandidate(candidate).subscribe(
        data=>
        {
          this.redirectController.redirect('Candidate updated successfully!', msg, this.myRole + '/manage/candidate', 'gotoCandidateList');
        },
        error =>
        {
          this.redirectController.redirect("Candidate update Failed", msg, this.myRole + '/manage/candidate', 'gotoCandidateList');
        })
    }
    else if(check != 'yes')
    {
      (document.getElementById('errorMessage') as HTMLInputElement).innerHTML =
        '<div class="card cardBackGround border-danger text-danger text-center">' + check + '</div>'
    }
  }

  checkForm(candidate:CandidateBack)
  {
    let check = 'yes'
    check = this.inputCheck.isfullName(candidate.firstName, candidate.lastName);
    if(check != 'yes')
    {
      return check;
    }

    if(candidate.school == '')
    {
      return "School is Empty"
    }

    if(candidate.degree == '')
    {
      return "degree is Empty"
    }

    if(candidate.visaStatus == '')
    {
      return "Please Choose Visa Status"
    }

    if(candidate.ssn == '')
    {
      return "Please input Candidate's SSN, if he/she doesn't have SSN, Please input 0";
    }

    check = this.inputCheck.isEmailID(candidate.email);
    if(check != 'yes')
    {
      return check;
    }

    check = this.inputCheck.isPhoneNumber(candidate.phoneNumber);
    if(check != 'yes')
    {
      return check;
    }

    check = this.inputCheck.isAddress(candidate.details.addressLine1, candidate.details.addressLine2, candidate.details.addressCounty, candidate.details.addressState, candidate.details.addressCity, candidate.details.addressZipCode);
    if(check != 'yes')
    {
      return check;
    }

    if(candidate.details.skillSet == '')
    {
      return "Skill Set is Empty"
    }

    if(candidate.details.interviewDate == '' || candidate.details.interviewDate == 'yyyy-mm-dd')
    {
      return "Please Choose InterView Date";
    }

    if(candidate.details.interviewer == '')
    {
      return "Please Set an Interviewer";
    }

    return check;
  }


  deepCopyCandidate(tmp:CandidateBack)
  {
    let candidate:CandidateBack = new CandidateBack();
    candidate.candidateId    = tmp.candidateId
    candidate.firstName      = tmp.firstName
    candidate.middleName     = tmp.middleName
    candidate.lastName       = tmp.lastName
    candidate.recruiterName  = tmp.recruiterName
    candidate.email          = tmp.email
    candidate.phoneNumber    = tmp.phoneNumber
    candidate.workExperience = tmp.workExperience
    candidate.visaStatus     = tmp.visaStatus
    candidate.ssn            = tmp.ssn
    candidate.school         = tmp.school
    candidate.degree         = tmp.degree

    candidate.details = new CandidateDetail();
    candidate.details.skillSet                 = tmp.details.skillSet
    candidate.details.communicationSkill       = tmp.details.communicationSkill
    candidate.details.addressLine1             = tmp.details.addressLine1
    candidate.details.addressLine2             = tmp.details.addressLine2
    candidate.details.addressCity              = tmp.details.addressCity
    candidate.details.addressState             = tmp.details.addressState
    candidate.details.addressCounty            = tmp.details.addressCounty
    candidate.details.addressZipCode           = tmp.details.addressZipCode
    candidate.details.source                   = tmp.details.source
    candidate.details.remarks                  = tmp.details.remarks
    candidate.details.interviewDate            = tmp.details.interviewDate
    candidate.details.interviewer              = tmp.details.interviewer
    candidate.details.interviewerFeedback      = tmp.details.interviewerFeedback
    candidate.details.candidateInterviewStatus = tmp.details.candidateInterviewStatus
    candidate.details.LOISent                  = tmp.details.LOISent
    candidate.details.LOIAccepted              = tmp.details.LOIAccepted
    candidate.details.joinedBatch              = tmp.details.joinedBatch
    candidate.details.startDate                = tmp.details.startDate

    return candidate;
  }

  updateMessage():string
  {
    let message="<div class='row justify-content-center'>";

    if(this.tmpCandidate.firstName != this.currentCandidate.firstName || this.tmpCandidate.middleName != this.currentCandidate.middleName || this.tmpCandidate.lastName != this.currentCandidate.lastName)
    {
      message  = message +
          "<div class='col-5 text-end'>Candidate's Name: </div>" +
          "<div class='col-3 text-start'>"+ this.tmpCandidate.firstName + ' ' + this.tmpCandidate.middleName + ' ' + this.tmpCandidate.lastName + "</div><div class='col-1 text-center'>-></div><div class='col-3 text-start'>"
          + this.currentCandidate.firstName + ' ' + this.currentCandidate.middleName + ' ' + this.currentCandidate.lastName + "</div><br>"
    }
    if(this.tmpCandidate.ssn != this.currentCandidate.ssn)
    {
      message  = message +
          "<div class='col-5 text-end'>Social Security number: </div>" +
          "<div class='col-3 text-start'>"+ this.tmpCandidate.ssn + "</div><div class='col-1 text-center'>-></div><div class='col-3 text-start'>" + this.currentCandidate.ssn + "</div><br>"
    }
    if(this.tmpCandidate.school != this.currentCandidate.school)
    {
      message  = message +
          "<div class='col-5 text-end'>School : </div>" +
          "<div class='col-3 text-start'>"+ this.tmpCandidate.school + "</div><div class='col-1 text-center'>-></div><div class='col-3 text-start'>" + this.currentCandidate.school + "</div><br>"
    }
    if(this.tmpCandidate.degree != this.currentCandidate.degree)
    {
      message  = message +
          "<div class='col-5 text-end'>Degree : </div>" +
          "<div class='col-3 text-start'>"+ this.tmpCandidate.degree + "</div><div class='col-1 text-center'>-></div><div class='col-3 text-start'>" + this.currentCandidate.degree + "</div><br>"
    }
    if(this.tmpCandidate.visaStatus != this.currentCandidate.visaStatus)
    {
      message  = message +
          "<div class='col-5 text-end'>Visa Status : </div>" +
          "<div class='col-3 text-start'>"+ this.tmpCandidate.visaStatus + "</div><div class='col-1 text-center'>-></div><div class='col-3 text-start'>" + this.currentCandidate.visaStatus + "</div><br>"
    }
    if(this.tmpCandidate.email != this.currentCandidate.email)
    {
      message  = message +
          "<div class='col-5 text-end'>Email : </div>" +
          "<div class='col-3 text-start'>"+ this.tmpCandidate.email + "</div><div class='col-1 text-center'>-></div><div class='col-3 text-start'>" + this.currentCandidate.email + "</div><br>"
    }
    if(this.tmpCandidate.phoneNumber != this.currentCandidate.phoneNumber)
    {
      message  = message +
          "<div class='col-5 text-end'>Phone : </div>" +
          "<div class='col-3 text-start'>"+ this.tmpCandidate.phoneNumber + "</div><div class='col-1 text-center'>-></div><div class='col-3 text-start'>" + this.currentCandidate.phoneNumber + "</div><br>"
    }

    if( (this.tmpCandidate.details.addressLine1   != this.currentCandidate.details.addressLine1  ) ||
        (this.tmpCandidate.details.addressLine2   != this.currentCandidate.details.addressLine2  ) ||
        (this.tmpCandidate.details.addressState   != this.currentCandidate.details.addressState  ) ||
        (this.tmpCandidate.details.addressCity    != this.currentCandidate.details.addressCity   )   ||
        (this.tmpCandidate.details.addressCounty  != this.currentCandidate.details.addressCounty )||
        (this.tmpCandidate.details.addressZipCode != this.currentCandidate.details.addressZipCode))
    {
      message  = message +
          "<div class='col-5 text-end'>Batch Start Date : </div>" +
          "<div class='col-3 text-start'>"
          + this.tmpCandidate.details.addressLine1 + '<br>'+ this.tmpCandidate.details.addressLine2
          + "<br>" + this.tmpCandidate.details.addressState + ", " + this.tmpCandidate.details.addressCity
          + "<br>" + this.tmpCandidate.details.addressZipCode + "<br>" + this.tmpCandidate.details.addressCounty
          + "</div><div class='col-1 text-center'>-></div><div class='col-3 text-start'>"
          + this.currentCandidate.details.addressLine1 + '<br>'+ this.currentCandidate.details.addressLine2
          + "<br>" + this.currentCandidate.details.addressState + ", " + this.currentCandidate.details.addressCity
          + "<br>" + this.currentCandidate.details.addressZipCode + "<br>" + this.currentCandidate.details.addressCounty
          + "</div><br>"
    }
    if(this.tmpCandidate.details.interviewDate != this.currentCandidate.details.interviewDate)
    {
      message  = message +
          "<div class='col-5 text-end'>Interview Date : </div>" +
          "<div class='col-3 text-start'>"+ this.tmpCandidate.details.interviewDate + "</div><div class='col-1 text-center'>-></div><div class='col-3 text-start'>" + this.currentCandidate.details.interviewDate + "</div><br>"
    }
    if(this.tmpCandidate.details.interviewer != this.currentCandidate.details.interviewer)
    {
      message  = message +
          "<div class='col-5 text-end'>Interviewer : </div>" +
          "<div class='col-3 text-start'>"+ this.tmpCandidate.details.interviewer + "</div><div class='col-1 text-center'>-></div><div class='col-3 text-start'>" + this.currentCandidate.details.interviewer + "</div><br>"
    }
    if(this.tmpCandidate.details.skillSet != this.currentCandidate.details.skillSet)
    {
      message  = message +
          "<div class='col-5 text-end'>Skill Set : </div>" +
          "<div class='col-3 text-start'>"+ this.tmpCandidate.details.skillSet + "</div><div class='col-1 text-center'>-></div><div class='col-3 text-start'>" + this.currentCandidate.details.skillSet + "</div><br>"
    }
    if(this.tmpCandidate.workExperience != this.currentCandidate.workExperience)
    {
      message  = message +
          "<div class='col-5 text-end'>Work Experience : </div>" +
          "<div class='col-3 text-start'>"+ this.tmpCandidate.workExperience + "</div><div class='col-1 text-center'>-></div><div class='col-3 text-start'>" + this.currentCandidate.workExperience + "</div><br>"
    }
    if(this.tmpCandidate.details.communicationSkill != this.currentCandidate.details.communicationSkill )
    {
      message  = message +
          "<div class='col-5 text-end'>Communication Skill : </div>" +
          "<div class='col-3 text-start'>"+ this.tmpCandidate.details.communicationSkill  + "</div><div class='col-1 text-center'>-></div><div class='col-3 text-start'>" + this.currentCandidate.details.communicationSkill + "</div><br>"
    }
    if(this.tmpCandidate.details.source != this.currentCandidate.details.source)
    {
      message  = message +
          "<div class='col-5 text-end'>Source : </div>" +
          "<div class='col-3 text-start'>"+ this.tmpCandidate.details.source + "</div><div class='col-1 text-center'>-></div><div class='col-3 text-start'>" + this.currentCandidate.details.source + "</div><br>"
    }
    if(this.tmpCandidate.details.candidateInterviewStatus != this.currentCandidate.details.candidateInterviewStatus)
    {
      message  = message +
          "<div class='col-5 text-end'>Interview Status : </div>" +
          "<div class='col-3 text-start'>"+ this.tmpCandidate.details.candidateInterviewStatus + "</div><div class='col-1 text-center'>-></div><div class='col-3 text-start'>" + this.currentCandidate.details.candidateInterviewStatus + "</div><br>"
    }
    if(this.tmpCandidate.details.LOISent != this.currentCandidate.details.LOISent)
    {
      let loiSent1 = 'No';
      let loiSent2 = 'Yes';
      if(this.tmpCandidate.details.LOISent)
      {
        loiSent1 = 'Yes';
        loiSent2 = 'No;'
      }
      message  = message +
          "<div class='col-5 text-end'>LOI Sent : </div>" +
          "<div class='col-3 text-start'>"+ loiSent1 + "</div><div class='col-1 text-center'>-></div><div class='col-3 text-start'>" + loiSent2 + "</div><br>"
    }
    if(this.tmpCandidate.details.LOIAccepted != this.currentCandidate.details.LOIAccepted)
    {
      let LOIAccepted1 = 'No';
      let LOIAccepted2 = 'Yes';
      if(this.tmpCandidate.details.LOIAccepted)
      {
        LOIAccepted1 = 'Yes';
        LOIAccepted2 = 'No;'
      }
      message  = message +
          "<div class='col-5 text-end'>LOI Accept : </div>" +
          "<div class='col-3 text-start'>"+ LOIAccepted1 + "</div><div class='col-1 text-center'>-></div><div class='col-3 text-start'>" + LOIAccepted2 + "</div><br>"
    }
    if(this.tmpCandidate.details.joinedBatch != this.currentCandidate.details.joinedBatch)
    {
      let joinedBatch1 = 'No';
      let joinedBatch2 = 'Yes';
      if(this.tmpCandidate.details.LOIAccepted)
      {
        joinedBatch1 = 'Yes';
        joinedBatch2 = 'No;'
      }
      message  = message +
          "<div class='col-5 text-end'>Joined Batch : </div>" +
          "<div class='col-3 text-start'>"+ joinedBatch1 + "</div><div class='col-1 text-center'>-></div><div class='col-3 text-start'>" + joinedBatch2 + "</div><br>"
    }
    if(this.tmpCandidate.details.startDate != this.currentCandidate.details.startDate)
    {
      message  = message +
          "<div class='col-5 text-end'>Batch Start Date : </div>" +
          "<div class='col-3 text-start'>"+ this.tmpCandidate.details.startDate + "</div><div class='col-1 text-center'>-></div><div class='col-3 text-start'>" + this.currentCandidate.details.startDate + "</div><br>"
    }

    if(this.tmpCandidate.details.interviewerFeedback != this.currentCandidate.details.interviewerFeedback )
    {
      message  = message +
          "<div class='col-5 text-end'>Interviewer Feedback : </div>" +
          "<div class='col-3 text-start'>"+ this.tmpCandidate.details.interviewerFeedback + "</div><div class='col-1 text-center'>-></div><div class='col-3 text-start'>" + this.currentCandidate.details.interviewerFeedback + "</div><br>"
    }
    return message + "</div>";
  }


  onFileSelected(event: any, field: string) {
    const selectedFile = event.target.files[0];

    // Depending on the field parameter, assign the selected file to the corresponding property
    // if (field === 'resume') {
    //   this.candidate.resume = selectedFile;
    // } else if (field === 'otherFile') {
    //   this.candidate.otherFile = selectedFile;
    // }
  }

  chanegStatus(s:string)
  {
    this.pageStatus = s;
  }

  countryRegion: any = null;
  countries: CountryRegionResponse[] = [];
  states: CountryRegionResponse[] = [];
  lgas: CountryRegionResponse[] = [];
  ONE: number = 1;

  getCountryRegionInstance = () =>
    this.countryRegion ??= new CountryRegion();

  async getCountries(): Promise<void> {
    try {
      const countries = await this.getCountryRegionInstance()?.getCountries();
      this.countries = countries.map((country: ApiResponse, index: number) => ({
        value: index + this.ONE,
        label: country.name,
      }));

    } catch (error) {
      console.error(error);
    }
  }

  async getStates(): Promise<void> {
    try {
      const country = this.countries.find(o => o.label == this.addressCountry);
      console.log("###state:")
      console.log(country);
      if (country)
      {
        const states = await this.getCountryRegionInstance()?.getStates(country.value);
        this.states = states.map((userState: ApiResponse, index: number) => ({
          value: index + this.ONE,
          label: userState?.name
        }));
      }

    } catch (error) {
      console.error(error);
    }
  }

  async getLGAs(): Promise<void> {
    try
    {
      const country = this.countries.find(o => o.label == this.addressCountry);
      const state = this.states.find(o => o.label == this.addressState);
      console.log("###city:")
      console.log(country);
      console.log(state);
      if (country && state) {
        const lgas = await this.getCountryRegionInstance()?.getLGAs(country.value, state.value);
        this.lgas = lgas?.map((lga: ApiResponse, index: number) => ({
          value: index + this.ONE,
          label: lga?.name
        }));
      }
    } catch (error) {
      console.error(error);
    }
  }

  handleCountryChange(): void
  {
    this.addressCountry = (document.getElementById("addressCountry") as HTMLSelectElement).value;
    this.getStates();
  }

  handleStateChange(): void
  {
    this.addressState = (document.getElementById("addressState") as HTMLSelectElement).value;
    this.getLGAs();
  }

  onResumeUpload(event:any) {
    const formData = new FormData();
    
    this.file= event.target.files[0];
    console.log(this.file.name);
    if(this.file.name.substring(this.file.name.lastIndexOf('.') + 1).toLowerCase()==='pdf'){
      console.log("pdf");
      this.isPdfResume=true;
    }  
    else{
      this.isPdfResume=false;
    }
    this.attachments= this.attachments=this.currentCandidate.attachments || [];
    this.attachments.push(new CandidateAttachments(this.currentCandidate.candidateId,true,this.currentCandidate.candidateId+"_Resume.pdf"));
     this.currentCandidate.attachments=this.attachments;
     console.log(this.currentCandidate);
    formData.append('files', this.file, this.file.name);
    this.candidateService.upload(formData,this.currentCandidate.candidateId).subscribe(data=>{
      console.log(data);
    })
    }

    onFileUpload(event:any) {
      const formData = new FormData();
      
      this.file= event.target.files[0];
      console.log(this.file.name);
      if(this.file.name.substring(this.file.name.lastIndexOf('.') + 1).toLowerCase()==='pdf'){
        console.log("File pdf");
        this.isPdfFile=true;
      }  
      else{
        this.isPdfFile=false;
      }
      this.attachments=this.currentCandidate.attachments || [];
      this.attachments.push(new CandidateAttachments(this.currentCandidate.candidateId,true,this.currentCandidate.candidateId+"_File.pdf"));
       this.currentCandidate.attachments=this.attachments;
       console.log(this.currentCandidate);
      formData.append('files', this.file, this.file.name);
      this.candidateService.uploadFile(formData,this.currentCandidate.candidateId).subscribe(data=>{
        console.log(data);
      })
      }

    download(filename:string) {
      this.candidateService.download(filename).subscribe(
        event => {
          if(event.type==HttpEventType.Response)
          {
            saveAs(new File([event.body!], event.headers.get('File-Name')!, 
                  {type: `${event.headers.get('Content-Type')};charset=utf-8`}));
          }
        });

      }
}
