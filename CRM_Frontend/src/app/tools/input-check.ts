export class InputCheck
{
  isPhoneNumber(s:string):string
  {
    if(s == '') // Empty phone number.
    {
      return "Phone Number is Empty";
    }
    let reg= /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    // Only number Input
    // XXX-XXX-XXXX
    // XXX.XXX.XXXX
    // XXX XXX XXXX
    if (!reg.test(s))
    {
      reg = /^\+?([0-9]{1,3})\)?[-. ]([0-9]{3})[-. ]?([0-9]{3,4})[-. ]?([0-9]{4})$/
      // +xxx xxx-xxx-xxx
      // +xxx xxx.xxx.xxx
      // +xxx xxx xxx xxx
      if(reg.test(s))
      {
        return "yes";
      }
      return "This is not a Phone Number";
    }
    else
    {
      return "yes";
    }
  }

  isEmailID(s:string):string
  {
    let reg = /^\S+@\S+\.\S+$/;
    if(reg.test(s))
    {
      return "yes";
    }
    return "This is not a Email";
  }

  isfullName(firstName:string, lastName:string)
  {
    if(firstName == '')
    {
      return "First Name is empty";
    }

    if(lastName == '')
    {
      return "Last Name is empty";
    }
    return "yes";
  }

  isUsername(s:string):string
  {
    if(s == '')
    {
      return "User Name is empty";
    }
    return "yes";
  }

  isPassword(s:string):string
  {
    console.log(s);
    if(s == '')
    {
      return "Password is empty";
    }
    return "yes";
  }

  isAddress(line1:string, line2:string, country:string, state:string, city:string, zip:string)
  {
    if(line1 == '')
    {
      return 'Address Line 1 is empty';
    }
    else if(country == '')
    {
      return 'Please Choose Your Country';
    }
    else if(state == '')
    {
      return 'Please Choose Your State';
    }
    else if(city == '')
    {
      return 'Please Choose Your City';
    }
    else if(zip == '')
    {
      return 'Please Enter A Correct ZipCode';
    }
    else
    {
      return "yes";
    }
  }

}
