import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Ticket } from 'src/interfaces/ticket';
import { TicketService } from 'src/services/ticket/ticket.service';
import { LoginService } from 'src/services/login/login.service';
import { Resolve } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class TicketListResolverGuard implements Resolve<Ticket[]> {
  constructor(private ticketService: TicketService,
    private loginService: LoginService){}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<Ticket[]> {
    return this.ticketService.getTicketsByUser(this.loginService.currentUser);
  }
  
}
