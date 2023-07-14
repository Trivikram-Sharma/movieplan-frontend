import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/services/login/login.service';
import { MovieService } from 'src/services/movie/movie.service';
import { Movie } from 'src/interfaces/movie';
import { AddressService } from 'src/services/address/address.service';
import { Address } from 'src/interfaces/address';
import { ShowtimeService } from 'src/services/showtime/showtime.service';
import { Showtime } from 'src/interfaces/showtime';
import { TheatreService } from 'src/services/theatre/theatre.service';
import { Theatre } from 'src/interfaces/theatre';
@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  constructor(private loginService:LoginService,
    private movieService:MovieService,
    private addressService: AddressService,
    private showtimeService: ShowtimeService,
    private theatreService: TheatreService) { }

  ngOnInit(): void {
  }
  loggedin:boolean = this.loginService.loggedin;
  adminLoggedin:boolean = this.loginService.adminLoggedIn;
  userLoggedin:boolean = this.loginService.userLoggedIn;

  setMovies(){
    console.log("Set Movies Event Handler called!");
    if(this.userLoggedin){

      this.movieService.getEnabledMovies()
      .subscribe( (data:Movie[]) => {
        this.movieService.setMovieList(data);
        console.log('enabled movies data comming ->',data);
        console.log('Data set? ->',this.movieService.movieList);
      });
    }
    else if(this.adminLoggedin){
      this.movieService.getAllMovies()
      .subscribe(
        (data:Movie[]) => {
        this.movieService.setMovieList(data);  
        console.log('all movies data comming ->',data);
        console.log('Data set? ->',this.movieService.movieList);
        }
      );
    }
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

  setShowTimeList(){
    console.log(`Set Show Time List Event Handler called!`);
    this.showtimeService.getAllShowTimes()
    .subscribe(
      (data:Showtime[]) => {
        this.showtimeService.allShowTimes = data;
        console.log('Is showtime data comming?->',data);
        console.log('All Showtime List? ->',this.showtimeService.allShowTimes);
      }
    );
  }

  setTheatreList(){
    console.log('Set Theatre List Event Handler Called!');
    this.theatreService.getAllTheatres()
    .subscribe(
      (data: Theatre[]) => {
        this.theatreService.setAllTheatreList(data);
        console.log(`Is theatre data comming? -> `,data);
        console.log(`All Theatres managed ->`,this.theatreService.allTheatreList);
      }
    );
  }
}
