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

const routes: Routes = [
  {path:"", redirectTo:"home",pathMatch:"full"},
  {path:"home", component:HomeComponent},
  {path: "about", component: AboutusComponent},
  {path:"contact", component: ContactusComponent},
  {path:"register",component:RegisterComponent},
  {path:"changepassword",component:ChangepasswordComponent},
  {path:"servicesList", component: ServiceComponent,
  children:[{path:"ticketList",component:TicketListComponent},
  {path:"movieList",component:MovieListComponent},
  {path:"purchaseHistory",component:PurchaseListComponent},
  {path:"searchList", component:SearchListComponent}]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
