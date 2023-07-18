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
import { MovieResolveGuard } from './guards/movieResolve/movie-resolve.guard';
import { MovieService } from 'src/services/movie/movie.service';
import { ShowtimeResolveGuard } from './guards/showtimeResolve/showtime-resolve.guard';
import { ShowtimeService } from 'src/services/showtime/showtime.service';
import { GenreResolverGuard } from './guards/genreResolver/genre-resolver.guard';
import { GenreService } from 'src/services/genre/genre.service';
import { AddressResolverGuard } from './guards/addressResolver/address-resolver.guard';
import { AddressService } from 'src/services/address/address.service';
import { TheatreResolverGuard } from './guards/theatreResolver/theatre-resolver.guard';
import { TheatreService } from 'src/services/theatre/theatre.service';
import { ScreeningService } from 'src/services/screening/screening.service';
import { ScreeninglistComponent } from './components/screeninglist/screeninglist.component';
import { EditscreeningComponent } from './components/editscreening/editscreening.component';
import { AddScreeningComponent } from './components/add-screening/add-screening.component';
import { AddScreeningResolveGuard } from './guards/addScreeningResolve/add-screening-resolve.guard';
import { ScreeningListResolveGuard } from './guards/screeningListResolve/screening-list-resolve.guard';
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
    {path:"movieList",
      component:MovieListComponent,
      resolve: {
        movieObservable: MovieResolveGuard
      }},
    {path:"purchaseHistory",component:PurchaseListComponent},
    {path:"searchList", component:SearchListComponent},
    {path:"genreList",
      component:GenrelistComponent,
      resolve: {
        genrelist: GenreResolverGuard
      }},
    {path:"addMovie", component:AddmovieComponent},
    {path:"addGenre",component:AddgenreComponent},
    {path:"editMovie", component:EditmovieComponent},
    {path:"showTimeList",
      component:ShowtimelistComponent,
      resolve: {
        data: ShowtimeResolveGuard
      }
     },
    {path:"addShowTime",component:AddshowtimeComponent},
    {path:"addressList",
      component:AddresslistComponent,
        resolve: {
          addresses: AddressResolverGuard
      }},
    {path:"editAddress",component:EditaddressComponent},
    {path: "addAddress", component: AddaddressComponent},
    {path:"theatreList",
      component: TheatrelistComponent,
      resolve: {
        data: TheatreResolverGuard
      }},
    {path: "addTheatre",component: AddtheatreComponent},
    {path: "editTheatre",component: EdittheatreComponent},
    {path: "screeningList",
      component: ScreeninglistComponent,
      resolve:{
        screeninglist: ScreeningListResolveGuard
      }
      },
    {path: "addScreening",
      component: AddScreeningComponent,
      resolve: {
        data: AddScreeningResolveGuard
      }},
    {path: "editScreening",
      component: EditscreeningComponent,
      resolve: {
        data: AddScreeningResolveGuard
      }}
  ]},
];

@NgModule({
  providers: [MovieResolveGuard, MovieService,
     ShowtimeResolveGuard, ShowtimeService,
    GenreResolverGuard, GenreService,
  AddressResolverGuard,AddressService,
TheatreResolverGuard, TheatreService,
AddScreeningResolveGuard,ScreeningService],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
