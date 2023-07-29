import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Screening } from 'src/interfaces/screening';
import { LoginService } from 'src/services/login/login.service';
import { MovieService } from 'src/services/movie/movie.service';
import { ScreeningService } from 'src/services/screening/screening.service';
import { User } from 'src/interfaces/user';
import { Movie } from 'src/interfaces/movie';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Showtime } from 'src/interfaces/showtime';
import { Theatre } from 'src/interfaces/theatre';
import { Ticket } from 'src/interfaces/ticket';
import { CartService } from 'src/services/cart/cart.service';
@Component({
  selector: 'app-addticket',
  templateUrl: './addticket.component.html',
  styleUrls: ['./addticket.component.css']
})
export class AddticketComponent implements OnInit {
  allScreeningsList: Screening[] = [];
  allShowtimeList: Showtime[] = [];
  allTheatreList: Theatre[] = [];
  allMovieTicketList: Ticket[] = [];
  constructor(private activatedRoute: ActivatedRoute,
    private loginService: LoginService,
    private movieService:MovieService,
    private screeningService:ScreeningService,
    private cartService: CartService,
    private router: Router) { }
    currentUser:User = this.loginService.currentUser;
    currentMovie:Movie = this.movieService.getCurrentMovie();

  ngOnInit(): void {
    this.activatedRoute.data.forEach(
      data => {
        this.allScreeningsList = data['data']['screenings']
        this.allShowtimeList = data['data']['showtimes']
        this.allTheatreList = data['data']['theatres']
        this.allMovieTicketList = data['data']['tickets']
      }
    );
  }
  atF = new FormGroup({
    user: new FormControl({value:this.currentUser.name,disabled:true}),
    movie: new FormControl({value: this.currentMovie.title, disabled: true}),
    date: new FormControl('',Validators.required),
    showtime: new FormControl('',Validators.required),
    theatre: new FormControl('',Validators.required)
  });

  


  addTicket(){
    let t:Ticket;
    let selectedScreening:Screening;
    let resultantScreenings:Screening[]
    = this.allScreeningsList.filter(
      sc => sc.date.toString() == <string>this.atF.get('date')?.value
            && sc.movie.title == <string>this.atF.get('movie')?.value
            && sc.movie.id == this.currentMovie.id
            && sc.showTime.id == parseInt(<string>this.atF.get('showtime')?.value)
            && sc.theatre.id == parseInt(<string>this.atF.get('theatre')?.value)
    );
    let sh:Showtime = this.allShowtimeList.filter(st => st.id == parseInt(<string>this.atF.get('showtime')?.value))[0];
    let th:Theatre = this.allTheatreList.filter(th => th.id == parseInt(<string>this.atF.get('theatre')?.value))[0];
    if(resultantScreenings.length <= 0){
      alert(`No such movies being screened on ${this.atF.get('date')?.value} at ${sh.showName} in ${th.name}, ${th.address.area} ${th.address.city}!
      Please check the date, show timings and the theatre of interest, to try again.`);
    }
    else if(resultantScreenings.length == 1){
      selectedScreening = resultantScreenings[0];
      t  = {
        user: this.currentUser,
        screening: selectedScreening
      };
      this.cartService.addTicketToCart(t);
      this.router.navigate(['/servicesList/cart']);
    }
    else {
      selectedScreening = resultantScreenings.reduce(
        (prevScreening,currScreening):Screening => {
          let prevTickets = this.allMovieTicketList.filter(t => t.screening.id === prevScreening.id).length;
          let currTickets = this.allMovieTicketList.filter(t => t.screening.id === currScreening.id).length;
          if(prevTickets < currTickets){
            return prevScreening;
          }
          else {
            return currScreening;
          }
        }
        );
        t  = {
          user: this.currentUser,
          screening: selectedScreening
        };
        this.cartService.addTicketToCart(t);
        this.router.navigate(['/servicesList/cart']);
    }
  }
}