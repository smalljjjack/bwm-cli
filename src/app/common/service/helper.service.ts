import { Injectable } from '@angular/core';
import { Booking } from '../../booking/shared/booking.model';
import * as moment from 'moment';

@Injectable()
export class HelperService{

  private getRangeOfDates(startAt, endAt, dateFormat){
    console.log("running");
    const tempDates = [];
    let mStartAt = moment(startAt);
    const mEndAt = moment(endAt);

    while(mStartAt < mEndAt) {
      tempDates.push(mStartAt.format(dateFormat));
      mStartAt = mStartAt.add(1, 'day');
    }

    tempDates.push(moment(startAt).format(dateFormat));
    tempDates.push(moment(endAt).format(dateFormat));
    return tempDates;
  }

  private formatDate(date, dateFormat){
    return moment(date).format(dateFormat);
  }

  public formatBookingDate(date){
    return this.formatDate(date, Booking.DATE_FORMAT);
  }

  public getBookingRangeOfDate(startAt, endAt){
    return this.getRangeOfDates(startAt, endAt, Booking.DATE_FORMAT);
  }
}
