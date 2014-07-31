---
published: true
layout: post
title: "Password Managers Are Not Immune to Hacks Themselves"
description: Researchers find four classes of common vulnerabilities in popular password managers and recommend greater industry scrutiny and more automated ways to find vulnerabilities.
image: http://eduncan911.com/blog/images/hacking-password-managers.jpg
video: 
date: 2014-07-30 16:11:41 -0400
comments: true
categories: [software, security]
tags: ["Password Managers", Passwords]
---

[Hacking Password Managers](http://www.darkreading.com/cloud/hacking-password-managers/d/d-id/1297250)

{% img /blog/images/hacking-password-managers.jpg Hacking Password Managers %}

{% blockquote Hacking Password Managers http://www.darkreading.com/cloud/hacking-password-managers/d/d-id/1297250 %}
"Our attacks are severe: in four out of the five password managers we studied (LastPass, RoboForm, My1login, PasswordBox, and NeedMyPassword), an attacker can learn a user’s credentials for arbitrary websites. We find vulnerabilities in diverse features like one-time passwords, bookmarklets, and shared passwords. The root-causes of the vulnerabilities are also diverse: ranging from logic and authorization mistakes to misunderstandings about the web security model, in addition to the typical vulnerabilities like CSRF and XSS. Our study suggests that it remains to be a challenge for the password managers to be secure."

"We found critical vulnerabilities in all three bookmarklets we studied," the researchers report. "If a user clicks on the bookmarklet on an attacker’s site, the attacker, in all three cases, learns credentials for arbitrary websites."

"Our work is a wake-up call for developers of web-based password managers. The wide spectrum of discovered vulnerabilities, however, makes a single solution unlikely. Instead, we believe developing a secure web-based password manager entails a systematic, defense-in-depth approach... Future work includes creating tools to automatically identify such vulnerabilities and developing a principled, secure-by-construction password manager."
{% endblockquote %}

I can't believe we are still talking about CSRF attacks.  And for websites claiming to be *secured* for passwords themselves?  Isn't it a common job interview question by now (or better yet, a coding exercise) for developers in how to prevent CSRF attacks?

Oh yeah, and how most of the common web-based password managers are all hackable.  Sure, they fixed THIS vulnerability.  Then when the next zero-day is found, it will be fixed.  And the next and the next.

I use a password manager.  It is not web based, does not integrate into any browser, and still requires manual intervention to open and view - with copy-n-paste only possible in some circumstances which makes the annoyance ever more livable after reading this article.

Can't wait until next month (August) for the paper to be released.

