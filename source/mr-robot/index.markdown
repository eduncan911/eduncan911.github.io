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

Ok, that last one needs a blog post on its own.  But I am not an English major; I could not capture the jaw-drop I wanted in words.  In the end, I instead decided to show the world exactly just how accurate this show is.  How scarily accurate.  

Buckle-up hackers and misfits.  Today starts a new era of my online exploits: *Mr. Robot: The facts of hacking.*

## Background

Before we get to *Mr. Robot*, I want to explain a little about me and why I felt this is needed.  My close allies know I have been warning them for decades of just how embedded our governments are with our online lives.  

* The NSA spying for decades with backdoors in our routers.  
* Automated filtering on network traffic, looking for key words.
* Circumventing SSL connections with these backdoors into networks.
* The underground phone recordings going on since the `70s, looking for key words.
* Public library (and now Amazon) tagging of special books checked out.

The list goes on and on with several now publicly known <a href="https://en.wikipedia.org/wiki/Global_surveillance_disclosures_(2013%E2%80%93present)" title="Global Surveillance programs">Global Surveillance programs</a> (and there's a lot more not public yet, keep that in mind).  When the Snowden leaks started, the [RSA backdoor buyout](http://www.theverge.com/2013/12/20/5231006/nsa-paid-10-million-for-a-back-door-into-rsa-encryption-according-to) become public and many more, I couldn't stop smiling for months. This was the biggest silent, "I told you so" ever.

I even joked in emails with my colleagues with "Hello NSA!" in emails because I entered keywords that I knew would be filtered.  Those emails date back to the '90s btw.

My close personal colleague put it best: *What is the price of freedom? <a href="http://www.theverge.com/2013/12/20/5231006/nsa-paid-10-million-for-a-back-door-into-rsa-encryption-according-to" title="RSA Backdoor $10 million">$10 million dollars</a>*

### TOR

When my paranoia started to increase to levels of thoughts of deleting my MySpace/Facebook accounts, erasing my online presence, I looked into TOR in the mid `00s.  On the surface it looked perfect; but, once I read the technical details I saw the inherit flaw and decided it wasn't the best approach for me to continue.  

Though I continue to use TOR for truly anonymous items, I highly advise everyone to think of TOR as a false sense of security and to be very cautious using it knowing its holes.

Extreme details on TOR during S01E01 by the way.  I invite you to continue reading there.

### I sat on it

With all the hacks I've been doing since the '80s, it was nothing more than simple "password guessing", [war dialers](https://en.wikipedia.org/wiki/War_dialing) and buffer overruns exploits of open ports.  Dirt simple hacks that an 11 year could do because, well, I was 11.  

Even the [Phone Phreaking](https://en.wikipedia.org/wiki/Phreaking) of the infamous tone hacks to dial BBSes overseas for free was fairly well known.  Out of all the blue boxes created, I only got one working.  Maybe because I was only 11 soldering these things myself in my basement while skipping school.  

No one knew I was doing this; it was really a great time to learn computers.  Then came Internet-connected BBSes and [Spoofing](https://en.wikipedia.org/wiki/Spoofing_attack).

There was no reason to write a book on this stuff.  To blog about it.  

Heck, even now with my 28 TB media system and Sickbeard, Couchpotato and SABnzbd automation, I very much hesitate writing blog posts on how easy it is to pirate these days for two key reasons:

* If we tell the world how we are doing it, they will find ways to stop us.
* The immorality that some people take.

Put a checkbox next to both of those as I have had my run-ins with both.  Though I never talked about it and fracked us personally, others did and they found ways to make it more difficult for us.  And immorality?  Don't talk to me about immorality when paying for your health insurance and walking around NYC streets like everything is hunky dory.

*Oblivious* is the keyword here.  Which brings now us to *Mr. Robot*...

## Mr. Robot

Here's the first 4 minutes of the pilot.
{% youtube nJNZF3LR0VM %}

My jaw dropped.  Not because of the man and what he is doing or the inner voice of the main character.  

No.  It was because of how perfectly accurate the technical bits were.  And not only accurate; but [considering recent events](http://www.wired.com/2013/11/silk-road/), how up-to-date they really are.

If you are watching this series and think, "That's cool.  But no way that can really happen.  It's just fiction.", well I am here to tell you its not.  After watching the first 4 episodes, every single line, hack, code, apk that you see is real - very real and 100% accurate (albeit under the right conditions).

With that said I think the time is right to stand up and not to sit on this information any longer.  To show the world that this is not Hollywood magic - this shit is real.  

I welcome everyone to come on a new journey with me: how to hack, as exploited by *Mr. Robot*.

### Episodes

The way I envision this going is I will break down each episode and their technical facts and details.  And if I have the right environment, provide you with the details of the hack so you can educate yourself.

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