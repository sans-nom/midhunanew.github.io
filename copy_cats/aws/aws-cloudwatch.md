# Don't forget to include "\" before latest or use single quotes
 aws logs get-log-events --log-group-name /aws/lambda/wearable-fusion-GarminEndpoint-19UYBDG8MA0LI --log-stream-name "2020/01/31/[\$LATEST]7d3c64ce7e06423d9b023d77eff8ca21"
 aws logs get-log-events --log-group-name /aws/lambda/wearable-fusion-GarminEndpoint-19UYBDG8MA0LI --log-stream-name '2020/01/31/[$LATEST]7d3c64ce7e06423d9b023d77eff8ca21'
