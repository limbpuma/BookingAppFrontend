// booking-add.component.ts

import { Component } from '@angular/core';
import { Booking } from '../booking';
import { BookingService } from '../booking.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-add',
  templateUrl: './booking-add.component.html'
})
export class BookingAddComponent {
  booking: Booking = new Booking();
  errorMessage: string | null = null; // Agrega esta línea para manejar el mensaje de error

  constructor(private bookingService: BookingService,
    private router: Router) { }

  onSubmit() {
    this.saveBooking();
  } 

  saveBooking(){
    this.bookingService.addBooking(this.booking).subscribe({
      next: () => {
        this.goToBookingList();
      },
      error: (error: any) => {
        console.log(error);
        this.errorMessage = 'Ya existe una reserva activa con este número de teléfono.'; // Agrega esta línea para asignar el mensaje de error
      },
    })
  }

  goToBookingList() {
    this.router.navigate(['/home']);
  }
}
