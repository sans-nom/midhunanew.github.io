verbose_ls() { youtube-dl --extract-audio --audio-format mp3 "$@"; \youtube-dl --download-archive ~/archive.txt "$@"; }
alias avo=verbose_ls
alias vid='youtube-dl --download-archive ~/archive.txt '
