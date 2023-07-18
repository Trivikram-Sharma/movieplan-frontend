import { Component, OnInit } from '@angular/core';
import { ShowtimeService } from 'src/services/showtime/showtime.service';
import { Showtime } from 'src/interfaces/showtime';
import { LoginService } from 'src/services/login/login.service';
import { Admin } from 'src/interfaces/admin';
import { ActivatedRoute, Router } from '@angular/router';
import { Screening } from 'src/interfaces/screening';
@Component({
  selector: 'app-showtimelist',
  templateUrl: './showtimelist.component.html',
  styleUrls: ['./showtimelist.component.css']
})
export class ShowtimelistComponent implements OnInit {
  showtimelist: Showtime[] = [];
  allScreeningsList: Screening[] = [];
  constructor(private showtimeService: ShowtimeService,
    private loginService:LoginService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.data.forEach(
      data => {
        this.showtimelist = data['data']['showtimes'];
        this.allScreeningsList = data['data']['screenings'];
      }
    );
  }
  message:any;
  adminLoggedIn:Admin = this.loginService.currentAdmin;
  // showtimelist:Showtime[] = this.showtimeService.getAllShowTimeList();
  
  // getAllShowTimes(){
  //   this.showtimeService.getAllShowTimes()
  //   .subscribe( (data:Showtime[]) => this.showtimelist = data);
  //   return this.showtimelist;
  // }

  getScreeningsOfShowtime(showtime:Showtime){
    if(showtime){
      return this.allScreeningsList.filter(s => s.showTime.id == showtime.id)
      .map(s => `${s.movie.title}(${s.movie.language})`).join(',');
    }
    else {
      return;
    }
    
  }
  deleteShowtime(showtime:Showtime){
    let x = confirm(`Are you sure you want to delete the showtime ${showtime.showName}?`);
    let showtimedeleted = false;
    if(x){
      this.showtimeService.deleteShowTime(showtime)
      .subscribe( (showtimedeleted:boolean) => {
        if(showtimedeleted){
          alert(`Showtime ${showtime.showName} deleted successfully!!`);
          this.router.navigate(['/servicesList/showTimeList']);
        }
        else {
          alert(`Something went wrong!`);
        }
      });
    }
  }

}
