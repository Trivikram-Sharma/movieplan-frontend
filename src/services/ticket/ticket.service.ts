import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { User } from 'src/interfaces/user';
import { Admin } from 'src/interfaces/admin';
import { Ticket } from 'src/interfaces/ticket';
import { HttpClient } from '@angular/common/http';
import ticketapi from 'src/api-constants/ticketapi';
import { Movie } from 'src/interfaces/movie';
import { Payment } from 'src/interfaces/payment';
import { Screening } from 'src/interfaces/screening';
@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private loginService: LoginService, private httpClient: HttpClient) { }
  currentUser:User = this.loginService.currentUser;
  currentAdmin:Admin = this.loginService.currentAdmin;
  ticketList: Ticket[] = [];
  currentTicket:any;
  //POST API METHODS
  purchaseTicket(t:Ticket){
    return this.httpClient.post<boolean>(ticketapi.purchaseTicket,t);
  }
  //GET API METHODS
  getAllTicketsOfCurrentUser(){
    return this.httpClient.get<Ticket[]>(ticketapi.ticketByUser + `?userId=${this.currentUser.userName}`);
  }
  getTicketById(id:string){
    return this.httpClient.get<Ticket>(ticketapi.ticketById + `?id=${id}`);
  }
  getTicketsByUser(user:User){
    return this.httpClient.get<Ticket[]>(ticketapi.ticketByUser + `?userId=${user.userName}`);
  }
  getAllTickets(){
    return this.httpClient.get<Ticket[]>(ticketapi.allTickets);
  }
  getAllTicketsByMovie(m:Movie){
    return this.httpClient.get<Ticket[]>(ticketapi.ticketByMovie+`?movieId=${m.id}`);
  }


  getTicketsByPaymentId(p:Payment){
    return this.httpClient.get<Ticket[]>(ticketapi.ticketByPaymentId+`?paymentId=${p.id}`);
  }


  //PATCH API METHODS
  updateTicketScreening(t:Ticket,s:Screening){
    return this.httpClient.patch<boolean>(ticketapi.updateTicketScreening+`/{t.id}?screeningId=${s.id}`,s);
  }
  //DELETE API METHODS
  deleteTicketById(t:Ticket){
    return this.httpClient.delete<boolean>(ticketapi.deleteTicket+`?ticketId=${t.id}`);
  }
}
