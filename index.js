const dataSet = require('./data.json');  

const Node = require('./node');  
const NodeList = require('./node-list');    


let nodes = new NodeList(5);

for (var i in dataSet) {
  nodes.add( new Node(dataSet[i]) );
}

let random_rooms = Math.round( Math.random() * 10 );
let random_area = Math.round( Math.random() * 2000 );

nodes.add( new Node({rooms: random_rooms, area: random_area, type: false}) );

nodes.determineUnknown();
//nodes.draw("canvas");