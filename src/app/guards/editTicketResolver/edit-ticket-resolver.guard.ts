import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Resolve, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, forkJoin, map } from 'rxjs';
import { CartService } from 'src/services/cart/cart.service';
import { ScreeningService } from 'src/services/screening/screening.service';
import { ShowtimeService } from 'src/services/showtime/showtime.service';
import { TheatreService } from 'src/services/theatre/theatre.service';
import { Ticket } from 'src/interfaces/ticket';
import { TicketService } from 'src/services/ticket/ticket.service';
@Injectable({
  providedIn: 'root'
})
export class EditTicketResolverGuard implements Resolve<any> {

  constructor(
    private screeningService:ScreeningService,
    private theatreService: TheatreService,
    private showtimeService: ShowtimeService,
    private cartService: CartService,
    private ticketService: TicketService
  ){}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<any> {
    return forkJoin(
      this.screeningService.getAllScreenings(),
      this.showtimeService.getAllShowTimes(),
      this.theatreService.getAllTheatres(),
      this.ticketService.getAllTickets()
    ).pipe(
      map(
        data => {
          return {
            currentTicket: <Ticket>this.cartService.getCurrentTickets().at(<number>this.cartService.getCurrentIndex()),
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
