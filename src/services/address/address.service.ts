import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import addressapi from 'src/api-constants/addressapi';
import { Address } from 'src/interfaces/address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private httpClient: HttpClient) { }
  currentAddress:Address|null = null;
  allAddressesList:Address[] = [];



  setCurrentAddress(address:Address){
    this.currentAddress = address;
  }
  getCurrentAddress(){
    return this.currentAddress;
  }
  updateAllAddressesList(addressList:Address[]){
    console.log('addressList argument in service ->',addressList);
    this.allAddressesList = addressList;
    console.log('this.allAddressesList ->',this.allAddressesList);
  }
  getAllAddressesList(){
    return this.allAddressesList;
  }

  getAddress(doorNo:string){
    return this.httpClient.get<Address>(addressapi.getAddress+`/${doorNo}`);
  }

  getAllAddresses(){
    return this.httpClient.get<Address[]>(addressapi.getAllAddresses);
  }
  
  getAllAddressesWithStreet(street:string){
    return this.httpClient.get<Address[]>(addressapi.getAllAddressesWithStreet+`?street=${street}`);
  }
  getAllAddressesWithArea(area:string){
    return this.httpClient.get<Address[]>(addressapi.getAllAddressesWithArea+`?area=${area}`);
  }
  getAllAddressesInCity(city:string){
    return this.httpClient.get<Address[]>(addressapi.getAllAddressesWithCity+`?city=${city}`);
  }
  getAllAddressesInState(state:string){
    return this.httpClient.get<Address[]>(addressapi.getAllAddressesWithState+`?state=${state}`);
  }
  getAllAddressesInCountry(country:string){
    return this.httpClient.get<Address[]>(addressapi.getAllAddressesWithCountry+`?country=${country}`);
  }
  getAllAddressesWithPincode(pincode:string){
    return this.httpClient.get<Address[]>(addressapi.getAllAddressesWithPincode+`?pincode=${pincode}`);
  }
  //update methods
  addAddress(address:Address){
    return this.httpClient.post<boolean>(addressapi.addAddress,address);
  }

  updateAddress(address:Address, building:string){
    return this.httpClient.patch<Address>(addressapi.updateAddress+`/${building}`,address);
  }
  updateAddressStreet(building:string,street:string){
    return this.httpClient.patch<boolean>(addressapi.updateAddressStreet+`/${building}?street=${street}`,street);
  }
  updateAddressArea(building:string,area:string){
    return this.httpClient.patch<boolean>(addressapi.updateAddressArea+`/${building}?area=${area}`,area);
  }
  
  updateAddressCity(building:string,city:string){
    return this.httpClient.patch<boolean>(addressapi.updateAddress+`/${building}?city=${city}`,city);
    
  }
  
  updateAddressState(building:string,state:string){
    return this.httpClient.patch<boolean>(addressapi.updateAddress+`/${building}?state=${state}`,state);
    
  }
  
  updateAddressCountry(building:string,country:string){
    return this.httpClient.patch<boolean>(addressapi.updateAddress+`/${building}?country=${country}`,country);
    
  }
  
  updateAddressPincode(building:string,pincode:string){
    return this.httpClient.patch<boolean>(addressapi.updateAddress+`/${building}?pincode=${pincode}`,pincode);

  }

  //DELETE APIs
  deleteAddress(building:string){
    return this.httpClient.delete<boolean>(addressapi.deleteAddress+`/${building}`);
  }

  deleteAddressesWithStreet(street:string){
    return this.httpClient.delete<boolean>(addressapi.deleteAddressesWithStreet+`?street=${street}`);
  }
  deleteAddressesWithArea(area:string){
    return this.httpClient.delete<boolean>(addressapi.deleteAddressesWithArea+`?area=${area}`);
    
  }
  deleteAddressesWithCity(city:string){
    return this.httpClient.delete<boolean>(addressapi.deleteAddressesWithCity+`?city=${city}`);
    
  }
  deleteAddressesWithState(state:string){
    return this.httpClient.delete<boolean>(addressapi.deleteAddressesWithState+`?state=${state}`);
    
  }
  deleteAddressesWithCountry(country:string){
    return this.httpClient.delete<boolean>(addressapi.deleteAddressesWithCountry+`?country=${country}`);
    
  }
  deleteAddressesWithPincode(pincode:string){
    return this.httpClient.delete<boolean>(addressapi.deleteAddressWithPincode+`?pincode=${pincode}`);

  }
}
