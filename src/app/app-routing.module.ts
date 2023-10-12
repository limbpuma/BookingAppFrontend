import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingListComponent } from './booking-list/booking-list.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BookingEditComponent } from './booking-edit/booking-edit.component';
import
{ BookingAddComponent } from './booking-add/booking-add.component';

//http:localhost:4200/booking
const routes: Routes = [

  {path: 'home', component: HomepageComponent},
  {path: 'booking-list', component: BookingListComponent},
  {path: 'booking-add', component: BookingAddComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'booking-edit/:id', component: BookingEditComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  
})
export class AppRoutingModule { }
