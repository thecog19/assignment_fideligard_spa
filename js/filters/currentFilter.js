Fideligard.filter("currentFilter", [
  function() {
  return function(collection, currentDate) {

    var returnCollection = []

    for(var i = 0; i < collection.length; i++){

      date = new Date(collection[i].Date)
      if((date - 0) + 43200000 > currentDate - 0 && date - 43200000 < currentDate - 0 ){
        returnCollection.push(collection[i])
      }
    };

    return returnCollection
  }
}])