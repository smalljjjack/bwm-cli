import { Component, OnInit, Input } from '@angular/core';
import { Rental } from '../../shared/rental.model';

@Component({
  selector: 'bwm-rental-detail-booking',
  templateUrl: './rental-detail-booking.component.html',
  styleUrls: ['./rental-detail-booking.component.scss']
})
export class RentalDetailBookingComponent implements OnInit {

  @Input() price: number;

  constructor() { }

  ngOnInit() {
  }

  daterange: any = {};

  public options: any = {
       locale: { format: 'YYYY-MM-DD' },
       alwaysShowCalendars: false,
       opens: 'left',
   };

  public selectedDate(value: any, datepicker?: any) {
       // this is the date the iser selected
       // any object can be passed to the selected event and it will be passed back here
       datepicker.start = value.start;
       datepicker.end = value.end;

       // or manupulat your own internal property
       this.daterange.start = value.start;
       this.daterange.end = value.end;
       this.daterange.label = value.label;
   }

}
