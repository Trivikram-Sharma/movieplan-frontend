import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddressService } from 'src/services/address/address.service';
import { TheatreService } from 'src/services/theatre/theatre.service';
import { Theatre } from 'src/interfaces/theatre';
import { Address } from 'src/interfaces/address';
import { Screening } from 'src/interfaces/screening';
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
  buildingListFiltered:Address[] = [];
  streetListFiltered:Address[] = [];
  areaListFiltered:Address[] = [];
  cityListFiltered:Address[] = [];
  stateListFiltered:Address[] = [];
  

  get containsCountry(){
    return this.editTheatreForm.contains('country');
  }
  get containsState(){
    return this.editTheatreForm.contains('state')
  }
  get containsCity(){
    return this.editTheatreForm.contains('city')
  }
  get containsArea(){
    return this.editTheatreForm.contains('area')
  }
  get containsStreet(){
    return this.editTheatreForm.contains('street')
  }
  get containsBuilding(){
    return this.editTheatreForm.contains('building')
  }

  filteredAddresses:Address[] = [];


  spinUpBuildings(){
    let addressgroup = <FormGroup>this.editTheatreForm.get('address');
    if(addressgroup.contains('building')){
      addressgroup.get('building')?.reset();
    }
    else {
      (<FormGroup>this.editTheatreForm.get('address')).addControl('building',new FormControl(''));
    }
    this.buildingListFiltered = this.allAddressesList.filter(a => a.street===<string>addressgroup.get('street')?.value)
  }
  spinUpStreets(){
    let addressgroup = <FormGroup>this.editTheatreForm.get('address');
    if(addressgroup.contains('street')){
      addressgroup.get('street')?.reset();
    }
    else{
      (<FormGroup>this.editTheatreForm.get('address')).addControl('street',new FormControl(''));
    }
    this.streetListFiltered = this.allAddressesList.filter( a => a.area === <string>addressgroup.get('area')?.value)
    this.spinUpBuildings();
  }
  spinUpAreas(){
    let addressgroup = <FormGroup>this.editTheatreForm.get('address');
    if(addressgroup.contains('area')){
      addressgroup.get('area')?.reset();
    }
    else {
      (<FormGroup>this.editTheatreForm.get('address')).addControl('area',new FormControl(''))
    }
    this.areaListFiltered = this.allAddressesList.filter(a => a.city === <string>addressgroup.get('city')?.value);
    this.spinUpStreets();
  }
  spinUpCities(){
    let addressgroup = <FormGroup>this.editTheatreForm.get('address');
    if(addressgroup.contains('city')){
      addressgroup.get('city')?.reset();
    }
    else{
      (<FormGroup>this.editTheatreForm.get('address')).addControl('city', new FormControl(''));
    }
    
    this.cityListFiltered = this.allAddressesList.filter(a => a.state === <string>addressgroup.get('state')?.value);
    this.spinUpAreas();
  }
  
  spinUpStates(){
    let addressgroup = <FormGroup>this.editTheatreForm.get('address');
    if(addressgroup.contains('state')){
      addressgroup.get('state')?.reset();
    }
    else{
      (<FormGroup>this.editTheatreForm.get('address')).addControl('state', new FormControl(''));
    }
    this.stateListFiltered = this.allAddressesList.filter(a => a.country === <string>addressgroup.get('country')?.value);
    this.spinUpCities();
  }

  screeningGroups(screenings:Screening[]):string{
    if(screenings){
      return screenings.map(s => s.movie.title).join(',');
    }
    else {
      return '';
    }
  }
  
  editTheatre(){
    let ea = this.editTheatreForm.get('address');
    let t:Theatre = {
      id: <Number>this.editTheatreForm.get('id')?.value,
      name: <string>this.editTheatreForm.get('name')?.value,
      screens: <Number>this.editTheatreForm.get('screens')?.value,
      address: this.allAddressesList.filter(a => a.building === ea?.get('building')?.value)[0],
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
