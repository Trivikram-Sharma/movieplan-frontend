import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { GenreService } from 'src/services/genre/genre.service';
import { Genre } from 'src/interfaces/genre';
import { MovieService } from 'src/services/movie/movie.service';
import { Movie } from 'src/interfaces/movie';
import { Screening } from 'src/interfaces/screening';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Observable } from 'rxjs';
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
  allGenreList = this.allGenres();
  addMovieForm = new FormGroup({
    id : new FormControl({value:'', disabled: true}),
    title: new FormControl(''),
    price: new FormControl(''),
    language: new FormControl(''),
    movieposter: new FormControl(''),
    description: new FormControl(''),
    releaseDate: new FormControl(''),
    status: new FormControl('Action'),
    genres: new FormArray([new FormControl('')])
  });

  message:any;
  responseid:string = "";
  genrelist:Genre[] = [];
  get genreControls(){
    // console.log('Genre controls->',(<FormArray>this.addMovieForm.get('genres')).controls);
    return (<FormArray>this.addMovieForm.get('genres')).controls;
  }
  allGenres(){
    return this.genreService.allGenreList;
  }

  addGenre(){
    (<FormArray>this.addMovieForm.get('genres')).push(new FormControl('Action'));
  }

  removeGenre(i:number){
    (<FormArray>this.addMovieForm.get('genres')).removeAt(i);
  }
  retrieveGenres(){
    
  }
  /*getNewId(title:string, description:string, language:string, releaseDate:string){
    let responseid="";
     responseid = this.movieService.getLatestMovieId(title, description,language,releaseDate);
    .subscribe( 
      (data:string) => {this.responseid = data;
      
      }
      );
    return responseid;
  }*/
  addMovie(title:string,language:string, description:string,releaseDate:string){
    let m:Movie = {
      id: this.responseid,
      title: <string>title,
      price: parseInt(<string>this.addMovieForm.get('price')?.value),
      language: <string>language,
      description: <string>description,
      releaseDate: new Date(<string>releaseDate),
      status: <string>this.addMovieForm.get('status')?.value,
      fileName: <string>this.addMovieForm.get('movieposter')?.value,
      genres: this.genrelist,
      screenings: []
    };
    console.log('m ->',m);
    // let movieadded = false;
    //  movieadded = await firstValueFrom(this.movieService.addMovie(m));
    //  .subscribe((data:boolean) => movieadded = data);
    this.movieService.addMovie(m)
    .subscribe(
      (data:boolean) =>{
        if(data){
          alert(`Movie ${m.title} added successfully! Navigating back to the movie List!`);
      this.router.navigate(['/servicesList/movieList']);
        }
        else {
          alert(`Movie ${m.title} not added successfylly!`);
       this.router.navigate(['/servicesList/movieList']);
      return;
        }
      }
    );
    //  if(movieadded){
    //   alert(`Movie ${m.title} added successfully! Navigating back to the movie List!`);
    //   this.router.navigate(['/servicesList/movieList']);
    //  }
    //  else {
    //   alert(`Movie ${m.title} not added successfylly!`);
    //    this.router.navigate(['/servicesList/movieList']);
    //   return;
    //  }
  }
  getGenres(title:string, language:string, description:string, releaseDate:string){
    //console.log(this.responseid);
    if(this.responseid!=""){
     // this.addMovieForm.get('id')?.setValue(this.responseid);
      //let genrelist: Genre[] = [];
      // this.addMovieForm.get('genres')?.value.map(
      //   async (genrename) => { let resp = await firstValueFrom(this.genreService.getGenreByName(<string>genrename));
      //    .subscribe(
      //      (data: Genre[]) => {this.genrelist.push(data[0]);
      //      }
      //    )
      //   this.genrelist.push(resp[0]);
      // }
      // );
      let glist:string[] = <string[]>this.addMovieForm.get('genres')?.value;
      glist.map(g => {
        this.genreService.getGenreByName(g)
        .subscribe(
          (data:Genre[]) => {
            this.genrelist.push(data[0]);
              if(this.genrelist.length === glist.length){
                this.addMovie(title,language,description,releaseDate);
              }
          }
        )
      });

      // for(let g of this.addMovieForm.get('genres')?.value){

      // }
      
    }
    else {
      alert("NO ID received from API Response!");
      return;
    }
  }


  submitAddMovie(){
    let title:string|null|undefined = this.addMovieForm.get('title')?.value;
    let language:string|null|undefined = this.addMovieForm.get('language')?.value;
    let description:string|null|undefined = this.addMovieForm.get('description')?.value;
    let releaseDate:string|null|undefined = this.addMovieForm.get('releaseDate')?.value;
    // this.responseid = await this.getNewId(<string>title,
                                //  <string>description,
                                //   <string>language,<string>releaseDate);
    this.movieService.getLatestMovieId(<string>title,<string> description,<string>language,<string> releaseDate)
    .subscribe (
      (data:string) =>{
        this.responseid = data;
        this.getGenres(<string>title,<string>language,<string> description,<string> releaseDate);
      }
    );
    
  }
}
