import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import showtimeapi from 'src/api-constants/showtimeapi';
import { Showtime } from 'src/interfaces/showtime';
@Injectable({
  providedIn: 'root'
})
export class ShowtimeService {

  constructor(private httpClient: HttpClient) { }
  allShowTimes:Showtime[] = [];

  //UTILITY FUNCTIONS FOR CROSS COMPONENT COMMUNICATION
  setAllShowTimes(showtimes:Showtime[]){
    this.allShowTimes = showtimes;
  }
  getAllShowTimeList(){
    return this.allShowTimes;
  }



  //API CALL SERVICE METHODS
  addShowTime(showtime:Showtime){
    return this.httpClient.post<boolean>(showtimeapi.addShowTime,showtime);
  }
  getShowTimesByName(name:string){
    return this.httpClient.get<Showtime>(showtimeapi.getShowTimesByName+`/${name}`);
  }
  getAllShowTimes(){
    return this.httpClient.get<Showtime[]>(showtimeapi.getAllShowTimes);
  }
  deleteShowTime(showtime:Showtime){
    return this.httpClient.delete<boolean>(showtimeapi.deleteShowTime+`/${showtime.showName}?starttime=${showtime.startTime}&endtime=${showtime.endTime}`);
  }

}
