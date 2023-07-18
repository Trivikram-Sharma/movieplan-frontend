import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/interfaces/movie';
import { Screening } from 'src/interfaces/screening';
import { Showtime } from 'src/interfaces/showtime';
import { Theatre } from 'src/interfaces/theatre';
import { MovieService } from 'src/services/movie/movie.service';
import { ScreeningService } from 'src/services/screening/screening.service';
import { ShowtimeService } from 'src/services/showtime/showtime.service';
import { TheatreService } from 'src/services/theatre/theatre.service';

@Component({
  selector: 'app-add-screening',
  templateUrl: './add-screening.component.html',
  styleUrls: ['./add-screening.component.css']
})
export class AddScreeningComponent implements OnInit {
  
  enabledMovieList:Movie[] = [];
  theatreList:Theatre[] = [];
  showtimeList: Showtime[] = [];
  constructor(
    private movieService: MovieService,
    private theatreService:TheatreService,
    private showtimeService:ShowtimeService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private screeningService: ScreeningService) { }

  ngOnInit(): void {
    this.activatedRoute.data.forEach(
      data => {
        console.log(data);
        this.enabledMovieList = data['data']['movies'];
        this.theatreList = data['data']['theatres'];
        this.showtimeList = data['data']['showtimes'];
      }
    );
    console.log('this.enabledMovieList ->',this.enabledMovieList);
    console.log('this.theatreList ->',this.theatreList);
    console.log('this.showtimeList->',this.showtimeList);
  }

  addScreeningForm = new FormGroup({
    theatre: new FormControl('',Validators.required),
    movie: new FormControl('',Validators.required),
    showtime: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required)
  });







  addScreening(){
    let s:Screening = {
      theatre: <Theatre>this.theatreList.filter( t => t.id===parseInt(<string>this.addScreeningForm.get('theatre')?.value))[0],
      movie: <Movie>this.enabledMovieList.filter(m=> m.id===<string>this.addScreeningForm.get('movie')?.value)[0],
      showTime: <Showtime>this.showtimeList.filter(sh=> sh.id===parseInt(<string>this.addScreeningForm.get('showtime')?.value))[0],
      date: new Date(<string>this.addScreeningForm.get('date')?.value),
      status: ""
    };

    this.screeningService.addScreening(s)
    .subscribe(
      (screeningAdded:boolean) => {
        if(screeningAdded){
          alert(`Screening Added Successfully!`);
          this.router.navigate(['/servicesList/screeningList'])
        }
        else{
          alert(`Screening Not Added Successfully!`);
        }
      }
    );
  }



}
