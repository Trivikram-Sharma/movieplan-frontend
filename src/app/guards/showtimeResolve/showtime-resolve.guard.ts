import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Resolve, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, forkJoin,map } from 'rxjs';
import { Showtime } from 'src/interfaces/showtime';
import { ScreeningService } from 'src/services/screening/screening.service';
import { ShowtimeService } from 'src/services/showtime/showtime.service';

@Injectable({
  providedIn: 'root'
})
export class ShowtimeResolveGuard implements Resolve<Observable<any>> {
  constructor(private showtimeService: ShowtimeService,
    private screeningService: ScreeningService){

  }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<any> {
    return forkJoin(
      this.showtimeService.getAllShowTimes(),
      this.screeningService.getAllScreenings()
    ).pipe(
      map(data => {
        return {showtimes: data[0],screenings: data[1]};
      })
    ); 
  }
  
}
