cat /etc/hostname
hn=$(hostname -f 2>/dev/null)
echo $hn;
sudo hostnamectl set-hostname $hn
echo "127.0.0.1  $hn"  | sudo tee -a /etc/hosts
ls -l /etc/cloud/cloud.cfg && sudo sed -i -e '/preserve_hostname/ s/: .*/: true/' /etc/cloud/cloud.cfg
echo "Verifying... you will see three similar values, you got 20 seconds to cancel your reboot"
hostnamectl | grep hostname
cat /etc/hostname
curl http://169.254.169.254/latest/meta-data/local-hostname
sleep 20
sudo reboot
