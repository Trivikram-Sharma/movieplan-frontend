import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/services/ticket/ticket.service';
import { Ticket } from 'src/interfaces/ticket';
import { LoginService } from 'src/services/login/login.service';
import { Admin } from 'src/interfaces/admin';
@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {

  constructor(private ticketService:TicketService, private loginService:LoginService) { }

  ngOnInit(): void {
  }
  message:any;
  //ticketList: Ticket[] = [];
  adminLoggedIn:Admin = this.loginService.currentAdmin;
   get ticketList(){
    this.ticketService.getAllTicketsOfCurrentUser()
    .subscribe(
      (data:Ticket[]) => this.message = data
    );
    return this.message;
   }
   showTicket(t:string){
    this.ticketService.getTicketById(t)
    .subscribe(
      (data:Ticket) => this.message = data
    );
    return this.message;
   }
}
