import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/interfaces/movie';
import { Screening } from 'src/interfaces/screening';
import { Showtime } from 'src/interfaces/showtime';
import { Theatre } from 'src/interfaces/theatre';
import { ScreeningService } from 'src/services/screening/screening.service';

@Component({
  selector: 'app-editscreening',
  templateUrl: './editscreening.component.html',
  styleUrls: ['./editscreening.component.css']
})
export class EditscreeningComponent implements OnInit {
  allScreeningsList:Screening[] = [];
  enabledMoviesList: Movie[] = [];
  theatreList: Theatre[] = [];
  showtimeList: Showtime[] = [];
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private screeningService: ScreeningService) { }
  
  ngOnInit(): void {
    this.activatedRoute.data.forEach(
      data => {
        console.log('Arrived data ->',data);
        this.enabledMoviesList = data['data']['movies'];
        this.theatreList = data['data']['theatres'];
        this.showtimeList = data['data']['showtimes'];
      }
    );
  }
  currentScreening:Screening = this.screeningService.getCurrentScreening();
  esF = new FormGroup({
    id: new FormControl({value: this.currentScreening.id,disabled:true}),
    theatre: new FormControl(this.currentScreening.theatre.name,Validators.required),
    movie: new FormControl(this.currentScreening.movie.title,Validators.required),
    showtime: new FormControl(this.currentScreening.showTime.id,Validators.required),
    date: new FormControl(this.currentScreening.date,Validators.required),
    status: new FormControl(this.currentScreening.status,Validators.required)
  });
  
  editScreening(){
    let sc: Screening = {
      id: Number(this.esF.get('id')?.value),
      theatre: this.theatreList.filter(t => t.id===Number(this.esF.get('theatre')?.value))[0],
      movie: this.enabledMoviesList.filter(m => m.id === <string>this.esF.get('movie')?.value)[0],
      showTime: this.showtimeList.filter( sh => sh.id === Number(this.esF.get('showtime')?.value))[0],
      date: <Date>this.esF.get('date')?.value,
      status: <string>this.esF.get('status')?.value
    };
    console.log(this.esF);
    console.log(sc);


    this.screeningService.updateScreeningTheatre(sc,sc.theatre)
    .subscribe(
      (theatreUpdated:boolean) => {
        if(theatreUpdated){
          this.screeningService.updateScreeningMovie(sc,sc.movie)
          .subscribe(
            (movieUpdated:boolean) => {
              if(movieUpdated){
                this.screeningService.updateScreeningShowTime(sc,sc.showTime)
                .subscribe(
                  (stUpdated:boolean) => {
                    if(stUpdated){
                      this.screeningService.updateScreeningDate(sc,sc.date)
                      .subscribe(
                        (scdate:boolean) => {
                          if(scdate){
                            this.screeningService.updateScreeningStatus(sc,<string>sc.status)
                            .subscribe(
                              (statusUpdated:boolean) => {
                                if(statusUpdated){
                                  alert(`Screening Status Updated Successfully!`);
                                  this.router.navigate(['/servicesList/screeningList']);
                                }
                                else{
                                  alert(`Screening status NOT Updated Successfully!`);
                                }
                              }
                            );
                          }
                          else{alert(`Screening date NOT Updated Successfully!`);}
                        }
                      );
                    }
                    else{alert(`Screening ShowTime NOT Updated Successfully!`);}
                  }
                );
              }
              else{alert(`Screening movie NOT Updated Successfully!`);}
            }
          );
        }
        else{
          alert(`Screening Theatre NOT Updated Successfully!`);
        }
      }
    );
  }
  
}
