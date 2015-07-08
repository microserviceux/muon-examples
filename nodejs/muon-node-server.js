var muonCore = require("muon-core");

var amqp = muonCore.amqpTransport("amqp://localhost");

var muonServer = muonCore.muon('node-server', amqp.getDiscovery(), [
    ["my-tag", "tck-service", "node-service"]
]);

muonServer.addTransport(amqp);

setTimeout(function() {
    muonServer.resource.onQuery("/query", "Get the events", function(event, data, respond) {
        respond({"echo":"this is the server response"});
    });
},3500);
