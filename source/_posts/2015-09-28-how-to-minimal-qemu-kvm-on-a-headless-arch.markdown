---
published: false
layout: post
title: "How To: Minimal QEMU KVM on a Headless Debian with Systemd"
description: "Install guide for a minimal non-X QEMU using KVM on a headless server running Debian Jessie (systemd)"
image: 
video: 
date: 2015-09-28 01:20:32 -0400
comments: true
categories: 
tags: 
---

In this guide, I'll show you how to install QEMU without libvirt, virsh and X on a headless server with systemd.  While this guide is written
for Debian Jessie (8.x), it should work for any systemd-based system as it was adapted from an Arch Linux guide.

## Preface

I have decided to run Debian Linux (Jessie) as my home media server.  This is new territory for me as I have only run Windows servers since the
Windows NT 4.0.  

I will be skipping months between my updates as I like to setup a system to take care of itself.  With that said, I need a stable OS with little to no 
updates.  To achieve this goal, I need the absolute bare minimal operating system install as my host.  Windows is, quite frlankly, overtly bloated -
requiring endless updates and reboots to services I never will configure or use.  And let's not forget Patch Tuesday's frack-ups. 

I run Arch Linux as my daily developer machines.  Until you setup and use an Arch system, even for a week, you do not know the meaning of
minimalistic.  Once you run Arch for a year or so, you just don't want to touch anything else with bloat.

I deliberated for months, loosing lots of sleep thinking about my next media system.  My previous generations of media servers included
Windows 2003, Windows Home Server and Windows Server 2012.  It was way overdue for an "R2" refresh and Windows Server 2016 is just around
the corner.  They served me well, until I switched to Arch as my personal machines.  Since then, I realize the instability in Windows updates - 
updates to components I will never use but yet requires me to reboot.

I carefully weighed my options:

* Windows Server 2012 R2 (too many updates to components)
* Windows Server 2016 (not due out until next year)
* CentOS (packages a tad old, requires custom builds)
* Debian (software really old, requires custom builds)
* Ubuntu (burned me too many times with updates, will not go back)
* Arch Linux Server (which is a contridiction in terms of just saying that)

I originally installed and setup a very minimal Arch Linux install as the server.  But quickly realize I was going to go months, maybe years
between updates.  It made me think about what exactly would I be updating as the Host OS.  The answer: Security updates, and that's all.

I settled on Debian because of its long life cycles (years, like Windows Server); but, stressing a minimal build by avoiding all the dependencies
that normally get installed - ever on a server.

The goal of the Linux install would be to:

* Install the base system.
* Install sshd, setup.
* Install lm_sensors, setup.
* Install qemu, stripped of X-Windows, no libvirt.

From here, I would launch numerous virtual machines to handle my home networking needs.  Then for upgrades, I would launch new versions and
migrate services and data over - all without rebooting this Linux host OS.

The only updates I'd be looking for is simply security updates (sshd, certs) in the event the home network gets hacked.  Debian seemed the
logical choice.

## libvirt and virsh

What is libvirt?  No seriously, what is it?  

I came to QEMU KVM wanting a very minimal install and I achieved that with the Arch test server I setup.  When I decided to go to Debian, this
libvirt was everyhere.  That, and virsh.  

On the surface, this looked great: a higher-order manager for QEMU, with some decent GUI versions.  But wait a minute, I am installing a server
running only via CLI.  Ok, so I'll just install libvirt and use just virsh...

...................................


## Install Minimal QEMU, without libvirt and without X

The first step is to install a version of QEMU without the X-Windows dependencies.  You could download QEMU source and modify it to remove them.  Or, 
you can just use the [Arch AUR package](https://aur.archlinux.org/packages/qemu-minimal/).

```
~ $ cd ~/build
~/build/ $ git clone https://aur.archlinux.org/qemu-minimal.git
~/build/ $ cd qemu-minimal
~/build/qemu-minimal/ $ makepkg -sr
```

Go grab a beer.  It will take some time to compile.  On my 12 core/24 thread CPU, it took about 5 minutes (or what seemed to be 5).  

Do note the `-sr` options.  `-r` is used to remove the dependencies after it builds.

Once it is done, install the package:

```
# use tab completion to fill out the fill name of the package
~/build/qemu-minimal/ $ sudo pacman -U qemu-minimal-2.4.0-2-x86_64.pkg.tar 
loading packages...
resolving dependencies...
looking for conflicting packages...

Packages (5) libjpeg-turbo-1.4.1-1  nspr-4.10.9-1  seabios-1.8.2-1  snappy-1.1.3-1  qemu-minimal-2.4.0-2

Total Installed Size:  25.82 MiB

:: Proceed with installation? [Y/n]
```

## Install socat

The package socat is used by systemd for...

## Setup Bridges using Systemd-Networkd

This by far too me the longest to figure out.  Coming from the Windows world, Hyper-V and VMware just handles all this magic for you.  But in reality, 
what is happen under is that the NICs are getting virtual bridge devices setup.  In Arch, we have to do this manually.  Good learning experience, IMO.

Since this is a headless server that I will be hosting a half dozen VMs on, I want direct access to these VMs for various homelab and media purposes.  
To gain direct accesses to these devices, one has a few options.  I choose the bridged route to expose the VMs directly to my network.

In addition, I have two NICs in this server board and therefore will be using the NICs as follows:

* eno1 <> Host OS communications
* eno2 <> VM guests

(I'll be install 4 additional NICs soon since I plan on running VPNs and will have heavy network I/O on the NZB guests)

I have recently switched over to using `systemd-networkd`; therefore, the instructions are below are for it.  There are plently of old guides that can 
you show how to do this on `netctl`.

I found zero guildes with QEMU, Arch and systemd-networkd.  So, here we go.

```
## with a default Arch install, you got systemd-networkd already.
## you should already have DHCP or Static IP setup by following the guides.
## 
## the first step is to setup a few bridges.  i choose to create a bridge per NIC.
##
/etc/systemd/network/bro1.netdev
--

## next, set it the network to use eno1 (my host's NIC)
##
/etc/systemd/network/bro1.network
--

## do the same for your guest's bridge device, bro2.
/etc/systemd/network/bro2.netdev
--

## the difference here is we want to set a static IP (or DHCP if you like)
##
/etc/systemd/network/bro2.network
--

```



```
# the next step is to remove DHCP/IP addresses from the NIC you designate
# as your KVM dedicated nic for virtio (eno2 in my case).

/etc/systemd/network/eno2.network
--

```

That will setup my eno2 interface to use br2 device as my bridge.

## virtio setup




## Create kvm User

## Setup hugepages

## Start you VM

That'



## Create the systemd controls

Now that your VM is up and running, it's time to prep you system for systemd control.  This will handle all of your VMs via the power
states.  Host power on, will start the specified VMs.  Host shutdown, will shutdown all VMs safely.

One option is to "suspend" the VMs instead of shutting them down during the Host shutdown/reboot commands.  This is what Windows does with Hyper-V and is what I am using.  I 
provide both examples below.

```
/etc/systemd/system$ cat /lib/systemd/system/qemu-shutdown.service 
[Unit]
Description=QEMU virtual machine (%i)
After=network.target netctl@ebr0.service netctl@ebr1.service

[Service]
Type=forking
PIDFile=/run/qemu_%i.pid

EnvironmentFile=/etc/conf.d/qemu.d/%i

ExecStart=/usr/bin/qemu-system-x86_64 -name %i -daemonize -pidfile /run/qemu_%i.pid -monitor unix:/tmp/%i.sock,server,nowait $args

ExecStop=/bin/sh -c '/usr/bin/echo system_powerdown | /usr/bin/socat - UNIX-CONNECT:/tmp/%i.sock; while ps ax | grep "/usr/bin/qemu-system-x86_64 -name %i" | grep -vq grep; do 
sleep 1; done'
TimeoutStopSec=30

[Install]
WantedBy=multi-user.target

```

```
/etc/systemd/system$ cat /lib/systemd/system/qemu.service 
[Unit]
Description=QEMU virtual machine (%i)
After=network.target netctl@ebr0.service netctl@ebr1.service

[Service]
Type=forking
PIDFile=/run/qemu_%i.pid

EnvironmentFile=/etc/conf.d/qemu.d/%i

ExecStart=/usr/bin/qemu-system-x86_64 -name %i -daemonize -pidfile /run/qemu_%i.pid -monitor unix:/tmp/%i.sock,server,nowait $args

ExecStop=/bin/sh -c '/usr/bin/echo system_powerdown | /usr/bin/socat - UNIX-CONNECT:/tmp/%i.sock; while ps ax | grep "/usr/bin/qemu-system-x86_64 -name %i" | grep -vq grep; do 
sleep 1; done'
TimeoutStopSec=30

[Install]
WantedBy=multi-user.target

```

