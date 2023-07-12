import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ShowtimeService } from 'src/services/showtime/showtime.service';
import { Showtime } from 'src/interfaces/showtime';
import { Time } from '@angular/common';
@Component({
  selector: 'app-addshowtime',
  templateUrl: './addshowtime.component.html',
  styleUrls: ['./addshowtime.component.css']
})
export class AddshowtimeComponent implements OnInit {

  constructor(private showtimeService: ShowtimeService,
    private router: Router) { }

  ngOnInit(): void {
  }

  addShowtimeForm = new FormGroup({
    showName: new FormControl('',Validators.required),
    startTime: new FormControl('',Validators.required),
    endTime: new FormControl('',Validators.required)
  });



  addShowtime(){
    let showtime:Showtime = {
      showName:<string>this.addShowtimeForm.get('showName')?.value,
      startTime:<Time><unknown>this.addShowtimeForm.get('startTime')?.value,
      endTime:<Time><unknown>this.addShowtimeForm.get('endTime')?.value
    };
    // let showtimeadded = false;
    this.showtimeService.addShowTime(showtime)
    .subscribe( (showtimeadded:boolean) => {

      if(showtimeadded){
        alert(`Showtime ${showtime.showName} added Successfully!`);
        this.router.navigate(['/servicesList/showTimeList']);
      }
      else {
        alert(`Something went wrong!`);
      }
    });

  }
}
