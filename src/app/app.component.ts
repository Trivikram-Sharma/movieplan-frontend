import { Component } from '@angular/core';
import { Movie } from 'src/interfaces/movie';
import { MovieService } from 'src/services/movie/movie.service';
import { ToastService } from 'src/services/toast/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private toastService: ToastService,
    private movieService:MovieService){}
  title = 'movieplan-frontend';

    message:any = this.toastService.getMessage();
    show:string = this.toastService.getShow();
  setMovies(){
    this.movieService.getEnabledMovies()
    .subscribe(
      (data:Movie[]) =>{
        this.movieService.movieList = data;
      }
    );
  }
}
