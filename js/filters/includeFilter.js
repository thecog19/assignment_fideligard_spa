Fideligard.filter("includeFilter", [
  function() {
  return function(collection, buy, sell) {
    //checkbox for Buy only VS Sell only goes here. 
    if(buy && sell){
      return collection
    }

    var returnCollection = []

    for(transactionKey in collection){

      if(collection[transactionKey].type === "Buy" && buy ){
        returnCollection.push(collection[transactionKey])
      }

      if(collection[transactionKey].type === "Sell" && sell ){
        returnCollection.push(collection[transactionKey])
      }
    };

    return returnCollection
  }
}])

