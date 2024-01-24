import { CandidateAttachments } from "./candidate-attachments";
import { CandidateDetail } from "./candidate-detail";

export class CandidateBack {
    candidateId:string = "";
    firstName:string = "";
    middleName:string = "";
    lastName:string = "";
    recruiterName:string = "";
    email:string = "";
    phoneNumber:string = "";
    workExperience:string = "";
    visaStatus:string = "";
    ssn:string = "";
    school:string = "";
    degree:string = "";

    details:CandidateDetail=new CandidateDetail();
    attachments:CandidateAttachments[]=new Array<CandidateAttachments>();
}
