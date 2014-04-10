---
layout: post
title: "Living with Subversion (Part 3)"
date: 2007-07-14 18:13:00 -0400
comments: true
published: true
categories: ["blog", "archives"]
tags: ["Geek Stuff", "Computer Programming"]
alias: ["/blog/living-with-subversion-part-3.aspx"]
---
<!-- more -->
{% include imported_disclaimer.html %}
<P>In part three of <EM><A href="/archive/2007/07/14/living-with-subversion-part-1.aspx" mce_href="/archive/2007/07/14/living-with-subversion-part-1.aspx">Living with Subversion</A></EM>, we cover one of the biggest reason of this series: Using a different Merge Tool.</P>
<H2>Merging conflicts&nbsp;using SourceGear Vault Client's DiffMerge</H2>
<P>Now onto one of the most useful tidbits of this article, using the trusty SGDM tool that is included with SourceGear Vault Client installation.&nbsp; I have been using SourceGear Vault Client 3.1.9 for a while now, so I am writing using that version.&nbsp; I know 3.5.x and 4.0 has been released, but our last version of SGV was 3.1.x so that's what I am used to.</P>
<P>Once installed, you do not have to do anything to the client.&nbsp; Instead, it's all about setting up Tortoise to use it as the merge tool.</P>
<P>Note: TortoiseSVN does come with its own DiffMerge tool.&nbsp; Maybe it is me too busy coding, or not spending enough time resolving conflicts, but I just cannot stand TortoiseSVN's version.&nbsp; Hence this topic.&nbsp; I am very use to SGV's robust version.</P>
<P mce_keep="true">&nbsp;</P>
<P align=center><A title=TortoiseSVN-DiffViewer href="http://www.flickr.com/photos/10018165@N02/804466189/" mce_href="http://www.flickr.com/photos/10018165@N02/804466189/"><IMG border=0 alt=TortoiseSVN-DiffViewer src="http://static.flickr.com/1012/804466189_5fda7f8a80.jpg" mce_src="http://static.flickr.com/1012/804466189_5fda7f8a80.jpg"></A></P>
<P align=center>Diff Viewer Dialog</P>
<P>First, click the Diff Viewer on the left and&nbsp;select the "External" option.&nbsp; Next find/note the location of your Vault Client directory.&nbsp; There should be a sgdm.exe file here.&nbsp;&nbsp;Change the Diff Viewer (you will want to keep the quotation marks too) location&nbsp;to:</P>
<BLOCKQUOTE>
<P><FONT size=2 face="Courier New">"C:\Program Files\SourceGear\Vault Client\sgdm.exe" %mine %base</FONT></P></BLOCKQUOTE>
<P>Making sure the path matches obviously.&nbsp; This will put your local copy in the left panel and the repository's version in the right panel.</P>
<P mce_keep="true">&nbsp;</P>
<P align=center><A title=TortoiseSVN-MergeTool href="http://www.flickr.com/photos/10018165@N02/804507399/" mce_href="http://www.flickr.com/photos/10018165@N02/804507399/"><IMG border=0 alt=TortoiseSVN-MergeTool src="http://static.flickr.com/1175/804507399_4a22b60ec4.jpg" mce_src="http://static.flickr.com/1175/804507399_4a22b60ec4.jpg"></A></P>
<P align=center>Merge Tool Dialog</P>
<P>Next click the Merge Tool on thee left and select External once again.&nbsp; Using the same location of the sgdm.exe as above, paste it in.&nbsp; But this time, the command-line arguments are a good bit longer:</P>
<BLOCKQUOTE>
<P><FONT size=2 face="Courier New">"C:\Program Files\SourceGear\Vault Client\sgdm.exe" /result:%merged /title1:%yname /title2:%mname /title3:%tname %mine %merged %theirs</FONT></P></BLOCKQUOTE>
<P>This will put your working version on the left panel, the repository's version in the right panel, and the TortoiseSVN's merged version in the center.</P>
<P>The trick is that now you can use SGV's DiffMerge tool, easy color coding and replace options that you are used to, overriding the TortoiseSVN's merged (and often broken) result area highlighted in bright yellow as shown below.</P>
<P align=center><A title=TortoiseSVN-DiffViewer href="http://www.flickr.com/photos/eduncan911/810062741/" mce_href="http://www.flickr.com/photos/eduncan911/810062741/"><IMG border=0 alt=TortoiseSVN-DiffViewer src="http://farm2.static.flickr.com/1351/810062741_d9f3baa6fb.jpg" mce_src="http://farm2.static.flickr.com/1351/810062741_d9f3baa6fb.jpg"></A></P>
<P align=center>SGV Client's SDMG.exe opened by TortoiseSVN after a conflict</P>
<P>The Unified Diff Viewer is a viewer for CVS patch files.&nbsp; By default on Windows, TortoiseSVN uses Notepad.&nbsp; Tip: Upgrade to Notepad2 for you local notepad.exe in windows.</P>
<P><A href="/archive/2007/07/14/living-with-subversion-part-4.aspx" mce_href="/archive/2007/07/14/living-with-subversion-part-4.aspx">Continue to Part 4</A></P>
<P><img alt='Living with Subversion (Part 3)' src='http://subversion.tigris.org/subversion_logo_hor-468x64.png'/></P>
<P mce_keep="true">&nbsp;</P>
