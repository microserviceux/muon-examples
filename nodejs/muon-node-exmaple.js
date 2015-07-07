var muonCore = require("muon-core");

var amqp = muonCore.amqpTransport("amqp://muon:microservices@msg.cistechfutures.net:5672");
var muon = muonCore.muon('tck', amqp.getDiscovery(), [
    ["my-tag", "tck-service", "node-service"]
]);
muon.addTransport(amqp);


setTimeout(function() {

    muon.resource.query("muon://echo/echo", function(event, payload) {
            console.log(payload);
        });
    
},3500);
