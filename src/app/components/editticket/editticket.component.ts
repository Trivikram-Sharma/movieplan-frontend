import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Screening } from 'src/interfaces/screening';
import { Showtime } from 'src/interfaces/showtime';
import { Theatre } from 'src/interfaces/theatre';
import { Ticket } from 'src/interfaces/ticket';
import { CartService } from 'src/services/cart/cart.service';
@Component({
  selector: 'app-editticket',
  templateUrl: './editticket.component.html',
  styleUrls: ['./editticket.component.css']
})
export class EditticketComponent implements OnInit {
  currentTicket:Ticket = <Ticket>this.cartService.getCurrentTickets().at(<number>this.cartService.getCurrentIndex());
  screeningList:Screening[] = [];
  showtimeList: Showtime[] = [];
  theatreList: Theatre[] = [];
  ticketList: Ticket[] = [];
  constructor(private cartService: CartService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }
  
  ngOnInit(): void {
    this.activatedRoute.data.forEach(
      data => {
        this.currentTicket = data['data']['currentTicket']
        this.screeningList = data['data']['screenings']
        this.showtimeList = data['data']['showtimes']
        this.theatreList = data['data']['theatres']
        this.ticketList = data['data']['tickets']
      }
    );
  }
  etF = new FormGroup({
    user: new FormControl({value:this.currentTicket.user.name,disabled:true}),
    movie: new FormControl({value: this.currentTicket.screening.movie.title, disabled: true}),
    date: new FormControl(this.currentTicket.screening.date,Validators.required),
    showtime: new FormControl(this.currentTicket.screening.showTime.id,Validators.required),
    theatre: new FormControl(this.currentTicket.screening.theatre.id,Validators.required)
  });



  editTicket(){
    let selectedScreening:Screening;
    let screeningsFiltered:Screening[];
    let newTicket:Ticket;
    if(this.etF.invalid){
      alert(`One or more fields are not provided! Please fill the form and then click 'Edit Ticket'!`);
    }
    else {
      screeningsFiltered = this.screeningList.filter(
        scr => scr.movie.title == this.etF.get('movie')?.value
              && scr.movie.id == this.currentTicket.screening.movie.id
              && scr.date == this.etF.get('date')?.value
              && scr.showTime.id == this.etF.get('showtime')?.value
              && scr.theatre.id == this.etF.get('theatre')?.value
              && scr.id != this.currentTicket.screening.id
              && scr.status != "Closed"
      );
      if(screeningsFiltered.length <=0){
        alert(`The movie is not being screened on ${this.etF.get('date')?.value},
         during ${this.showtimeList.filter(sh => sh.id == this.etF.get('showtime')?.value)[0].showName}
          at ${this.theatreList.filter(th => th.id == this.etF.get('theatre')?.value)[0].name}!`);
      }
      else{
        if(screeningsFiltered.length == 1){
          selectedScreening = <Screening>screeningsFiltered.at(0);
        }
        else{
          selectedScreening
          = screeningsFiltered.reduce(
            (accScreening, currScreening):Screening => {
              let prevTickets = this.ticketList.filter(tkt => tkt.screening.id == accScreening.id).length;
              let currTickets = this.ticketList.filter(tkt => tkt.screening.id == currScreening.id).length;
              if(prevTickets < currTickets){
                return accScreening;
              }
              else {
                return currScreening;
              }
          });
        }

        if(selectedScreening && selectedScreening!=null){
          newTicket = {
            user: this.currentTicket.user,
            screening: selectedScreening
          };
          this.cartService.getCurrentTickets()
          .splice(<number>this.cartService.getCurrentIndex(),1,newTicket);
          this.router.navigate(['/servicesList/cart']);
        }
      } 
    }
  }
}
