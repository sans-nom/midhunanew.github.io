 sam local start-api
 sam local start-lambda
 sam local invoke -e /path/to/event.json SamFunctionName
 sam logs -n SamFunctionName --stack-name SamApplicationnName --tail
 sam build SamFunctionName
 sam deploy --guided

 
 sam build GarminEndpoint && sam local invoke -e /home/power/Projects/MANAGEMENT/fuell/SAM/connectDebug/event_Daily_GarminEndpoint.json GarminEndpoint
 sam build GarminEndpoint && sam local invoke -e /home/power/Projects/MANAGEMENT/fuell/SAM/connectDebug/event_Sleep_GarminEndpoint.json GarminEndpoint
 sam build ScoreHandler && sam local invoke -e /home/power/Projects/MANAGEMENT/fuell/SAM/connectDebug/event_ScoreHandler.json ScoreHandler
