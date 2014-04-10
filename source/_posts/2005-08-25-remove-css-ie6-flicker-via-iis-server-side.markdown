---
layout: post
title: "Remove CSS IE6 Flicker via IIS (server side)"
date: 2005-08-25 14:36:00 -0400
comments: true
published: true
categories: ["blog", "archives"]
tags: ["Computer Programming"]
alias: ["/blog/remove-css-ie6-flicker-via-iis-server-side.aspx"]
---
<!-- more -->
{% include imported_disclaimer.html %}
<P>Interesting article&nbsp;I got linked to today:</P>
<P><A href="http://www.aspnetresources.com/blog/cache_control_extensions.aspx">http://www.aspnetresources.com/blog/cache_control_extensions.aspx</A></P>
<P>Says to edit some IIS headers for IE5.x and IE6.x to force the browser to cache.&nbsp; We should be able to force these header strings in the HttpModule of web projects as well.&nbsp;</P>
<P>Reports from work say it kind of works.</P>
