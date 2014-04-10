---
layout: post
title: "MiXX Collection and PostIcon Updated for CS 2007"
date: 2007-06-05 16:19:00 -0400
comments: true
published: true
categories: ["blog", "archives"]
tags: ["Computer Programming", "Community Server", "PostIcon", "The MiXX Collection"]
alias: ["/blog/the-mixx-collection-and-posticon-updated-for-cs-2007.aspx"]
---
<!-- more -->
{% include imported_disclaimer.html %}
<P>This past weekend, someone gave me a swift kick in the butt to get my MiXX Collection updated for CS 2007.&nbsp; I didn't realize it was under such high demand.&nbsp; Nice.&nbsp; Anyhoot during this upgrade I went ahead and refactored the source to match my other code I've been working with for other clients which lays the groundwork for me to just releasing more addons built into this collection.&nbsp;</P>
<P>The update for CommunityServer 2007 wasn't so much as code edits (there was one line that needed updating).&nbsp; But more so that you must run under Full trust.&nbsp; So I've updated the documentation to detail these steps, as well as giving pointers to those in need of accessing the Post object in the site-wide's BlogPostList repeater (not an individual BlogPostList repeater, that's easy).</P>
<P>Subscribe to The MiXX Collection RSS feed for updates and bug fixes: <A href="/archive/tags/The+MiXX+Collection/default.aspx" mce_href="/archive/tags/The+MiXX+Collection/default.aspx">/archive/tags/The+MiXX+Collection/default.aspx</A></P>
<P>Here's the change log:</P>
<P>2007-06-02<BR>&nbsp;- Updated to support CommunityServer 2007.&nbsp; <BR>&nbsp;- Now requires you to specify Full trust level due to CS 2k7 change.<BR>&nbsp;<BR>2007-04-18<BR>&nbsp;- Re-factored into new MiXX.Core schema shared with other projects.<BR>&nbsp;- Updated to cast content as WeblogPost or IndexedPost, so PostIcon <BR>&nbsp;&nbsp; can be shown in search results for Blog posts.<BR>&nbsp;- Fixed some error logging.<BR>&nbsp;- Fixed a small bug where the ImageUrl stored in the EA had a double<BR>&nbsp;&nbsp;"//" in the url.&nbsp; Not a big bug, so there's no need to go back and<BR>&nbsp;&nbsp;re-process your old posts.&nbsp; Most browsers will render it properly.</P>
<P>2007-02-05<BR>&nbsp;- Fixed the inline &lt;img&gt; parsing bug when using the new ImageQuality<BR>&nbsp;&nbsp;attribute for saving in a higher quality (a bug that was <BR>&nbsp;&nbsp;introduced with backend non-released versions for testing).</P>
<P mce_keep="true">&nbsp;</P>
<P>(install only)<BR><A href="/files/folders/2611/download.aspx">/files/folders/2611/download.aspx</A><A href="/Downloads/MiXXCollection-CS30-v1.0.zip"></A></P>
<P>(source code-must compile)<BR><A href="/files/folders/5894/download.aspx">/files/folders/5894/download.aspx</A></P>
<P>Enjoy and post a comment to your siteurl that is using it!</P>
<P><img alt='MiXX Collection and PostIcon Updated for CS 2007' src='http://get.communityserver.org/images/store/addons2.jpg'/></P>
