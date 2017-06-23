---
published: false
layout: post
title: "Using Bash on Ubuntu on Windows"
description:
image:
video:
date: 2016-04-07 12:11:55 -0400
comments: true
categories: [software]
tags: [windows, bash]
---

Let's see what we got after enabling [***Bash on Ubuntu on Windows***](/software/how-to-enable-bash-on-windows-10-preview.html).

## Hostname

Let's change that hostname.  We aren't localhost, we are a dev box.

    root@localhost:~# echo "devbox" > /etc/hostname
    root@localhost:~# nano /etc/hosts

    # change all "localhost" to "devbox", or whatever you'd like to call it.
    127.0.0.1 localhost.loghome localhost devbox

My local network/domain name is named "loghome" hence the suffix.

## Reboot Linux to take effect... Oops!

To get that hostname to take effect, you'd reboot that Linux VM.  Except, it's
not a VM!

    root@localhost:~# reboot
    shutdown: Failed to connect to socket /com/ubuntu/upstart: No such file or directory

Heh.  Muscle memory of running Linux within a VM on Windows.

Reboot your Windows to take effect.

## Networking INOP

First, I noticed that DNS wasn't resolving for me.  

    root@localhost:~# apt-get update
    Err http://archive.ubuntu.com trusty InRelease

    Err http://archive.ubuntu.com trusty-updates InRelease

    Err http://security.ubuntu.com trusty-security InRelease

    Err http://archive.ubuntu.com trusty Release.gpg
    Could not resolve 'archive.ubuntu.com'
    ...

Ping?

    root@localhost:~# ping google.com
    ping: unknown host google.com

Nslookup has its own networking stack:

    root@localhost:~# nslookup www.google.com
    socket.c:2447: setsockopt(20, SO_TIMESTAMP) failed: Invalid argument
    socket.c:1915: internal_send: 127.0.0.1#53: Invalid argument
    socket.c:2447: setsockopt(21, SO_TIMESTAMP) failed: Invalid argument
    socket.c:2476: setsockopt(21, IPV6_RECVPKTINFO) failed: Invalid argument
    socket.c:1915: internal_send: ::1#53: Invalid argument

    root@localhost:~# ip addr show
    Cannot open netlink socket: Invalid argument
    root@localhost:~# ifconfig
    Warning: cannot open /proc/net/dev (No such file or directory). Limited output.

Ok, the entire network stack is hosed.  This is a bare install of Windows 10
Insider Preview, with only 1 thing installed: Bash on Ubuntu on Windows.  This
would explain why I am still seeing `localhost` in the prompt too after a reboot.  



So, no package installer works just quite yet.  Seems like DNS is not resolving
with the default install.  

Next up is my **Inconsolata** development font, tmux, neovim, plugins, etc I use
and more.

I'll play around for a little while and when I something productive
I'll create another blog post about some additional features.
