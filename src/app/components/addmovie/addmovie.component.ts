import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { GenreService } from 'src/services/genre/genre.service';
import { Genre } from 'src/interfaces/genre';
import { MovieService } from 'src/services/movie/movie.service';
import { Movie } from 'src/interfaces/movie';
import { Screening } from 'src/interfaces/screening';
import { Router } from '@angular/router';
@Component({
  selector: 'app-addmovie',
  templateUrl: './addmovie.component.html',
  styleUrls: ['./addmovie.component.css']
})
export class AddmovieComponent implements OnInit {

  constructor(private genreService: GenreService,
     private movieService: MovieService,
     private router: Router) { }

  ngOnInit(): void {
  }

  addMovieForm = new FormGroup({
    id : new FormControl({value:'', disabled: true}),
    title: new FormControl(''),
    price: new FormControl(''),
    language: new FormControl(''),
    movieposter: new FormControl(''),
    description: new FormControl(''),
    releaseDate: new FormControl(''),
    status: new FormControl(''),
    genres: new FormArray([new FormControl('')])
  });

  message:any;

  get genreControls(){
    return (<FormArray>this.addMovieForm.get('genres')).controls;
  }
  allGenres(){
    this.genreService.getAllGenres()
    .subscribe( (data:Genre[]) => this.message = data);
    return this.message;
  }

  addGenre(){
    (<FormArray>this.addMovieForm.get('genres')).push(new FormControl(''));
  }

  removeGenre(i:number){
    (<FormArray>this.addMovieForm.get('genres')).removeAt(i);
  }
  
  submitAddMovie(){
    let title:string|null|undefined = this.addMovieForm.get('title')?.value;
    let language:string|null|undefined = this.addMovieForm.get('language')?.value;
    let description:string|null|undefined = this.addMovieForm.get('description')?.value;
    let releaseDate:string|null|undefined = this.addMovieForm.get('releaseDate')?.value;
    let responseid="";
    this.movieService.getLatestMovieId(title, description,language,releaseDate)
    .subscribe( (data:string) => responseid = data);
    if(responseid!==""){
      this.addMovieForm.get('id')?.setValue(responseid);
      let genrelist: Genre[] = [];
      this.addMovieForm.get('genres')?.value.map(
        genrename => this.genreService.getGenreByName(<string>genrename).subscribe(
          (data: Genre[]) => genrelist.push(data[0])
        )
      );
      let m:Movie = {
        id: responseid,
        title: <string>title,
        price: parseInt(<string>this.addMovieForm.get('price')?.value),
        language: <string>language,
        description: <string>description,
        releaseDate: new Date(<string>releaseDate),
        status: <string>this.addMovieForm.get('status')?.value,
        genres: genrelist,
        screenings: []
      };
      let movieadded = false;
       this.movieService.addMovie(m)
       .subscribe((data:boolean) => movieadded = data);
       if(movieadded){
        this.router.navigate(['/servicesList/movieList']);
       }
       else {
        return;
       }
    }
    else {
      console.log("NO ID received from API Response!");
      return;
    }
  }
}
