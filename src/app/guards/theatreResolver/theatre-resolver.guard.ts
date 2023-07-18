import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Resolve, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, forkJoin,map,pipe } from 'rxjs';
import { Theatre } from 'src/interfaces/theatre';
import { ScreeningService } from 'src/services/screening/screening.service';
import { TheatreService } from 'src/services/theatre/theatre.service';

@Injectable({
  providedIn: 'root'
})
export class TheatreResolverGuard implements Resolve<Observable<any>> {
  constructor(private theatreService: TheatreService,
    private screeningService: ScreeningService){}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<any> {
    return forkJoin(
      this.theatreService.getAllTheatres(),
      this.screeningService.getAllScreenings()
    ).pipe(
      map(data => {
        return {theatres: data[0],screenings: data[1]};
      })
    );
  }
  
}
