import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Resolve, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Genre } from 'src/interfaces/genre';
import { GenreService } from 'src/services/genre/genre.service';

@Injectable({
  providedIn: 'root'
})
export class GenreResolverGuard implements Resolve<Observable<Genre[]>> {
  
  constructor(private genreService: GenreService){

  }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<Genre[]> {
      return this.genreService.getAllGenres();
    }
  
}
