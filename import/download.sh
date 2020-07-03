#!/bin/sh

# rm -rf old_raw/*

# wayback_machine_downloader http://newlyancient.com/ \
#   -d old_raw/ \
#   --to 20150111171055 \
#   -c 20 \

mkdir -p old_useful/

cp old_raw/*/*/*/*/index.html old_useful/*