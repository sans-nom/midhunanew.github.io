[See more...](https://github.com/rahulinux/scripts)


    pstree

# File-systems
-------------

## list block devices (like hdd)
    lsblk

## list partition tables and file system with boot indication
    sudo fdisk -lu

## automatic mounting configuration
    cat /etc/fstab

## check mounted volumes details
    sudo mount

## mount a volume
    sudo mount /dev/sda1 /media/newhd

## unmount by device or mount point
    sudo umount /dev/sda1
    sudo umount /media/newhd

## file system disk space usage
    df -h

## Count number of files
    find . -type f -print | wc -l # Count number of files iside in the directory
    ls -1 | wc -l # Count the items inside in the directory
    ls -la | grep ^d | wc -l # Count the directories inside in the directory

## memoty usage
    free -m # in `m`B or `g`B

# Network
    ip route | grep default # findout default gateway
    route -n # routing table

# Installation
## install `make clean`
    sudo apt-get install build-essential
 
# terminal - http://ss64.com/bash/
-------------
    jobs                - see status of jobs / process run in current terminal.
    Ctrl + z            - pause job and send to background.
    bg                  - send process to background.
    disown              - detach process from terminal

    nohup foo.sh <script parameters> >& `log_file_name` &

    nohup               - continue proocess after logs off.
    >& `log_file_name`  - error & ouput to log file.
    &                   - fork process & run in background.

# Search or Find
-------------
    find . -iname "*.json" -type f  -exec  grep -E 'word1|word2' {} + # Advanced - search some files for multiple words
    grep -E 'fatal|error|critical|failure|warning|' *.log # Search some files for multiple words
    grep -R "test" /var/x/ # Seacrh file content recursively
    grep -I "test" /var/x/ # Skip binary files
    grep -lir 'searchTerm' /textFiles/* | xargs mv -t /results # move files by searchTerm
    locate -i "<name>" # Search index
    find /var/www7/  -type f -iname "*quote*" | grep ".txt" # Search in folder
    find . -type f -iname "*.jsx" # Find in current folder
    find ~ -type d -exec chmod +x {} \; # Give execution permission for directories
    find ~ -type f \( -iname '*.mp3' -o -iname '*.ogg' \) > mynewplaylist.m3u # Why dodn't yo listen some music?

### List subfolders
    du
    find . -type d

### Check all files are copied --dry-run (-n) Use -z for network-compression, --exclude=*.amr
    find . -name 'node_modules' -type d -prune -exec rm -rf '{}' +
    #### n means dry-run, a means archive, P means partial, z means compression
    rsync -avzP --dry-run --ignore-existing --exclude-from 'sync-exclude-list.txt' --log-file=rsyncNew.log ~/* midhun@192.168.0.103:~/ > ~/Desktop/syncOutput.txt
    #### n means dry-run
    rsync -anvP --ignore-existing /media/Ubuntu116GB-OS2/bin/ /media/My\ Passport/Ubuntu116GB-OS2/bin > op.txt
    #### human readable copying
    rsync -Pavzh --ignore-existing power@192.168.1.136:/home/power/Documents/Canon ./
    #### verify and delete
    rsync -Pavzh --checksum --ignore-existing power@192.168.1.136:/home/power/Documents/Canon ./
    rsync -Pavzh --remove-source-files --ignore-existing power@192.168.1.136:/home/power/Documents/Canon ./
    
### && verify data integrity - http://unix.stackexchange.com/questions/109524/reasons-for-rsync-not-transfering-all-files

    ( cd /media/Ubuntu116GB-OS2/workSpace && find . -type f -exec md5sum {} \; ) > /home/mithoos/Documents/hholtmann.md5sum
    ( cd /media/My\ Passport/Ubuntu116GB-OS2/workSpace && md5sum -c /home/mithoos/Documents/hholtmann.md5sum )

## See file modification time
    stat -c '%y' file.txt
    date -d "@$(stat -c '%Y' file.txt)" '+%a %b %d %Y%t%R:%S:%N%t%Z(%:z)'

## get folder size
    du -hs  routes/
    du -chd 1 | sort -h

## list DNS servers
    nmcli dev list iface eth0 | grep IP4

## list connection on network
    arp -a

## list only directories
    ls -la | grep ^d

# Android

## set ANDROID_HOME
    export ANDROID_HOME=/opt/adt-bundle-linux-x86_64-20140702/sdk

***^ The folder which contains **tools** and **platform-tools** folders.***

    keytool -list -v -keystore .keystore # check password
    keytool -list -v -keystore .keystore -storepass choco35 -alias jointly -keypass choco35 # check signature/finger print

## Cordova API
------------

    platforms/android/cordova/clean
    cordova build android --release -- --keystore="/path/to/keystore" --storePassword=password --alias=dupName
    adb install -r platforms/android/build/outputs/apk/android-release.apk
    adb shell am start -n org.sf.people/org.sf.people.MainActivity
    
## See Logs
    adb logcat | grep `adb shell ps | grep org.sf.people | cut -c10-15`
    adb logcat | grep "chromium"


## phonegap API
------------

    curl -u phonegap@appsbusinesstore.com https://build.phonegap.com/api/v1/apps
    phonegap remote login -u phonegap@appsbusinesstore.com -p app2018app
    phonegap create n00v com.example.n00v HelloN00v
    phonegap [error] {"error":"app 885713 not found"}
    curl -u phonegap@appsbusinesstore.com -X DELETE https://build.phonegap.com/api/v1/apps/885759

# Using a Safe user?

https://www.digitalocean.com/community/tutorials/how-to-use-pm2-to-setup-a-node-js-production-environment-on-an-ubuntu-vps

    su - safeuser


# SCP

    scp /var/www/abs.com/source/node_abs.zip azureuser@168.61.85.68:/var/www/

    scp remote_user@remote_host:/path/to/remote/file /path/to/local/file

    scp -i laksinEU.pem ubuntu@ec2-176-34-90-127.eu-west-1.compute.amazonaws.com:/var/www/abs.com/Dependencies/abs.zip /var/www/abs.com/Dependencies/MongoDB/dumps/email-Aswathy/abs.zip

    scp -i laksinEU.pem /var/www/abs.com/Dependencies/MongoDB/dumps/email-Aswathy/abs.zip ubuntu@ec2-176-34-90-127.eu-west-1.compute.amazonaws.com:/var/www/abs.com/Dependencies/abs.zip

    # copy from server to local
    scp -i laksinEU.pem ubuntu@ec2-176-34-90-127.eu-west-1.compute.amazonaws.com:/etc/nginx/nginx.conf /home/n00v/Desktop/receive/nginx.conf....
    scp -i tropezcpa.pem ec2-user@ec2-54-88-8-200.compute-1.amazonaws.com:/home/ec2-user/tempDump/ad.zip /home/n00v/Desktop/advisorfiMongo.zip

# MySQL
-----
## import csv file
    mysqlimport --ignore-lines=1 \
                --fields-terminated-by=, \
                --verbose \
                --fields-enclosed-by='"' \
                --lines-terminated-by="\\n"\
                --local -u root \
                -p db_name \
                TABLE-NAME.csv

# Mongo
-----

    db.addUser('midhun', '192.168.2.49');
    db.auth('midhun', '192.168.2.49');

    db.sessions.update({platform_message:{ "$exists" : false }},{"$set":{"platform_message":"Great you know that already.."}},{multi:true})

## csv import

    mongoimport -d domainManagement -c domainList --type csv --file Domain_prices.csv  --headerline

    mongodump --host 127.0.0.1 -d development --port 27017 --username user --password pass --out /opt/backup/mongodump-2013-10-07-1
    mongodump -d dbname --out /home/ec2-user/tempDump/

    mongorestore  --drop --db abs --collection Localizations Localizations.bson
 
    mongorestore /path/to/dir/ --drop --db advisorfi #  Where `dir` contains all .json and .bson files.


## EMPTY (clear) file content*
 ----------------

    echo -n > YOURFILE
    cat /dev/null > YOURFILE
    sudo bash -c "> /var/log/mongodb/mongod.log" ## If you have no permission

## Append a line
----------------
    echo "0.0.0.0 www.google.com" | sudo tee -a /etc/hosts

## Create a file
----------------
    touch content.txt # empty file

    cat > content.txt <<EOF # create file with content
    # multi line content here
    # multi line content here
    # multi line content here
    EOF

    cat << EOF | file - # temp file on the fly and apply command (here  `file`)
    # multi line content here
    # multi line content here
    # multi line content here
    EOF

## Replalce text in file
----------------

    jq '.database.mongo.host = "127.0.0.1"' <<< cat ubuntu.json # using json parser
    sed -i 's/192.168.0.121/127.0.0.1/;s/192.168.0.28/127.0.0.1/' ubuntu.json # regex matching

## Destroy file forever

        shred -uvzn 0 file.ext

## Change hostname
------------------

`see change_hostname_aws.sh` in this repo.

# Deal with date time
    date +%s%N | cut -b1-13 # prints JS equivalent Date.now()

## See file cahnges as it ahppens
-------------------------

    tail -f /home/ubuntu/server/tomcat/logs/catalina.out

# CRON


    crontab -e
    */1 * * * * eval "export $(egrep -z DBUS_SESSION_BUS_ADDRESS /proc/$(pgrep -u $LOGNAME gnome-session)/environ)";/usr/bin/notify-send -i  appointment  -c "im" "Cron Working"
    crontab -l

# SSH

    ssh-copy-id n00v-ranjiba@192.168.2.42
    ssh 'n00v-ranjiba@192.168.2.42'
 
## X - execute at remote;
    ssh -X n00v@192.168.2.58 'DISPLAY=:0 notify-send -i /usr/share/icons/hicolor/32x32/apps/skype.png "Ajith -2.13: pls come"'

    ssh -X n00v@192.168.2.36 'sudo poweroff'

# SCREEN

    screen -ls
    screen -r id
    Ctrl + A + D


# ZIP
 
    zip zipname.zip -r folder_name
    unzip /var/www/temp/zipname.zip -d /var/www
    tar -xvzf community_images.tar.gz # x - extract; v - verbose; z - gzip; f - file
 
 ### list contents of a jar file
     jar tf file.jar
 
 ## Link file
 -----
 
    ln [options] <target-file> <link-name> # s -symbolic_link; v - verbose; r - relative path
    ln -svr CLI.md CLI.txt
 
 ## Check PORT usage
 -----

### find out the process which uses the port 4444
    lsof -t -i:4444

### list all connections relates to port 4200, combine with `| wc -l`  to get count
    lsof -i TCP:4200
 
 # npm
 -----
    sudo npm cache clean -f
    sudo npm install -g n
    sudo n stable
    sudo n
    npm install node-ses --save -save-exact


 # chmod
 -----
    sudo chmod -R 100 *.*

# SYSTEM logs - shutdown and start up
-------------
    last -x | grep shutdown
    sudo nano /etc/default/bootlogd #set BOOTLOGD_ENABLE=Yes
    cat /var/log/kern.log | grep "/proc/kmsg started"
    cat /var/log/kern.log | grep "Kernel logging "

 # SHUTDOWN
 --------
    sudo poweroff
    sudo shutdown 18:30

# MISC

## Generate .pem file to login without password -
 http://askubuntu.com/a/644027/300767
