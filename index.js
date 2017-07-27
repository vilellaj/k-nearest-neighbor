const dataSet = require('./data.json');  

const Node = require('./node');  
const NodeList = require('./node-list');    

let nodes = new NodeList(5);

for (var i in dataSet) {
  nodes.add( new Node(dataSet[i]) );
}

let test = {
  size: 3,
  legs: 2,
  color: 1
};

nodes.add( new Node(test) );

nodes.determineUnknown();
//nodes.draw("canvas");