class Node {
    constructor(object) {
      for (let key in object) {
        this[key] = object[key];
      }
    }
  
    measureDistances(ranges) {
      var newRanges = {};
      
      
      for(let key in ranges) {
        newRanges[key] = ranges[key].max - ranges[key].min;
      }

      for (var i in this.neighbors)
      {
          var deltas = {};

          /* Just shortcut syntax */
          var neighbor = this.neighbors[i];
          var deltaSum = 0;
          for(var key in newRanges) {
            deltas[key] = neighbor[key] - this[key];
            deltas[key] = (deltas[key]) / newRanges[key];
            
            deltaSum += deltas[key] * deltas[key];
          }
          
          
          neighbor.distance = Math.sqrt( deltaSum );
      }
    }
  
    sortByDistance() {
       this.neighbors.sort(function (a, b) {
          return a.distance - b.distance;
      });
    }
  
    guessType(k){
      var types = {};

      for (var i in this.neighbors.slice(0, k))
      {
          var neighbor = this.neighbors[i];

          if ( ! types[neighbor.type] )
          {
              types[neighbor.type] = 0;
          }

          types[neighbor.type] += 1;
      }

      var guess = {type: false, count: 0};
      for (var type in types)
      {
          if (types[type] > guess.count)
          {
              guess.type = type;
              guess.count = types[type];
          }
      }

      this.guess = guess;

      return types;
    }
}

module.exports = Node;