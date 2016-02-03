---
published: false
layout: post
title: "OpenVPN with Two-Factor Authentication"
description: "Setting up OpenVPN with two-factor authentication providers."
image: 
video: 
date: 2015-11-23 12:57:26 -0500
comments: true
categories: 
tags: 
---

This is a post to outline the steps required to setup two-factor authentication on an OpenVPN Server, Community Edition.  While the instructions 
below focus mainly modifying a home router (my Netgear R7000, previously my Cisco E4200 and Linksys WRT-610Ns), it should be generic enough to 
follow for any Linux-based operating system.

## Why OpenVPN?

There was very detailed writeup of different VPN provides and while weighing the Pros and Cons of each, I landed on OpenVPN for a few reasons 
such as the ability to use UDP and TCP over port 443 (slower, but unable to be blocked by firewalls) and the ability for two-factor authentication
using open source (free) technologies since this is my home network.

The Cons being specialized software needed on all clients, along with the extra complexity of setting up the server and client as compared to say 
a single PPTP server.  Still though, those are minor annoyances that once done is a fire-n-forget setup.

## Why do any of this?  OpenVPN works with my router as-is!

Most Linux distros, and even most aftermarket firmware for routers (even some stock firmware!), include an OpenVPN server out of the box.  They
work well with username and password authentication, as well as certificate based authentication.  But, none of the current crop of aftermarket 
firmware for routers have the required PAM module support compiled into them.  Therefore, they ignore any type of PAM modules you install and
want to use.

What is PAM?  Pluggable Authentication Module.  It basically allows applications to share a common API to talk to lower-level modules for
authentication.  For example, OpenVPN and OpenSSH can both same the same Google Authentication PAM module installed on the same machine, and
therefore share the common settings.

For this post, we'll be talking about multiple different OTP PAM modules for implementing two-factory authentication.

## Why OTP (One Time Password)?

There are a few definitions for Two-Factory Authentication.  The one we will be implementing here is called OTP, or One Time Password.

This usually means an SMS text message of a code, an application on your phone you open or a key fob you read to get the latest 6 or 8 digits 
before it changes in 30 seconds.

By adding this additional layer of security (the PAM module), it decreases the risk of a friend or family member getting hacked and their credentials 
stolen. This way, the hacker would only have the authentication-level of security of my VPN (such as username and password); but, they will still need
the OTP in order to login.  

## Overview of Steps

Let's get straight to it shall we.  The overall process is below:

- Configure a Build environment.
- Setting up a long-living PKI (if using certificates).
- Download, compile and install OpenVPN with PAM support.
- Download, compile and install your OTP plugin.
- Configure the Server and Client.

In a nutshell, that's basically what we will be doing. There a few key decisions you will need to make along the way that will determine
the best solution for your needs.  I'll cover those options as well; but, I'll only be implementing one of them.

### 0. Prerequisites: Prepare the USB Stick

This isn't a requirement as you could squeeze most settings into jffs, if your router has the room.  But the next time you flash the router,
POOF all your settings are gone and you'll be doing it all over again.

Therefore, it is highly recommended you get a dedicated 1 GB or larger USB stick for this project.  And make it a brand new one!  Do not use
an old one as USB sticks are measured by writes until failure: you may not have that many writes left.  

This is what most confused me as I have been ignoring USB sticks with my routers.  But as one linksysinfo.com forum member put it, "If you
buy an Ford F-350 Crew Cab Duelly truck and don't get the Towing Package, then why in the hell did you buy the truck in the first place?"

But in this case, you want something to persist between router resets and firmware flashes.  Enter, your USB stick.

Follow this guide to setup your USB or MMC device:

[http://www.dd-wrt.com/wiki/...Format_and_Partition_External_Storage_Device](http://www.dd-wrt.com/wiki/index.php/How_to_-_Format_and_Partition_External_Storage_Device)

### 0. Prerequisites: Build Environment

This step is required in order to build the OpenVPN server and the OTP Plugin you'll be using.  Why aren't there binaries available instead?
Because each environment, configuration and even the directory prefixes are hardcoded and/or required to be configured on a per-machine basis. 
Since I am using a router with a dual-core ARM processor at 1.2 Ghz, my build environment will compile the source code to be compatible with
the instruction set of my CPU.

Can't build on your custom firmware you just flashed to your router?  Fret not!  A LinkSysInfo forum member named landsthepants has provided
such a build environment, complete with step-by-step instructions!  


...install lancethepants build environment...


#### Tangent: AES Hardware-Accelleration

Here's where I really wanted to build my new router with the Intel Atom C2758 8-core @ 20W (or the C2558 w/4-cores @ 15W).  This little
powerhouse is not only an awesome multi-core 2.4 Ghz solution; but, there is one Hardware-Accellerated feature from Intel built into these
CPUs: [Intel QuickAssist Technology](http://www.intel.com/content/www/us/en/embedded/technology/quickassist/overview.html).  

Intel's QuickAssist is a feature that accellerates encoding/decoding with the CPU's hardware instead of relying on the Linux kernel (software) 
to handle it.  Intel's marketing material claims around a 20% boost in performance of each application that utilizes.

You implement it by patching `libcrypto*` and compile the applications that use it (OpenVPN, OpenSSL, etc).  There's also a Linux driver replacement
Intel supplies as well as a patch for `zlib*`.  [See the downloads section for instructions and 
patches](http://www.intel.com/content/www/us/en/embedded/technology/quickassist/overview.html).

In the end though, the embedded Atom $380 and $330 solutions from Supermicro was out of my budget (plus chassis, psu, ssd, expensive ECC SO-DIMMs, etc).
I ended up with a $90 Netgear R7000 router from eBay for now.  Alternativally, certain Xeon E5-2600 v1, v2 and v3 chips support it as well which is
way out of my budget.

### 1. Set a PKI for OpenVPN Certificates

If you really want username and password authentication, you can skip this step.  But, in my opinion, if you want Two-Factor with Username/Password
authentication, it can get messy and annoying for the end-user.

For example, they can never "save credentials" with two-factor.  Instead, they will be required to enter every-single-time-for-every-connection:

Username: bob
Password: MyCr1tikP4ssw0rd######

Where "######" is the two-factor token they need to type.  To me, this is not a good user experience: having to type that username and password
each time for each connection.

Certificates, on the other hand, can be setup in a certain way to actually make the end-user experience much nicer.  For example, with their
Username/Password prompt, they would enter:

Username: <not used, ignored>
Password: ######

Where "######" is the two-factor token.  Yeah, that's what we are going to do here.

So, go setup your PKI on another machine (do not do it on your router!) to generate your certs.  And yes, you can use Windows.  OpenVPN's guide is 
much better at explaining all the steps so I'll just link to it here:

https://openvpn.net/index.php/open-source/documentation/howto.html#pki

I highly recommend doing this on a long-lived machine.  A machine you trust and is regularly backed up.  Because in the event that you loose your
CA's private key, that's game over.  You'll have to rebuild all certs from scratch and pass them out to your annoyed friends and family members - 
who will be confused and will question your technical abilities when you did not have a HDD backup when it crashed.

### 2. Setup OpenVPN Server with PAM

We want two-factor authentication.  To do this, we need to replace the OpenVPN binary on your router with a special build that enables PAM support.
For this to work, we need an OpenVPN server compiled with the `--enable-pam-dlopen` option.



...steps to download condfigure and install



### 3. OTP Plugins

There are several options for OTPs.  Each has different features as well as Pros and Cons.  Here's an overview of your options:

Google Authenticator's PAM 
- Bad user-experience by requiring Username & Password+6 digits on every login (remember, you can't save credentials).
- Uses the system's `passwd` user list and passwords.
- Uses the system's `@HOME` directory to locate the `.google_authentication` file.
- On routers, custom passwords are a PITA.

Duo Security 2-Factor PAM
- Good user-experience by just requiring Password to be the 6-digit pin.
- Supports SMS text messaging, Push notifications with nifty Accept/Reject buttons and Email.
- User setup is more manual and tedious (have to duplicate work on router and online).
- Requires 3rd part integration that talks to an external service.  Limited to 10 users for free.

eduncan911's 2-Factor PAM
- Good user-experience by just requiring Password to be the 6-digit pin.
- User setup is within a single file.
- Can by-pass 2-factor for special logins (remote servers).
- Requires an Authentication app on mobile device: No SMS, Push nor Email codes.

The latter is what we'll be implementing here: my solution!  It's basically a branch from XXXXX and his awesome work.  But, it was still limited to the bad user experience requiring 
username/password combinations.  Therefore, I did what any good open source developer should do: fork, branch, commit and submit a PR.

I'll continue to use my Fork for these instructions.  Hopefully he decides to accept the PRs and merges it into his tree.

Download the code

...............



### 4. Configure Server with Certificates first

At this point, you are done with the heavy lifting.  Now starts the time you research the vastly huge amount of options for OpenVPN server and clients and decide on what features you 
want to use.

I'll walk you through my configuration below.  But again, I advise you read up on the options available to you.

We will start by setting up Certificate authentication and testing it.  This way, we will ensure our system is working first before moving onto our custom PAM module and two-factor.


....configure server....


That handles the server.  For the client, use this configuration.


...configure client....

Test it and ensure everything is working.  If not, go back and check your logs and setup.  Possibly research error messages.

Once it is all working, move onto the final step below.

### 5. Add 2-Factor and Test

At this point, you have a fully functional OpenVPN setup using certificates.  You also have PAM modules configured and ready for use.  

Go back to your server's configuration and add this to the end of the file:



You now have 2-Factor........







