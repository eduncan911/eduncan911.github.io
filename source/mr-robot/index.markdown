---
published: false
layout: page
title: "Mr. Robot: The Facts of Hacking"
description:
image:
video:
date: 2015-07-21 00:40
comments: false
sharing: true
footer: true
categories: [mr-robot]
tags: [Go, GoLang]
index: true
---

I struggled for a while trying to find the right *wow* words.  The one-liner that would hook you to read this.

{% blockquote %}
Real hacks, real exploits spelled out on TV.  No bullshit.
{% endblockquote %}

{% blockquote %}
Hollywood finally does hacking right.
{% endblockquote %}

Ok, how about this one...

{% blockquote %}
Anarchists take detailed notes, this is how you crash democracy (but you already knew this).
{% endblockquote %}

Thought about going as far as...

{% blockquote %}
Pirating movies and songs immoral? You have no idea how immoral your society is.
{% endblockquote %}

Ok, that last one needs a blog post on its own.  I am not an English major; I could not capture the jaw-drop I wanted in words.  In the end, I instead decided to show the world exactly just how accurate this show is.  How scarily accurate.

Buckle-up hackers and misfits.  Today starts a new era of my online exploits: *Mr. Robot: The facts of hacking.*

## Background

Before we get to *Mr. Robot*, I want to explain a little about me and why I felt this is needed.  My friends and family know I have been warning them for decades of just how embedded our governments are with our online lives.

* The NSA spying for decades with backdoors in our routers and Internet Service Providers.
* Automated filtering on network traffic, looking for key words.
* Circumventing secure web connections with these backdoors into networks.
* The underground phone recordings going on since the `70s, transcribing and flagging key words.
* Public library (and now Amazon) tagging of special books checked out.

The list goes on with several now publicly known <a href="https://en.wikipedia.org/wiki/Global_surveillance_disclosures_(2013%E2%80%93present)" title="Global Surveillance programs">Global Surveillance programs</a> (and there's a lot more not public yet, keep that in mind).  When the Snowden leaks started, as the [RSA backdoor buyout](http://www.theverge.com/2013/12/20/5231006/nsa-paid-10-million-for-a-back-door-into-rsa-encryption-according-to) became public and many more, I couldn't stop smiling. This was the biggest silent, "I told you so" ever.

I even joked in emails with my colleagues with "Hello NSA!" in emails because I entered keywords that I knew would be filtered.  Those emails date back to the '90s btw.

My close personal colleague captured it best with a single question: *What is the price of freedom? <a href="http://www.theverge.com/2013/12/20/5231006/nsa-paid-10-million-for-a-back-door-into-rsa-encryption-according-to" title="RSA Backdoor $10 million">$10 million dollars</a>*

### TOR

When my paranoia started to increase to levels of thoughts of deleting my MySpace/Facebook accounts, erasing my online presence, I looked into TOR in the mid `00s.  On the surface it looked perfect; but, once I read the technical details I saw the inherit flaws of the exit nodes and decided it wasn't the best approach for me to continue.

Though I continue to use TOR cautiously for only anonymous items (I don't log into any sites, use a private browser, etc), I highly advise everyone to think of TOR as a false sense of security and to be very cautious using it knowing its holes as you can easily be tracked if not careful.

Extreme details on TOR's security holes are in S01-E01 by the way.  I invite you to continue reading there.

### I sat on it

Most of my hacks in the '80s and 90s was nothing more than simple "password guessing", [war dialers](https://en.wikipedia.org/wiki/War_dialing) and buffer overruns exploits of open ports.  Dirt simple hacks that an 12 year could do because, well, I was 12.

Even the [Phone Phreaking](https://en.wikipedia.org/wiki/Phreaking) of the infamous tone hacks to dial BBSes overseas for free was fairly well known.  Out of all the blue boxes created, I only got one working.  Maybe because I was only 13 soldering these things myself in my basement while skipping school.

No one knew I was doing this; it was really a great time to learn computers.  Then came Internet-connected BBSes and [Spoofing](https://en.wikipedia.org/wiki/Spoofing_attack) which opened 1000s of servers to easy access (and hacks).

*There was no reason to write a book on this stuff; no reason to share with the world.*

Heck, even now with my 40 TB media system and Sickbeard, Couchpotato and SABnzbd automation, I very much hesitate writing blog posts on how easy it is to pirate these days.  I suppose my decision not to share these exploits came down to:

* If we tell the world how we are doing it, they will find ways to stop us.
* The immorality stance that people take.

Put a checkbox next to both of those as I have had my run-ins with them.  Though I never talked about it to frack us personally, others did and therefore they found ways to make it more difficult for us.  And immorality?  Don't talk to me about immorality when paying for your health plan and crossing the streets in NYC like everything is hunky dory.

*Oblivious* is the keyword here.  Which brings now us to *Mr. Robot*...

## Mr. Robot

Here's the first 4 minutes of the pilot.
{% youtube nJNZF3LR0VM %}

My jaw dropped.  Not because of the man and what he is doing..

No.  It was because of how perfectly accurate the technical bits were.  And not only accurate; but [considering recent events](http://www.wired.com/2013/11/silk-road/), how up-to-date they really are.

If you are watching this series and think, "That's cool.  But no way that can really happen.  TOR is anonymous.  It's just fiction.", well I am here to tell you its not.  After watching the first 4 episodes, every single line, hack, code, apk that you see is real - very real and 100% accurate (albeit some under the right conditions).

With that said I think the time is right to stand up and not to sit on this information any longer.  To show the world that this is not Hollywood magic - *this shit is real*.

I welcome everyone to come on a new journey with me: how to hack, as exploited by *Mr. Robot*.

### Episodes

The way I envision this going is I will break down each episode and their technical facts and details.  And if I have the right environment, provide you with the details of the hack itself so you can educate yourself.

OT: Even the episode names themselves I think are a play on the recent attempts to keep people from downloading from newsgroups - absolute genius!  (in recent years, since the NNTP indexing sites have been threatened and shutdown, people are naming movies and tv shows oddly to bypass Hollywood-hired tech-lawyer's filters - in order to keep them from being "nuked", aka DMCA taken down)

{% assign index = true %}
{% for post in site.categories["mr-robot"] %}
{% capture this_year %}{{ post.date | date: "%Y" }}{% endcapture %}
{% unless year == this_year %}
  {% assign year = this_year %}
  <h2>{{ year }}</h2>
{% endunless %}
<article>
  {% include foo.casper/article_preview.html %}
</article>
{% endfor %}
