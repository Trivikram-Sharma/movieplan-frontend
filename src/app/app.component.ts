import { Component } from '@angular/core';
import { Movie } from 'src/interfaces/movie';
import { MovieService } from 'src/services/movie/movie.service';
import { ToastService } from 'src/services/toast/toast.service';
import { LoginService } from 'src/services/login/login.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private toastService: ToastService,
    private movieService:MovieService,
    private loginService: LoginService){}
  title = 'movieplan-frontend';

    message:any = this.toastService.getMessage();
    show:string = this.toastService.getShow();
  setMovies(){
    if(this.loginService.userLoggedIn){

      this.movieService.getEnabledMovies()
      .subscribe(
        (data:Movie[]) =>{
          this.movieService.movieList = data;
        }
      );
    }
    else if(this.loginService.adminLoggedIn){
      this.movieService.getAllMovies()
      .subscribe(
        (data:Movie[]) => {
          this.movieService.movieList = data;
        }
      );
    }
  }
}
