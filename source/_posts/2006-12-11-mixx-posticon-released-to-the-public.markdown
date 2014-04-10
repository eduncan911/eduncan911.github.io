---
layout: post
title: "MiXX.PostIcon released to the public"
date: 2006-12-11 05:48:00 -0500
comments: true
published: true
categories: ["blog", "archives"]
tags: ["Geek Stuff", "Computer Programming", "Community Server", "PostIcon", "The MiXX Collection"]
alias: ["/blog/mixx-posticon-released-to-the-public.aspx"]
---
<!-- more -->
{% include imported_disclaimer.html %}
<P mce_keep="true"><STRONG>EDIT 6/05/2007: Changed links to CS 3.0 version.&nbsp; Subscribe to here for updates: </STRONG><A href="/archive/tags/The+MiXX+Collection/default.aspx"><STRONG>/archive/tags/The+MiXX+Collection/default.aspx</STRONG></A></P>
<P mce_keep="true">&nbsp;</P>
<P mce_keep="true">Some of you might have noticed my new homepage over the last month.&nbsp; Those of you using an RSS reader to read this, go check out my homepage for the new PostIcon module I'm talking about.</P>
<P><A href="/files/folders/5894/download.aspx"></A></P><STRONG>What is it?<BR></STRONG>The purpose of this Server Control and CSModule is to automatically<BR>create a small lightweight PostIcon with little to no work on your part.<BR>Just embed a normal image, bam, you have a PostIcon automatically. 
<P>This module creates the PostIcon for a Weblog Post during its creation <BR>and/or update physically on disk. It will connect to your image source, <BR>load into memory, crop, resize, compress, and save the tiny ~2 KB file <BR>to disk. It then adds the full pathname to an ExtendedAttribute for that<BR>post called "PostIcon", allowing for the skin to render where required. <BR>This storage-to-disk method greatly speeds up the homepage rendering as <BR>we do not access the photo gallery.</P>
<P>To use, simply create a blog post with at least one &lt;img&gt; embedded.&nbsp; <BR>That's it.&nbsp; The default logic above will take the first &lt;img&gt; in your<BR>post and process it to disk.</P>
<P>Optionally, you can specify a particular image to use as your PostIcon.<BR>Say if you had multple embedded &lt;img&gt;s, or if you don't have an image at<BR>all but wanted a PostIcon for the post. </P>
<P>You can use the BBCode format of:</P>
<P>&nbsp;<img alt='MiXX.PostIcon released to the public' src='http://domain.com/image.gif'/></P>
<P>This will allow you to specify an Anchor position, if you want to crop<BR>in a certain region.&nbsp; The Anchor attribute is optional.&nbsp; See the<BR>module's config file for more information on Anchor.</P>
<P><STRONG>How does it work?</STRONG><BR>There are two parts to make this work.&nbsp; The backend uses the PostIconModule&nbsp;to download into memory, crop, resize, compress, and save the selected image to disk.</P>
<P>And the frontend UI uses the PostIcon server control to rendered the saved image, with smart logic.</P>
<P><STRONG>What is the logic to determine what gets downloaded, cropped, and saved or even displayed if none is set?<BR></STRONG>There are two methods of logic.&nbsp; The first is which image, if any at all, is processed on the initial PostCreation process.&nbsp; And the other logic is in the PostIcon server control that renders, if there is no image saved from the module.</P>
<P>The PostIconModule determines what url gets written to the post, if any.&nbsp; It does this by following the order below:</P>
<OL>
<LI>Does the <img alt='MiXX.PostIcon released to the public' src=' BBCode exist?&nbsp;If so, parse the image specified.</LI>
<LI>Is there an &lt;img&gt; declaration somewhere in the post?&nbsp; If so, parse the first &lt;img&gt; and use it as the PostIcon.</LI></OL>
<P>If the PostIconModule fails to parse the image, no url is written.&nbsp; In which case, the PostIcon server control determines what gets displayed with the logic below:</P>
<OL>
<LI>Is there a DefaultImageUrl specified?&nbsp; If so, link directly to it.</LI>
<LI>Is the UseAnonymousAvatar set to true?&nbsp; If so, link directly to it.</LI></OL>
<P><STRONG>Why are you saving to disk and writing a direct url?&nbsp; Isn't the Photo Gallery built for that?</STRONG><BR>Yes, it is but&nbsp; I wanted speed on my homepage.&nbsp; And loading the Weblog posts + 20 to 50 images on the homepage is a bit more processing then I care for.</P>
<P>So with the PostIconModule I load the image into a MemoryStream, crop the image based on the Anchor set, resize the image to what is specified in the config, compress it as a JPG (tests showed 60% quality compared to Gif 89a and PNG is smaller then all), and finally save it to disk.&nbsp;</P>
<P>The PostIcon server control loads only the direct Url that is stored for the post, therefore generating a very quick homepage load time.</P>
<P><STRONG>Where's the source code?</STRONG><BR>With the rest of the files below.</P>
<P><STRONG>Where do I get this wonderful tool?</STRONG><BR>Here ya go:</P>
<P>(install only)<BR><A href="/files/folders/2611/download.aspx">/files/folders/2611/download.aspx</A><A href="/Downloads/MiXXCollection-CS30-v1.0.zip"></A></P>
<P>(source code-must compile)<BR><A href="/files/folders/5894/download.aspx">/files/folders/5894/download.aspx</A></P>
<P mce_keep="true">&nbsp;</P>
<P><STRONG>Future Releases<BR></STRONG>If by popular demand, I might add in rendering of the User's Avatar if multiple people are posting to a single blog.&nbsp; But since this is rare, I skipped it for now.</P>
<P>Also if by popular demand, I may add in some type of Email detection (i.e. MetaBlog API posts) and display a custom image (if the image logic fails to save one).&nbsp; For example, I might want to display a common PostIcon for all posts <A class="" href="http://www.blogmailr.com/blog/archive/2006/11/07/blogmailr-com-is-live.aspx" target=_blank mce_href="http://www.blogmailr.com/blog/archive/2006/11/07/blogmailr-com-is-live.aspx">made by Blogmailr</A>.&nbsp; Such as this one:</P>
<P><IMG src="http://www.interest.co.nz/images/email-icon.gif" mce_src="http://www.interest.co.nz/images/email-icon.gif"> </P><img alt='MiXX.PostIcon released to the public' src='http://ec2.images-amazon.com/images/P/B000JK8OYU.01._AA240_SCLZZZZZZZ_V34638512_.jpg'/>
