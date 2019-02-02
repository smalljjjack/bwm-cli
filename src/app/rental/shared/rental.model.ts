import { Booking } from '../../booking/shared/booking.model';

export class Rental {

  static readonly CATEGORIES = ['house', 'apartment', 'condo'];

  _id: number;
  title: string;
  city: string;
  street: string;
  category: string;
  image: string;
  description: string;
  dailyRate: number;
  shared: boolean;
  createdAt: string;
  bookings: Booking[];
}
