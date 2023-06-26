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
  responseid:string = "";
  genrelist:Genre[] = [];
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
  
  getNewId(title:string, description:string, language:string, releaseDate:string){
    let responseid="";
    this.movieService.getLatestMovieId(title, description,language,releaseDate)
    .subscribe( 
      (data:string) => {this.responseid = data;}
      );
      // console.log('response id->',this.responseid);
    return this.responseid;
  }
  submitAddMovie(){
    let title:string|null|undefined = this.addMovieForm.get('title')?.value;
    let language:string|null|undefined = this.addMovieForm.get('language')?.value;
    let description:string|null|undefined = this.addMovieForm.get('description')?.value;
    let releaseDate:string|null|undefined = this.addMovieForm.get('releaseDate')?.value;
    this.responseid = this.getNewId(<string>title, <string>description, <string>language,<string>releaseDate);
    //console.log(this.responseid);
    if(this.responseid!=""){
      this.addMovieForm.get('id')?.setValue(this.responseid);
      //let genrelist: Genre[] = [];
      console.log(this.addMovieForm);
      this.addMovieForm.get('genres')?.value.map(
        genrename => this.genreService.getGenreByName(<string>genrename).subscribe(
          (data: Genre[]) => {this.genrelist.push(data[0]);
            console.log(this.addMovieForm);
            console.log(data);
            console.log(this.genrelist);
          }
        )
      );
      console.log('genre list->',this.genrelist);
      let m:Movie = {
        id: this.responseid,
        title: <string>title,
        price: parseInt(<string>this.addMovieForm.get('price')?.value),
        language: <string>language,
        description: <string>description,
        releaseDate: new Date(<string>releaseDate),
        status: <string>this.addMovieForm.get('status')?.value,
        filename: <string>this.addMovieForm.get('movieposter')?.value,
        genres: this.genrelist,
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
