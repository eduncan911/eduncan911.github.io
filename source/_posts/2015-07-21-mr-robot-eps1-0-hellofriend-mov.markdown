---
published: false
layout: post
title: "Mr. Robot eps1.0 hellofriend.mov"
description: "Kali Linux, WiFi sniffing, TOR Exit Nodes, Instagram GPS, tracking NYC Taxis, Rootkits, Property Records"
image: http://ia.media-imdb.com/images/M/MV5BMTg2MDM5MzgyMl5BMl5BanBnXkFtZTgwMTkzMzk5NTE@._V1__SX640_SY720_.jpg
video:
date: 2015-05-27 02:57:44 -0400
comments: true
categories: [mr-robot]
tags:
---

## TOR Isn't Anonymous

We start out with a bombshell.  One that I have been warning people about for many years: TOR is not safe.  You aren't as anonymous as you think.  This is especially troublesome because most of the public has been convienced that TOR is safe and secure.  It isn't. It is even worse for those technical people that use TOR on your router or rooted mobile phone, thinking everything you do is anonymous.

In short, while the TOR protocol is very secure, you have no control over where your data gets decrypted and sent out over the network (and come backs from).  These gateways are called **Exit Nodes** in the TOR architecture.  You have no idea who is running these Exit Nodes.  By today's standards, most Exit Nodes are ran by governments and regimes with malicious intent.  Yes, there some true cowboys (and cowgirls) bucking the norm and running Exit Nodes from their homes and libraries - and getting raided on a constant basis for doing so.  But while they run one or two Exit Nodes here and there; there are 1,000 other Exit Nodes running under governments' approvals, sniffing and datalogging everything that goes into and out of the node instance.

Before we get into what was covered in this episode, let us go over some fundamentals first to understand how this is possible.

After arming yourself with this knowledge, you should be able to run TOR yourself and protect yourself.  TOR has been a fundamental tool for whistle-blowers, third-world citizens and reporters to get information out of repressive regimes and governments.  It is absolutely one of the most critical tool that has allowed transparency into some of the most horrific actions of world and governments.  It is actively being developed to further improve upon the privacy.  

But, you must be aware of its faults - and how to protect yourself when using TOR.  You must be aware of how you can be tracked with TOR, how your information can be compromised and even sniffed.  There are a number of safe guards and best practices to help protect you and your loved ones which we will get to.

### TOR Architecture

...

#### Exit Nodes

This part of the architecture is, in my opinion, the root issue with TOR and why I have never fully adopted it.  I do use TOR to fully anonynomize myself from potentially dangerous websites and IRC networks.

...

### Fundamental Hacks

Because **Exit Nodes** decrypts your outbound and inbound packets

### Case Study #1: The NSA



### Case Study #2: Silk Roads

XXX ran the Blackweb website.

### Case Study #3: China's The Great Firewall

China has built an enormous firewall funneling all of their internet traffic.  Besides child porn, political oppression, squashing free speech, they also have been hijacking TOR node lookups.

Because of this,

### Hacking Ron's PlayDoh's Boys

Now, back to our episodes.  Everything explained here is absolutely possible.

> "I started intercepting all the traffic on your network.  That's when I noticed something strange."

Easy.  Pop open XXX on Kali and start sniffing.  What you might see is a lot of encrypted packets from other clients going out.  But you see, the initial TCP network layers aren't encrypted.  It has the meta data of the source IP, destination IP and port number in the TCP layers.  

You'll most likely see a lot of SSL connection attempts over port 443.  Those poor soles not connecting to an HTTPS site.  You'll not only see them connecting to port 80 of an IP address; but, you'll also get to inspect what data they are sending to and what is coming back from that unencrypted connection.  Save those TCP dumps for later examination.  

What Eliot was looking for are what ports people are connecting to.  TOR relay nodes usually listen on XXX.  Once you notice this, and that a local client on the network is constantly connecting to TOR throughout the day - this would be a red flag that some service on the network is using TOR to hide itself.  

That is strange because someone is obviously hiding something.  Let's find out what that is.

Remember Eliot's quote at the beginning?

> "Whoever is in control of the Exit Nodes is also in control of the traffic.  Which makes me, the one in control."

So how do you control an "Exit Node"?  Go back to Case Study 1 above: setup your own Relay and Exit Nodes on the same network and wait for the internal clients/services to connect.  About a halve dozen will work in a number of LXC containers because, well, you're a hacker and don't need that higher-order Docker stuff.

You've already gained access to the router.  Now, add some routes to the iptables to route these IP addresses and ports to your local instances of relay nodes.  Let them "answer" in place of the real calls.  This will direct all TOR clients to connect to you instead of the real thing, where now you can relay through a few of your local instances which will always use your Exit Node.  Then, capture all traffic coming in and out of your Exit node.  

BAM: now you can see everything that is happening on that network, in that coffee shop, of whoever wants to use TOR.

Scary eh?

Then it's simple hacking skills.  If Linux/Windows, scan for an exploit to gain root.  If hosting a website, Pen test the website looking for venerabilities.  There is always a weak link in the chain.  Especially for a shady guy running a child porn site out of his coffee shop.  

## fsociety.dat

Some may ask, "What's with that .dat file?"  Typically a DAT file is a generalized file storing data for later use by a program.  There is no established format or encoding; no file structure or standard that is followed.  It's up to each program to store things however they like for retrieving later.

Some programs attempt to put some light encryption on the file to keep regular users from messing it the format.  Hackers may use the file to store various states or private information in a strong encryption for sending to and decoding on another machine.

So when Eliot finds a simple message "LEAVE ME HERE" in plain text, it is a sign that these hackers - hackers that are good enough to get through their protections - want to be found.  But only by a very select few that are good enough to get down to this level of inspection.  Or only one security engineer - Eliot.

## Kali Linux

After watching a few episodes, it became known that they favor Kali Linux on their machines.  This is not your normal Linux distro...

https://www.kali.org/

{% vimeo 132329259 %}
