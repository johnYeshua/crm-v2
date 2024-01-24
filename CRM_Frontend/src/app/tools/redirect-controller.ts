import {Injectable} from "@angular/core";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {ResponeMessage} from "../view/popView/responeMessage/responeMessage";
import {GotoCandidateListConfirmView} from "../view/popView/gotoCandidateListConfirmView/gotoCandidateListConfirmView";

@Injectable({
  providedIn: 'root'
})
export class RedirectController
{
  bsModalRef: BsModalRef;
  constructor( private modalService: BsModalService )
  {}
  redirect(message:string, errOrMsg:string, url:string, type:string)
  {
    if(type == 'auto')
    {
      this.bsModalRef = this.modalService.show(ResponeMessage, {class: 'modal-lg popBox'});
      this.bsModalRef.content.message = message;
      this.bsModalRef.content.error = errOrMsg;
      setTimeout(
          function ()
          {
            if(url == '')
            {
              location.reload();
            }
            else
            {
              window.location.href = url;
            }
          }, 3000);
    }
    else if(type="gotoCandidateList")
    {
      this.bsModalRef = this.modalService.show(GotoCandidateListConfirmView, {class: 'modal-lg popBox'});
      this.bsModalRef.content.message = message;
      this.bsModalRef.content.subMsg = errOrMsg;
      this.bsModalRef.content.url = url;
    }
  }
}
