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

  `j=$((1 + RANDOM % 100)) && aws iot-data update-thing-shadow --thing-name myDonroid --payload "{\"state\":{\"reported\":{\"stress\":90,\"heartRateVariability\":10,\"heartRate\":$j,\"spo2\":30}},\"version\":$i}" "output.txt" && i=$((i+1))`

  `aws iot update-thing --thing-name shijesh --attribute-payload {\"attributes\":{\"name1\":\"value2\"}}`

  `aws iot get-statistics     --index-name AWS_Things     --query-string "connectivity.connected:true"`

  `aws iot get-statistics     --index-name AWS_Things     --query-string "connectivity.connected:false AND shadow.reported.stress < 90"`
  
  # see permissions of identity from identity pool browser
  ` aws iot get-effective-policies --principal <IDENTITY ID> --cognito-identity-pool-id <IDP-ID> --region eu-west-1`

  # attaching IoT Policy for creating shadow state
  `aws iot attach-policy --policy-name <IoT Policy from IoT Core> --target <IDENTITY ID> --region eu-west-1`


  
### Insert a message into a DynamoDB table

    Table name `CaptureDeviceStateRule`
    Partition key `thing`
    Partition key value `${current.state.reported.userId}`
    Sort key `timestamp`
    Sort key value `${timestamp}`
    Write message data to this column `state`
    IAM Role `service-role/CaptureDeviceStateRuleDDBRole`


##  SQL examples 
  SELECT state.reported FROM '$aws/things/+/shadow/update/documents' 
  SELECT *, parse_time("yyyy-MM-dd HH:mm:ss", timestamp()) as ts FROM "iot_device_analytics" 
  SELECT upper(type), topic(3) as thing FROM '$aws/things/+/shadow/update/accepted'
  SELECT sql_version(), md5(deviceid),  as thing FROM '$aws/things/+/shadow/update/accepted'

## time outputs

  localtime as wdx                                          12:12:45.529
  localtimestamp AS dfx                                     2020-04-27 12:12:45.529
  from_unixtime(1587987063115)                              +52291-04-22 21:31:55.000
  current_timestamp                                         2020-04-27 12:20:25.477 UTC
  to_unixtime(current_timestamp)                            1.587990025477E9
  current_timestamp + interval '1' month as ttx             2020-05-27 12:34:01.690 UTC
  to_iso8601(current_timestamp)                             2020-04-27T13:57:24.821Z
  timestamp() as mmm                                        1587997637193
  parse_time("yyyy-MM-dd HH:mm:ss", timestamp())            2020-04-27 14:27:10
  parse_time("yyyy-MM-dd HH:mm:ss:SSS", timestamp())        2020-04-28 05:49:00:988


  ## IoT Core --> IoT Analytics Manual Delta window of 5 minutes scheduled at 1 minute interval.

    SELECT *, Newuuid() as id, Timestamp()/1000 as ttl FROM 'stress'  # APPLY TTL and create `id` to tables
    SELECT *, Newuuid() as id, (Timestamp()/1000)+172800 as ttl, parse_time("yyyy-MM-dd", timestamp()) as date FROM 'stress' 
    
    SELECT *, parse_time("yyyy-MM-dd HH:mm:ss", timestamp()) AS txs, timestamp() AS mmm FROM 'mnx/heartRateVariability'
    SELECT * FROM heckslll_datastore WHERE txs > cast(localtimestamp - interval '5' minute AS Varchar)

  ### Some testings
  SELECT *, cast(Timestamp() AS Varchar) as id, cast(substring(Timestamp(), 0, 10) AS Integer) as ttl, Timestamp()/1000 as ttll FROM 'stress' 
  SELECT *, cast(Timestamp() AS Varchar) as id, cast(substring(Timestamp(), 0, 10) AS Integer) as ttl FROM 'stress' 
  SELECT *, cast(Timestamp() AS Varchar) as id, cast(substring(Timestamp(), 10) AS Integer) as ttl FROM 'stress' 
  SELECT *,   cast(Timestamp() AS Varchar) as id,   remainder(Timestamp(), 1000) as ttl FROM 'stress'  
