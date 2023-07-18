import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  addressList:Address[] = [];
  constructor(private loginService:LoginService,
    private addressService:AddressService,
    private router:Router,
    private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    // this.addressList = this.addressService.getAllAddressesList();
    this.activatedRoute.data.forEach(
      data => this.addressList = data['addresses']
    );
    console.log('this.addressService.allAddressesList ->',this.addressList);
  }
  adminLoggedIn:Admin = this.loginService.currentAdmin;
  

  // getAllAddresses(){
  //   this.addressService.getAllAddresses()
  //   .subscribe((data:Address[]) => this.addressList = data);
  //   return this.addressList;
  // }
  redirectToAddAddress(){
    this.router.navigate(['/servicesList/addAddress']);
  }
  redirectToEditAddress(address:Address){
    this.addressService.setCurrentAddress(address);
    this.router.navigate(['/servicesList/editAddress']);
  }

  deleteAddress(address:Address){
    let deleteConfirm = confirm(`Are you sure you want to delete the following Address?
    doorNo -> ${address.building},area->${address.area},city->${address.city},state->${address.state},
    country->${address.country},pincode->${address.pincode}`);
    let addressDeleted = false;
    if(deleteConfirm){
      this.addressService.deleteAddress(<string>address.building)
      .subscribe( (data:boolean) => 
      {
        if(data){
          alert(`The address has been deleted successfully!`);
        }
        else {
          alert(`Something went wrong!`);
        }
      }
      
      
      );

      
    }
    return;
  }
}
