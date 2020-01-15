#!/bin/sh
# Creating list of unique folders to be backed up
rm -rf ~/.cache/thumbnails
find / -type f > allFiles.txt
python3 find_unique_folders.py allFiles.txt
