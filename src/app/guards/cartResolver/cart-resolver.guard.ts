import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Resolve, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, forkJoin, map } from 'rxjs';
import { CartService } from 'src/services/cart/cart.service';
import { LoginService } from 'src/services/login/login.service';
import { ScreeningService } from 'src/services/screening/screening.service';
import { TheatreService } from 'src/services/theatre/theatre.service';
import { TicketService } from 'src/services/ticket/ticket.service';

@Injectable({
  providedIn: 'root'
})
export class CartResolverGuard implements Resolve<any> {
  constructor(
    private loginService: LoginService,
    private cartService: CartService,
    private ticketService: TicketService,
    private theatreService: TheatreService,
    private screeningService: ScreeningService
  ){}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<any> {
    return forkJoin(
      
      []
    ).pipe(
      map(
        data => {
          return {
            currentTickets: this.cartService.getCurrentTickets(),
            currentUser: this.loginService.currentUser
          };
        }
      )
    );
  }
  
}
