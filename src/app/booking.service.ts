import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking } from './booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService { 
  private urlBase = 'https://booking-backend-production-c3a1.up.railway.app'; 

  constructor(private clienteHttp: HttpClient) { }

  getBookingList(): Observable<Booking[]> {
    return this.clienteHttp.get<Booking[]>(`${this.urlBase}/restaurant-app/booking`);
  }
 
  addBooking(booking: Booking): Observable<Object> {
    return this.clienteHttp.post(`${this.urlBase}/restaurant-app/booking`, booking);
  }

  editBooking(id: number, booking: Booking): Observable<Object> {
    return this.clienteHttp.put(`${this.urlBase}/restaurant-app/booking/${id}`, booking);
  }
 

   getBookingById(id: number): Observable<Booking> {
    return this.clienteHttp.get<Booking>(`${this.urlBase}/restaurant-app/booking/${id}`);
  }

  deactivateBooking(id: number, booking: Booking): Observable<Object> {
    booking.active = false;
    return this.clienteHttp.put(`${this.urlBase}/restaurant-app/booking/deactivate/${id}`, booking);
}



}


