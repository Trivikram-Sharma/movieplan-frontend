import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from 'src/interfaces/admin';
import { Movie } from 'src/interfaces/movie';
import { GenreService } from 'src/services/genre/genre.service';
import { LoginService } from 'src/services/login/login.service';
import { MovieService } from 'src/services/movie/movie.service';
import { Genre } from 'src/interfaces/genre';
@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  constructor(private loginService:LoginService, 
    private router: Router,
    private movieService: MovieService,
    private genreService: GenreService) { }

  ngOnInit(): void {
    this.movieService.getEnabledMovies().subscribe((data:Movie[]) => this.movieList = data );
  }

  loggedin:boolean = this.loginService.loggedin;
  adminLoggedIn:boolean = this.loginService.currentAdmin;
  movieList:Movie[] = this.movieService.movieList;
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
    //this.genreService.allGenreList = genrelist;
    this.router.navigate(['/servicesList/addMovie']);
  }

  toggleMovieEdit(movie:Movie){
    this.movieService.setCurrentMovie(movie);
    this.router.navigate(['/servicesList/editMovie'])
  }
}
