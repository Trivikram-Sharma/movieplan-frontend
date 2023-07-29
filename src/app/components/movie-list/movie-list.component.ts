import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Admin } from 'src/interfaces/admin';
import { Movie } from 'src/interfaces/movie';
import { GenreService } from 'src/services/genre/genre.service';
import { LoginService } from 'src/services/login/login.service';
import { MovieService } from 'src/services/movie/movie.service';
import { Genre } from 'src/interfaces/genre';
import { User } from 'src/interfaces/user';
@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  movieList:Movie[] = [];
  constructor(private loginService:LoginService, 
    private router: Router,
    private movieService: MovieService,
    private genreService: GenreService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // this.movieService.getEnabledMovies().subscribe((data:Movie[]) => this.movieList = data );
    this.activatedRoute.data.forEach(
      data => {
        if(this.loginService.adminLoggedIn){
          this.movieList = data['movieObservable'];
        }
        else if(this.loginService.userLoggedIn){
          this.movieList = data['movieObservable'].filter((m:Movie) => m.status === 'enabled');
        }
      }
    );
  }

  loggedin:boolean = this.loginService.loggedin;
  adminLoggedIn:boolean = this.loginService.currentAdmin;
  userLoggedIn:User = this.loginService.currentUser;
  // movieList:Movie[] = this.movieService.getMovieList();
  movieForm = new FormGroup({})
  // getMovieList(){
  //   this.movieService.getEnabledMovies()
  //   .subscribe(
  //     (data:Movie[]) => this.movieList = data
  //   );
  //   if(this.movieList.length === 0){
  //     return [];
  //   }
  //   else {
  //     return this.movieList;
  //   }
    
  // }
  async redirectToAddMovie(){
    let genrelist: Genre[] = [];
    this.genreService.getAllGenres()
    .subscribe( (data:Genre[]) => {
      genrelist = data;
      this.genreService.setAllGenreList(genrelist);
    });
    this.router.navigate(['/servicesList/addMovie']);
    //this.genreService.allGenreList = genrelist;
  }
  
  toggleMovieEdit(movie:Movie){
    this.movieService.setCurrentMovie(movie);
    this.genreService.getAllGenres()
    .subscribe( (data:Genre[]) => {
        this.genreService.setAllGenreList(data);
        console.log('allGenreList set successfully? ->',this.genreService.allGenreList);
        this.router.navigate(['/servicesList/editMovie']);
      });
  }

  deleteMovie(movie:Movie){
    this.movieService.deleteMovie(<string>movie.id)
    .subscribe(
      (data:boolean) => {
        if(data) {
          alert(`Movie ${movie.title} deleted Successfully!`);
          this.router.navigate(['/servicesList/movieList']);
        }
        else {
          alert(`Movie ${movie.title} NOT deleted Successfully! Please check the backend.`);
          this.router.navigate(['/servicesList/movieList']);

        }
      }
    );
  }



  bookTicket(m:Movie){
    this.movieService.setCurrentMovie(m);
    this.router.navigate(['/servicesList/addTicket']);
  }
}
