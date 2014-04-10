---
layout: post
title: "Interesting String.GetHashCode() issue between ASP.NET 1.1 and 2.0"
date: 2007-02-01 16:50:00 -0500
comments: true
published: true
categories: ["blog", "archives"]
tags: ["Geek Stuff", "Computer Programming", "Community Server"]
alias: ["/blog/gethashcode-issue.aspx"]
---
<!-- more -->
{% include imported_disclaimer.html %}
<P>Today a fellow co-worker, <A class="" href="http://sqladvice.com/blogs/dpenton/" target=_blank mce_href="http://sqladvice.com/blogs/dpenton/">David Penton</A>,&nbsp;ran into an interesting issue about a background&nbsp;ASP.NET&nbsp;thread using ASP.NET 2.0, instead of ASP.NET 1.1 when the individual website was set to run under 1.1.</P>
<P>First a little background.&nbsp; The internal staging server is Windows 2003 R2.&nbsp; In the past&nbsp;Windows 2003 would throw an exception at the web application level when two or more websites were sharing the same application pool, and they were set to different versions of ASP.NET.&nbsp; The R2 release seems to have resolved this issue, hence our IT Administrator running most sites under the common Default Application Pool.</P>
<P>We have a client that requires an ASP.NET 1.1 build of the website.&nbsp; So&nbsp;the developer&nbsp;was working within VS2k3.&nbsp; The background processes in question of the web application is to process the searching algorithm we use for an out-of-the-box CommunityServer install (nicknamed the SearchBarrel).&nbsp; We have an Enterprise Search addon available that uses <FONT size=2>Lucene</FONT>.NET, but for this client they are using the search barrel.&nbsp; The SearchBarrel breaks up a post into individual words, then issues a ToLower() and then GetHashCode() on the string for each word.&nbsp; We store this Int32 hash in the database as number matching is faster to index than string matching.</P>
<P>The String.GetHashCode() method is different between .NET 1.1 and .NET 2.0.&nbsp; So when you are upgrading an application from 1.1 to 2.0, and you are storing the HashCode for strings somewhere, you'll have to generate new HashCodes in .NET 2.0.</P>
<P>The issue the developer ran into was very odd.&nbsp; The post was&nbsp;using a mix of English and Chinese, so we are dealing with an extended character set as well.</P>
<BLOCKQUOTE>
<P><FONT face="courier new,courier">(The word we are trying to hash)<BR>ps3对蓝光技术的采用也是令大家称道的原因之一&nbsp;</FONT></P></BLOCKQUOTE>
<P>When a single word mixed English and binary characters without spaces (i.e. Chinese Simplified as above), the background SearchBarrel CSJob (the thread) would generate an ASP.NET&nbsp;2.0 HashCode for the above word!&nbsp;</P>
<BLOCKQUOTE>
<P><FONT face="courier new,courier">(.NET 2.0 HashCode of the word above)<BR>-309760669<BR><BR>(.NET 1.1 HashCode of the word above)<BR><FONT size=2>1104497610</FONT></FONT>&nbsp;</P></BLOCKQUOTE>
<P>Yes, the website was set to ASP.NET 1.1.&nbsp; Yes, the binaries were built under .NET 1.1.&nbsp; But yet, we were getting an .NET 2.0 hashcode.&nbsp; The only thing&nbsp;that came to my mind was&nbsp;that it was using the default application pool, which was shared with many other staging websites - mostly ASP.NET 2.0 sites I'm guessing (since most of our clients have moved to ASP.NET 2.0).</P>
<P>It gets even odder.&nbsp; If the developer was to edit the post, change that one word of mixed English and Chinese characters to insert a space between the two different languages, clearing the search barrel and letting the background thread re-hash the post - it would then use ASP.NET 1.1 to generate the HashCode!</P>
<P>Very very odd.&nbsp; And we could re-produce it consistently by adding and removing that space and forcing the searchbarrel to rebuild.</P>
<P>The only thing we could guess is that .NET 1.1 choked on the English + Chinese character mix when encoding the hashcode and somehow reverted back to&nbsp;ASP.NET 2.0 to generate the GetHashCode() method.</P>
<P>The fix?&nbsp; Move the website to its own dedicated Application Pool.</P>
<P mce_keep="true"><img alt='Interesting String.GetHashCode() issue between ASP.NET 1.1 and 2.0' src='http://qainsight.net/content/binary/SQA_For_Dummies.jpg'/></P>
