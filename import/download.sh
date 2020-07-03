#!/bin/sh

rm -rf old_raw_2/*

wayback_machine_downloader http://newlyancient.com/ \
  -d old_raw_2/ \
  --to 20150111171055 \
  -c 20 \
