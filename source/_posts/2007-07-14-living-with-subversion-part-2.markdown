---
layout: post
title: "Living with Subversion (Part 2)"
date: 2007-07-14 18:09:00 -0400
comments: true
published: true
categories: ["blog", "archives"]
tags: ["Geek Stuff", "Computer Programming"]
alias: ["/blog/living-with-subversion-part-2.aspx"]
---
<!-- more -->
{% include imported_disclaimer.html %}
<P>This is part duex in the series <EM><A class="" href="/archive/2007/07/14/living-with-subversion-part-1.aspx" mce_href="/archive/2007/07/14/living-with-subversion-part-1.aspx">Living with Subversion</A></EM>, starting to get into the nit-n-gritty.&nbsp;</P>
<H2>Configure your software</H2>
<P>After you install TortoiseSVN and SGV's Client, you will want to configure TortoiseSVN for a number of things.&nbsp; You will access this by right-clicking on your empty desktop, going to TortoiseSVN, and then to Settings.</P>
<P align=center><A title=TortoiseSVN-ContextMenu href="http://www.flickr.com/photos/10018165@N02/803978941/" mce_href="http://www.flickr.com/photos/10018165@N02/803978941/"><A title=TortoiseSVN-ContextMenu href="http://www.flickr.com/photos/10018165@N02/803978941/" mce_href="http://www.flickr.com/photos/10018165@N02/803978941/"><IMG alt=TortoiseSVN-ContextMenu src="http://static.flickr.com/1327/803978941_48530121f7.jpg" border=0 mce_src="http://static.flickr.com/1327/803978941_48530121f7.jpg"></A></A></P>
<P align=center>TortoiseSVN's Context Menu for Settings</P>
<P><STRONG>Exclude files you do not want to check-in<BR></STRONG>These includes directories to ignore such as /bin, /obj, /_sgbak, and files such as *.suo, *.pdb, *.bak and so on.&nbsp; Basically, you do not want to check-in these types of files.</P>
<P>Go to the TortoiseSVN's&nbsp;Settings&nbsp;dialog and click Edit.</P>
<P align=center><A title=TortoiseSVN-Settings href="http://www.flickr.com/photos/10018165@N02/803979123/" mce_href="http://www.flickr.com/photos/10018165@N02/803979123/"><IMG alt=TortoiseSVN-Settings src="http://static.flickr.com/1298/803979123_cc0eb1e013.jpg" border=0 mce_src="http://static.flickr.com/1298/803979123_cc0eb1e013.jpg"></A></P>
<P align=center>TortoiseSVN's Settings Dialog</P>
<P>This should open a Notepad window displaying a lot of options.&nbsp; Around line 71, replace the line for # global-ignores with the following:</P>
<BLOCKQUOTE>
<P><FONT face="Courier New" size=2>global-ignores = bin Bin&nbsp;obj cache storage _sgbak *.suo *.pdb *.bak *.user *.db</FONT></P></BLOCKQUOTE>
<P>And make sure to remove the "# " at the beginning.&nbsp; Save it and&nbsp;it should take effect immediately.&nbsp; The "cache" and "storage" folders are there because of working with CommunityServer.&nbsp; With CommunityServer, the cache and storage sub-folders are used for images and attachments for most applications.&nbsp; We don't want to check in those images, attachments, nor the thumbnails.</P>
<P><STRONG>Using underscores to prefix the hidden directories</STRONG><BR>TortoiseSVN stores the versioning information of a directory and files in a hidden svn folder, usually prefixed with a dot ".".&nbsp; This can reek havok on a few developer applications.&nbsp; So&nbsp;I check <EM><STRONG>Use "_svn" instead of ".svn" directories</STRONG></EM> on the same dialog shown above.&nbsp; Visual Studio 6.0's Interdev did not like files starting with a dot ".", and I've seen some funkiness with VS 2003.&nbsp; VS 2005 may be ok, but it is just a force of habit to use underscores instead of periods for the hidden directories.</P>
<P><A class="" href="/archive/2007/07/14/living-with-subversion-part-3.aspx" mce_href="/archive/2007/07/14/living-with-subversion-part-3.aspx">Continue to Part 3</A></P>
<P><img alt='Living with Subversion (Part 2)' src='http://subversion.tigris.org/subversion_logo_hor-468x64.png'/></P>
<P mce_keep="true">&nbsp;</P>
