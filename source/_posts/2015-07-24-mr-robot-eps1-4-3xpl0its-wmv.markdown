---
published: false
layout: post
title: "Mr. Robot eps1.4 3xpl0its.wmv"
description: "RFID Smart Cards, People are Exploits, SMS Spoofing, Picking Locks, IRC Chatrooms, Climate Controls"
image: http://ia.media-imdb.com/images/M/MV5BMzQ5NTg5ODQyMV5BMl5BanBnXkFtZTgwNjcxNzMzNjE@._V1_UX200_CR0,0,200,112_AL_.jpg
video: 
date: 2015-07-22 00:00:00 -0400
comments: true
categories: [mr-robot]
tags: 
---

## RFID Hacks

We start out with hacking an RFID badge.  RFID is a flawed technology for exactly this hack: anyone that gets near the badge can scan it, which records the embedded string - encrypted or not, doesn't matter.

Most RFID badges like the depicted in the show range in their frequency and length of string you can store.  Most *decent* scanners are able to read most passive tag frequencies the badge responds to.  

Even if the string is encrypted, that doesn't stop you from making a new badge - just write the encrypted string with a card that has the same frequency.  The security door will just read the encrypted string.  

Writing to a new badge can be tricky: it needs to be the same frequency card.  To my knowledge, there are two types of badges: passive and active (and even partially-active).

Mr. Robot bumps against the guy in line and scans his RFID badge with a device like this:

{% img /mr-robot/i/mr-robot-rfid-hack-rfid1-large.png  %}

Credit: [UCL - Rethinking RFID: Awareness and Control For Interaction With RFID Systems](http://www.nicolaimarquardt.com/research.html)

And there lies the difficulty in this hack: to activate a passive RFID badge, the electromagnet in the reader must charge the coil inside of the passive card enough for the electronics to start emitting its code.  This all depends on the reader and typical readers need 200 to 400ms of time to perform these tasks.

There may be super-powered RFID readers out there.  The advantage is you'd charge the coil very quickly and possibly grab the code even quicker.  You can easily build your own RFID reader, like this:

{% img /mr-robot/i/mr-robot-rfid-hack-FSK-RFID-reader-v2.png DIY FSK RFID Reader %}

Credit: [DIY FSK RFID Reader](http://playground.arduino.cc/Main/DIYRFIDReader)

Though I'd increase the power output.

The show most likely uses Passive Tagged RFID badges.  Using the reader above, you read it, and write it to another smart card.

Next, they use the same off-the-shelf RFID tag reader/writer to write to a new card.

{% img /mr-robot/i/mr-robot-rfid-hack-1.png Mr. Robot writing RFID tag %}

Here, would you like the [read the PDF manual](https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0CAUQjhxqFQoTCKiN4JW19cYCFct3Pgod_ewFqQ&url=http%3A%2F%2Fwww.tradekorea.com%2Fproducts%2FproductDetail.do%3Faction%3Ddownload%26productfileno%3D6865&ei=lAyzVajzKsvv-QH92ZfICg&psig=AFQjCNHch2hk_lRclgq3HNwsgxAjf2f7jg&ust=1437883364434864)?  

Now, to be completely fair, they aren't using the Windows version of the software.  I did some digging and found a number of Linux RFID tools; but, no-GUI versions that they were in the screenshot above.  It may be a special reader and software.

The only flaws I'd poke in this hack is that the cards must be the correct type (passive vs active), you must have the same card type to write to, and finally but not least, the RFID reader must be trigger-happy quick to sense, read and record all within that fraction of a second you bump against someone.


Now, some additional info on different badge types...

### Passive Tags RFID Badges

Passive tag badges, mostly known as Smart Cards, allow you to read and write arbitrarily are the most insecure.  This is most likely the card used in the show.  You can bump up against, read one, and then later write it to a card.

### Active Tags RFID Badges

Active tags on badges are tougher to crack. They are usually custom per application, including things suck as tracking up to 100s of feet away.  I suspect DARPA-type badges would have some sort of multi-factor built-in that when activated by a reader, the reader would send a code, and the badge interrupts and responds with one - much like Google Authenticator does.  The badges would be write-only for the pass key for the RSA-type encryption, never able to be read.  Though, I would guess that a good hacker could disassemble the card and retrieve the stored key on the chip.

## People are Exploits

As alluded to in eps1-3, people make the best exploits to get around security.

This is more than installing spyware or malware on their systems.  Digging into their trash.  

Bill... "Lonely enough to break"

## SMS Spoofing Attack Vector

{% img /mr-robot/i/mr-robot-fsociety-software.png %}

Trudy gets a special fsociety hack.

## Climate Controls

Opening the panel on the wall and cutting the cat5 allows him to tie the RaspberryPi into the climate controls.  

This could work, if there was only one climate control.  Usually though they aren't in bathroom closets but out in hallways where the people are.  

In reality, you keep people at one temp, and your data warehouse at a totally different (much much cooler!) temp - and with multiple redundant sensors in case one starts reading 0C (32F) at all times.  

That's actually the goal of this hack: trick the climate control system into thinking it is too cold, then the heat kicks on to warm up to a level to melt the tapes.  Or if there was no networked client control system and it was old school directly-connected to the heat pump, that's even easier and doesn't require a separate RaspberryPi - just twist the right wires to kick on the heat pump.  

Relying on just one sensor for both hallways and the data center/storage area of this enormous complex, even if it was just that section, is a really far stretch for the show.  But yes, it is possible.

Air Dream Software, Inc.

## IRC

{% img mr-robot-client-control-hack-1.png %}