export class CandidateAttachments
{
  attachmentId:number = -1;
  candidateId:string = '';
  resume:boolean = false;
  attachment:string = '';
  constructor(candidateId:string,resume:boolean,attachment:string){
    this.candidateId = candidateId;
    this.resume=resume;
    this.attachment =attachment;
  }
}
