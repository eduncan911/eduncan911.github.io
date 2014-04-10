---
layout: post
title: "Support Ticket Severity vs Priority"
date: 2009-10-05 02:16:00 -0400
comments: true
published: true
categories: ["blog", "archives"]
tags: ["Geek Stuff", "Computer Programming"]
alias: ["/blog/support-ticket-severity-vs-priority.aspx"]
---
<!-- more -->
{% include imported_disclaimer.html %}
<P><A href="/blog/archives/images/SupportTicketSeverityvsPriority_11E83/ARG1329_pvw.jpg" mce_href="/blog/archives/images/SupportTicketSeverityvsPriority_11E83/ARG1329_pvw.jpg"><IMG style="BORDER-BOTTOM: 0px; BORDER-LEFT: 0px; MARGIN: 0px 20px 0px 0px; DISPLAY: inline; BORDER-TOP: 0px; BORDER-RIGHT: 0px" title=ARG1329_pvw border=0 alt=ARG1329_pvw align=left src="/blog/archives/images/SupportTicketSeverityvsPriority_11E83/ARG1329_pvw_thumb.jpg" width=244 height=236 mce_src="/blog/archives/images/SupportTicketSeverityvsPriority_11E83/ARG1329_pvw_thumb.jpg"></A> All too often, I get involved with ticketing systems that have these set incorrectly.&nbsp; Or, they utilize them in a different manner than what they were intended for.&nbsp; Tonight, I am setting up another system and thought I would document the differences here for future references (and for my buddies that could tweak their systems).</P>
<P>I understand there is a movement to get away from setting both of these.&nbsp; I myself like a system without the severity part, as it is much faster just to run down the priority list.&nbsp; But, I feel that the more formal the QA process is (e.g. you have a dedicated QA member or team or outsourced group), the more you need to separate the two.&nbsp; This post should help with that.</P>
<H2>Definitions of Severity and Priority</H2>
<P>The definitions, in terms of a ticketing system are as follows:</P>
<BLOCKQUOTE>
<P><STRONG>Severity</STRONG> : The level of impact the defect has on the system, overall.&nbsp; Basically, <EM>how serious the bug is</EM>.&nbsp; </P>
<P><STRONG>Priority</STRONG> : The developers order in which to attack, address, or fix the tickets.&nbsp; Ranked usually from Highest to Lowest.</P></BLOCKQUOTE>
<P>Before going any further, let’s setup the Severity to match what Microsoft uses (<A href="http://c2.com/cgi/wiki?DifferentiatePriorityAndSeverity" target=_blank mce_href="http://c2.com/cgi/wiki?DifferentiatePriorityAndSeverity">sourced from this article</A>, with my spin on it).&nbsp; </P>
<BLOCKQUOTE>
<P><STRONG>1 - Exception or Crash </STRONG>: A system crash or anything that loses persistent data.&nbsp; Often times referred to as Show Stoppers.&nbsp; Most of the time your overall exceptions that users see (or get the generic “and error has occurred” page) would fall into this category.&nbsp; Unless related to a new feature being QA’d (see #2 below).</P>
<P><STRONG>2 - New Feature Incomplete</STRONG> : A <EM>new</EM> feature that does not work at all or has exceptions.&nbsp; The word <EM>new</EM> being import there, as broken new feature bugs do not belong in #1 above.</P>
<P><STRONG>3 - Release Feature Bug</STRONG> : A completed feature that can be released, but has some rough edges to iron out further.</P>
<P><STRONG>4 - Cosmetic (UI)</STRONG> : Purely cosmetic, css, html, and spelling issues.</P></BLOCKQUOTE>
<P>I usually take it a little further by adding a 5th option.</P>
<BLOCKQUOTE>
<P><STRONG>5 - Feature Request</STRONG> : Usually a placeholder for feature notes and feature development / feedback to the reporter.&nbsp; Some organizations prefer to keep a separate list of these.&nbsp; I find they are too often forgotten about.</P></BLOCKQUOTE>
<P>It is easier to think of severities as categories of the defect itself.&nbsp; Also if you notice, I prefixed the severities with numbers.&nbsp; This has a two effects by giving users an instant “what level is this bug” resolve, as well as a trick to get several ticket systems to order the DropDownList by the number (yeah, lame, but works!).</P>
<H2>Who sets Severity and Priority?</H2>
<P>This is a good one.&nbsp; A few employees at my last company nearly went to war over who gets to set these.&nbsp; But, the answer is simple:</P>
<BLOCKQUOTE>
<P><EM>It’s the tester/bug reporter’s job to set the severity.</EM></P></BLOCKQUOTE>
<P>The person in charge of QAing the system knows the severity of the bug they are reporting.&nbsp; They know how it impacts the users on the other end.&nbsp; But, this person should not be given the power to set the priority.&nbsp; Else, everything would be set to High Priority (usually the case).</P>
<BLOCKQUOTE>
<P><EM>Priority should be set by the project manager or dispatcher.</EM></P></BLOCKQUOTE>
<P>During the weekly standup, the project manager decides on what order the tickets are addressed in and this, in turn, dictates the priority of the tickets.&nbsp; This is done by examining the severity of the bug reported (yep, there it is - examine the severity here!).&nbsp; After reviewing the severity, the PM estimates the time to resolve the bug for the next milestone or release and decides if it is acceptable.&nbsp; If so, a priority is set on the ticket and it is moved to the appropriate milestone.</P>
<H2>Severity and Priority Examples</H2>
<P>Let’s take an example of an css issue in which the overflow property is not set correctly, and the text the user sees is being obscured by this issue.&nbsp; But, this css issue is part of a new feature that is going out in the next build.&nbsp; What do you set it to?&nbsp; Is it #2, a feature incomplete?&nbsp; Or #3, a feature bug because the user cannot set the text of this “new” feature?&nbsp; Or, #4, an UI issue?</P>
<P>Personally, this is to each his own.&nbsp; I would examine the context of the text being hidden.&nbsp; If this text is the balance of your bank account being hidden, then that is a #2.&nbsp; If it is part of the help text, then #3 and can be released to be tweaked later.&nbsp; If it is just a few words not needed for any operation or description of the page’s purpose, then, it’s #4 and can wait for more sever issues to be addressed.</P>
<P>Basically, the severity dictates rather that bug must be completed before release.&nbsp; I usually set the rule that the release does not go out with any #1 and #2s in the list.&nbsp; Or, I may release some #2s if I can quickly follow-up with a patch within a day or two.&nbsp; </P>
<P>Number 3s and 4s often time get pushed back until the next release, unless the priority has been bumped (i.e. how old a ticket is).&nbsp; The #3s and #4s are great gap fillers for those "let's run through the tickets and attack as many as we can" days.</P>
<P>If you need more examples, feel free to hit me up or leave a comment.</P>
<H2>Summary</H2>
<P>Hopefully you have a better idea of severity and how it fits into your project management.&nbsp; Again, I have to stress that smaller projects may never use severity.&nbsp; But, if you have any type of format QA process, it makes sense to stick it in there to have the extra level of communications.</P>
<P>In case you are wondering, I personally use Unfuddle at my companies and personal projects.&nbsp; You can’t beat the web version of diffmerge in the browser!&nbsp; GitHub is very good as well for those diffmerges.&nbsp; GitHub is best suited for public projects and very small teams, and is only for Git.&nbsp; Where Unfuddle supports both Git and SVN, and is more privatized. </P>
