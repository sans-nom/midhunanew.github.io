IP=10.42.0.140
DATE=`date +%Y%m%d`
echo $DATE
if ping -q -c 1 -W 1 $IP   >/dev/null; then
    echo "The network is up"
    count=$(find /home/power/__sync_N_mv__/ -type f -print | wc -l)
    echo $count
    # ssh -X midhun@$IP "mkdir -p /home/midhun/Desktop/sync$DATE"
    rsync -avzP --ignore-existing --exclude-from 'rsync-exclude-list.txt' --log-file=rsyncNew.log /home/power/__sync_N_mv__/* "midhun@$IP:/home/midhun/Desktop/sync$DATE" > ~/Desktop/syncLaptop.txt
    countAgain=$(ssh -X midhun@$IP "find /home/midhun/Desktop/sync$DATE" -type f -print | wc -l)
    echo $countAgain
    if [ $count -eq $countAgain ]; then
            echo "All good..!"
            find /home/power/__sync_N_mv__/ -type f -print | wc -l
            cd /home/power/__sync_N_mv__/
            pwd
            find /home/power/__sync_N_mv__/ -type f  -exec  shred -uvzn 0 {} +
    else
            echo "forgot to Sync?"
    fi
else
    echo "The network is down"
fi
