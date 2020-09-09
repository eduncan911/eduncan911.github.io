---
published: false
layout: post
title: "How to Enable Hibernation in PoP_OS!"
description: "Pop!_OS comes with a swap partition; however, it is limited in size and only works with Suspend"
image: 
date: 2019-03-02 11:21:54 -0400
comments: true
categories: 
tags: 
---

While [Pop!_OS](https://system76.com/pop) does come with a swap out of the box in both normal and encrypted form, the system is not configured for hibernation nor is the swap usually large enough for hibernation.

In this post, we'll enable hibernation and resize the encrypted (and unencrypted) swap to prevent those laptop batteries from going dead.

## Pop!_OS Hibernation in 18.04, 18.10, 19.04, 19.10, 20.04+

Apologies but this post is long overdue.  Started back with Pop!_OS 18.04 LTS, I have done this on three laptops.  Two of the laptops started with Pop!_OS 18.04 LTS and have been distro-upgraded to 18.10, 19.04, 19.10, and currently 20.04 when I finally published this article.  The third laptop has been used as a test system, running Ansible provisioning for a number of projects.  On that third system, I always enable hibernation from scratch and it works.

In all three laptops, hibernation has been working flawlessly.  So the same instructions have been working for a few years now.

As for Ubuntu, while it is true that Pop!_OS is built on-top of Ubuntu, there are a few key steps to future-proof (distro-upgrade-proof) the settings so they persist during large distro upgrades.  Pop!_OS has a utility to help with this, Ubuntu does not (as of 20.04).

## Step 1: Resize the Root and SWAP Partitions

The first objective is to make room for the large swap.  To do this, we need to shrink the root volume `/` to make room for the expanded swap volume.

### Determine the SWAP size

The old rule used to be "double the system ram."  That rule was set back in the days of megabytes of ram well before the days of the gigabytes we have now.  These days, the rule is:

* If system ram < 2 GB, make the swap size Double the ram size
* If system ram > 2 GB, make the swap the size of system ram + 2 GB

On a system with 32 GB of ram, the recommended swap is 32 GB + 2 GB for a total of 34 GB.

*This is the guaranteed size* that under any condition the system will be able to hibernate.  However, you may be able to get away with smaller swap partitions if you system is often not utilizing the system memory.  While I do not cover smaller-than-system-memory swaps in this post, [you may experiment yourself by following hte directions in the Arch Wiki](https://wiki.archlinux.org/index.php/Power_management/Suspend_and_hibernate#About_swap_partition/file_size).

### Reboot to a Live USB Linux Distro

You cannot resize your root partition while it is mounted as your system disk.  There is an option to reboot into rescue mode by modifying the kernel params; however, that has not been reliable for me - especially on Macbooks running Linux.

Therefore, I recommend making a Live USB from a well-known distro to make booting easy.  Also, this gives you a chance to see if another distro will boot your system just for funsies.  A few recommendations:

* Kali Linux (everyone needs a Live USB of this hanging around)
* Ubuntu
* EndeavourOS (Arch Linux latest distro with a simple XFCE interface)
* Pop!_OS (Yes, the installer has GParted as well)

Whatever you choose, you'll need several disk utilities.

### Resize the ROOT partition (with LUKS Encryption)

If you encrypted your Pop!_OS system during installation, you'll need to unlock the LUKS container first to be able to see the volumes contained within it and to manipulate them.  If you did not encrypt your disk, you can skip this section entirely.

The Pop!_OS setup for encryption leverages a known trick of generating a random key at boot to mount the swap partition.  Since the SWAP key is never persisted, on every reboot you get a new SWAP key.  This is the most secure setup as no one will be able to decrypt a left-over SWAP partition after the system powers off since the key is never persisted nor asked for.  However, *this does not work for systems that want to hibernate.*

The `initram` must be able to read the previous SWAP partition to restore memory from a hibernation session.  Therefore, we need to change this setup to move the SWAP partition into the same LUKS container with the root volume.  This trick means you are only asked for a single disk decryption passphrase on boot - which will unlock both the root and swap partitions at the same time.  This is much preferable.  

Overall, we will need to:

* Unlock the LUKS block device
* Delete the SWAP partition entirely
* Expand the LUKS container over the old SWAP space
* Shrink the encrypted root partition to allow for the correct SWAP size
* Create a new encrypted partition that uses the same LUKS keys, to be used as linux SWAP

...

### Resize the ROOT partition (with no encryption)

### Delete the SWAP and Create a Larger SWAP

## Step 2: 