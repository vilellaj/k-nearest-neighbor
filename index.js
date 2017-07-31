const dataSet = require('./data2.json');  

const Node = require('./node');  
const NodeList = require('./node-list');    

let nodes = new NodeList(10);

for (var i in dataSet) {
  nodes.add( new Node(dataSet[i]) );
}

let test = {
  size: 32,
  legs: 21,
  color: 10
};

nodes.add( new Node(test) );

nodes.determineUnknown();
//nodes.draw("canvas");