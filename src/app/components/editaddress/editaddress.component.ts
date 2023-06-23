import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
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

  editAddressForm = new FormGroup({
    building: new FormControl(''),
    street: new FormControl(''),
    area: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    country: new FormControl(''),
    pincode: new FormControl('')
  });

  currentAddress:Address = <Address>this.addressService.currentAddress;

  editAddress(){}
}
