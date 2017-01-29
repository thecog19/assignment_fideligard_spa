Fideligard.filter("dateFilter", [
  function() {
  return function(collection, currentDate) {

    var returnCollection = []

    for(var i = 0; i < collection.length; i++){
      date = new Date(collection[i].Date.slice(0,4), 
                      collection[i].Date.slice(5,7), 
                      collection[i].Date.slice(8,10))
      colsole.log(currentDate)
      if(date - 0 > currentDate){
        returnCollection.push(collection[i])
      }
    };

    return returnCollection
  }
}])
