import { Component, OnInit } from '@angular/core';
import { AddressService } from 'src/services/address/address.service';
import { LoginService } from 'src/services/login/login.service';
import { TheatreService } from 'src/services/theatre/theatre.service';
import { Theatre } from 'src/interfaces/theatre';
import { Address } from 'src/interfaces/address';
import { Router } from '@angular/router';
import { Screening } from 'src/interfaces/screening';
@Component({
  selector: 'app-theatrelist',
  templateUrl: './theatrelist.component.html',
  styleUrls: ['./theatrelist.component.css']
})
export class TheatrelistComponent implements OnInit {

  constructor(private loginService:LoginService,
    private theatreService:TheatreService,
    private addressService:AddressService,
    private router: Router) { }

  ngOnInit(): void {
  }
  adminLoggedIn = this.loginService.adminLoggedIn;
  theatreList:Theatre[] = this.theatreService.getAllTheatreList();

  addressString(address:Address){
    return `${address.building}
    ${address.street}
    ${address.area}
    ${address.city}
    ${address.state}
    ${address.country}
    ${address.pincode}`;
  }
  screeningGroups(screenings:Screening[]|undefined):string{
    if(screenings){
      return screenings.map(s => s.movie.title).join(',');
    }
    else {
      return '';
    }
  }
  redirectToAddTheatre(){
    this.addressService.getAllAddresses()
    .subscribe((addresses:Address[]) => {
      this.addressService.updateAllAddressesList(addresses);
      this.router.navigate(['/servicesList/addTheatre']);
    });
  }
  editTheatre(t:Theatre){
    this.theatreService.setCurrentTheatre(t);
    this.addressService.getAllAddresses()
    .subscribe((addresses:Address[]) => {
      if(addresses){
        this.addressService.updateAllAddressesList(addresses);
        alert(`Addresses fetched Successfully!`);
        this.router.navigate(['/servicesList/editTheatre']);
      }
      else{
        alert(`Addresses NOT fetched Successfully!`);
      }
    });
  }
  deleteTheatre(t:Theatre){
    this.theatreService.deleteTheatre(t)
    .subscribe(
      (data:boolean) => {
        if(data){
          alert(`Theatre Deleted Successfully!`);
        }
        else {
          alert(`Theatre NOT deleted Successfully!`);
        }
        this.router.navigate(['/servicesList/theatreList']);
      }
    );
  }
}
