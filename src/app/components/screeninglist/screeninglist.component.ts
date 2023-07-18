import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/interfaces/movie';
import { Screening } from 'src/interfaces/screening';
import { Showtime } from 'src/interfaces/showtime';
import { Theatre } from 'src/interfaces/theatre';
import { LoginService } from 'src/services/login/login.service';
import { MovieService } from 'src/services/movie/movie.service';
import { ScreeningService } from 'src/services/screening/screening.service';
import { ShowtimeService } from 'src/services/showtime/showtime.service';
import { TheatreService } from 'src/services/theatre/theatre.service';

@Component({
  selector: 'app-screeninglist',
  templateUrl: './screeninglist.component.html',
  styleUrls: ['./screeninglist.component.css']
})
export class ScreeninglistComponent implements OnInit {

  allScreeningsList:Screening[] = [];
  constructor(private loginService:LoginService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private screeningService: ScreeningService) { }

  ngOnInit(): void {
    this.activatedRoute.data.forEach(
      data => this.allScreeningsList = data['screeninglist']
    );
  }
  adminLoggedIn:boolean = this.loginService.adminLoggedIn;
  loggedIn:boolean = this.loginService.loggedin;

  editScreening(s:Screening){
    this.screeningService.setCurrentScreening(s);
    this.router.navigate(['/servicesList/editScreening']);
  }
  deleteScreening(s:Screening){
    this.screeningService.deleteScreening(s)
    .subscribe(
      (screeningDeleted:boolean) =>{
        if(screeningDeleted){
          alert(`Screening Deleted Successfully!`);
        }
        else{
          alert('Screening Not Deleted Successfully!');
        }
        this.router.navigate(['/servicesList/screeningList']);
      }
    );
  }
  
}
