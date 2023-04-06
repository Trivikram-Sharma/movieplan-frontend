import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
<<<<<<< HEAD

const routes: Routes = [];
=======
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path:"home", component:HomeComponent},
  {path: "about", component: AboutusComponent},
  {path:"contact", component: ContactusComponent}
];
>>>>>>> 3876234 (New machine commit)

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
