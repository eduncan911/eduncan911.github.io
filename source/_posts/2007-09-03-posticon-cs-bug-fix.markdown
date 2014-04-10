---
layout: post
title: "PostIcon CS Bug Fix"
date: 2007-09-03 18:59:00 -0400
comments: true
published: true
categories: ["blog", "archives"]
tags: ["Geek Stuff", "Computer Programming", "Community Server", "PostIcon", "The MiXX Collection"]
alias: ["/blog/posticon-cs-bug-fix.aspx"]
---
<!-- more -->
{% include imported_disclaimer.html %}
<P><SPAN style="FONT-FAMILY: 'Arial','sans-serif'; FONT-SIZE: 10pt"><IMG style="WIDTH: 380px; HEIGHT: 253px" align=right src="http://www1.istockphoto.com/file_thumbview_approve/2369292/2/istockphoto_2369292_software_bug_03.jpg" width=380 height=253 mce_src="http://www1.istockphoto.com/file_thumbview_approve/2369292/2/istockphoto_2369292_software_bug_03.jpg">With the previous release of The MiXX Collection, it&nbsp;was updated to work with CS 2007.&nbsp; Well there is a bug in CS 2007's CSModule that no longer allows updating the ExtendedAttributes after a post is created.&nbsp; <?xml:namespace prefix = o ns = "urn:schemas-microsoft-com:office:office" /><o:p></o:p></SPAN></P>
<P><SPAN style="FONT-FAMILY: 'Arial','sans-serif'; FONT-SIZE: 10pt">In other words, the bug in the PostIcon that was introduced with 1.0 release caused a 0.jpg&nbsp;PostIcon to be saved at times and not propertly updating the WeblogPost object.&nbsp; </SPAN></P>
<P><SPAN style="FONT-FAMILY: 'Arial','sans-serif'; FONT-SIZE: 10pt"><STRONG>Download:</STRONG> As always, you can&nbsp;download the latest version and source&nbsp;from <A href="/files/folders/communityserver/tags/The+MiXX+Collection/default.aspx" target=_blank mce_href="/files/folders/communityserver/tags/The+MiXX+Collection/default.aspx">the file gallery</A>.</SPAN></P>
<P><SPAN style="FONT-FAMILY: 'Arial','sans-serif'; FONT-SIZE: 10pt">This release, version 1.1, resolves this issue with a&nbsp;performance penalty&nbsp;work-around.&nbsp; But due to the changes and protection in the CSModules, there isn't any other way.&nbsp; The work-around is during a CreatePost event, we don't write the ExtendedAttributes on the PrePost&nbsp;CSModule event&nbsp;(since we do not have the PostID any longer).&nbsp; Instead, I hook into the AfterPost event that fires, after&nbsp;the post has been created, to obtain the PostID.&nbsp; This fires off an UpdatePost method to&nbsp;write the entire post to the DB - again.<o:p></o:p></SPAN></P>
<P><SPAN style="FONT-FAMILY: 'Arial','sans-serif'; FONT-SIZE: 10pt">Don't worry, this is only during the first&nbsp;initial CreatePost event.&nbsp; If you go back and Update a post, it fires normally&nbsp;- that is&nbsp;only 1 time because we now have a PostID during the PrePost event to write to the ExtendedAttributes.&nbsp; <o:p></o:p></SPAN></P>
<P><SPAN style="FONT-FAMILY: 'Arial','sans-serif'; FONT-SIZE: 10pt">I'm open to suggestions if someone else has a cleaner solution.&nbsp;&nbsp;It all comes down to not being able to&nbsp;update/write&nbsp;to the&nbsp;ExtendedAttributes during the AfterPost (PostPost) CSModule event.&nbsp; I've mentioned it for years, there should be a method to save the ExtendedAttributes without having to update the entire object.</SPAN></P>
<P><SPAN style="FONT-FAMILY: 'Arial','sans-serif'; FONT-SIZE: 10pt">And as always, bookmark this link for updates: <A href="/archive/tags/The+MiXX+Collection/default.aspx">/archive/tags/The+MiXX+Collection/default.aspx</A>&nbsp; You can also access the RSS option in there to subscribe via RSS as well.</SPAN></P>
<P style="MARGIN: 0in 0in 10pt" class=MsoNormal><o:p><FONT size=3 face=Calibri></FONT></o:p>&nbsp;</P>
