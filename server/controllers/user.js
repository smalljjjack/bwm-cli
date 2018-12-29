const User = require('../models/user');

exports.auth = function(req, res){

}

exports.register = function(req, res){
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const passwordConfirmation = req.body.passwordConfirmation;
  //const {username, email, password, passwordConfirmation} = req.body;
  if(!username || ! email) {
    return res.status(402).send({errors: [{title:"register err", detail: 'invalid user input!'}]});
  }

  if(password != passwordConfirmation){
    return res.status(402).send({errors: [{title:"register err", detail: 'password is not same as passwordConfirmation'}]});
  }

  User.findOne({email}, function(err, existingUser){
    if(err){
      return res.status(402).send({errors: [{'mongoose': 'will handle it in next lecture'}]});
    }

    if(existingUser){
      return res.status(402).send({errors: [{title:"register err", detail: 'email is existing'}]});
    }

    const user = new User({
      username,
      email,
      password,
      passwordConfirmation,
    });
    user.save(function(err){
      if(err){
        return res.status(402).send({errors: [{'mongoose': 'will handle it in next lecture'}]});
      }

      return res.json({'registerd':true});
    });
  });

}
