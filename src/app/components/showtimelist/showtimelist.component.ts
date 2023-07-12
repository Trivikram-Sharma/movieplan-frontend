import { Component, OnInit } from '@angular/core';
import { ShowtimeService } from 'src/services/showtime/showtime.service';
import { Showtime } from 'src/interfaces/showtime';
import { LoginService } from 'src/services/login/login.service';
import { Admin } from 'src/interfaces/admin';
import { Router } from '@angular/router';
@Component({
  selector: 'app-showtimelist',
  templateUrl: './showtimelist.component.html',
  styleUrls: ['./showtimelist.component.css']
})
export class ShowtimelistComponent implements OnInit {

  constructor(private showtimeService: ShowtimeService,
    private loginService:LoginService,
    private router: Router) { }

  ngOnInit(): void {
  }
  message:any;
  adminLoggedIn:Admin = this.loginService.currentAdmin;
  showtimelist:Showtime[] = this.showtimeService.getAllShowTimeList();
  
  // getAllShowTimes(){
  //   this.showtimeService.getAllShowTimes()
  //   .subscribe( (data:Showtime[]) => this.showtimelist = data);
  //   return this.showtimelist;
  // }

  getScreeningsOfShowtime(showtime:Showtime){
    if(showtime.screenings){
      return showtime.screenings.map(
        s => s.movie.title
      ).join(",");
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
