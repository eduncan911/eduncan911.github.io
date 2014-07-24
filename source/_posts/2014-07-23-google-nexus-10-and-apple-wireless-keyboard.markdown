---
published: true
layout: post
title: "Google Nexus 10 and Apple Wireless Keyboard"
description: "Apple has changed the firmware on newer Apple Wireless Keyboards, causing them not to work with the Nexus 10."
image: http://eduncan911.com/blog/images/google-nexus-10-and-apple-wireless-keyboard-2009.jpg
video: 
date: 2014-07-23 19:50:40 -0400
comments: true
categories: [technology]
tags: ["Nexus 10","Apple"]
---

I have beem fighting an ongoing battle with Apple's Wireless Keyboards and a tablet of mine, the Google Nexus 10.  While the keyboard works with all other Android and Apple devices we have (Nexus 5, Nexus 7 2013, Galaxy Nexus and Apple iPod Touch), it does not work with the Google Nexus 10.  I've gone as far as to [asking for help on SE](http://android.stackexchange.com/questions/66496/android-4-4-apple-bluetooth-keyboard-paired-but-not-working).

Well, that's not entirely accurate.  The story started with a used Apple Wireless Keyboard I got from eBay.  It paired and worked fine; but, some of the keys did not work.  So I bought a new one from Apple.com.

It paired and connected just fine; but, the brand spanking new keyboard did not work.  The Nexus 10 would not recognize an additional input device (the small "A" symbol in the top left corner of the screen).

To reiterate, this new Apple Wireless Keyboard ordered direct from Apple.com worked fine with all other Android devices (Android 4.2.2, 4.4.2, 4.4.3 and 4.4.4) and the iPod Touch 4th Gen.  It is only this Nexus 10 (Android 4.4.3 and 4.4.4) that it did not.

## Nexus 10 Bluetooth Stack

As I blogged some time ago, not all [Bluetooth devices are made equal](http://eduncan911.com/blog/archives/bluetooth-expedition-the-right-stuff.html).   Devices implement the Bluetooth stack differently and sometimes miss an implementation detail.

I highly suspect the Nexus 10 has a flawed Bluetooth implementation, causing this incompatibility.

But what exactly is it incompatible with?  It worked fine with the previous Apple keyboard I got used on eBay.  It works fine with all other bluetooth keyboards I have tried.  

Why this one Apple keyboard I got direct from apple.com?

## Apple Wireless Keyboard version: 2007, 2009 and 2011

Atlas only after several trips to some local Apple stores did I stumble onto the issue: there are three versions of the Apple Wireless Keyboard that were sold.  They are identified by their model years.  To take a quote [directly from Apple's support site](http://support.apple.com/kb/ht4112):

{% blockquote Apple http://support.apple.com/kb/ht4112 "Apple Wireless Keyboard compatibility" %}
* Apple Wireless Keyboard (2011): Features an aluminum case and uses two AA batteries. You can identify this model by the following icons on the F3 and F4 keys:

<img src="http://km.support.apple.com/library/APPLE/APPLECARE_ALLGEOS/HT4112/HT4112_01----en.png" />

Note: When using Apple Wireless Keyboard (2011) with iOS 4.3 or earlier, the function keys are limited to the Eject key. Update to iOS 5 or later to enable additional function keys.

* Apple Wireless Keyboard (2009): Features an aluminum case and uses two AA batteries. You can identify this model by the following icons on the F3 and F4 keys:

<img src="http://km.support.apple.com/library/APPLE/APPLECARE_ALLGEOS/HT4112/HT4112_02----en.png" />

* Apple Wireless Keyboard (2007): Features an aluminum case and uses three AA batteries.
The original Apple Wireless Keyboard, introduced in 2003, is not compatible:
{% endblockquote %}

So, we have three keyboards available to us.  After many trials and errors, I can safely say...

## Get the 2009 Apple Wireless Keyboard model

The used eBay model I got was a 2009 and it worked fine, dispite a few keys not working.  The Apple.com model I got was an 2011 with the latest x80 firmware - and it did not work.

You want to focus on the F3 and F4 keys looking like this:

{% img http://eduncan911.com/blog/images/google-nexus-10-and-apple-wireless-keyboard-2009.jpg Nexus 10 and 2009 Apple Wireless Keyboard %}

Again, the 2011 keyboard works fine with all other Android devices, even back to Android 4.2 on my Galaxy Nexus.  So this is clearly a fault with the Nexus 10's bluetooth hardware.

But none the less, if you want an Apple Wireless Keyboard to work with your Nexus 10, you better seek out the 2009 model.

## 2009 Apple Wireless Keyboard Firmware

And btw, the firmware version of the 2009 I found working at an Apple store has firmware version x50.  You can see it under the system's properties, like this:

{% img http://eduncan911.com/blog/images/google-nexus-10-and-apple-wireless-keyboard-2009-firmware.jpg Nexus 10 and 2009 Apple Wireless Keyboard Firmware %}

I only mention the firmware because I found a number of posts online where people upgraded their 2009 and 2011 keyboard firmwares to the latest, and lost some functionality.  I am not sure if the x50 version of the firmware is the latest.  I am only stating the exact version of the 2009 keyboard that worked flawlessly with the Nexus 10.




