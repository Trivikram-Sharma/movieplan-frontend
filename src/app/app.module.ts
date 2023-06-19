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
    EditmovieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [LoginService,RegistrationService, TicketService, MovieService, GenreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
