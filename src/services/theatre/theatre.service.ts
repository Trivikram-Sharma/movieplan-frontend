import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Theatre } from 'src/interfaces/theatre';
import theatreapi from 'src/api-constants/theatreapi';
import { Address } from 'src/interfaces/address';
@Injectable({
  providedIn: 'root'
})
export class TheatreService {

  constructor(private httpClient: HttpClient) { }

  currentTheatre:any;
  allTheatreList: Theatre[] = [];

  //UTILITY METHODS FOR CROSS COMPONENT COMMUNICATION
  setCurrentTheatre(theatre:Theatre){
    this.currentTheatre = theatre;
  }
  getCurrentTheatre(){
    return this.currentTheatre;
  }
  setAllTheatreList(theatres:Theatre[]){
    this.allTheatreList = theatres;
  }
  getAllTheatreList(){
    return this.allTheatreList;
  }




  /*API CALLS SERVICE METHODS*/


  //POST METHODS (ADD METHODS)

  addTheatre(theatre:Theatre){
    return this.httpClient.post<boolean>(theatreapi.addTheatre,theatre);
  }


  //READ METHODS
  getAllTheatres(){
    return this.httpClient.get<Theatre[]>(theatreapi.getAllTheatres);
  }

  getTheatreWithId(id:string){
    return this.httpClient.get<Theatre>(theatreapi.getTheatreWithId+`/${id}`);
  }

  getTheatreWithName(name:string){
    return this.httpClient.get<Theatre[]>(theatreapi.getTheatreWithName+`/${name}`);
  }
  getTheatreWithScreens(screens:string){
    return this.httpClient.get<Theatre[]>(theatreapi.getTheatreWithScreens+`/${screens}`);
  }
  getTheatreWithAddress(address:Address){
    let addressString = `${address.building}
    ${address.street}
    ${address.area}
    ${address.city}
    ${address.state}
    ${address.country}
    ${address.pincode}.`;
    return this.httpClient.get<Theatre[]>(theatreapi.getTheatreWithAddress+`/${addressString}`);
  }

  //UPDATE METHODS
  updateTheatreName(name:string,theatre:Theatre){
    return this.httpClient.patch<boolean>(theatreapi.updateTheatreName+`/${theatre.id}?name=${name}`,name);
  }

  updateTheatreScreens(screens:string,theatre:Theatre){
    return this.httpClient.patch<boolean>(theatreapi.updateTheatreScreens+`/${theatre.id}?screen=${screens}`,screens);
  }

  updateTheatreAddress(address:Address,theatre:Theatre){
    return this.httpClient.patch<boolean>(theatreapi.updateTheatreAddress+`/${theatre.id}`,address);
  }

  //DELETE APIs

  deleteAlltheatreScreens(theatre:Theatre){
    return this.httpClient.delete<boolean>(theatreapi.deleteAllTheatreScreens+`/${theatre.id}`);
  }
  deleteTheatre(theatre:Theatre){
    return this.httpClient.delete<boolean>(theatreapi.deleteTheatre+`/${theatre.id}`);
  }


}
