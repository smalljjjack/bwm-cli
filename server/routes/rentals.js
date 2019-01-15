const express = require('express');
const router = express.Router();
const Rental =  require('../models/rental');

const UserCtrl = require('../controllers/user')

const { normalizeErrors } = require('../helper/mongoose');

router.get('/secret', UserCtrl.authMiddleware, function(req, res){
  res.json({"secret":true});
});

router.get('/:id', function(req, res){
  const rentalId = req.params.id;

  Rental.findById(rentalId)
        .populate('user', 'username -_id')
        .populate('bookings', 'startAt endAt -_id')
        .exec(function(err, foundRental){
          if(err){
            return res.status(422).send({errors: [{title:"rental err", detail: 'Could not find rental!'}]});
          }
          return res.json(foundRental);
        });
});

router.get('', function(req, res){
  const city = req.query.city;
  const query = city ? {city: city.toLowerCase()} : {};

  Rental.find(query)
        .select('-bookings')
        .exec(function(err, foundRentals) {
          if(err){
            return res.status(422).send({errors: normalizeErrors(err.errors)});
          }if(city && foundRentals.length == 0){
            return res.status(422).send({errors: [{title:"No rentals found!", detail: 'no rentals for city ${city}!'}]});
          }else{
            return res.json(foundRentals);
          }
    });
});

module.exports = router;
