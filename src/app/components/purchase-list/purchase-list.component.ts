import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Payment } from 'src/interfaces/payment';
import { Ticket } from 'src/interfaces/ticket';
import { LoginService } from 'src/services/login/login.service';
import { PaymentService } from 'src/services/payment/payment.service';

@Component({
  selector: 'app-purchase-list',
  templateUrl: './purchase-list.component.html',
  styleUrls: ['./purchase-list.component.css']
})
export class PurchaseListComponent implements OnInit {
  payments: Payment[] = [];
  tickets: Ticket[] = [];
  constructor(private loginService:LoginService,
    private paymentService:PaymentService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.data.forEach(
      data => {
        this.payments = data['data']['payments']
        this.tickets = data['data']['tickets'];
      }
    );
  }
  loggedin:boolean = this.loginService.loggedin;
  userLoggedIn:boolean = this.loginService.userLoggedIn;
  getNumberOfTickets(p:Payment){
    return this.tickets.filter(t => t.payment?.id == p.id).length;
  }
}
