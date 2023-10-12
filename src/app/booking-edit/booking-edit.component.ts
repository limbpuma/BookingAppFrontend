import { Component, OnInit } from '@angular/core';
import { Booking } from '../booking';
import { BookingService } from '../booking.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-booking-edit',
  templateUrl: './booking-edit.component.html'
  
})
export class BookingEditComponent implements OnInit {

  booking : Booking = new Booking();
  id: number;

  constructor(private bookingService: BookingService, 
    private route: ActivatedRoute,
    private enrutador: Router) { }

  ngOnInit() {
  this.id = this.route.snapshot.params['id'];
  this.bookingService.getBookingById(this.id).subscribe(
    {
      next: (datos) => 
        this.booking = datos,
      
      error: (errores: any) => {console.log(errores)},
    }
  );
  }

  onSubmit() {
    //editar producto
    this.saveBooking();
  }

  saveBooking(){
    /* this.bookingService.editBooking(this.id, this.booking).subscribe(
      { */
          this.bookingService.editBooking(this.booking.idBooking, this.booking).subscribe({

      next: (datos) => this.getBookingList(),
      error: (errores: any) => console.log(errores)
      }
    );
  }
  getBookingList(){
    this.enrutador.navigate(['/booking-list']);
  }

}


