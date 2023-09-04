import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Resolve } from '@angular/router';
import { Search } from 'src/interfaces/search';
import { LoginService } from 'src/services/login/login.service';
import { SearchService } from 'src/services/search/search.service';
@Injectable({
  providedIn: 'root'
})
export class SearchListResolverGuard implements Resolve<any> {
  constructor(private loginService:LoginService,
    private searchService:SearchService){}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<Search[]> {
    return this.searchService.getAllSearchesByUser(this.loginService.currentUser)
  }
  
}
