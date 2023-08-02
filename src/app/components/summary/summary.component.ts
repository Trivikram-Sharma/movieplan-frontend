import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Payment } from 'src/interfaces/payment';
import { Screening } from 'src/interfaces/screening';
import { Ticket } from 'src/interfaces/ticket';
import { CartService } from 'src/services/cart/cart.service';
import { PaymentService } from 'src/services/payment/payment.service';
import { ScreeningService } from 'src/services/screening/screening.service';
import { TicketService } from 'src/services/ticket/ticket.service';
import { LoginService } from 'src/services/login/login.service';
@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  ticketList: Ticket[] = [];
  screeningList: Screening[] = [];
  payment:any;
  constructor(private loginService:LoginService,
    private screeningService:ScreeningService,
    private ticketService: TicketService,
    private paymentService: PaymentService,
    private cartService: CartService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {}
  userLoggedIn:boolean = this.loginService.userLoggedIn;
  ngOnInit(): void {
    this.activatedRoute.data.forEach(
      data => {
        this.ticketList = data['tickets'];
        this.screeningList = data['screenings'];
      }
    );
    let savedTickets:Ticket[]
    = this.cartService.getCurrentTickets()
    .map(
      crudeTicket => {
        let resultList = this.ticketList.filter(tk => tk.screening.id == crudeTicket.screening.id &&
          tk.user.userName == crudeTicket.user.userName && tk.id != null);
          if(resultList.length == 1){
            return resultList[0];
          }
          else {
            return {
              id: -1,
              user:crudeTicket.user,
              screening: crudeTicket.screening
            };
          }
         }
    );
    if(savedTickets.length == this.cartService.getCurrentTickets().length){
      let unsavedTickets:Ticket[] = savedTickets.filter(ut => ut.id == -1);
      if(unsavedTickets.length == 0){
        let p:Payment
        = {
          user: this.loginService.currentUser,
          tickets: savedTickets,
          amount: this.paymentService.getCurrentAmount()
        };
        this.paymentService.addPayment(p)
        .subscribe(
          (paymentSaved:boolean) => {
            if(paymentSaved){
              this.payment = p;
            }
            else {
              alert(`The payment is NOT Saved Successfully!`);
            }
          }
        );
      }
      else {
        alert(`Some tickets are NOT saved properly!! Please check the objects and the database to verify!!`);
      }
    }
    else {
      alert(`Some Tickets are NOT Saved!! Please check the objects and the ticket table to verify!!`);
    }
  }


}
