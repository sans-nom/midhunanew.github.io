import sys
import os


def main():
    filepath = sys.argv[1]

    if not os.path.isfile(filepath):
        print("File path {} does not exist. Exiting...".format(filepath))
        sys.exit()

    bag_of_words = {}
    skip_list = ['./bin', './boot', './cdrom', './dev', './etc', './initrd.img', './initrd.img.old', './lib', './lib64',
                 './lost+found', './media', './mnt', './opt', './proc', './root', './run', './sbin', './snap', './srv',
                 './swapfile', './sys', './tmp', './usr', './var', './vmlinuz', './vmlinuz.old']
    dir_list = ['./home']
    file_list = ['jpg', 'jpeg', 'CR2', 'png', 'mp3', 'pdf', 'zip', 'rar', 'txt', 'odt', 'xlx', 'xlxs', 'ts', 'js',
                 'php', 'opml', 'xspf', 'html', 'gnucash', 'sh', 'log', 'mp4', 'avi', 'mkv']
    file_type_count = 1
    if file_type_count == 0:
        f = open('processing.txt', 'w')
        f.write(str(file_type_count))  # python will convert \n to os.linesep
        f.close()
    else:
        f = open('processing.txt')
        file_type_count = f.readline()
        f.close()
    print(f'content is {file_type_count}')

    if int(file_type_count) > len(file_list):
        print('can\'t process this now')
        sys.exit()

    print(f'processing \'{file_list[int(file_type_count)]}\' files')
    j = file_list[int(file_type_count)]
    fip = open('input.txt', 'w')
    fop = open(j + 'output.txt', 'w')
    input_files = set()
    output_files = set()

    with open(filepath) as fp:
        cnt = 0
        for line in fp:
            cnt += 1
            for i in dir_list:
                if line.startswith(i):
                    input_files.add(line)
                    print(f'adding {i}')
                else:
                    print(f'skipping {line}')
                    

    for val in input_files:
        fip.write(val + '\n')
    fip.close()

    with open('input.txt') as fp:
        cnt = 0
        for line in fp:
            cnt += 1
            if line.endswith(j+'\n'):
                print(f'found {j} type file')
                output_files.add(line)
            else:
                print(f'skipping {line}')
                # print("line {} contents {}".format(cnt, line))
                # print(line)
                # else:
                #     print("line {} contents {}".format(cnt, line))
                # for j in file_list:
                #     if line.endswith(j):
                #         print(f'found {j} type file')
                #     else:
                #          print("line {} contents {}".format(cnt, line))

    for val in output_files:
        fop.write(val+'\n')



# record_word_cnt(line.strip().split(' '), bag_of_words)

#   sorted_words = order_bag_of_words(bag_of_words, desc=True)
#   print("Most frequent 10 words {}".format(sorted_words[:10]))

def order_bag_of_words(bag_of_words, desc=False):
    words = [(word, cnt) for word, cnt in bag_of_words.items()]
    return sorted(words, key=lambda x: x[1], reverse=desc)


def record_word_cnt(words, bag_of_words):
    for word in words:
        if word != '':
            if word.lower() in bag_of_words:
                bag_of_words[word.lower()] += 1
            else:
                bag_of_words[word.lower()] = 1


if __name__ == '__main__':
    main()
