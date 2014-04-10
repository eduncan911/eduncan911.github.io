---
layout: post
title: "Dump the router!"
date: 2005-06-17 19:40:00 -0400
comments: true
published: true
categories: ["blog", "archives"]
tags: ["Geek Stuff"]
alias: ["/blog/dump-the-router.aspx"]
---
<!-- more -->
{% include imported_disclaimer.html %}
<P>*** UPDATE: Please read the whole post.&nbsp; The point was that older routers are causing issues.&nbsp; The 802.11G I tested recently resolves most of these issues, even though ping rates were about 5% higher on average (over an hour each).</P>
<P>Yes, you heard me right.&nbsp; Well, dump the router for a newer one with an 100Mbps external connection.&nbsp; Read on...</P>
<P><STRONG><FONT size=5><FONT size=3>Packet Loss</FONT><BR></FONT></STRONG>This week Comcast upgraded their network and our (I'll get the 'our' part in a bit) 5+ year old cable modem started getting 30 to 40% packet loss, to Comcast's network!&nbsp; I tested it here to my servers at Datapipe.net, and Comcast tested the actual modem itself (computer disconnected).&nbsp; Dang, time to upgrade.</P>
<P>The 'our' part is that I share my neighbor's Internet connection.&nbsp; I bought wireless cards and a wifi router ~5 years ago to do this (802.11b at the time, first ones).&nbsp; I've only gotten about 1.4 to 2.0Mbps.&nbsp; Sometimes I had the cable modem here with the router and directly connected to it.&nbsp; Then I was able to see about 2.8Mbps.</P>
<P>Today I decided to go all out and get Comcast Internet with the Premium service (6Mbps download, 768kbps upload).&nbsp; They had a special, $29.95/mo for 6 months.&nbsp; Premium service is $10/mo more ($39.95 total).&nbsp;&nbsp;Picked up the modem and stuff today and ran the new wires, etc.&nbsp; </P>
<P>I also found an awesome new Bandwidth Test website: <A href="http://www.testmy.net/">www.testmy.net</A>&nbsp; No more DSLReports for me.</P>
<P><STRONG><FONT size=5><FONT size=3>WiFi?&nbsp; No Thank you.</FONT><BR></FONT></STRONG>Humm, only got 1.4Mbps (I'm wireless, not directly connected).&nbsp; Checking my 802.11b, I'm connected at 11Mbps, no encryption (slows things down).&nbsp; Hum, must be something else.&nbsp; But I went ahead and connected a cable to directly connect the router (for a 100Mbps connection to the router).&nbsp; Wow, it jumped to 2.8Mbps.&nbsp; Verdict: No more WiFi for me (well, may try 802.11g).</P>
<P><STRONG><FONT size=5><FONT size=3>10Mbps is a Joke</FONT><BR></FONT></STRONG>I'm still at 2.8Mbps, and I am paying for 6Mbps.&nbsp; I found a post on testmy.net/forums that a guy was paying for 9Mbps down and 1Mbps up (Charter), but was only getting about my speeds as well until he removed the router.&nbsp; So I did that today.&nbsp; Turned on <A href="/blogs/eduncan911/archive/2005/05/21/150.aspx">XP SP2's Firewall</A>, disconnected the router and connected directly to the modem.&nbsp; Looking at my connection speed to the modem,&nbsp;it was 100Mbps.&nbsp; </P>
<P>Whoa, my speeds jumped to 3.9Mbps/369kbps!&nbsp; Humm, to me that's the standard 4Mbps/384kbps speed Comcast has.&nbsp; Not my Premium speeds.&nbsp; So I gave Comcast a call.&nbsp;&nbsp;They had to provision the modem to enable the faster speeds (Isn't this suppose to be automatic?&nbsp; Makes me wonder who many of you aren't provisioned for the extra speeds).</P>
<P><STRONG><FONT size=5><FONT size=3>Oh My...!!!</FONT><BR></FONT></STRONG>After a few resets of the modem and a "wait about 15 minutes before testing again", I tested it again...&nbsp; DAMN!</P>
<P>:::.. Download Stats ..::: <BR>Connection is:: 5473 Kbps about <STRONG>5.5 Mbps</STRONG> (tested with 20972 kB) <BR>Download Speed is:: 668 kB/s <BR>Bottom Line:: 98X faster than 56K 1MB download in 1.53 sec <BR>Diagnosis: <STRONG>Awesome! 20% + : 52.54 % faster than the average for host (comcast.net)</STRONG> <BR>Validation Link:: <A href="http://testmy.net/stats/id-5TQ7843H9" target=_blank>http://testmy.net/stats/id-5TQ7843H9</A> <BR><BR><BR>:::.. Upload Stats ..::: <BR>Connection is:: <STRONG>663 Kbps</STRONG> about 0.7 Mbps (tested with 579 kB) <BR>Upload Speed is:: 81 kB/s <BR>Bottom Line:: 12X faster than 56K 1MB upload in 12.64 sec <BR>Diagnosis: <STRONG>Awesome! 20% + : 93.86 % faster than the average for host (comcast.net)</STRONG> <BR>Validation Link:: <A href="http://testmy.net/stats/id-NT867RMYC" target=_blank>http://testmy.net/stats/id-NT867RMYC</A> </P>
<P>Verdict: I guess I need to&nbsp;get a wifi router with 802.11g and the faster external port to get my faster speeds I am paying for!&nbsp; </P>
<P>Hope this helps those of you that aren't getting 4Mbps from your Comcast in Nashville.</P>
