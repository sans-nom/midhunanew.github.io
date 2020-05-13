var awsIot = require('aws-iot-device-sdk');

/**
 * SELECT * FROM 'topic'
 * 
 * // Manual 5 min.s Delta Window
 * SELECT * FROM topic_datastore WHERE from_iso8601_timestamp(timestamp) > localtimestamp - interval '5' minute
 */

var device = awsIot.device({
    keyPath: '../certs/nnnn8888nn-private.pem.key',
    certPath: '../certs/nnnn8888nn-certificate.pem.crt',
    caPath: '../certs/AmazonRootCA1.pem',
    clientId: 'JSSDKThing',
    host: 'xxxxxxxx-xxx.iot.eu-west-1.amazonaws.com'
});

// "timestamp": "2020-04-27T07:26:19.076Z"
// "timestamp": "1588072345620"
// "timestamp": "2020-04-28T11:19:12.666Z"

var b = 1, topic = 'topic3', userId = "midhun";

device
    .on('connect', function () {
        console.log('connect');
        device.subscribe(topic);
        // trigger the loop
        let x = new Date().toISOString();
        let data = {
            userId,
            "value": 999,
            "timestamp": x
        };
        device.publish(topic, JSON.stringify(
            data
        ));
    });

device
    .on('message', function (topic, payload) {
        console.log('message '+b, topic, payload.toString());
        let x = new Date().toISOString();
        let y = Math.floor(Math.random() * (1000 - 850) + 850);
        let data = {
            userId,
            "value": y,
            "timestamp": x
        };
        setTimeout(() => {
            b++;
            device.publish.apply(null, [topic, JSON.stringify(data)]);
        }, 800);
    });