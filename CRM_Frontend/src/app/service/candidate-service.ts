import {Injectable} from "@angular/core";
import {HttpClient, HttpEvent, HttpHeaders, HttpParams} from "@angular/common/http";
import {observable, Observable} from "rxjs";
import { Candidate } from "../model/candidate";
import { CandidateDetail } from "../model/candidate-detail";
import { CandidateBack } from "../model/candidate-back";
import { NextCand } from "../model/next-cand";

@Injectable({
  providedIn: 'root'
})
export class CandidateService
{
  private baseURL = "http://localhost:8080"; // TODO
  constructor(private http:HttpClient)
  { }

  getAllCandidates(){
    return this.http.get<Candidate[]>(this.baseURL+"/Candidates/all")
    }
  getCandidate(id:string){
      return this.http.get<CandidateBack>(`${this.baseURL}/Candidates/${id}`)
  }
  saveCandidate(candidate:CandidateBack){
    console.log(candidate);
    return this.http.post<CandidateBack>(`${this.baseURL}/Candidates/add`,candidate)
  }
  setNextCandidateId(){
    return this.http.get<NextCand>(`${this.baseURL}/Candidates/next`)
  }

  updateCandidate(candidate:CandidateBack)
  {
    // @ts-ignore
    return this.http.put<string>(`${this.baseURL}/Candidates/update`, candidate, {responseType: 'text'})
  }

  upload(formData: FormData,candidateId:string): Observable<HttpEvent<string[]>> {
    return this.http.post<string[]>(`${this.baseURL}/file/upload/${candidateId}`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  uploadFile(formData: FormData,candidateId:string): Observable<HttpEvent<string[]>> {
    return this.http.post<string[]>(`${this.baseURL}/file/uploadFile/${candidateId}`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  download(filename: string): Observable<HttpEvent<Blob>> {
    return this.http.get(`${this.baseURL}/file/download/${filename}`, {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob'
    });
  }
}
