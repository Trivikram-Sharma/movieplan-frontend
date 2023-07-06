import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import genreapi from 'src/api-constants/genreapi';
import { Genre } from 'src/interfaces/genre';
@Injectable({
  providedIn: 'root'
})
export class GenreService {

  constructor(private httpClient:HttpClient) { }
  public allGenreList:Genre[] = [];
  getAllGenres(){
    return this.httpClient.get<Genre[]>(genreapi.getAllGenres);
  }
  getGenreByName(name:string){
    return this.httpClient.get<Genre[]>(genreapi.getAllGenresWithName+`?name=${name}`);
  }
  addGenre(genre:Genre){
    return this.httpClient.post<boolean>(genreapi.addgenre,genre);
  }

  deleteGenre(genre:Genre){
    return this.httpClient.delete<boolean>(genreapi.deleteGenre+`?name=${genre.name}`);
  }

  //UTILITY METHODS FOR CROSS COMPONENT COMMUNICATION
  setAllGenreList(genrelist:Genre[]){
    this.allGenreList = genrelist;
  }
  getAllGenreList(){
    return this.allGenreList;
  }
}
