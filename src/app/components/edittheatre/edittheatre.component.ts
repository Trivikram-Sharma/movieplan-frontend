import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddressService } from 'src/services/address/address.service';
import { TheatreService } from 'src/services/theatre/theatre.service';
import { Theatre } from 'src/interfaces/theatre';
@Component({
  selector: 'app-edittheatre',
  templateUrl: './edittheatre.component.html',
  styleUrls: ['./edittheatre.component.css']
})
export class EdittheatreComponent implements OnInit {

  constructor(private addressService:AddressService,
    private theatreService: TheatreService,
    private router: Router) { }

  ngOnInit(): void {
  }
  allAddressesList = this.addressService.getAllAddressesList();
  currentTheatre:Theatre = this.theatreService.getCurrentTheatre();

  editTheatreForm = new FormGroup({
    id: new FormControl({value:this.currentTheatre.id, disabled:true }),
    name: new FormControl(this.currentTheatre.name),
    screens: new FormControl(this.currentTheatre.screens),
    address: new FormGroup({
      country: new FormControl(this.currentTheatre.address.country),
      state: new FormControl(this.currentTheatre.address.state),
      city: new FormControl(this.currentTheatre.address.city),
      area: new FormControl(this.currentTheatre.address.area),
      street: new FormControl(this.currentTheatre.address.street),
      building: new FormControl(this.currentTheatre.address.building)
    })
  });

  get stateList(){
    let ag = <FormGroup>this.editTheatreForm.get('address');
    if(ag.contains('country')){
      return this.allAddressesList.filter(a => a.country == ag.get('country')?.value)
    }
    else {
      return [];
    }
  }
  get cityList(){
    let ag = <FormGroup>this.editTheatreForm.get('address');
    if(ag.contains('city')){
      return this.allAddressesList.filter(a => a.city === ag.get('city')?.value)
    }
    else{
      return [];
    }
  }
  get areaList(){
    let ag = <FormGroup>this.editTheatreForm.get('address');
    if(ag.contains('area')){
      return this.allAddressesList.filter(a => a.area === ag.get('area')?.value)
    }
    else {
      return [];
    }
  }
  
  get streetList(){
    let ag = <FormGroup>this.editTheatreForm.get('address');
    if(ag.contains('street')){
      return this.allAddressesList.filter(a => a.street === ag.get('street')?.value);
    }
    else{
      return [];
    }
  }
  
  get buildingList(){
    let ag = <FormGroup>this.editTheatreForm.get('address');
    if(ag.contains('building')){
      return this.allAddressesList.filter(a => a.building === ag.get('building')?.value)
    }
    else{
      return [];
    }

  }

  editTheatre(){
    let ea = this.editTheatreForm.get('address');
    let t:Theatre = {
      id: <Number>this.editTheatreForm.get('id')?.value,
      name: <string>this.editTheatreForm.get('name')?.value,
      screens: <Number>this.editTheatreForm.get('screens')?.value,
      address: this.allAddressesList.filter(a => a.building === ea?.get('builidng')?.value)[0],
      screenings: this.currentTheatre.screenings
    };
    this.theatreService.updateTheatreName(<string>t.name,t)
    .subscribe(
      (nameUpdated:boolean) => {
        if(nameUpdated){
          this.theatreService.updateTheatreScreens(t.screens.toString(),t)
          .subscribe(
            (screensUpdated:boolean) => {
              if(screensUpdated){
                this.theatreService.updateTheatreAddress(t.address,t)
                .subscribe(
                  (addressUpdated:boolean) => {
                    if(addressUpdated){
                      alert('Theatre Address Updated Successfully!');
                      this.router.navigate(['/servicesList/theatreList']);
                    }
                    else {
                      alert(`Theatre address NOT Updated Successfully!`);
                    }
                  }
                );
              }
              else {
                alert(`Number of screens NOT Updated Successfully!`);
              }
            }
          );
        }
        else{
          alert(`Theatre Name NOT updated Successfully!`);
        }
      }
    );
  }


}
