import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Address } from 'src/interfaces/address';
import { Admin } from 'src/interfaces/admin';
import { AddressService } from 'src/services/address/address.service';
import { LoginService } from 'src/services/login/login.service';

@Component({
  selector: 'app-addresslist',
  templateUrl: './addresslist.component.html',
  styleUrls: ['./addresslist.component.css']
})
export class AddresslistComponent implements OnInit {

  constructor(private loginService:LoginService,
    private addressService:AddressService,
    private router:Router) { }

  ngOnInit(): void {
  }
  adminLoggedIn:Admin = this.loginService.currentAdmin;

  addressList:Address[] = [];

  getAllAddresses(){
    this.addressService.getAllAddresses()
    .subscribe((data:Address[]) => this.addressList = data);
    return this.addressList;
  }

  deleteAddress(address:Address){
    let deleteConfirm = confirm(`Are you sure you want to delete the following Address?
    doorNo -> ${address.building},area->${address.area},city->${address.city},state->${address.state},
    country->${address.country},pincode->${address.pincode}`);
    let addressDeleted = false;
    if(deleteConfirm){
      this.addressService.deleteAddress(<string>address.building)
      .subscribe( (data:boolean) => addressDeleted = data);

      if(addressDeleted){
        alert(`The address has been deleted successfully!`);
      }
      else {
        alert(`Something went wrong!`);
      }
    }
    return;
  }
}
