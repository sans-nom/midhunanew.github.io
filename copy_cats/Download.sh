while IFS= read -r line
do
  echo "$line"
  wget $line
done < Download.txt
