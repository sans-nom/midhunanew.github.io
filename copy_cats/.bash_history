 nvm install 8.12.0
 shred -uvzn 0 *.care*
 free -h
 sudo apt --fix-broken install
 sudo apt-get update
 echo $JAVA_HOME
 ln -s /etc/nginx/sites-available/www.example.org.conf /etc/nginx/sites-enabled/
 su -l kafka
 docker run -d --rm -p 63033:3000 simple-node-responder
 lsof -t -i:40374
 echo "0.0.0.0 account.jetbrains.com" | sudo tee -a ~/Desktop/asianet.sub.txt 
 ls -1 | wc -l
 find tempCare -type f  -exec  shred -uvzn 0 {} +
 find . -type f -print | wc -l
 git stash show -p stash@{6}
 git check-ignore -v *
 lsof -i TCP:9092 | wc -l
 nmap -sn 192.168.1.0/24
 curl -o /dev/null --silent --head --write-out '%{http_code}\n' https://ms-shared-nad.techmahindra.com/000000000032856-nad-ruleengine-microservice-np03anzw75-24135
 youtube-dl --download-archive ~/archive.txt --extract-audio --audio-format mp3 <video URL>
 a=$(git rev-parse --abbrev-ref HEAD) && echo $a && node --max_old_space_size=8048 ./node_modules/@angular/cli/bin/ng serve -c "${a,,}"
 export NODE_ENV=ubuntu && echo "$NODE_ENV" && nodemon start index-local.js
 a=np03anzw75-14378 && echo $a && node --max_old_space_size=8048 ./node_modules/@angular/cli/bin/ng serve -c "${a,,}"
 export PATH="$PATH:/opt/IBM_Cloud_CLI"
 jupyter notebook
 yarn run storybook
 yarn dev
 git fetch --all
 echo $ANDROID_HOME
 ionic cordova run android --emulate
 IONIC_ENV=prod-debug ionic cordova run android --emulate --prod
 ionic cordova run android --emulate --prod
 git status
 npm install
 yarn dev
 sudo nginx -t && sudo systemctl restart nginx.service
 ng serve  --disable-host-check
 ng build --prod && rsync -arvz -e 'ssh -p 8000' dist planner@185.148.147.8:/home/planner/planner-v2/frontend/
 htop
 ssh node-stripe-api@185.148.147.4
 node_modules/.bin/surge dist/
 yarn build && node_modules/.bin/surge dist/
 amplify env
 pip3 install awscli --upgrade --user
 aws iot get-statistics     --index-name AWS_Things     --query-string "connectivity.connected:false AND shadow.reported.stress < 90"
 i=2040;j=$((1 + RANDOM % 100))
 j=$((1 + RANDOM % 100)) && aws iot-data update-thing-shadow --thing-name PocoX2 --payload "{\"state\":{\"reported\":{\"stress\":90,\"heartRateVariability\":10,\"heartRate\":$j,\"spo2\":30}},\"version\":$i}" "output.txt" && i=$((i+1)) 
 python ~/Desktop/pass_gen.py
 aws s3 cp s3://capture-log-garmin . --recursive  >/dev/null
 adb shell screenrecord --output-format=h264 - | ffplay -
 for branch in `git branch -r | grep -v HEAD`;do echo -e `git show --format="%ci %cr" $branch | head -n 1` \\t$branch; done | sort -r
 sam logs -n GarminEndpoint --stack-name SAM_APP_NAME --tail
 sam build FunctionName && sam local invoke -e /home/power/Projects/MANAGEMENT/fuell/SAM/connectDebug/event_Daily_GarminEndpoint.json FunctionName
 sam build FunctionName && sam local start-api
 ping google.com
 ping facebook.com
 ping 8.8.8.8
 watch -n 1 curl -X POST -H "Content-Type: application/json" -d @req.json http://127.0.0.1:3000/qstatsvz
 grep -Ril "'amplify-authenticator'" .
 sam build SessionSummary && sam local invoke -e /home/power/Projects/MANAGEMENT/fuell/SAM/connectDebug/event_SessionSummary.json SessionSummary
 find . -type f -newermt "-24 hours" -ls
 ionic cordova run android --device -l --debug
 http-server -p 8080 -c-1 dist/
 lighthouse https://dev.dh3qqktgu1rux.amplifyapp.com
 sudo find / -type f -printf "%s\t%p\n" | sort -n | tail -20  2> /dev/null
 nodemon --exec "php crons/combine.php" --ignore public/
 find . -type f -iname "*.txt" -exec shred -uvzn 0 {} \;
