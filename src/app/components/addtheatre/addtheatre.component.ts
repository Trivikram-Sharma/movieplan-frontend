import { Component, OnInit } from '@angular/core';
import { Address } from 'src/interfaces/address';
import { AddressService } from 'src/services/address/address.service';
import { TheatreService } from 'src/services/theatre/theatre.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Screening } from 'src/interfaces/screening';
import { Theatre } from 'src/interfaces/theatre';
import { Router } from '@angular/router';
@Component({
  selector: 'app-addtheatre',
  templateUrl: './addtheatre.component.html',
  styleUrls: ['./addtheatre.component.css']
})
export class AddtheatreComponent implements OnInit {

  constructor(private theatreService:TheatreService,
    private addressService: AddressService,
    private router: Router) { }

  ngOnInit(): void {
  }
  allAddressesList: Address[] = this.addressService.getAllAddressesList();
  addTheatreForm = new FormGroup(
    {
      id: new FormControl({value:'',disabled: true}),
      name: new FormControl('',Validators.required),
      screens: new FormControl(0,Validators.required),
      address: new FormGroup({
        country: new FormControl('')
      })
    }
  );
  buildingListFiltered:Address[] = [];
  streetListFiltered:Address[] = [];
  areaListFiltered:Address[] = [];
  cityListFiltered:Address[] = [];
  stateListFiltered:Address[] = [];
  

  get containsCountry(){
    return this.addTheatreForm.contains('country');
  }
  get containsState(){
    return this.addTheatreForm.contains('state')
  }
  get containsCity(){
    return this.addTheatreForm.contains('city')
  }
  get containsArea(){
    return this.addTheatreForm.contains('area')
  }
  get containsStreet(){
    return this.addTheatreForm.contains('street')
  }
  get containsBuilding(){
    return this.addTheatreForm.contains('building')
  }



  spinUpBuildings(){
    let addressgroup = <FormGroup>this.addTheatreForm.get('address');
    if(addressgroup.contains('building')){
      addressgroup.get('building')?.reset();
    }
    else {
      (<FormGroup>this.addTheatreForm.get('address')).addControl('building',new FormControl(''));
    }
    this.buildingListFiltered = this.allAddressesList.filter(a => a.street===<string>addressgroup.get('street')?.value)
  }
  spinUpStreets(){
    let addressgroup = <FormGroup>this.addTheatreForm.get('address');
    if(addressgroup.contains('street')){
      addressgroup.get('street')?.reset();
    }
    else{
      (<FormGroup>this.addTheatreForm.get('address')).addControl('street',new FormControl(''));
    }
    this.streetListFiltered = this.allAddressesList.filter( a => a.area === <string>addressgroup.get('area')?.value)
    this.spinUpBuildings();
  }
  spinUpAreas(){
    let addressgroup = <FormGroup>this.addTheatreForm.get('address');
    if(addressgroup.contains('area')){
      addressgroup.get('area')?.reset();
    }
    else {
      (<FormGroup>this.addTheatreForm.get('address')).addControl('area',new FormControl(''))
    }
    this.areaListFiltered = this.allAddressesList.filter(a => a.city === <string>addressgroup.get('city')?.value);
    this.spinUpStreets();
  }
  spinUpCities(){
    let addressgroup = <FormGroup>this.addTheatreForm.get('address');
    if(addressgroup.contains('city')){
      addressgroup.get('city')?.reset();
    }
    else{
      (<FormGroup>this.addTheatreForm.get('address')).addControl('city', new FormControl(''));
    }
    
    this.cityListFiltered = this.allAddressesList.filter(a => a.state === <string>addressgroup.get('state')?.value);
    this.spinUpAreas();
  }
  
  spinUpStates(){
    let addressgroup = <FormGroup>this.addTheatreForm.get('address');
    if(addressgroup.contains('state')){
      addressgroup.get('state')?.reset();
    }
    else{
      (<FormGroup>this.addTheatreForm.get('address')).addControl('state', new FormControl(''));
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


  addTheatre(){
    let addr = this.addTheatreForm.get('address');
    let t:Theatre = {
      name: <string>this.addTheatreForm.get('name')?.value,
      screens: <Number>this.addTheatreForm.get('screens')?.value,
      address: this.allAddressesList.filter(a => a.building === addr?.get('building')?.value)[0],
      screenings: []
    };
    this.theatreService.addTheatre(t)
    .subscribe(
      (theatreAdded:boolean) => {
        if(theatreAdded){
          alert(`Theatre Added Successfully!`);
          this.router.navigate(['/servicesList/theatreList']);
        }
        else {
          alert(`Theatre NOT Added Successfully!`);
        }
      }
    );
  }

}
