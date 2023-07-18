import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Resolve } from '@angular/router';
import { Movie } from 'src/interfaces/movie';
import { MovieService } from 'src/services/movie/movie.service';

@Injectable({
  providedIn: 'root'
})
export class MovieResolveGuard implements Resolve<Observable<Movie[]>> {



  constructor(private movieService: MovieService){}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<Movie[]> {
    return this.movieService.getAllMovies();
  }
  
}
