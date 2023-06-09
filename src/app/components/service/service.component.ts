import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/services/login/login.service';
import { MovieService } from 'src/services/movie/movie.service';
import { Movie } from 'src/interfaces/movie';
import { AddressService } from 'src/services/address/address.service';
import { Address } from 'src/interfaces/address';
@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  constructor(private loginService:LoginService,
    private movieService:MovieService,
    private addressService: AddressService) { }

  ngOnInit(): void {
  }
  loggedin:boolean = this.loginService.loggedin;
  adminLoggedin:boolean = this.loginService.adminLoggedIn;

  setEnabledMovies(){
    console.log("Set Enabled Movies Event Handler called!")
    this.movieService.getEnabledMovies()
    .subscribe( (data:Movie[]) => {
      this.movieService.movieList = data;
      console.log('data comming ->',data);
      console.log('Data set? ->',this.movieService.movieList);
    });
  }

  setAddressesList(){
    console.log("set Addresses List Event Handler Called!");
    this.addressService.getAllAddresses()
    .subscribe(
      (data:Address[]) =>{
        // this.addressService.allAddressesList = data;
        this.addressService.updateAllAddressesList(data);
        console.log('address data comming ->',data);
        console.log('all addresses list? ->',this.addressService.allAddressesList);
      }
    );
  }
}
