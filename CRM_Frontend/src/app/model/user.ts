export class User
{/*
  userId:number = -1;
  username:string = '';
  password:string = '';
  role:string = '';
  accountNonLocked: boolean = false;*/

  userId:number = - 1;
  accountNonLocked:boolean = true;
  password:string = "";
  authorities?:string="";
  username:string = "";
  role:string = "";
  firstName:string = "";
  lastName:string = "";
  phone:string = "";
  addressLine1:string = "";
  addressLine2:string = "";
  addressCity:string = "";
  addressState:string = "";
  addressCountry:string = "";
  addressZipCode:string = "";
}
