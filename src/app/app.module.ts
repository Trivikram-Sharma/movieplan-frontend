import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginStatusComponent } from './components/login-status/login-status.component';
import { RegisterComponent } from './components/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';
import { ServiceComponent } from './components/service/service.component';
import { TicketListComponent } from './components/ticket-list/ticket-list.component';
import { PurchaseListComponent } from './components/purchase-list/purchase-list.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { LoginService } from 'src/services/login/login.service';
import { RegistrationService } from 'src/services/registration/registration.service';
import { ToastComponent } from './components/toast/toast.component';
import { SearchListComponent } from './components/search-list/search-list.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { TicketService } from 'src/services/ticket/ticket.service';
import { AddmovieComponent } from './components/addmovie/addmovie.component';
import { MovieService } from 'src/services/movie/movie.service';
import { GenreService } from 'src/services/genre/genre.service';
import { GenrelistComponent } from './components/genrelist/genrelist.component';
import { AddgenreComponent } from './components/addgenre/addgenre.component';
import { EditmovieComponent } from './components/editmovie/editmovie.component';
import { ToastService } from 'src/services/toast/toast.service';
import { ShowtimelistComponent } from './components/showtimelist/showtimelist.component';
import { AddshowtimeComponent } from './components/addshowtime/addshowtime.component';
import { ShowtimeService } from 'src/services/showtime/showtime.service';
import { AddressService } from 'src/services/address/address.service';
import { AddresslistComponent } from './components/addresslist/addresslist.component';
import { AddaddressComponent } from './components/addaddress/addaddress.component';
import { EditaddressComponent } from './components/editaddress/editaddress.component';
import { TheatrelistComponent } from './components/theatrelist/theatrelist.component';
import { AddtheatreComponent } from './components/addtheatre/addtheatre.component';
import { EdittheatreComponent } from './components/edittheatre/edittheatre.component';
import { TheatreService } from 'src/services/theatre/theatre.service';
import { ScreeningService } from 'src/services/screening/screening.service';
import { ScreeninglistComponent } from './components/screeninglist/screeninglist.component';
import { EditscreeningComponent } from './components/editscreening/editscreening.component';
import { AddScreeningComponent } from './components/add-screening/add-screening.component';
import { AddticketComponent } from './components/addticket/addticket.component';
import { CartComponent } from './components/cart/cart.component';
import { EditticketComponent } from './components/editticket/editticket.component';
import { CartService } from 'src/services/cart/cart.service';
import { PaymentComponent } from './components/payment/payment.component';
import { SummaryComponent } from './components/summary/summary.component';
import { SearchresultsComponent } from './components/searchresults/searchresults.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutusComponent,
    ContactusComponent,
    LoginStatusComponent,
    RegisterComponent,
    ChangepasswordComponent,
    ServiceComponent,
    TicketListComponent,
    PurchaseListComponent,
    MovieListComponent,
    ToastComponent,
    SearchListComponent,
    SearchbarComponent,
    AddmovieComponent,
    GenrelistComponent,
    AddgenreComponent,
    EditmovieComponent,
    ShowtimelistComponent,
    AddshowtimeComponent,
    AddresslistComponent,
    AddaddressComponent,
    EditaddressComponent,
    TheatrelistComponent,
    AddtheatreComponent,
    EdittheatreComponent,
    ScreeninglistComponent,
    EditscreeningComponent,
    AddScreeningComponent,
    AddticketComponent,
    CartComponent,
    EditticketComponent,
    PaymentComponent,
    SummaryComponent,
    SearchresultsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [LoginService,RegistrationService, TicketService,
     MovieService, GenreService, ToastService,
    ShowtimeService,AddressService, TheatreService, ScreeningService,
  CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
