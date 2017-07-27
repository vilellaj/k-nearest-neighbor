const Node = require('./node');

class NodeList {
  constructor(k) {
    this.nodes = [];
    this.k = k;
  }
  
  add(node) {
    this.nodes.push(node);
  }
  
  normalizeData() {
    this.areas = {min: 1000000, max: 0};
    this.rooms = {min: 1000000, max: 0};
    
    for (var i in this.nodes) {
        if (this.nodes[i].rooms < this.rooms.min) {
            this.rooms.min = this.nodes[i].rooms;
        }

        if (this.nodes[i].rooms > this.rooms.max) {
            this.rooms.max = this.nodes[i].rooms;
        }

        if (this.nodes[i].area < this.areas.min) {
            this.areas.min = this.nodes[i].area;
        }

        if (this.nodes[i].area > this.areas.max) {
            this.areas.max = this.nodes[i].area;
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
            this.nodes[i].measureDistances(this.areas, this.rooms);

            /* Sort by distance */
            this.nodes[i].sortByDistance();

            /* Guess type */
            console.log(this.nodes[i].guessType(this.k));

        }
    }
  }
}

module.exports = NodeList;