#!/bin/bash
# current shadow version
i=2147
x=1
while [ $x -le 5000 ]
do
    sleep 2
    echo "Welcome $x times"
    j=$((1 + RANDOM % 100))
    k=$(date +%s%N | cut -b1-13)
    aws iot-data update-thing-shadow --thing-name midhun --payload "{\"state\":{\"reported\":{\"stress\":100,\"heartRateVariability\":$j,\"heartRate\":$j,\"spo2\":30}},\"version\":$i}" "output.txt"
    # aws iot-data publish --topic 'heartRateVariability' --payload  "{\"userId\":\"midhun\",\"value\":$j,\"dataType\":\"HEART_RATE_VARIABILITY\",\"timestamp\":\"$k\"}"
    aws iot-data publish --topic 'mnx/heartRateVariability' --payload  "{\"userId\":\"midhun\",\"value\":$j,\"dataType\":\"HEART_RATE_VARIABILITY\",\"timestamp\":\"$k\"}"
    # "timestamp": "2020-04-27T07:26:19.076Z"
    i=$((i+1))
    x=$(( $x + 1 ))
done