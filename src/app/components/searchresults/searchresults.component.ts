import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Screening } from 'src/interfaces/screening';
import { SearchService } from 'src/services/search/search.service';
import { Ticket } from 'src/interfaces/ticket';
import { LoginService } from 'src/services/login/login.service';
import { CartService } from 'src/services/cart/cart.service';
@Component({
  selector: 'app-searchresults',
  templateUrl: './searchresults.component.html',
  styleUrls: ['./searchresults.component.css']
})
export class SearchresultsComponent implements OnInit {
  @Input() screeningList: Screening[] = [];
  @Input() userTickets: Ticket[] = [];


  filters:Map<string,string> = this.searchService.getFilterStore();

  //Get search field from search service  
  sfield:string = this.searchService.getSearchField();

  //Get search keyword from the search service
  skword:string  = this.searchService.getSearchKeyword();

  sort:string = this.searchService.getSortStore();
  
  //Get sort order from the search service
  so:string = this.searchService.getSortOrder();


  constructor(private activatedRoute: ActivatedRoute,
      private searchService: SearchService,
      private loginService:LoginService,
      private cartService: CartService,
      private router:Router) { }


  ngOnInit(): void {
    /*console.log('Search Results Component Initiated!');
    this.activatedRoute.data.forEach(
      data => {
        console.log(data);
        this.screeningList = data['data']['screenings'];
        this.userTickets = data['data']['userTickets'];
      }
    );*/


  }
  
  getResultantScreenings(){
    
    
    
    return this.screeningList;
  }




  bookParticularMovieTicket(s:Screening){
    let t:Ticket;
    let alreadyBooked = this.userTickets.filter(ut => ut.screening.id == s.id).length;
    if(alreadyBooked > 0){
      alert(`You have already booked ticket for this movie at ${s.theatre.name},${s.theatre.address.area},${s.theatre.address.city} on ${s.date} ${s.showTime.showName} (${s.showTime.startTime} to ${s.showTime.endTime})`);
    }
    else {
      t = {
        user: this.loginService.currentUser,
        screening: s
      };
      this.cartService.addTicketToCart(t);
      this.router.navigate(['/servicesList/cart']);
    }
  }

  resultsPresent():boolean{
    return this.screeningList.length != 0;
  }

  getScreeningGenres(s:Screening):string{
    return s.movie.genres.map(g => g.name).join(',');
  }

  
}
