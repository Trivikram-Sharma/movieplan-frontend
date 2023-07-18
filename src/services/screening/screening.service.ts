import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import screeningapi from 'src/api-constants/screeningapi';
import { Movie } from 'src/interfaces/movie';
import { Screening } from 'src/interfaces/screening';
import { Showtime } from 'src/interfaces/showtime';
import { Theatre } from 'src/interfaces/theatre';

@Injectable({
  providedIn: 'root'
})
export class ScreeningService {

  constructor(private httpClient: HttpClient) { }
  currentScreening:any;
  //UTILITY METHODS FOR CROSS COMPONENT COMMUNICATION
  getCurrentScreening(){
    return <Screening>this.currentScreening;
  }
  setCurrentScreening(s:Screening){
    this.currentScreening = s;
  }


  //CREATE API METHODS
  addScreening(screening: Screening){
    return this.httpClient.post<boolean>(screeningapi.addScreening,screening);
  }


  //READ API METHODS
  getAllScreenings(){
    return this.httpClient.get<Screening[]>(screeningapi.getAllScreenings);
  }

  getAllScreeningsWithTheatre(theatre:Theatre){
    return this.httpClient.get<Screening[]>(screeningapi.getAllScreeningsWithTheatre+`?theatreId=${theatre.id}`);
  }
  getAllScreeningsWithMovie(movie:Movie){
    return this.httpClient.get<Screening[]>(screeningapi.getAllScreeningsWithMovie+`?movieId=${movie.id}`);
  }
  getAllScreeningsAtShowTime(showtime:Showtime){
    return this.httpClient.get<Screening[]>(screeningapi.getAllScreeningsAtShowTime+`?showTime=${showtime.showName}`)
  }
  getAllScreeningsOnDate(date:Date){
    return this.httpClient.get<Screening[]>(screeningapi.getAllScreeningsOnDate+`?date=${date.toString()}`);
  }


  //UPDATE API METHODS
  updateScreeningTheatre(screening:Screening,theatre:Theatre){
    return this.httpClient.patch<boolean>(screeningapi.updateScreeningTheatre+`/${screening.id}?theatreId=${theatre.id}`,theatre.id);
  }
  updateScreeningMovie(screening:Screening,movie:Movie){
    return this.httpClient.patch<boolean>(screeningapi.updateScreeningMovie+`/${screening.id}?movieId=${movie.id}`,movie.id);
  }
  updateScreeningShowTime(screening:Screening,showtime: Showtime){
    return this.httpClient.patch<boolean>(screeningapi.updateScreeningShowTime+`/${screening.id}?showName=${showtime.showName}`,showtime.showName);
  }
  updateScreeningStatus(screening:Screening, status:string){
    return this.httpClient.patch<boolean>(screeningapi.updateScreeningStatus+`/${screening.id}?status=${status}`,status);
  }
  updateScreeningDate(screening:Screening,date: Date){
    return this.httpClient.patch<boolean>(screeningapi.updateScreeningDate+`/${screening.id}?date1=${date.toString()}`,date.toString());
  }


  //DELETE API METHODS
  deleteScreeningTheatre(screening:Screening){
    return this.httpClient.delete<boolean>(screeningapi.deleteScreeningTheatre+`/${screening.id}`);
  }
  deleteScreeningMovie(screening:Screening){
    return this.httpClient.delete<boolean>(screeningapi.deleteScreeningMovie+`/${screening.id}`);
  }
  deleteScreeningShowTime(screening:Screening){
    return this.httpClient.delete<boolean>(screeningapi.deleteScreeningShowTime+`/${screening.id}`);
  }

  deleteScreeningDate(screening:Screening){
    return this.httpClient.delete<boolean>(screeningapi.deleteScreeningDate+`/${screening.id}`);
  }

  deleteScreening(screening:Screening){
    return this.httpClient.delete<boolean>(screeningapi.deleteScreening+`?screeningId=${screening.id}`);
  }


}
