var muonCore = require("muon-core");

var amqp = muonCore.amqpTransport("amqp://muon:microservices@msg.cistechfutures.net:5672");
var muon = muonCore.muon('tck', amqp.getDiscovery(), [
    ["my-tag", "tck-service", "node-service"]
]);
muon.addTransport(amqp);


setTimeout(function() {
    

    muon.resource.query("muon://echo/echo", function(event, payload) {
            try {
                if (event.Status == "404") {
                    logger.error("Service returned 404 when accessing " + args[0]);
                } else {
                    console.dir(payload);
                }
            } catch (e) {
                logger.error("Failed to render the response", e);
            }
            process.exit(0);
        });
    
},3500);
