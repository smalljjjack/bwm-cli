module.exports = {
  normalizeErrors: function(errors){
    let errorsMessage = [];
    for(let key in errors){
      if(errors.hasOwnProperty(key)) {
        errorsMessage.push({title: key, detail: errors[key].message});
      }
    }
    return errorsMessage;
  }
}
