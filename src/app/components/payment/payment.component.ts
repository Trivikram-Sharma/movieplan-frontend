import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Payment } from 'src/interfaces/payment';
import { Ticket } from 'src/interfaces/ticket';
import { User } from 'src/interfaces/user';
import { CartService } from 'src/services/cart/cart.service';
import { LoginService } from 'src/services/login/login.service';
import { PaymentService } from 'src/services/payment/payment.service';
import { TicketService } from 'src/services/ticket/ticket.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(private cartService: CartService,
    private paymentService: PaymentService,
    private ticketService: TicketService,
    private loginService: LoginService,
    private router: Router) { }

  ngOnInit(): void {
  }
  currentTickets:Ticket[] = this.cartService.getCurrentTickets();
  currentUser: User = this.loginService.currentUser;
  loggedin:boolean = this.loginService.loggedin;
  userLoggedIn:boolean = this.loginService.userLoggedIn;

  amount = new FormGroup({
    a: new FormControl('',Validators.required)
  });
  totalSum(){
    let totalSum:number = 0;
    this.currentTickets.map(
      ct => {
        totalSum = totalSum + <number>ct.screening.movie.price;
      }
    );
    return totalSum;
  }
  pay(){
    let p:Payment;
    let pamount = <number>parseInt(<string>this.amount.get('a')?.value);
    if(!this.amount.invalid && pamount==this.totalSum() && pamount!=0){
          /*let ticketaddobservables
          = this.currentTickets.map(
            tk => this.ticketService.purchaseTicket(tk)
          );
        forkJoin(ticketaddobservables)
        .subscribe(
          (ticketsaved:boolean[]) => {
            let failedSaves:boolean[] = ticketsaved.filter(t => t==false);
            console.log(failedSaves);
            if(failedSaves.length > 0){
              alert(`Some of the tickets have failed to be saved! Please check the ticket objects.`);
            }
            else if(failedSaves.length == 0){
              this.paymentService.setCurrentAmount(<number>parseInt(<string>this.amount.get('a')?.value));
              this.router.navigate(['/servicesList/summary']);
            }
            else {
              alert(`Something went wrong when saving the tickets! Please check the ddatabase.`);
            }
          }
        );*/
      let p:Payment
      = {
        user: this.currentUser,
        tickets: this.currentTickets,
        amount: <number>parseInt(<string>this.amount.get('a')?.value)
      };
      this.paymentService.addPayment(p)
      .subscribe(
        (paymentSaved:Payment) => {
          if(paymentSaved!=null){
            this.paymentService.setCurrentPayment(paymentSaved);
            this.router.navigate(['/servicesList/summary'])
          }
          else {
            alert(`Payment NOT Saved!! Please check the database and verify!`);
          }
        }
      );
          
    }
    else{
      alert(`The total amount is ${this.totalSum()}.
      Please pay the amount equal to the total price of your purchase and try again.`);
    }
  }
}
