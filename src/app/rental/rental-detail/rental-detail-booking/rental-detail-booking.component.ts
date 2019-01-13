import { Component, OnInit, Input } from '@angular/core';
import { Rental } from '../../shared/rental.model';
import { Booking } from '../../../booking/shared/booking.model';
import { HelperService } from '../../../common/service/helper.service';
import { BookingService } from '../../../booking/shared/booking.service';
import * as moment from 'moment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'bwm-rental-detail-booking',
  templateUrl: './rental-detail-booking.component.html',
  styleUrls: ['./rental-detail-booking.component.scss']
})
export class RentalDetailBookingComponent implements OnInit {

  @Input() rental: Rental;

  newBooking: Booking;
  modalRef: any;

  daterange: any = {};
  bookedOutDates: any[] = [];

  public options: any = {
       locale: { format: Booking.DATE_FORMAT },
       alwaysShowCalendars: false,
       opens: 'left',
       isInvalidDate: this.checkForInvalidDates.bind(this),
   };


  constructor(private helper : HelperService, private modalService: NgbModal, private bookingService: BookingService) { }

  ngOnInit() {
    this.newBooking = new Booking();
    this.getBookOutDate();
  }

  private checkForInvalidDates(date){
    //library auto parse calendar date to the above date
    return this.bookedOutDates.includes(this.helper.formatBookingDate(date)) || date.diff(moment(), 'days') < 0;
  }

  private getBookOutDate() {
    const bookings: Booking[] = this.rental.bookings;

    if(bookings && bookings.length > 0) {
        bookings.forEach((booking: Booking) => {
        const dateRange = this.helper.getBookingRangeOfDate(booking.startAt, booking.endAt);
        this.bookedOutDates.push(...dateRange);
      });
    }
  }

  openRentalModal(content){
    this.modalRef=this.modalService.open(content);
  }

  createBooking(){
    console.log(this.newBooking);
    this.newBooking.rental=this.rental;
    this.bookingService.createBooking(this.newBooking).subscribe(

      (bookingData) =>{
        this.newBooking=new Booking();
        this.modalRef.close();
      },
      () =>{

      });
  }

  public selectedDate(value: any, datepicker?: any) {
       console.log(value);
       this.newBooking.startAt = this.helper.formatBookingDate(value.startAt);
       this.newBooking.endAt = this.helper.formatBookingDate(value.endAt);
       this.newBooking.days = moment(value.startAt).diff(moment(value.endAt));
       this.newBooking.totalPirce = this.newBooking.days * this.rental.dailyRate;
   }

}
