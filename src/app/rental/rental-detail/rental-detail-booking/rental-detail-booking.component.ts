import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Rental } from '../../shared/rental.model';
import { Booking } from '../../../booking/shared/booking.model';
import { HelperService } from '../../../common/service/helper.service';
import { BookingService } from '../../../booking/shared/booking.service';
import * as moment from 'moment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DaterangePickerComponent } from 'ng2-daterangepicker';

@Component({
  selector: 'bwm-rental-detail-booking',
  templateUrl: './rental-detail-booking.component.html',
  styleUrls: ['./rental-detail-booking.component.scss']
})
export class RentalDetailBookingComponent implements OnInit {

  @Input() rental: Rental;
  @ViewChild(DaterangePickerComponent)
    private picker: DaterangePickerComponent;
  newBooking: Booking;
  modalRef: any;

  daterange: any = {};
  bookedOutDates: any[] = [];
  errors: any[] = [];

  public options: any = {
       locale: { format: Booking.DATE_FORMAT },
       alwaysShowCalendars: false,
       opens: 'left',
       autoUpdateInput: false,
       isInvalidDate: this.checkForInvalidDates.bind(this),
   };


  constructor(private helper : HelperService,
              private modalService: NgbModal,
              private bookingService: BookingService,
              private toastrService: ToastrService) {}

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

  private addNewBookedDates(bookingData: any) {
    const dateRange = this.helper.getBookingRangeOfDate(bookingData.startAt, bookingData.endAt);
    this.bookedOutDates.push(...dateRange);
  }

  private resetDatePicker() {
    this.picker.datePicker.setStartDate(moment());
    this.picker.datePicker.setEndDate(moment());
    this.picker.datePicker.element.val('');
  }

  openRentalModal(content){
    this.errors=[];
    this.modalRef=this.modalService.open(content);
  }

  createBooking(){
    console.log(this.newBooking);
    this.newBooking.rental=this.rental;
    this.bookingService.createBooking(this.newBooking).subscribe(

      (bookingData: any) =>{
        this.addNewBookedDates(bookingData);
        this.newBooking=new Booking();
        this.modalRef.close();
        this.resetDatePicker();
        this.toastrService.success('Booking has been successfully created, check your detail in manage session', 'Success!');
      },
      (errorResponse: any) =>{
        this.errors = errorResponse.error.errors;
      });
  }

  public selectedDate(value: any, datepicker?: any) {
       console.log(value);
       this.options.autoUpdateInput = true;
       this.newBooking.startAt =
            this.helper.formatBookingDate(value.start);
        this.newBooking.endAt =
            this.helper.formatBookingDate(value.end);
        this.newBooking.days = value.end.diff(value.start, 'days');
        this.newBooking.totalPirce =
            this.newBooking.days * this.rental.dailyRate;
   }

}
