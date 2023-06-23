import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import movieapi from 'src/api-constants/movieapi';
import { Movie } from 'src/interfaces/movie';
@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private httpClient:HttpClient) { }
  currentMovie:any;
  getLatestMovieId(title:string|null|undefined,
     description:string|null|undefined,
     language:string|null|undefined,
     releasedate:string|null|undefined)
  {
    return this.httpClient.get<string>(movieapi.getNewId + `?title=${title}&description=${description}&language=${language}&releasedate=${releasedate}`,
    {responseType: 'text' as 'json'});
  }
  addMovie(movie:Movie){
    return this.httpClient.post<boolean>(movieapi.addMovie,movie);
  }

  getMovieWithId(id:string){
    return this.httpClient.get<Movie>(movieapi.getMovieWithId+`?id=${id}`);
  }

  setCurrentMovie(id:string){
    this.getMovieWithId(id)
    .subscribe( (data:Movie) => this.currentMovie = data);
  }

  updateMovieTitle(title:string,movieid:string){
    return this.httpClient.patch<boolean>(movieapi.updateMovieTitle+`/${movieid}?title=${title}`,title);
  }

  updateMoviePrice(price:Number,movieid:string){
    return this.httpClient.patch<boolean>(movieapi.updateMoviePrice+`/${movieid}?price=${price}`,price);
  }

  updateMovieLanguage(language:string, movieid:string){
    return this.httpClient.patch<boolean>(movieapi.updateMovieLanguage+`/${movieid}?language=${language}`,language);
  }
  updateMovieDescription(description:string,movieid:string){
    return this.httpClient.patch<boolean>(movieapi.updateMovieDescription+`/${movieid}?description=${description}`,description);
  }
  enableMovie(movieid:string){
    return this.httpClient.patch<boolean>(movieapi.enableMovie+`/${movieid}`,{});
  }
  disableMovie(movieid:string){
    return this.httpClient.patch<boolean>(movieapi.disableMovie+`/${movieid}`,{});
  }
  updateMovieWithGenre(genre:string,movieid:string){
    return this.httpClient.patch<boolean>(movieapi.updateMovieWithGenre+`/${movieid}?genre=${genre}`,genre);
  }
  updateMovieWithGenres(genres:string[],movieid:string){
    return this.httpClient.post<boolean>(movieapi.updateMovieWithGenres+`/${movieid}`,genres);
  }

  
}
