---
published: false
layout: post
title: "Mr. Robot eps1.2 d3bug.mkv"
description: "..."
image:
video:
date: 2015-07-08 03:31:19 -0400
comments: true
categories: [mr-robot]
tags:
---

# Music CD, Webcam w/o Light and Blackmail

# Backdooring Anwar Raziz's Android Phone

Got two-factor authentication turned on for your company? You can bet Tyrell, the Senior VP of Technology at Evil Corp enforces this. So this will make it harder to hack employees of Evil Corp since it is more than just a password. You need another angle.

Raziz is the personal assistant to Phillip Price, the CEO of Evil corp and the one Tyrell tried to setup a meeting with to present his CTO proposal but got bumped. The assistant states he'll send the information to Tyrell's assistant.

{% img /mr-robot/i/mr-robot-anwar-assistant.png  %}

Tyrell, in just that 7 seconds, instantly sees an opportunity here: he can use this assistant to mulipulate the situation of this new CTO candidate to give him the advantage of the CTO role.

{% img /mr-robot/i/mr-robot-anwar-assistant-emailing.png %}

To do that, he needs to exploit the assistant, Raziz. "If you could, just email it to me directly", Tyrell states. "This is too important for me to miss." Now Tyrell knows the assistant and can get information about the devices the assistant uses (e.g. what mobile device), and so on.

He selects his target's device: the assistant's mobile phone.

Unless the target can be tricked into installing an application from an unsafe source, which even then would prompt for a number of Root permissions making the target extremely suspicious, you will need physical access to the target's phone to install the backdoor and to accept all of the permission prompts.

An easy way to gain access is to track your target on social networks (Twitter, Facebook, Instagram, etc). All you have to do is wait for a "Check In" to know where they are.

{% img /mr-robot/i/mr-robot-social-network-tracking.png %}

Tyrell finds his target at the Kiss and Fly Club because of a picture he just posted.

After the sexual encounter with Anwar and while Anwar is now in the shower, it's time to gain access to Anwar's phone.

{% img /mr-robot/i/mr-robot-exploit-mobile-1.png %}

Most older Android phones have an sdcard. Prepare your SDcard ahead of time with an exploit. Tyrell selects RooterFrame (aka Framaroot), a popular backdoor application allowing a remote party access to your phone and your phone's applications (e.g. email, calendar scheduling, contact list - such as this CTO candidate's contact info, etc).

{% img /mr-robot/i/mr-robot-exploit-mobile-2.png %}

{% img /mr-robot/i/mr-robot-exploit-mobile-3.png %}

But before you RooterFrame can work, it needs Root access to the device. Let's install Superuser.

{% img /mr-robot/i/mr-robot-exploit-mobile-4.png %}

{% img /mr-robot/i/mr-robot-exploit-mobile-5.png %}

Superuser is a commonly installed root application for those that want root on their Android device.

Unbeknownist to most "power users" is the paid version allows you to do some devieous things on a target's device... Such as hiding the fact that the phone is root.

{% img /mr-robot/i/mr-robot-exploit-mobile-6.png %}

{% img /mr-robot/i/mr-robot-exploit-mobile-7.png %}

{% img /mr-robot/i/mr-robot-exploit-mobile-8.png %}

{% img /mr-robot/i/mr-robot-exploit-mobile-9.png %}

RooterFrame exploit with root permissions installed, hidden from normal view and now the device is exploited.

# Phishing Scam - Hacking [boyfriend]'s Email

If you don't know what this is, you've been out of touch of basic cyber security your network administrator should have drilled into everyone's head by now.

What if you can't access the target directly?

...

#
