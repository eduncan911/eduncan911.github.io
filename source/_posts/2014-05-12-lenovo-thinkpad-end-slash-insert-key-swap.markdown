---
published: false
layout: post
title: "Lenovo Thinkpad End/Insert Key Swap"
description: "Instructions on how to swap the End/Insert keys on my Helix, but also works on other ThinkPads"
image: 
video: 
date: 2014-05-12 12:01:44 -0400
comments: true
categories: technology
tags: 
---

[Lenovo Helix End/Insert Keys Swapped](https://forums.lenovo.com/t5/X-Series-Tablet-ThinkPad-Laptops/Helix-End-Insert-keys-swapped/m-p/1136273/highlight/true#M21181)

I recently switched from the Dell-exclusive club of laptops over the past 15 years to a ThinkPad.  Specifically, the Lenovo ThinkPad Helix.  It was a unit I have been waiting years for to check all the right boxes.

I haven't been privy to the IBM/Lenovo keyboard wars.  I have always heard great things about the IBM ThinkPad keyboard.  Well, it seems this Lenovo Helix came with the newer style of only one row of Function keys + hardware-specific keys (volume, brightness, etc).  Fine by me as I figured out how to lock in the Function-mode-always (a BIOS option).

But now I had a serious problem when coding/writing long documents...

## The End/Insert Key was Swapped

Why in the hell would the End/Insert key swap functions when I lock in the Function-key mode of the F1-F12 keys?  

This was almost a deal breaker.  Only after crawling the Lenovo forums (a great place to find hacks for Lenovo) did I stumble onto a Lenovo ThinkPad keyboard hack to [reverse the key functions](https://forums.lenovo.com/t5/X-Series-Tablet-ThinkPad-Laptops/Helix-End-Insert-keys-swapped/m-p/1136273/highlight/true#M21181).  It actually remaps the Windows keyboard layout in the registry, an age-old trick I forgot about over a decade ago!

## Swapping the End/Insert key functions

Insert of supplying a download of a .reg file, which I am not even sure that GitHub supports, I'll explain the instructions on how to create your own .reg file.

1. Right-click on your desktop, select `New -> Text Document`
2. Copy and Paste the following into this document, letter by letter.

``` registry lenovo-helix-end-insert-key-swap.reg https://gist.github.com/eduncan911/f27808d2bb30982b4da5
Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Keyboard Layout]
"Scancode Map"=hex:00,00,00,00,00,00,00,00,03,00,00,00,52,e0,4f,e0,4f,e0,52,e0,00,00,00,00
```

3. Save the file as lenovo-helix-end-insert-key-swap.reg
4. Double-click it to run it.  You will need to be logged in as an Administrator.
5. Reboot and you're done.

Now, the function of the End/Insert will be swapped.

Also, [devoted fans of the previous Thinkpad keyboard: you may want to take your anger here](http://blog.lenovo.com/products/why-you-should-give-in-to-the-new-thinkpad-keyboard).









