ssh n00v-ranjiba@192.168.2.42 'cd /var/www; rm -f bravo4midhun.zip; zip bravo4midhun.zip -r bravo.com/ exit'
rm -f /var/www/temp/bravo.zip
scp n00v-ranjiba@192.168.2.42:/var/www/bravo4midhun.zip /var/www/temp/bravo.zip
rm -rf /var/www/bravo.com
unzip /var/www/temp/bravo.zip -d /var/www

