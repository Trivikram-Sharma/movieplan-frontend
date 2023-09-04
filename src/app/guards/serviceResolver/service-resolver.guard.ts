import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, forkJoin, map } from 'rxjs';
import { ScreeningService } from 'src/services/screening/screening.service';
import { Resolve } from '@angular/router';
import { SearchService } from 'src/services/search/search.service';
import { TicketService } from 'src/services/ticket/ticket.service';
import { LoginService } from 'src/services/login/login.service';
import { Search } from 'src/interfaces/search';
@Injectable({
  providedIn: 'root'
})
export class ServiceResolverGuard implements Resolve<any> {
  constructor(private screeningService:ScreeningService,
    private searchService: SearchService,
    private ticketService: TicketService,
    private loginService: LoginService){}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<any> {



    return forkJoin([
      this.screeningService.getAllScreenings(),
      this.ticketService.getTicketsByUser(this.loginService.currentUser),
      this.searchService.getAllSearchesByUser(this.loginService.currentUser),
      this.searchService.getAllFilterSets()
    ]
    )
    .pipe(
      map(data => {
        return {screenings: data[0], userTickets: data[1],userSearches:<Search[]>data[2],filterSets:data[3]};
      })
    );
  }
  
}
