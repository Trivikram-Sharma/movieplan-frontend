import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddressService } from 'src/services/address/address.service';
import { Address } from 'src/interfaces/address';
@Component({
  selector: 'app-editaddress',
  templateUrl: './editaddress.component.html',
  styleUrls: ['./editaddress.component.css']
})
export class EditaddressComponent implements OnInit {

  constructor(private addressService:AddressService,
    private router:Router) { }
  
  ngOnInit(): void {
    
  }
  currentAddress:Address = <Address>this.addressService.getCurrentAddress();
  editAddressForm = new FormGroup({
    building: new FormControl(this.currentAddress.building, Validators.required),
    street: new FormControl(this.currentAddress.street, Validators.required),
    area: new FormControl(this.currentAddress.area, Validators.required),
    city: new FormControl(this.currentAddress.city, Validators.required),
    state: new FormControl(this.currentAddress.state, Validators.required),
    country: new FormControl(this.currentAddress.country, Validators.required),
    pincode: new FormControl(this.currentAddress.pincode, Validators.required)
  });

  

  editAddress(){
    let newAddress:Address = {
      building: <string>this.editAddressForm.get('building')?.value,
      street: <string>this.editAddressForm.get('street')?.value,
      area: <string>this.editAddressForm.get('area')?.value,
      city: <string>this.editAddressForm.get('city')?.value,
      state: <string>this.editAddressForm.get('state')?.value,
      country: <string>this.editAddressForm.get('country')?.value,
      pincode: <string>this.editAddressForm.get('pincode')?.value,
    };
    this.addressService.updateAddress(newAddress, <string>newAddress.building)
    .subscribe(
      (addressUpdated:Address) => {
        if(addressUpdated.building == this.editAddressForm.get('building')?.value){
          alert(`Address Updated successfully!`);
          this.router.navigate(['/servicesList/addressList']);
          // this.addressService.updateAddressStreet(<string>newAddress.building, <string>newAddress.street)
          // .subscribe(
          //   (streetUpdated:boolean) => {
          //     if(streetUpdated){
          //       this.addressService.updateAddressArea(<string>newAddress.building, <string>newAddress.area)
          //       .subscribe(
          //         (areaUpdated:boolean) => {
          //           if(areaUpdated){
          //             this.addressService.updateAddressCity(<string>newAddress.building,<string>newAddress.city)
          //             .subscribe(
          //               (cityUpdated:boolean) => {
          //                 if(cityUpdated){
          //                   this.addressService.updateAddressState(<string>newAddress.building,<string>newAddress.state)
          //                   .subscribe(
          //                     (stateUpdated:boolean) => {
          //                       if(stateUpdated) {
          //                         this.addressService.updateAddressCountry(<string>newAddress.building,<string>newAddress.country)
          //                         .subscribe(
          //                           (countryUpdated:boolean) => {
          //                             if(countryUpdated) {
          //                               this.addressService.updateAddressPincode(<string>newAddress.building,<string>newAddress.pincode)
          //                               .subscribe(
          //                                 (pincodeUpdated:boolean) => {
          //                                   if(pincodeUpdated){
          //                                     alert(`Pincode Updated Successfully!`);
          //                                     this.router.navigate(['/servicesList/addressList']);
          //                                   }
          //                                   else {
          //                                     alert(`Pincode Not Updated Successfully!`);
          //                                   }
          //                                 }
          //                               );
          //                             }
          //                             else{alert(`Country Not Updated Successfully!`);}
          //                           }
          //                         );
          //                       }
          //                       else {alert(`State Not Updated Successfully!`);}
          //                     }
          //                   );
          //                 }
          //                 else{alert(`City Not Updated Successfully!`);}
          //               }
          //             );
          //           }
          //           else{alert(`Area Not updated Successfully!`);}
          //         }
          //       );
          //     }
          //     else {alert(`Street Not Updated Successfully!`);}
          //   }
          // );
        }
        else {
          alert('Address building not updated successfully!');
        }
      }
    );
  }
}
