---
published: false
layout: post
title: "Extract Google Authenticator Codes from Database"
description: ""
image: 
video: 
date: 2015-12-19 00:00:00 -0400
comments: true
categories: []
tags: 
---



I wiped up a script to display QR codes from a Google Authenticator's database file.  Useful to move to another authenticator app or to extract secrets.

    for i in {1..9}; do URI=$(echo "SELECT * FROM accounts WHERE _id = $i;" \
    | sqlite3 databases \
    | awk -F'|' '{print "otpauth://totp/"$2"?secret="$3"&issuer="$7}') \
    && echo $URI | qrencode -t ASCII -o "/tmp/qrcode-$i.txt" \
    && cat "/tmp/qrcode-$i.txt" | sed 's/ /█/g' | sed 's/#/ /g' \
    > "/tmp/qrcode-$i-2.txt" \
    && echo "$URI" \
    && cat "/tmp/qrcode-$i-2.txt"; done


