const Node = require('./node');

class NodeList {
  constructor(k) {
    this.k = k;
    this.nodes = [];
    this.ranges = {};
  }
  
  add(node) {
    this.nodes.push(node);
  }
  
  normalizeData() {    
    let reference = this.nodes[0] || {};
    
    for(var key in reference) {
      this.ranges[key] = {min: 1000000, max: 0};             
    }
    
    for (let i in this.nodes) {
        for (let key in this.ranges) {
          if (this.nodes[i][key] < this.ranges[key].min) {
              this.ranges[key].min = this.nodes[i][key];
          }
          
          if (this.nodes[i][key] > this.ranges[key].max) {
              this.ranges[key].max = this.nodes[i][key];
          }
        }  
    }
  }
  
  determineUnknown() {
    this.normalizeData();

    /*
     * Loop through our nodes and look for unknown types.
     */
    for (var i in this.nodes)
    {

        if ( ! this.nodes[i].type)
        {
            /*
             * If the node is an unknown type, clone the nodes list and then measure distances.
             */

            /* Clone nodes */
            this.nodes[i].neighbors = [];
            for (var j in this.nodes)
            {
                if ( ! this.nodes[j].type)
                    continue;
                this.nodes[i].neighbors.push( new Node(this.nodes[j]) );
            }

            /* Measure distances */
            this.nodes[i].measureDistances(this.ranges);

            /* Sort by distance */
            this.nodes[i].sortByDistance();

            /* Guess type */
            console.log(this.nodes[i].guessType(this.k));

        }
    }
  }
}

module.exports = NodeList;