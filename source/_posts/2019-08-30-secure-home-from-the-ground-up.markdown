---
published: false
layout: post
title: "Design and Build a Secure Home Network from the Ground Up"
description: "Learn how to plan, design, build, monitor, and react to external and internal threats on your home network."
image: 
date: 2019-08-30 11:21:54 -0400
comments: true
categories: stem
tags: 
---

I have been preparing as well as curating many security devices for years for the day I build a new home network from the ground up.  In this blog series, I will address how I did that.  Buckle up, it's going to be a long ride.

## Why secure your home network?

I, like most of you, have just thrown servers and devices onto my home network and wireless.  While I did have thoughts of IP devices getting hacked, there wasn't much I could do but to force a non-routable IP onto some of those devices that are notoriously hacked (here's looking at your Foscam).

The facts are that just about anything can be exploited: IP Cameras, baby monitors, smart TVs, washers and dryers, refrigerators, printers, and even your router itself.  Pick any device: there's most likely a CVE logged for it somewhere.  There are various forms hackers use to exploit these devices.

So it is up to you to plan for, design with, build out, and monitor your network.

## Approaching Home Network Security - Taking a Step Back

There are hundreds of blog posts out there addressing many specific issues across a wide range of devices and networks.  I myself have lost many sleepless nights reading many of these in detail, experimenting in my home lab, and even exploiting a few for fun (yes, I hacked my spouse's iPad and iPhone).  I have even broken my own SSID key in 27 hours.

Let's drop a Duncan Nugget with what I've been toying with for many years and now think I have come up with some basic guidance.

> A secure network starts with a strong and secure key base generation.  Everything will derive from that key forward.

Taking a few steps back, how do we secure a network and its devices?  If at the router, we're talking TLS certs and SSH keys.  For Windows and Linux servers, it's more TLS certs and SSH keys.  Desktops get strong pass phrases; but, some offer remote connections (like Linux, were we'll use, you guessed it, an SSH key).

So it makes sense to generate a secure set of keys first.  But how do we *generate a secure set of keys*?  What if your laptop already has malware?  Do you store your keys in your [exploited](https://eduncan911.com/software/security/password-managers-are-not-immune-to-hacks-themselves.html) [password manager](https://www.ise.io/casestudies/password-manager-hacking/)?  You wouldn't want to generate a key in any of those environments.

### Use Air-Gapped devices for Key Generation

Enter the concept of air-gapping.  An air-gapped device is a device not connected to any network what-so-ever: no hardware, and no wireless.  An air-gapped device has its attack service massively reduced to only physical threats.  So, throw an old Linux distro on it, encrypt the HDD and call in the day.

Also note that you'll have to come back to this air-gapped machine or device from time to time to issue new private keys and certificates.

This is why I love my [USB Armory](https://www.crowdsupply.com/inverse-path/usb-armory), and I just received the latest [USB Armory Mark II](https://www.crowdsupply.com/f-secure/usb-armory-mk-ii) version.  These are tiny power ARM-based devices built via open hardware and harden every aspect, to help prevent even physical attack surfaces.  They also just plug right into your USB port and are accessible via simple ssh.

### Set short Expiration Dates

An old PGP concept is to use a secure master key that never leaves your air-gapped device and instead issue PGP sub-keys for all of your encrypting and signing needs.  But don't just issue sub-keys; issue short-lived expiration dates to those sub-keys in the event your laptop or other devices become compromised.

Now the hackers have just gained access to short-lived sub-keys, not your master keys.

While one could (and I have) perform this, I have stumbled upon a few other techniques I would like to share.

### Create a TLS Certificate

## 