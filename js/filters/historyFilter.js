Fideligard.filter("historyFilter", [
  function() {
  return function(collection, filter, include) {
    //checkbox for Buy only VS Sell only goes here. 
    if(!filter){
      return collection
    }
    var returnCollection = []

    for(transactionKey in collection){

      if(collection[transactionKey].symbol.includes(filter) ){
        returnCollection.push(collection[transactionKey])
      }
    };

    return returnCollection
  }
}])

