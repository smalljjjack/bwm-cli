import { Component, OnInit } from '@angular/core';
import { Rental} from '../shared/rental.model';
import { RentalService } from '../shared/rental.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'bwm-rental-create',
  templateUrl: './rental-create.component.html',
  styleUrls: ['./rental-create.component.scss']
})
export class RentalCreateComponent implements OnInit {

  newRental : Rental;
  rentalCategories = Rental.CATEGORIES;
  errors: any[] = [];

  constructor(private service: RentalService, private router : Router) { }

  ngOnInit() {
    this.newRental = new Rental();
    this.newRental.shared = false;
  }

  createRental(){
    this.newRental.image = "https://images1.apartments.com/i2/pDVgW54ky9CjfKRO7e3XSiWeTXBK9MhBqpRKWSa65lU/117/stone-mountain-apartment-homes-northglenn-co-stone-mountain-apartments.jpg"
    this.service.createRental(this.newRental).subscribe(
      (rental: Rental) => {
        this.router.navigate([`/rentals/${rental._id}`]);
      },
      (errorResponse: HttpErrorResponse) => {
        this.errors = errorResponse.error.errors;
      })
  }

  handleImageChange(){
    console.log("handle image change");

  }
}
