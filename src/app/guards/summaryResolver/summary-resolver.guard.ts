import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Resolve, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, forkJoin, map } from 'rxjs';
import { ScreeningService } from 'src/services/screening/screening.service';
import { TicketService } from 'src/services/ticket/ticket.service';

@Injectable({
  providedIn: 'root'
})
export class SummaryResolverGuard implements Resolve<any> {
  constructor(private ticketService:TicketService,
    private screeningService:ScreeningService){}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<any> {
    return forkJoin(
      this.ticketService.getAllTickets(),
      this.screeningService.getAllScreenings()
    ).pipe(
      map(
        data => {
          return {tickets: data[0],screenings: data[1]}
        }
      )
    );
  }
  
}
