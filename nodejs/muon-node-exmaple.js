var muonCore = require("muon-core");

var amqp = muonCore.amqpTransport("amqp://localhost:5672");
var muon = muonCore.muon('tck', amqp.getDiscovery(), [
    ["my-tag", "tck-service", "node-service"]
]);
muon.addTransport(amqp);


setTimeout(function() {
    
    muon.stream.subscribe("muon://eventstore/streamname", function(event, payload) {
        
        console.log(JSON.stringify(payload));
    });
    
},3500);
