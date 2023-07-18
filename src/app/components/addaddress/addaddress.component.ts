import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddressService } from 'src/services/address/address.service';
import { Address } from 'src/interfaces/address';
@Component({
  selector: 'app-addaddress',
  templateUrl: './addaddress.component.html',
  styleUrls: ['./addaddress.component.css']
})
export class AddaddressComponent implements OnInit {

  constructor(private addressService:AddressService,
    private router: Router) { }

  ngOnInit(): void {
  }

  addAddressForm = new FormGroup({
    building: new FormControl('',Validators.required),
    street: new FormControl('',Validators.required),
    area: new FormControl('',Validators.required),
    city: new FormControl('',Validators.required),
    state: new FormControl('',Validators.required),
    country: new FormControl('',Validators.required),
    pincode: new FormControl('',Validators.required)
  });

  addAddress(){
    let a:Address = {
      building: <string>this.addAddressForm.get('building')?.value,
      street: <string>this.addAddressForm.get('street')?.value,
      area: <string>this.addAddressForm.get('area')?.value,
      city: <string>this.addAddressForm.get('city')?.value,
      state: <string>this.addAddressForm.get('state')?.value,
      country: <string>this.addAddressForm.get('country')?.value,
      pincode: <string>this.addAddressForm.get('pincode')?.value
    };
    if(a.building.includes("/")){
      alert(`Please DO NOT include or use '/' in the building/door Number.`);
    }
    else{

    
    this.addressService.addAddress(a)
    .subscribe(
      (data:boolean) => {
        if(data){
          alert("The address has been added successfully! Navigating back to the addresses List!");
          this.router.navigate(['/servicesList/addressList']);
        }
        else {
          alert("The Address is NOT added successfully! Navigating back to the addresses List!");
          this.router.navigate(['/servicesList/addressList']);
        }
      }
    );
  }
  }
}
