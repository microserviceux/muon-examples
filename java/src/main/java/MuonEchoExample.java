import io.muoncore.*;
import io.muoncore.Muon;
import io.muoncore.extension.amqp.AmqpTransportExtension;
import io.muoncore.extension.amqp.discovery.AmqpDiscovery;
import io.muoncore.future.MuonFuture;
import io.muoncore.future.MuonFutures;
import io.muoncore.transport.resource.MuonResourceEvent;

import java.util.HashMap;
import java.util.Map;


/**
 *
 * Simple echo client server example.
 *
 *
 * Created by gawain on 06/07/2015.
 */
public class MuonEchoExample {


    private static String amqpUrl = "amqp://muon:techfutu13@msg.cistechfutures.net:5672";

    public static void main(String[] args) throws Exception {
        Muon server = echoServer();
        Muon client = echoClient();

        server.shutdown();
        client.shutdown();



    }

    private static Muon echoServer() throws Exception {

        final Muon muon = new Muon( new AmqpDiscovery(amqpUrl));

        muon.setServiceIdentifer("echo");
        new AmqpTransportExtension(amqpUrl).extend(muon);
        muon.start();

        Thread.sleep(2000);

        muon.onQuery("/echo", Map.class, new MuonService.MuonQuery<Map>() {
            @Override
            public MuonFuture onQuery(MuonResourceEvent<Map> queryEvent) {
                Map obj = new HashMap(); // queryEvent.getDecodedContent();

                obj.put("method", "GET");
                obj.put("echo", "no message");

                return MuonFutures.immediately(obj);
            }
        });

        return muon;

    }


    private static Muon echoClient() throws Exception {

        final Muon muonclient = new Muon(  new AmqpDiscovery(amqpUrl));
        muonclient.setServiceIdentifer("echo");
        new AmqpTransportExtension(amqpUrl).extend(muonclient);

        muonclient.start();

        Thread.sleep(2000);

        MuonFuture<MuonClient.MuonResult<Map>> muonResultMuonFuture = muonclient.get("muon://echo/echo", Map.class);

        MuonClient.MuonResult<Map> mapMuonResult = muonResultMuonFuture.get();

        System.out.println("***** RESPONSE: " + mapMuonResult.getResponseEvent().getDecodedContent());

        return muonclient;
    }

}
