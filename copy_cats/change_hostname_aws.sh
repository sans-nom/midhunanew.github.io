cat /etc/hostname # print content, ie, hostname
hn=$(hostname -f 2>/dev/null) # capture hostname,
echo $hn; # and print
sudo hostnamectl set-hostname $hn # set hostname
echo "127.0.0.1  $hn"  | sudo tee -a /etc/hosts # also add it to hosts
ls -l /etc/cloud/cloud.cfg && sudo sed -i -e '/preserve_hostname/ s/: .*/: true/' /etc/cloud/cloud.cfg # prevent changing hostname in case of aws
echo "Verifying... you will see three similar values, you got 20 seconds to cancel your reboot" # blah blah
hostnamectl | grep hostname # print it
cat /etc/hostname # and print again
curl http://169.254.169.254/latest/meta-data/local-hostname # and ensure against meta-data
sleep 20 # wait 20 seconds so user can verify hostname change
sudo reboot # rebooting to take effect
