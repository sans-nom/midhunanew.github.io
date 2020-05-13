var awsIot = require('aws-iot-device-sdk');

const AWS = require('aws-sdk');

AWS.config.region = 'eu-west-1';

var iot = new AWS.Iot();

let template = "{\n" +
    "    \"Parameters\" : {\n" +
    "        \"ThingName\" : {\n" +
    "            \"Type\" : \"String\"\n" +
    "        }\n" +
    "    },\n" +
    "    \"Resources\" : {\n" +
    "        \"thing\" : {\n" +
    "            \"Type\" : \"AWS::IoT::Thing\",\n" +
    "            \"Properties\" : {\n" +
    "                \"ThingName\" : {\"Ref\" : \"ThingName\"},\n" +
    "                \"ThingTypeName\" :  \"AndroidDevice\",\n" +
    "                \"ThingGroups\" : [\"Fleet\"]\n" +
    "            }\n" +
    "        },\n" +
    "        \"certificate\" : {\n" +
    "            \"Type\" : \"AWS::IoT::Certificate\",\n" +
    "            \"Properties\" : {\n" +
    "                \"CertificateId\": \"6b38b650c8195add35cbedaf8095f50712177c765d08c6765b31fce0c6e280b1\"\n" +
    "            }, \n" +
    "            \"OverrideSettings\" : {\n" +
    "                \"Status\" : \"DO_NOTHING\"\n" +
    "            }\n" +
    "        }\n" +
    "    }\n" +
    "}";

var template2 = {
    "Parameters": { "ThingName": { "Type": "String" } }, "Resources":
    {
        "thing": {
            "Type": "AWS::IoT::Thing", "Properties": {
                "ThingName": { "Ref": "ThingName" },
                //  "AttributePayload": {"version":"v1","tagName":"attrValue"},
                "ThingTypeName": "AndroidDevice",
                "ThingGroups": ["Fleet"]
            }
        }, "certificate": { "Type": "AWS::IoT::Certificate", "Properties": { "CertificateId": "6b38b650c8195add35cbedaf8095f50712177c765d08c6765b31fce0c6e280b1" }, "OverrideSettings": { "Status": "DO_NOTHING" } }
    }
};
console.log(template2);



var params = {
    templateBody: JSON.stringify(template2),
    parameters: { "ThingName": "TestMay11THing" }
};

console.log(params);


iot.registerThing(params, function (err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else console.log(data);           // successful response
});

const iotData = new AWS.IotData({
    endpoint: 'xxxxxxxx-xxx.iot.eu-west-1.amazonaws.com'
});

var params = {
    payload: '{"state": {"reported": {"userId": "midhun,"heart": true}}}',
    thingName: 'TestMay11THing' /* required */
};
iotData.updateThingShadow(params, function (err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else console.log(data);           // successful response
});