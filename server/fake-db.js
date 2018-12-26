const Rental = require('./models/rental');

class FakeDb{

  constructor(){
    this.rentals = [
        {
        title: "Central Apartment 5",
        city: "New York",
        street: "Times Square",
        category: "Apartment",
        image: "http://via.placeholder.com/350*350",
        description: "nice apartment",
        dailyRate: 34,
        shared: true,
        createdAt: "24/12/2017",
      },
      {
      title: "Central Apartment 6",
      city: "New York",
      street: "Times Square",
      category: "Apartment",
      image: "http://via.placeholder.com/350*350",
      description: "nice apartment",
      dailyRate: 34,
      shared: true,
      createdAt: "24/12/2017",
      },
      {
      title: "Central Apartment 7",
      city: "New York",
      street: "Times Square",
      category: "Apartment",
      image: "http://via.placeholder.com/350*350",
      description: "nice apartment",
      dailyRate: 34,
      shared: false,
      createdAt: "24/12/2017",
      },
      {
      title: "Central Apartment 8",
      city: "New York",
      street: "Times Square",
      category: "Apartment",
      image: "http://via.placeholder.com/350*350",
      description: "nice apartment",
      dailyRate: 34,
      shared: false,
      createdAt: "24/12/2017",
      }
    ]
  }
  async cleanDb(){
      await Rental.remove({});
  }

  pushRentalsToDb(){
    this.rentals.forEach((rental) => {
      const newRental = new Rental(rental);
      newRental.save();
    });
  }

  seedDb() {
    this.cleanDb();
    this.pushRentalsToDb();
  }
}

module.exports = FakeDb;
