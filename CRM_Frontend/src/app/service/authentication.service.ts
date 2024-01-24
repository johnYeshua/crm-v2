import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authenticated = false;
  public username: String = '';
  public password: String = '';
  authenticatedUser:string = '';
  //userdetails:Principal = new Principal();
  isUser:boolean = false;
  isAdmin:boolean = false;
  isSU:boolean = false;
  currentUser:User = new User();
  // credentials=new Credential();
  constructor(private http: HttpClient,private router:Router) { }
  authenticate(user:User):Observable<User> {
    const headers = new HttpHeaders(user ? {
      authorization : this.createBasicAuthToken(user.username,user.password)
  } : {});

  return this.http.get<User>('http://localhost:8080/loginEndpoints', {headers: headers})
}

createBasicAuthToken(username: String, password: String) {
  return 'Basic ' + window.btoa(username + ":" + password)
}


registerSuccessfulLogin(user:User) {
  this.authenticatedUser= this.createBasicAuthToken(user.username,user.password)
  //this.userdetails = principal
  console.log("register Success Called");
  this.authenticated=true;
  if(user.role==='USER') this.isUser=true
  if(user.role==='ADMIN') this.isAdmin=true
  if(user.role==='SU') {
    this.isSU=true
    console.log(this.isSU);
  }
}

getAuthenticatedUser():string
{
  if(this.authenticatedUser != '')
  {
    return this.authenticatedUser;
  }
  else
  {
    // @ts-ignore
    let user:User = JSON.parse( window.sessionStorage.getItem('SNVA_CRM_USER') );
    if(user != null)
    {
      this.authenticated=true;
      this.authenticatedUser= this.createBasicAuthToken(user.username,user.password)
      return this.authenticatedUser;
    }
    else
    {
      return '';
    }
  }
}

setCurrentUser(user:User)
{
  this.currentUser = user;
}
logout(){
  this.username = "";
  this.password = "";
  this.authenticated=false;
  this.currentUser = new User();
  console.log("Logout");
  this.router.navigate(['/'])

}

}
