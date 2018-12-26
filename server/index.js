
const config = require('./config/dev');
const express = require('express');
const mongoose = require('mongoose');
const Rental = require('./models/rental');
const FakeDb = require('./fake-db');

const rentalRoutes = require('./routes/rentals');

mongoose.connect(config.db_url).then(() => {
  const fakeDb = new FakeDb();
  fakeDb.seedDb();
});

const app = express();

app.use('api/v1/rentals', rentalRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, function(){
  console.log('I am running!');
});
