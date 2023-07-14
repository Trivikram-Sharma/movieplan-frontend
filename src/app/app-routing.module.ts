import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';
import { ServiceComponent } from './components/service/service.component';
import { TicketListComponent } from './components/ticket-list/ticket-list.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { PurchaseListComponent } from './components/purchase-list/purchase-list.component';
import { SearchListComponent } from './components/search-list/search-list.component';
import { AddmovieComponent } from './components/addmovie/addmovie.component';
import { GenrelistComponent } from './components/genrelist/genrelist.component';
import { AddgenreComponent } from './components/addgenre/addgenre.component';
import { EditmovieComponent } from './components/editmovie/editmovie.component';
import { ShowtimelistComponent } from './components/showtimelist/showtimelist.component';
import { AddshowtimeComponent } from './components/addshowtime/addshowtime.component';
import { AddresslistComponent } from './components/addresslist/addresslist.component';
import { EditaddressComponent } from './components/editaddress/editaddress.component';
import { AddaddressComponent } from './components/addaddress/addaddress.component';
import { TheatrelistComponent } from './components/theatrelist/theatrelist.component';
import { AddtheatreComponent } from './components/addtheatre/addtheatre.component';
import { EdittheatreComponent } from './components/edittheatre/edittheatre.component';

const routes: Routes = [
  {path:"", redirectTo:"home",pathMatch:"full"},
  {path:"home", component:HomeComponent},
  {path: "about", component: AboutusComponent},
  {path:"contact", component: ContactusComponent},
  {path:"register",component:RegisterComponent},
  {path:"changepassword",component:ChangepasswordComponent},
  {path:"servicesList", component: ServiceComponent,
  children:[
    {path:"ticketList",component:TicketListComponent},
    {path:"movieList",component:MovieListComponent},
    {path:"purchaseHistory",component:PurchaseListComponent},
    {path:"searchList", component:SearchListComponent},
    {path:"genreList", component:GenrelistComponent},
    {path:"addMovie", component:AddmovieComponent},
    {path:"addGenre",component:AddgenreComponent},
    {path:"editMovie", component:EditmovieComponent},
    {path:"showTimeList",component:ShowtimelistComponent},
    {path:"addShowTime",component:AddshowtimeComponent},
    {path:"addressList",component:AddresslistComponent},
    {path:"editAddress",component:EditaddressComponent},
    {path: "addAddress", component: AddaddressComponent},
    {path:"theatreList",component: TheatrelistComponent},
    {path: "addTheatre",component: AddtheatreComponent},
    {path: "editTheatre",component: EdittheatreComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
