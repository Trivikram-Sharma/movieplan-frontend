import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Resolve, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, forkJoin, map } from 'rxjs';
import { LoginService } from 'src/services/login/login.service';
import { PaymentService } from 'src/services/payment/payment.service';
import { TicketService } from 'src/services/ticket/ticket.service';

@Injectable({
  providedIn: 'root'
})
export class PurchaseHistoryResolverGuard implements Resolve<any> {
  constructor(private loginService: LoginService,
    private paymentService: PaymentService,
    private ticketService: TicketService){}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<any> {
      return forkJoin(
        [
          this.paymentService.getPaymentWithUserId(this.loginService.currentUser.userName),
          this.ticketService.getAllTickets()
        ]
      ).pipe(
        map(
          data => {
            return {payments: data[0],tickets: data[1]};
          }
        )
      );
      
  }
  
}
