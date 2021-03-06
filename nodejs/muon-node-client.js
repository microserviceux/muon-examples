var muonCore = require("muon-core");
var sleep = require('sleep');

var amqp = muonCore.amqpTransport("amqp://localhost");

var muonClient = muonCore.muon('node-client', amqp.getDiscovery(), [
    "my-tag", "tck-service", "node-service"
]);

muonClient.addTransport(amqp);

setTimeout(function() {

    muonClient.resource.query("muon://node-server/query", function(event, payload) {
            console.log("event received...");
            console.log(payload);
        });
    
},3500);
