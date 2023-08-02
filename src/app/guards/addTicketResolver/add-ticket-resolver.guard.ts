import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, forkJoin,map } from 'rxjs';
import { AddressService } from 'src/services/address/address.service';
import { LoginService } from 'src/services/login/login.service';
import { MovieService } from 'src/services/movie/movie.service';
import { ScreeningService } from 'src/services/screening/screening.service';
import { ShowtimeService } from 'src/services/showtime/showtime.service';
import { TheatreService } from 'src/services/theatre/theatre.service';
import { Resolve } from '@angular/router';
import { TicketService } from 'src/services/ticket/ticket.service';
@Injectable({
  providedIn: 'root'
})
export class AddTicketResolverGuard implements Resolve<any> {
  
  constructor(
    private loginService: LoginService,
    private movieService: MovieService,
    private screeningService: ScreeningService,
    private showtimeService: ShowtimeService,
    private theatreService: TheatreService,
    private addressService: AddressService,
    private ticketService: TicketService
  ){

  }
  
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<any> {
    return forkJoin(
      this.screeningService.getAllScreeningsWithMovie(this.movieService.getCurrentMovie()),
      this.showtimeService.getAllShowTimes(),
      this.theatreService.getAllTheatres(),
      this.ticketService.getAllTicketsByMovie(this.movieService.currentMovie)
    ).pipe(
      map(
        data => {
          return {
            screenings: data[0],
            showtimes: data[1],
            theatres: data[2],
            tickets: data[3]
          };
        }
      )
    );
  }
  
}
