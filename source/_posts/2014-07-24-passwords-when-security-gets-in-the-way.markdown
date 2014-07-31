---
published: true
layout: post
title: "Passwords - When Security Gets in the Way"
description: Complex passwords are annoying.  And now, they are no longer secure - providing a false sense of security.
image: http://eduncan911.com/blog/images/when-security-gets-in-the-way.jpg
video: 
date: 2014-07-24 16:58:17 -0400
comments: true
categories: [software, security]
tags: [Passwords]
---
[When Security Gets in the Way](http://jnd.org/dn.mss/when_security_gets_in_the_way.html)

{% img /blog/images/when-security-gets-in-the-way.jpg When Security Gets in the Way %}

{% blockquote Don Norman http://jnd.org/dn.mss/when_security_gets_in_the_way.html %}
The numerous incidents of defeating security measures prompts my cynical slogan: The more secure you make something, the less secure it becomes. Why? Because when security gets in the way, sensible, well-meaning, dedicated people develop hacks and workarounds that defeat the security. Hence the prevalence of doors propped open by bricks and wastebaskets, of passwords pasted on the fronts of monitors or hidden under the keyboard or in the drawer, of home keys hidden under the mat or above the doorframe or under fake rocks that can be purchased for this purpose.

We are being sent a mixed message: on the one hand, we are continually forced to use arbitrary security procedures. On the other hand, even the professionals ignore many of them. How is the ordinary person to know which ones matter and which don't? The confusion has unexpected negative side-effects. I once discovered a computer system that was missing essential security patches. When I queried the computer's user, I discovered that the continual warning against clicking on links or agreeing to requests from pop-up windows had been too effective. This user was so frightened of unwittingly agreeing to install all those nasty things from "out there" that all requests were denied, even the ones for essential security patches. On reflection, this is sensible behavior: It is very difficult to distinguish the legitimate from the illegitimate. Even experts slip up, as the confessions reported occasionally in various computer digests I attest.
{% endblockquote %}

I recall many years ago when Microsoft proclaimed the end of password management woes with long and memorial [Pass Phrases](http://technet.microsoft.com/en-us/library/cc512624.aspx).  I personally started to really get annoyed at websites that didn't allow me to enter spaces or the password length was something small like 16 characters.

As a previous IT Administrator, having to reset so many user passwords because they locked themselves out or just plain forgot their had-to-change-ever-60-days password, I saw first hand the annoyances that most had with passwords.

It wasn't until just a few years ago that the buzz around complex passwords started to shift to a "false sense of security" statue.  Which is very true because I have personally [brute-force attacked](http://en.wikipedia.org/wiki/Brute-force_attack) several passwords (in the name of education, of course).

Seeing how fast my X79 6-core desktop with over 5,760 GPU cores could churn through a few billion password combinations to guess a 20 character TruCrypt volume (it took only 4 hours by the way), the era of complex passwords deterring hackers is over - way way over since this hardware can easily be purchased off the shelf by anyone - and I still have room for another 6000 GPU cores if I ever upgraded.  That's just insane - 12,000 GPU cores in a single machine.

## Smart Password Hashing

Now, some password managers are smart.  It wasn't until I read into KeePass' [protection against Dictionary Attacks](http://keepass.info/help/base/security.html#secdictprotect) did I realize a whole 'nother way of preventing brute-force attacks.  KeePass describes their password hashing like this:

{% blockquote KeePass - Protection against Dictionary Attacks http://keepass.info/help/base/security.html#secdictprotect %}
You can't really prevent these [brute-force dictionary] attacks: nothing prevents an attacker to just try all possible keys and look if the database decrypts. But what we can do (and KeePass does) is to make it harder: by adding a constant work factor to the key initialization, we can make them as hard as we want.
{% endblockquote %}

Please go read the rest of that quote for extreme details.  But in short, here is what they do:

* Take your Master password and hash it.
* Hash it another *N* number of times based on a simple pre-determined algorithm (think: PreviousHash + "A Salt", PreviousHash + "B Salt", etc).

The trick that makes this work is that *N* should be a number of cycles that it takes your computer to compute in about 1 second.  By default, they set it to 6000 to allow for older mobile phones to be able to open the password database within about a second or two.  But this should be much higher.  Like, on a factor of 100,000 times higher.

For example, that same 6-core X79 CPU and 5,760 GPU core desktop I used to crack that 20-character TruCrypt could generate about 18,000,000 passwords each second.  But, when I opened KeePass and told it to calculate how many hashes it needed to perform to take at least 1 second on this machine, the answer was 23,000,000. 

So how does rehashing 23,000,000 times work, you may ask?  Instead of my computer generating 23,000,000 passwords a second in a brute-force attack, it follows a pre-determined algorithm hashing 23,000,000 times to generate only 1 password.

I'll let that sink in for a moment...

If a hackers machine is busy generating only 1 password per second, the possibility of brute force attacking a database goes from 23,000,000 per second down to just 1 per second.

No hacker in the world is going to continue brute-forcing that database.  Most likely they will just look for the [NSA backdoors available in everything](http://www.reuters.com/article/2014/03/31/us-usa-security-nsa-rsa-idUSBREA2U0TY20140331) at that point.  

I'll end with a final quote from our buddy Don from earlier.

{% blockquote Don Norman http://jnd.org/dn.mss/when_security_gets_in_the_way.html %}
Although there is much emphasis on passwords security most break-ins occur through other means. How do thieves break into systems? They usually don't use brute force. They phish, luring unsuspecting but helpful people to tell them their login name and password. Or they install sniffers on keyboards and record everything that was typed. The strength of passwords is irrelevant if the thief has already discovered it.
{% endblockquote %}