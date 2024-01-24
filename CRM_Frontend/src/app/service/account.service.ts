import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import {CandidateBack} from "../model/candidate-back";
import {RoleCheck} from "../tools/role-check";

@Injectable({
  providedIn: 'root'
})
export class AccountService
{
  constructor(private httpClient: HttpClient,private router:Router, private roleCheck:RoleCheck) { }

  getUserById(userId:number):Observable<User>
  {
    return this.httpClient.get<User>('http://localhost:8080/getUserById/'+ userId)
  }

  getAllUser():Observable<User[]>{
    return this.httpClient.get<User[]>('http://localhost:8080/getAllUsers')
  }

  updateUser(user:User):Observable<User>
  {
    delete user['authorities'];
    return this.httpClient.post<User>('http://localhost:8080/updateUser',  user);
  }

  suspendUser(user:User):Observable<User>
  {
    delete user['authorities'];
    return this.httpClient.post<User>('http://localhost:8080/suspendUser',  user);
  }

  resetPassword(user:User):Observable<User>
  {
    delete user['authorities'];
    return this.httpClient.post<User>('http://localhost:8080/changePassword',  user);
  }

  addNewUser(user:User):Observable<User>
  {
    delete user['authorities'];
    let sendUser=
      {
        "username":user.username,
        "password":user.username,
        "role":user.role,
        "accountNonLocked":true,
        "firstName":user.firstName,
        "lastName":user.lastName,
        "phone":user.phone,
        "addressLine1":" ",
        "addressLine2":" ",
        "addressCity":" ",
        "addressState":" ",
        "addressCountry":" ",
        "addressZipCode":" "
      }
    return this.httpClient.post<User>('http://localhost:8080' + this.roleCheck.getCreateURLByRole(user.role),  sendUser);
  }


}
