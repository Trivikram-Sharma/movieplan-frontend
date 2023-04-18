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
    MovieListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
