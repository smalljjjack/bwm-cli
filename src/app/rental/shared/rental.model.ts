import { Booking } from '../../booking/shared/booking.model';

export class Rental {
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
