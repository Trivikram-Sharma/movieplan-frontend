import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Resolve, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, forkJoin, map } from 'rxjs';
import { Ticket } from 'src/interfaces/ticket';
import { CartService } from 'src/services/cart/cart.service';
import { PaymentService } from 'src/services/payment/payment.service';
import { ScreeningService } from 'src/services/screening/screening.service';
import { TicketService } from 'src/services/ticket/ticket.service';

@Injectable({
  providedIn: 'root'
})
export class SummaryResolverGuard implements Resolve<any> {
  constructor(private ticketService:TicketService,
    private screeningService:ScreeningService,
    private cartService: CartService,
    private paymentService: PaymentService){}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<any> {
    let confirmedTickets:Ticket[] = this.cartService.getCurrentTickets()
    .map(
      ct => {
        ct.payment = this.paymentService.getCurrentPayment();
        return ct;
      }
    );
    return forkJoin([
      ...confirmedTickets.map(
        ctkt => this.ticketService.purchaseTicket(ctkt)
      ),
      this.ticketService.getAllTickets(),
      this.screeningService.getAllScreenings(),
    ]
    ).pipe(
      map(
        data => {
          return {
            savedTickets: data.slice(0,confirmedTickets.length),
            tickets: data.slice(-2)[0],
            screenings: data.slice(-1)[0]
          }
        }
      )
    );
  }
  
}
