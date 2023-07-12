import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { MovieService } from 'src/services/movie/movie.service';
import { Movie } from 'src/interfaces/movie';
import { GenreService } from 'src/services/genre/genre.service';
import { Genre } from 'src/interfaces/genre';
import { ToastService } from 'src/services/toast/toast.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-editmovie',
  templateUrl: './editmovie.component.html',
  styleUrls: ['./editmovie.component.css']
})
export class EditmovieComponent implements OnInit {

  constructor(private movieService: MovieService,
    private genreService: GenreService,
    private toastService: ToastService,
    private router:Router) { }

  ngOnInit(): void {
  }

  currentMovie:Movie = this.movieService.getCurrentMovie();
  movieEdited:boolean = false;
  editMovieForm = new FormGroup({
    title: new FormControl(this.currentMovie.title),
    price: new FormControl(this.currentMovie.price),
    language: new FormControl(this.currentMovie.language),
    description: new FormControl(this.currentMovie.description),
    releaseDate: new FormControl(this.currentMovie.releaseDate),
    status: new FormControl(this.currentMovie.status),
    genres: new FormArray(this.currentMovie.genres.map(
      x => new FormControl(<string>x.name)
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

  updateNewGenres(movieObject:Movie){
    let newgenres:Genre[] = [];
    this.editMovieForm.get('genres')?.value.map(
      genrename => {
        this.genreService.getGenreByName(<string>genrename)
        .subscribe( (resultGenre:Genre[]) => {
          newgenres.push(resultGenre[0]);
          if(newgenres.length === this.editMovieForm.get('genres')?.value.length){
            movieObject.genres = newgenres;
            this.movieService.updateMovieWithGenres(
              <string[]>this.editMovieForm.get('genres')?.value,<string>movieObject.id)
              .subscribe(
                (genresUpdated:boolean) => {
                  if(genresUpdated){
                    alert(`Movie Genres Updated Successfully!`);
                    this.router.navigate(['/servicesList/movieList']);
                  }
                  else{
                    alert(`Movie Genres Not Updated Successfully!`);
                  }
                }
              );
          }
        })
      }
    );
  }


  editMovie(){
  //       let newgenres:Genre[] = [];
  //       this.editMovieForm.get('genres')?.value
  //       .map(
  //         genreName => { if(genreName!=null){
  //           this.genreService.getGenreByName(genreName)
  //         .subscribe( (data:Genre[]) => newgenres.push(data[0]))}
  //       }
  //       );
  //       let movieObject:Movie = {
  //         id: this.movieService.currentMovie.id,
  //         title: <string>this.editMovieForm.get('title')?.value,
  //         price: <Number>this.editMovieForm.get('price')?.value,
  //         language: <string>this.editMovieForm.get('language')?.value,
  //         description:<string>this.editMovieForm.get('description')?.value,
  //         releaseDate:<Date>this.editMovieForm.get('releaseDate')?.value,
  //         status: <string>this.editMovieForm.get('status')?.value,
  //         genres: <Genre[]>newgenres,
  //         filename: this.movieService.currentMovie.filename,
  //         screenings: this.movieService.currentMovie.screenings
  //       };
  //       //Calling APIs to update each field and aggregating the result
  //       let updateResult:boolean = false;
  //       //Update title
  //       this.movieService.updateMovieTitle(<string>movieObject.title,<string>movieObject.id)
  //       .subscribe( (updatedTitle:boolean) => {updateResult = updateResult && updatedTitle;
  //         if(updatedTitle){

  //           //update Price
  //           this.movieService.updateMoviePrice(movieObject.price, <string>movieObject.id)
  //           .subscribe( (priceUpdated:boolean) => {
  //             if(priceUpdated){

  //               //update Language
  //               this.movieService.updateMovieLanguage(<string>movieObject.language,<string>movieObject.id)
  //               .subscribe( (langugaeUpdated:boolean) => {
  //                 if(langugaeUpdated){
  //                   //update Movie Description
  //                   this.movieService.updateMovieDescription(<string>movieObject.description,<string>movieObject.id)
  //                   .subscribe( (descriptionUpdated:boolean) => {
  //                     if(descriptionUpdated){
  //                       if(this.currentMovie.status != movieObject.status){

  //                       }
  //                       else {

  //                       }
  //                     }
  //                     else {
  //                       alert(`Description Not Updated Successfully!`);
  //                     }
  //                   });

  //                 }
  //                 else{
  //                   alert(`Language Not Updated Successfully!`);
  //                 }
  //               });
  //             }
  //             else{
  //               alert(`Price Not Updated Successfully!`);
  //             }
  //           });
  //         }
  //         else {
  //           alert(`Title Not Updated Successfully!`);
  //         }
        
  //       });
  //       //Enable Movie
  //       this.movieService.enableMovie(<string>movieObject.id)
  //       .subscribe( (data:boolean) => updateResult = updateResult && data);
  //       //Disable Movie
  //       this.movieService.disableMovie(<string>movieObject.id)
  //       .subscribe( (data:boolean) => updateResult = updateResult && data);
  //       //Update Movie With Genres
  //       this.movieService.updateMovieWithGenres(<string[]>this.editMovieForm.get('genres')?.value,<string>movieObject.id)
  //       .subscribe( (data:boolean) => updateResult = updateResult && data);

  //       let updatedMovie = {};
  //       this.movieService.getMovieWithId(<string>movieObject.id)
  //       .subscribe( (data:Movie) => updatedMovie = data);
  //       if(movieObject === updatedMovie){
  //         setTimeout(
  //           () =>{
  //             this.toastService.setMessage(`The Movie with id ${movieObject.id} has been updated successfully!`);
  //             this.toastService.setShow("show");
  //           },
  //           5000
  //         );
  //         this.toastService.setShow('');
  //         alert(`Movie Updated Successfully!`)
  //         this.router.navigate(['/servicesList/movieList']);
  //       }
  //       else {
  //         alert(`Something went wrong! Please try again!`);
  //       }
  //       return;

    // let newgenres:Genre[] = [];
    let movieObject:Movie = {
              id: this.movieService.currentMovie.id,
              title: <string>this.editMovieForm.get('title')?.value,
              price: <Number>this.editMovieForm.get('price')?.value,
              language: <string>this.editMovieForm.get('language')?.value,
              description:<string>this.editMovieForm.get('description')?.value,
              releaseDate:<Date>this.editMovieForm.get('releaseDate')?.value,
              status: <string>this.editMovieForm.get('status')?.value,
              genres: [],
              filename: this.movieService.currentMovie.filename,
              screenings: this.movieService.currentMovie.screenings
            };
      this.movieService.updateMovieTitle(<string>movieObject.title,<string>movieObject.id)
      .subscribe( (titleUpdated:boolean) =>{
        if(titleUpdated){
          this.movieService.updateMoviePrice(<Number>movieObject.price,<string>movieObject.id)
          .subscribe(
            (updatePrice:boolean) => {
              if(updatePrice){
                this.movieService.updateMovieLanguage(<string>movieObject.language,<string>movieObject.id)
                .subscribe(
                  (languageUpdated:boolean) => {
                    if(languageUpdated){
                      this.movieService.updateMovieDescription(<string>movieObject.description,<string>movieObject.id)
                      .subscribe(
                        (descriptionUpdated:boolean) =>{
                          if(descriptionUpdated){
                            if(movieObject.status != this.currentMovie.status){
                              if(movieObject.status == "enabled"){
                                this.movieService.enableMovie(<string>movieObject.id)
                                .subscribe(
                                  (movieEnabled:boolean) => {
                                    if(movieEnabled){
                                      this.updateNewGenres(movieObject);
                                    }
                                    else {
                                      alert(`Movie Not Enabled Successfully!`);
                                    }
                                  }
                                  );
                                }
                                else if(movieObject.status == "disabled"){
                                  this.movieService.disableMovie(<string>movieObject.id).subscribe(
                                    (movieDisabled:boolean) => {
                                      if(movieDisabled){
                                        this.updateNewGenres(movieObject);
                                      }
                                    else{alert(`The Movie is Not Disabled Successfully!`);}
                                  }
                                );
                              }
                            }
                            else {
                              this.updateNewGenres(movieObject);
                            }
                          }
                          else{
                            alert(`Description Not Updated Successfully!`);
                          }
                        }
                      );
                    }
                    else {
                      alert(`Language of the movie not updated successfully!`);
                    }
                  }
                );
              }
              else{
                alert(`Movie Price Not updated successfully!`);
              }
            }
          );
        }
        else {
          alert(`Title Not Updated successfully!`);
        }
      });
    
  }
}
