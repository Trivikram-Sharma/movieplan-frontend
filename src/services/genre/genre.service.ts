import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import genreapi from 'src/api-constants/genreapi';
import { Genre } from 'src/interfaces/genre';
@Injectable({
  providedIn: 'root'
})
export class GenreService {

  constructor(private httpClient:HttpClient) { }

  getAllGenres(){
    return this.httpClient.get<Genre[]>(genreapi.getAllGenres);
  }
  getGenreByName(name:string){
    return this.httpClient.get<Genre[]>(genreapi.getAllGenresWithName+`?name=${name}`);
  }
}
