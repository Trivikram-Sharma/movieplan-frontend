import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Resolve, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs';
import { MovieService } from 'src/services/movie/movie.service';
import { ShowtimeService } from 'src/services/showtime/showtime.service';
import { TheatreService } from 'src/services/theatre/theatre.service';

@Injectable({
  providedIn: 'root'
})
export class AddScreeningResolveGuard implements Resolve<any> {
  constructor(private theatreService: TheatreService,
    private movieService: MovieService,
    private showtimeService: ShowtimeService){}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<any> {
    return forkJoin(
      this.theatreService.getAllTheatres(),
      this.movieService.getEnabledMovies(),
      this.showtimeService.getAllShowTimes()
    ).pipe(
      map( data => {
        return {theatres: data[0],movies: data[1],showtimes:data[2]};
      })
    );
  }
  
}
