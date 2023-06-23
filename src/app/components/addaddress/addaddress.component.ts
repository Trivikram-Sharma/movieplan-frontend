import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AddressService } from 'src/services/address/address.service';

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
    building: new FormControl(''),
    street: new FormControl(''),
    area: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    country: new FormControl(''),
    pincode: new FormControl('')
  });

  addAddress(){

  }
}
