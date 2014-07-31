---
published: true
layout: post
title: "Processing Credit Cards with Tokens?"
description: 
image: 
video: 
date: 2014-07-31 14:07:40 -0400
comments: true
categories: [software, security]
tags: ["Credit Cards"]
---

{% audio http://pd.npr.org/anon.npr-mp3/npr/atc/2014/07/20140716_atc_visa_makes_big_move_to_increase_online_spending.mp3 03:21 NPR: Visa Makes Big Move To Boost Consumer Spending Online %}

Heard this on NPR and decided to investigate further because at first glance it looks like a good idea - at least from a developer's perspective.

From the PaymentNews website, I found this announcement.

{% blockquote EMVCo to Work on Payment Tokenization Standards http://www.paymentsnews.com/2014/01/emvco-to-work-on-payment-tokenization-standards.html %}
Tokenization is the process of replacing a traditional card account number with a unique payment token that is restricted in how it can be used with a specific device, merchant, transaction type or channel. When using tokenization, merchants and digital wallet operators do not need to store card account numbers; instead they are able to store payment tokens that can only be used for their designated purpose. The tokenization process happens in the background in a manner that is expected to be invisible to the consumer.
{% endblockquote %}

Visa calls it, [VISA checkout](https://checkout.visa.com/index.jsp?country=US) and it is supposed to remove the burden of entering a credit card from your smartpohone.

Looking better.  But wait a minute, how do you secure/access a token?

Turns out they are expecting users to sign in with a "*simple username and password, easy to remember*."  And there inlies my first cringe - passwords?  Let me explain why that is a roadblock IMO:

* Either the [password requirements](http://en.wikipedia.org/wiki/Password_policy) will be a road block for anyone to easily type or remember.
* Or, the password will be a weaker password - easy for people to remember, and also to reuse for, say, a forum login [that can easily get sniffed](http://lifehacker.com/5853483/a-guide-to-sniffing-out-passwords-and-cookies-and-how-to-protect-yourself-against-it).

Sure, you can mitigate the complex passwords with a password manager.  But, not everyone uses those and some would argue [a password manager is also a bad idea](/software/security/password-managers-are-not-immune-to-hacks-themselves.html).

Today if presented with an "enter credit card details below" with an option to "sign in with Visa Checkout instead", I still enter the raw CC details.  Which that in and of itself is the problem VISA is trying to fix by focusing the burden on secure storage of those CC details with VISA themselves, instead of the mom-n-pop cake shop's PHP website that is asking for my CC.

What I would suggest is to take a more two-factor approach to authentication.  Something that involves a simple password, one that is easy to remember; but also, you need to have a second factor of authentication - like a keyfob or fingerprint reader or possibly even, gasp, something as simple as [Google's Authenticator](http://en.wikipedia.org/wiki/Google_Authenticator) that has worked perfectly for me for many websites and devices.

But sadly, we will continue to be forced to obey the [false sense of security of complex passwords](http://www.taipeitimes.com/News/editorials/archives/2010/09/10/2003482490).

Also see: [Passwords - When Security Gets in the Way](/software/security/passwords-when-security-gets-in-the-way.html)

