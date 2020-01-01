#!/bin/sh
# Creating list of unique folders to be backed up
rm -rf ~/.cache/thumbnails
python3 find_unique_folders.py allFiles.txt
