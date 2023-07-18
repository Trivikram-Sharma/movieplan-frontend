import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Resolve, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Screening } from 'src/interfaces/screening';
import { ScreeningService } from 'src/services/screening/screening.service';

@Injectable({
  providedIn: 'root'
})
export class ScreeningListResolveGuard implements Resolve<Observable<Screening[]>> {
  
  constructor(private screeningService:ScreeningService){}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<Screening[]> {
    return this.screeningService.getAllScreenings();
  }
  
}
