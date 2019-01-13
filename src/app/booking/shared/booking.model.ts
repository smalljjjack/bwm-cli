import { Rental } from '../../rental/shared/rental.model';

export class Booking {

  static readonly DATE_FORMAT = 'Y-MM-DD';

  _id: string;
  startAt: string;
  endAt: string;
  totalPirce: number;
  guests: number;
  days: number;
  created: string;
  rental: Rental;
}
