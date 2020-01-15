# Start with an updated aws cli

`pip3 install awscli --upgrade --user`

https://endpoint/things/thingName/shadow

identifier.iot.region.amazonaws.com

`aws iot describe-endpoint`

https://a21r7hyxlsdackn5.iot.eu-east-1.amazonaws.com/things/midhunandroid/shadow


`aws --region eu-east-1 iot-data get-thing-shadow --thing-name midhunandroid /dev/stdout`


    {
      "state": {
        "reported": {
          "data1": 90,
          "data2": 10,
          "data3": 80,
          "data4": 30
        }
      },
      "version": 900
    }


### Test/Run a query 

https://eu-west-1.console.aws.amazon.com/iot/home?region=eu-east-1#/search?search=connectivity.connected:true&queryType=aggregate

    Search `connectivity.connected:true`
    Aggregation Type `Statistics`
    Aggregation Field `connectivity.connected`

  `aws iot-data update-thing-shadow --thing-name shijesh --payload "{\"state\":{\"reported\":{\"stress\":90,\"heartRateVariability\":10,\"heartRate\":80,\"spo2\":30}},\"version\":850}" "output.txt"`

  `aws iot update-thing --thing-name shijesh --attribute-payload {\"attributes\":{\"name1\":\"value2\"}}`

  `aws iot get-statistics     --index-name AWS_Things     --query-string "connectivity.connected:true"`

  `aws iot get-statistics     --index-name AWS_Things     --query-string "connectivity.connected:false AND shadow.reported.stress < 90"`

