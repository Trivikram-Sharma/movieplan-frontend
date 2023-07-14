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
  movieList:Movie[]=[];
  movieAdded:boolean = false;
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

  setCurrentMovie(movie:Movie){
    this.currentMovie = movie;
  }
  getCurrentMovie(){
    return this.currentMovie;
  }

  setMovieList(movielist:Movie[]){
    this.movieList = movielist;
  }
  getMovieList(){
    return this.movieList;
  }

  //Movie update methods
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
  //movie get methods

  getAllMovies(){
    return this.httpClient.get<Movie[]>(movieapi.getAllMovies);
  }

  getMoviesByTitle(title:string){
    return this.httpClient.get<Movie[]>(movieapi.getMoviesByTitle+`?title=${title}`);
  }
  getMoviesInPriceRange(lprice:string,hprice:string){
    return this.httpClient.get<Movie[]>(movieapi.getMoviesInPriceRange+`?hprice=${hprice}&lprice=${lprice}`);
  }
  getMoviesOfLanguage(language:string){
    return this.httpClient.get<Movie[]>(movieapi.getMoviesOfLanguage+`?language=${language}`);
  }
  getMoviesByGenre(genre:string){
    return this.httpClient.get<Movie[]>(movieapi.getMoviesByGenre+`?genre=${genre}`);
  }
  getMoviesByReleaseDate(releaseDate:string){
    return this.httpClient.get<Movie[]>(movieapi.getMoviesByReleaseDate+`?releaseDate=${releaseDate}`);
  }
  getMoviesContainingTitle(title:string){
    return this.httpClient.get<Movie[]>(movieapi.getMoviesContainingTitle+`/${title}`);
  }
  getMoviesWithTicketPrice(price:string){
    return this.httpClient.get<Movie[]>(movieapi.getMoviesWithTicketPrice+`?price=${price}`);
  }
  getEnabledMovies(){
    return this.httpClient.get<Movie[]>(movieapi.getEnabledMovies);
  }
  getDisabledMovies(){
    return this.httpClient.get<Movie[]>(movieapi.getDisabledMovies);
  }
  //DELETE Methods
  deleteGenreFromMovie(movieid:string,genreName:string){
    return this.httpClient.delete<boolean>(movieapi.deleteGenreFromMovie+`/${movieid}?genre=${genreName}`);
  }

  deleteMovie(movieid:string){
    return this.httpClient.delete<boolean>(movieapi.deleteMovie+`/${movieid}`);
  }
}
