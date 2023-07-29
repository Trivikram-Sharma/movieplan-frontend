import { Injectable } from '@angular/core';
import { Ticket } from 'src/interfaces/ticket';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  currentTickets:Ticket[] = [];
  currentIndex:Number = 0;
  setCurrentTickets(tickets:Ticket[]){
    this.currentTickets = tickets;
  }
  getCurrentTickets(){
    return this.currentTickets;
  }

  addTicketToCart(t:Ticket){
    this.currentTickets.push(t);
  }
  removeTicketFromCart(t:Ticket){
    let currIndex = this.currentTickets.findIndex(tk => tk.id == t.id);
    this.currentTickets.splice(currIndex,1);
  }
  setCurrentIndex(i:Number){
    this.currentIndex = i;
  }
  getCurrentIndex(){
    return this.currentIndex;
  }

}
