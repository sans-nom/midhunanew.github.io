DEST_DIRECTORY="/var/www/temp/"
DATEDIR=`date +%Y-%m-%d`
FINAL_DEST_DIR="$DEST_DIRECTORY$DATEDIR"

if [ -d "$FINAL_DEST_DIR" ]; then
 # Control will enter here if $DIRECTORY exists.
 echo "folder exists $FINAL_DEST_DIR"
else
 echo "folder NOT exists $FINAL_DEST_DIR"
 mkdir -p "$FINAL_DEST_DIR"
fi

read -p "Enter ip you wanna connect" IP
read -p "Enter user-name of $IP" USERNAME
read -p "Enter remote folder you wanna copy" FOLDER_PATH

#IP="192.168.2.49"
#USERNAME="midhun"
#FOLDER_PATH="/var/www/mith_test/2014-07-31:16:27:08.zip"
#FOLDER_PATH="/var/www/mith_test/kfjfjjdjshhh2"
#FOLDER_PATH="/var/www/mith_test"

DATE=`date +%Y-%m-%d:%H:%M:%S`

echo " you are going to copy $FOLDER_PATH from $USERNAME@$IP INTO $DEST_DIRECTORY $DATE"

OUTPUT=$(
ssh "$USERNAME@$IP" FOLDER_PATH=$FOLDER_PATH DATE=$DATE 'bash -s' <<'ENDSSH'
#echo $FOLDER_PATH
if [[ -d $FOLDER_PATH ]]; then
    #echo "$FOLDER_PATH is a directory"
    #remove trailing slash
    target=${FOLDER_PATH%/}
    ZIP_FILE="$target/$DATE.zip"
    #cd $FOLDER_PATH
    #cd ..
    #echo `pwd`
    rm -f $ZIP_FILE; zip $ZIP_FILE -r --quiet $target
    echo $ZIP_FILE
elif [[ -f $FOLDER_PATH ]]; then
    #echo "$FOLDER_PATH is a file"
    echo $FOLDER_PATH
else
    #echo "$FOLDER_PATH is not valid"
    echo "IN VALID 1111"
    exit 1
fi
ENDSSH
)

echo $OUTPUT

if [ "$OUTPUT" == "IN VALID 1111" ]; then
   echo "Invalid file, try entering a valid folder or file next time!"
else
   scp "$USERNAME@$IP":$OUTPUT "$FINAL_DEST_DIR/$DATE.zip"
   echo "file saved as $FINAL_DEST_DIR/$DATE.zip"
   #rm -rf /var/www/bravo.com
   #unzip /var/www/temp/bravo.zip -d /var/www
fi

