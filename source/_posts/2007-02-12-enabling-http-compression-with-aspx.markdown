---
layout: post
title: "Enabling HTTP Compression with ASPX"
date: 2007-02-12 16:50:00 -0500
comments: true
published: true
categories: ["blog", "archives"]
tags: ["Geek Stuff"]
alias: ["/blog/enabling-http-compression-with-aspx.aspx","/archive/2007/02/12/enabling-http-compression-with-aspx.aspx"]
---
<!-- more -->

{% include imported_disclaimer.html %}

<P>Here's a quick-n-easy post about enabling HTTP Compression on your server, as I've done over the weekend.&nbsp; But instead of reading endless blog posts about it, and MSDN articles about enabling each and every step, I've compiled it all into a single CMD script you can copy and run on your server.&nbsp; Easy.</P>
<P>First a tiny bit of background...&nbsp; Yeah, I am so late to this game.&nbsp; For a while I heard the buzz word, but only thought it was similar to Analog Modem compression (back when I worked for Hayes) to where both modems must support a common compression algorythm, which was mostly never the case.&nbsp; Hence the "Call these sets of numbers if you have a USR, call this number if you have a Hayes modem, etc" you may remember back in the modem days.</P>
<P>After reading up on HTTP Compression <A class="" title=MSDN2 href="http://www.microsoft.com/technet/prodtechnol/WindowsServer2003/Library/IIS/502ef631-3695-4616-b268-cbe7cf1351ce.mspx?mfr=true" target=_blank mce_href="http://www.microsoft.com/technet/prodtechnol/WindowsServer2003/Library/IIS/502ef631-3695-4616-b268-cbe7cf1351ce.mspx?mfr=true">here</A> this weekend, boy have I missed the boat.&nbsp; I've enabled it on my server over the weekend, over most dynamic file types, and it's really picking up speed now (page loads seem faster).&nbsp; I also found a nifty <A class="" href="http://www.seoconsultants.com/tools/compression.asp" target=_blank mce_href="http://www.seoconsultants.com/tools/compression.asp">HTTP Compression Test </A>website, that ensured me I finally got it enabled (it was a PITA for additional extensions).</P>
<P>Now the problem I had with HTTP Compression was the default list of extensions are very limited.&nbsp; And it only does asp for dynamic content?&nbsp; In IIE6?&nbsp; You'd think they would default to aspx and asp.</P>
<P>Note that you will need to enable HTTP Compresison first, before running the attached script.&nbsp; <A class="" href="http://www.microsoft.com/technet/prodtechnol/WindowsServer2003/Library/IIS/502ef631-3695-4616-b268-cbe7cf1351ce.mspx?mfr=true" target=_blank mce_href="http://www.microsoft.com/technet/prodtechnol/WindowsServer2003/Library/IIS/502ef631-3695-4616-b268-cbe7cf1351ce.mspx?mfr=true">Instructions can be found here</A>&nbsp;and just read the Procedures part. Don't worry about running the scripts in that article as the attachment takes care of that, and additional extensions.</P>
<P>The<STRONG>&nbsp;<EM>attached script enables&nbsp;static and dynamic compression types as listed below</EM></STRONG>.&nbsp;&nbsp;They are as follows:</P>
<BLOCKQUOTE>
<P><STRONG>Dynamic Types</STRONG>: ASP, DLL, EXE, ASPX, ASCX, ASMX, ASHX</P>
<P><STRONG>Static Types</STRONG>: HTM, HTML, TXT, PPT, XLS, XML, PDF, XSLT, DOC, XSL, HTC, JS, CSS</P></BLOCKQUOTE>
<P>You'll notice a few up for debate in that list, such as ASCX and PDF.&nbsp; The debates ranged all over the web and saw it as an advantage more then disadvantage.&nbsp; So over the next few weeks, I ask those I am hosting on my server to see if any dynamic content isn't so dynamic.&nbsp; Kind of like a passive-monitoring approach by asking my users to see if they notice any difference.</P>
<P>About the PDF, some websites generate dynamic PDF content.&nbsp; But usually it's just encoded as a PDF MIME-TYPE, and doesn't actually have the extension of PDF.&nbsp; IIS6's HTTP Compression is based off of extensions, not the mime-type.&nbsp; So I classified it as static.</P>
<P>A little script support. &nbsp;First, this script assumes your OS is installed on C:.&nbsp; And it assumes you have the file adsutil.vbs located at C:\InetPub\AdminScripts\ (default location).&nbsp; If different locations, you can edit the script file as need be.&nbsp; Besides that, you must be running at least W2K3 or R2 and as mentioned above already have HTTP Compression enabled.&nbsp; Haven't tested this yet on IIS7 (Longhorn) yet.</P>
<P><img alt='Enabling HTTP Compression with ASPX' src='http://www.turboiis.com/images/screenshot.jpg'/></P>
<P mce_keep="true">&nbsp;</P>
