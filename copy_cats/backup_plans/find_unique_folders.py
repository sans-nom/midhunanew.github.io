import sys
import os


def main():
    filepath = sys.argv[1]

    if not os.path.isfile(filepath):
        print("File path {} does not exist. Exiting...".format(filepath))
        sys.exit()

    skip_list = ['./bin', './boot', './cdrom', './dev', './etc', './initrd.img', './initrd.img.old', './lib', './lib64',
                 './lost+found', './media', './mnt', './opt', './proc', './root', './run', './sbin', './snap', './srv',
                 './swapfile', './sys', './tmp', './usr', './var', './vmlinuz', './vmlinuz.old']
    dir_list = ['./home']
    input_files = set()

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


    fip = open('input.txt', 'w')
    for val in input_files:
        fip.write(val)
    fip.close()


if __name__ == '__main__':
    main()
