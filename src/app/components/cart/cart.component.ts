import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ticket } from 'src/interfaces/ticket';
import { User } from 'src/interfaces/user';
import { CartService } from 'src/services/cart/cart.service';
import { LoginService } from 'src/services/login/login.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  currentTickets:Ticket[] = [];
  constructor(
    private loginService: LoginService,
    private cartService: CartService,
    private activatedRoute:ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    // this.activatedRoute.data.forEach(
    //   data => {
    //     this.currentTickets = data['data']['currentTickets']
    //   }
    // );
    this.currentTickets = this.cartService.getCurrentTickets();
  }
  userLoggedIn:boolean = this.loginService.userLoggedIn;
  currentUser:User = this.loginService.currentUser;
  loggedin:boolean = this.loginService.loggedin;
  editTicket(ct:Ticket){
    this.router.navigate(['/servicesList/editTicket']);
  }
  removeTicket(ct:Ticket){
    this.cartService.removeTicketFromCart(ct);
    this.router.navigate(['/servicesList/cart'])
  }

  bookMoreTickets(){
    this.router.navigate(['/servicesList/movieList']);
  }
  checkOut(){
    this.router.navigate(['/servicesList/payment']);
  }
}
