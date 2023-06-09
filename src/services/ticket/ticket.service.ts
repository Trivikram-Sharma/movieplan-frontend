import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { User } from 'src/interfaces/user';
import { Admin } from 'src/interfaces/admin';
import { Ticket } from 'src/interfaces/ticket';
import { HttpClient } from '@angular/common/http';
import ticketapi from 'src/api-constants/ticketapi';
@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private loginService: LoginService, private httpClient: HttpClient) { }
  currentUser:User = this.loginService.currentUser;
  currentAdmin:Admin = this.loginService.currentAdmin;
  ticketList: Ticket[] = [];
  getAllTicketsOfCurrentUser(){
    return this.httpClient.get<Ticket[]>(ticketapi.ticketByUser + `?userId=${this.currentUser.userName}`);
  }
  getTicketById(id:string){
    return this.httpClient.get<Ticket>(ticketapi.ticketById + `?id=${id}`);
  }
}
