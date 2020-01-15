import sys
import os


def main():
    filepath = 'input.txt'

    if not os.path.isfile(filepath):
        print("File path {} does not exist. Exiting...".format(filepath))
        sys.exit()

    file_list = ['jpg', 'jpeg', 'CR2', 'png', 'mp3', 'pdf', 'zip', 'rar', 'txt', 'odt', 'xlx', 'xlxs', 'ts', 'js',
                 'php', 'opml', 'xspf', 'html', 'gnucash', 'sh', 'log', 'mp4', 'avi', 'mkv', 'kdbx']

    f = open('processing.txt')
    file_type_count = int(f.readline())
    f.close()

    log = open('processing_log.txt', 'w')
    print(f'content is {file_type_count}', file = log)

    if int(file_type_count) > len(file_list):
        print('can\'t process this now')
        sys.exit()

    print(f'processing \'{file_list[int(file_type_count)]}\' files', file = log)
    j = file_list[file_type_count]
    fop = open(j + 'output.txt', 'w')
    output_files = set()

    with open(filepath) as fp:
        cnt = 0
        for line in fp:
            cnt += 1
            if line.endswith(j + '\n'):
                print(f'found {j} type file')
                output_files.add(line)
            else:
                print(f'skipping {line}')
                # print("line {} contents {}".format(cnt, line))

    for val in output_files:
        fop.write(val)

    f = open('processing.txt', 'w')
    f.write(str(file_type_count + 1))  # python will convert \n to os.linesep
    f.close()

if __name__ == '__main__':
    main()
