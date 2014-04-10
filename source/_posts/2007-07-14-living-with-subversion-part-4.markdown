---
layout: post
title: "Living with Subversion (Part 4)"
date: 2007-07-14 18:14:00 -0400
comments: true
published: true
categories: ["blog", "archives"]
tags: ["Geek Stuff", "Computer Programming"]
alias: ["/blog/living-with-subversion-part-4.aspx"]
---
<!-- more -->
{% include imported_disclaimer.html %}
<P>In the forth and final part of my series, <EM><A href="/archive/2007/07/14/living-with-subversion-part-1.aspx" mce_href="/archive/2007/07/14/living-with-subversion-part-1.aspx">Living with Subversion</A></EM>, I cover a number of performance tips and some Dos and Don'ts.</P>
<H2>Improving performance of TortoiseSVN</H2>
<P>The performance improvement aspect of this article targets those mainly on laptops that want to save battery life&nbsp;and/or slower HDD machines, or simply have just too many projects (&gt;50) within repositories.&nbsp; It is quite simple really, TortoiseSVN's&nbsp;folder icon overlays are very cool as a quick visual indication of what has changed recently.&nbsp; The problem with the icon overlays is TortoiseSVN constantly updates the status of these, especially if you are using Windows Explorer to view the folder tree no matter if you are playing a game, surfing the web, etc.</P>
<P>Still not on par with what I am explaining?&nbsp; Check out TortoiseSVN's <A href="http://tortoisesvn.net/node/267" target=_blank mce_href="http://tortoisesvn.net/node/267">Optimize Performance</A> page.&nbsp; But they have left out one key improvement: Disable the Status Cache (icon overlays).&nbsp; </P>
<P align=center><A title=TortoiseSVN-IconOverlays href="http://www.flickr.com/photos/10018165@N02/804223283/" mce_href="http://www.flickr.com/photos/10018165@N02/804223283/"><IMG border=0 alt=TortoiseSVN-IconOverlays src="http://static.flickr.com/1235/804223283_0dfb0aebc5.jpg" mce_src="http://static.flickr.com/1235/804223283_0dfb0aebc5.jpg"></A></P>
<P align=center>Icon Overlays Dialog</P>
<P><STRONG>Icon Overlays</STRONG><BR>I set mine Status Cache overlays to "none".&nbsp; This effectively disables the Status Cache all together.&nbsp; Just like SGV Client, you'll have to perform an Update before starting your work everyday as this will pull down&nbsp;the latest copy to start with.&nbsp; If you like the red X effect, you'll want to leave this on Default.&nbsp; I personally don't want my HDD going in insane (like it did with the dozen+ repositories and icon overlays).&nbsp; So I disable mine, period.</P>
<P>Also be sure to uncheck "Show overlays only in explorer".&nbsp; This will keep the icons out of the standard Windows dialog popups, and only show them in the Windows Explorer.&nbsp; Again if you want to see when something is out-of-sync immediately, you'll want to skip this part but sacrifice performance.</P>
<P>Our final performance increase greatly effects Windows' users.&nbsp; Setting the include paths text box.&nbsp; As described in the Optimize Performance page by TortoiseSVN, you will want to specify the directory of where your projects are stored.&nbsp; This keeps TortoiseSVN from snooping around your Windows directory for hidden svn folders - constantly snooping.</P>
<H2>Common TortoiseSVN mistakes</H2>
<P>As mentioned above, TortoiseSVN uses hidden directories to store the Subversion versioning information for that directory and files.&nbsp; So a mistake several of us have made is while working with an existing repository is&nbsp;we use Windows Explorer&nbsp;to copy an existing directory to a new directory (i.e. Theme copying).&nbsp; The problem with this logic is that the hidden svn directories are still there.&nbsp; This causes versioning whoas and most likely will force your updates into the previous version of that directory (or an Update will override your changes without a merge).&nbsp; This is because TortoiseSVN is using the path information stored within the hidden svn folders.</P>
<P>Simple fix really but you have to use your head to remember: Always right-click the new directory after copying, click Search and search for the .svn or _svn directories and delete them.&nbsp; Then the next time you go to check in, the directories will appear to be new to TortoiseSVN and allow you to add them.&nbsp; </P>
<P>An easier&nbsp;fix would be to just use the Rep-browser to perform the action(s), and do an Update when done on your local machine.&nbsp; This will copy/pull down&nbsp;everything properly.</P>
<P>Another common task is if you need to move a directory, as with SGV Client, you will have to move it within the Repo-browser or suffer similar issues noted above.</P>
<P>Bottom-line: use the Repo-browser for most of your copy and/or moving of folders.</P>
<P mce_keep="true">&nbsp;</P>
<P>And that concludes this four-part series.&nbsp; Lot of reading for just a few options, eh?</P>
<P><img alt='Living with Subversion (Part 4)' src='http://subversion.tigris.org/subversion_logo_hor-468x64.png'/></P>
<P mce_keep="true">&nbsp;</P>
