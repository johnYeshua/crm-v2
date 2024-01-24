import {Component, Input, OnInit} from '@angular/core';
import {InputCheck} from "../../../tools/input-check";
import {AccountService} from "../../../service/account.service";
import {RedirectController} from "../../../tools/redirect-controller";
import {FormControl, FormGroup} from "@angular/forms";
import {ApiResponse, CountryRegionResponse} from "../../../../models";
import CountryRegion from "countryregionjs";

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit
{
  @Input() currentUser:any;
  @Input() isMyAccount:boolean

  inputCheck:InputCheck = new InputCheck();

  addressCity:string = '';
  addressState:string = '';
  addressCountry:string = ''

  constructor(private accountService:AccountService, private redirectController:RedirectController)
  {
    this.countryForm = new FormGroup({
      country: new FormControl(''),
      state: new FormControl(''),
      lga: new FormControl('')
    });

  }

  ngOnInit(): void
  {
    this.loadCountryStateCity()
  }


  loadCountryStateCity()
  {
    this.getCountries();
    if(this.currentUser.addressCountry  != undefined && this.currentUser.addressCountry != '')
    {
      this.addressCountry = this.currentUser.addressCountry;
      this.getStates();
    }
    if(this.currentUser.addressState  != undefined && this.currentUser.addressState  != '')
    {
      this.addressState   = this.currentUser.addressState;
      this.getLGAs();
    }
    if(this.currentUser.addressCity  != undefined && this.currentUser.addressCity  != '')
    {
      this.addressCity    = this.currentUser.addressCity;
    }
  }

  updateAddress():void
  {
    (document.getElementById('errorMessage') as HTMLInputElement).innerHTML = '';
    let addressLine1    = (document.getElementById("addressLine1"  ) as HTMLInputElement).value;
    let addressLine2    = (document.getElementById("addressLine2"  ) as HTMLInputElement).value;
    let addressZipCode  = (document.getElementById("addressZipCode") as HTMLInputElement).value;
    this.addressCountry = (document.getElementById("addressCountry") as HTMLSelectElement).value;
    this.addressState   = (document.getElementById("addressState"  ) as HTMLSelectElement).value;
    this.addressCity    = (document.getElementById("addressCity"   ) as HTMLSelectElement).value;

    let check = this.inputCheck.isAddress(addressLine1, addressLine2, this.addressCountry, this.addressState, this.addressCity, addressZipCode);
    if(check == 'yes')
    {
      this.currentUser.addressCountry = this.addressCountry;
      this.currentUser.addressState   = this.addressState;
      this.currentUser.addressCity    = this.addressCity;
      this.currentUser.addressLine1   = addressLine1;
      this.currentUser.addressLine2   = addressLine2;
      this.currentUser.addressZipCode = addressZipCode;
      this.accountService.updateUser(this.currentUser).subscribe(
          data =>
          {
            if(this.isMyAccount == true)
            {
              window.sessionStorage.setItem("SNVA_CRM_USER", JSON.stringify(this.currentUser));
            }
            this.redirectController.redirect("Update Address Successful", '', '', 'auto');
            this.saveStatus();
          },
          error =>
          {
            this.redirectController.redirect("Update Address Failed", error.message, '', 'auto');
            this.saveStatus();
          });
    }
    else
    {
      (document.getElementById('errorMessage') as HTMLInputElement).innerHTML =
          '<div class="card cardBackGround border-danger text-danger">' + check + '</div>'
    }
  }
  saveStatus()
  {
    localStorage.setItem('SNVA_CRM_AccountDetail', 'mailAddress');
  }

  countryForm: FormGroup;
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

}
