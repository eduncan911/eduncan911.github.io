---
layout: post
title: "Google Chrome popups gets jiggy with it"
date: 2008-09-15 20:15:00 -0400
comments: true
published: true
categories: ["blog", "archives"]
tags: ["Geek Stuff", "Computer Programming"]
alias: ["/blog/google-chrome-popups-gets-jiggy-with-it.aspx"]
---
<!-- more -->
{% include imported_disclaimer.html %}
<P><IMG style="WIDTH: 110px; HEIGHT: 110px" align=left src="http://i.cmpnet.com/infoweek/graphics_library/110x110/google_chrome_noshadow.jpg" width=110 height=110 mce_src="http://i.cmpnet.com/infoweek/graphics_library/110x110/google_chrome_noshadow.jpg">There are dozens of reviews for Google Chrome out there. So I will not bore you with any (except I am really liking&nbsp;the isolated tabs, besides the alpha issues).&nbsp;But, as I am doing Google Chrome testing today I noticed something interesting on how Google Chrome handles popups.&nbsp;Check out the video I recorded today.</P>
<P>Interesting how Google does not block the popup.&nbsp; But instead, they&nbsp;animate the window by moving it down and across the bottom of the screen!</P>
<P>I have not isolated the exact reason to why&nbsp;as Chrome does not&nbsp;move other window.open popups such as Facebook's Share on YouTube.&nbsp; But the one fact I have found is the Facebook Connect uses XSS (cross-site scripting) which we have had to configure to allow them to run scripts.&nbsp; If someone wants to test it on other sites that are using XSS, please let me know your results.&nbsp; The Facebook development team was also able to reproduce it, which removes my machine as a possible source (or virus).</P>
<P>[video]</P>
<P><A href="/downloads/fbconnect-moving.wmv" target=_blank mce_href="/downloads/fbconnect-moving.wmv">(direct download, right-click and save-as - 3 MB)</A></P>
<P mce_keep="true">&nbsp;</P>
<DIV></DIV>
