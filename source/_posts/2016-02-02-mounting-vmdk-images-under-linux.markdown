---
published: false
layout: post
title: "Mounting VMDK Images under Linux"
description: ""
image: 
video: 
date: 2016-02-02 00:00:00 -0400
comments: true
categories: []
tags: 
---


I recently converted my Lenovo ThinkPad Helix touch device over to Linux (Antergos/ArchLinux) and needed to bring over
my development files from my old VMware vmdk file images.  

## Problem: kpartx no longer works with vmdk

In the past, one could use `kpartx` to simply expose the block devices to mount.  But this isn't working as of 2016 and the latest vmdk (at least not for me).  

It must be an Arch thing as things would work under Ubuntu as of late 2015.  Anyhoot...

## Convert VMDK to VDI

What I ended up doing was to convert the vmdk file over to VirtualBox's vdi format.

    # vboxmanage clonehd --format VDI wash-sda.vmdk wash-sda.vdi
    0%...10%...20%...30%...40%...50%...60%...70%...80%...90%...100%
    Clone medium created in format 'VDI'. UUID: 65b26588-946c-46c2-aa26-7c43783dd0cc

## Expose VDI as block device using QEMU

kpartx continued to return empty on this vdi.  So, next steps was to use QEMU for the network block device.

    # modprobe nbd max_part=16
    # qemu-nbd -c /dev/nbd0 wash-sda.vdi

Now, let's see what `kpartx` shows.

    # kpartx -l /dev/nbd0 
    nbd0p1 : 0 1048576 /dev/nbd0 2048
    nbd0p2 : 0 248510465 /dev/nbd0 1050624

Bingo!  There are my two partitions from my very valuable dev VM: /boot and / (root) respectfully!

## Mount the partitions with kpartx

With the partitions now known, we can use kpartx to create the loopback devices.

    # kpartx -av /dev/nbd0 
    add map nbd0p1 (254:1): 0 1048576 linear 43:0 2048
    add map nbd0p2 (254:2): 0 248510465 linear 43:0 1050624

Perfect.  

All that is left now is to mount them:

    # mount /dev/mapper/nbd0p1 /mnt/wash/boot
    # mount /dev/mapper/nbd0p2 /mnt/wash/root

And there we have it.

It was more complicated then I'd like (converting to another format, doubling the space) and would take a while to convert back to vmdk.  But for my needs, 
of just moving my dev files over from an outdated VM, this is all I needed.

## Source

[https://bethesignal.org/blog/2011/01/05/how-to-mount-virtualbox-vdi-image/ Jeff's old post] pointed me in the right direction; but, it was incomplete.

It was [https://bethesignal.org/blog/2011/01/05/how-to-mount-virtualbox-vdi-image/#comment-111744 @su's comment] that was the answer I was looking for.



