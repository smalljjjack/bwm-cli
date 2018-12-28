const Rental = require('./models/rental');

class FakeDb{

  constructor(){
    this.rentals = [
        {
        title: "Central Apartment 5",
        city: "New York",
        street: "Times Square",
        category: "Apartment",
        image: "https://media.equityapartments.com/images/c_crop,x_0,y_0,w_1920,h_1080/c_fill,w_1920,h_1080/q_80/4206-28/the-kelvin-apartments-exterior.jpg",
        description: "nice apartment",
        dailyRate: 34,
        shared: true,
        createdAt: "24/12/2017",
        bedrooms: 2,
      },
      {
      title: "Central Apartment 6",
      city: "New York",
      street: "Times Square",
      category: "condo",
      image: "data:image/jpeg;base64,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",
      description: "nice apartment",
      dailyRate: 34,
      shared: true,
      createdAt: "24/12/2017",
      bedrooms: 3,
      },
      {
      title: "Central Apartment 7",
      city: "New York",
      street: "Times Square",
      category: "house",
      image: "https://07f138315bb5e97f9e43-31068357019044cca7c8e84d92de0d99.ssl.cf3.rackcdn.com/1024x768/56587_11491_001.jpg",
      description: "nice apartment",
      dailyRate: 34,
      shared: false,
      createdAt: "24/12/2017",
      bedrooms: 4,
      },
      {
      title: "Central Apartment 8",
      city: "New York",
      street: "Times Square",
      category: "Apartment",
      image: "https://images.adsttc.com/media/images/59af/7a79/b22e/38b8/4100/00ed/medium_jpg/1.jpg?1504672368",
      description: "nice apartment",
      dailyRate: 34,
      shared: false,
      createdAt: "24/12/2017",
      bedrooms: 3,
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
