import { Component, OnInit } from '@angular/core';
import { Booking } from '../booking';
import { BookingService } from '../booking.service';
import { Router } from '@angular/router';

@Component({
  selector: 'booking-list',
  templateUrl: './booking-list.component.html'
})
export class BookingListComponent implements OnInit {
  bookings: Booking[] = [];

  constructor(private bookingService: BookingService, private enrutador: Router) { }

  ngOnInit() {
    this.getBooking();
  }

  private getBooking() {
    this.bookingService.getBookingList().subscribe(datos => {
      this.bookings = datos;
    });  
  }

  editBooking(id: number) {
    this.enrutador.navigate(['booking-edit', id]);
  }
  
 deactivateBooking(id: number) {
    let booking = this.bookings.find(r => r.idBooking === id);
    if (booking) {
        this.bookingService.deactivateBooking(id, booking).subscribe({
            next: (datos) => this.getBooking(),
            error: (errores: any) => console.log(errores)
        });
    }
}

}


