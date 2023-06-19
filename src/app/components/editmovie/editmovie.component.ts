import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { MovieService } from 'src/services/movie/movie.service';
import { Movie } from 'src/interfaces/movie';
import { GenreService } from 'src/services/genre/genre.service';
import { Genre } from 'src/interfaces/genre';
@Component({
  selector: 'app-editmovie',
  templateUrl: './editmovie.component.html',
  styleUrls: ['./editmovie.component.css']
})
export class EditmovieComponent implements OnInit {

  constructor(private movieService: MovieService,
    private genreService: GenreService) { }

  ngOnInit(): void {
  }

  currentMovie:Movie = this.movieService.currentMovie;
  movieEdited:boolean = false;
  editMovieForm = new FormGroup({
    title: new FormControl(this.currentMovie.title),
    price: new FormControl(this.currentMovie.price),
    language: new FormControl(this.currentMovie.language),
    description: new FormControl(this.currentMovie.description),
    releaseDate: new FormControl(this.currentMovie.releaseDate),
    status: new FormControl(this.currentMovie.status),
    genres: new FormArray(this.currentMovie.genres.map(
      x => new FormControl(x)
    ))
  });

  genrelist:Genre[] = [];
  allGenres(){
    this.genreService.getAllGenres()
    .subscribe( (data:Genre[]) => this.genrelist = data );
    return this.genrelist;
  }

  removeGenre(i:number){
    (<FormArray>this.editMovieForm.get('genres')).removeAt(i);
  }
  editMovie(){
        
  }
}
