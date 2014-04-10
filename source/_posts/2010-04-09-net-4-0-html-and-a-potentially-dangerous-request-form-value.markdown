---
layout: post
title: ".NET 4.0, HTML, and A potentially dangerous Request.Form value"
date: 2010-04-09 01:51:41 -0400
comments: true
published: true
categories: ["blog", "archives"]
tags: []
alias: ["/blog/net-4-0-html-and-a-potentially-dangerous-request-form-value.aspx"]
---
<!-- more -->
{% include imported_disclaimer.html %}
<p><img style="border-right-width: 0px; margin: 0px 0px 20px 20px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="validation" border="0" alt="validation" align="right" src="/blog/archives/images/ApotentiallydangerousRequest.Formvalue.0_12CAD/validation.jpg" width="312" height="244" /> I ran across a breaking change tonight in the .NET 4.0 CLR's version of ASP.NET.&#160; The 4.0 version of the CLR binds to any HTTP request data to validate against.</p>  <p>The entire error you may see is:</p>  <blockquote>   <p><em>A potentially dangerous Request.Form value was detected from the client</em></p> </blockquote>  <p>This is because 4.0 now inspects all request data.&#160; Rather that being the cookies, urls, headers, etc.&#160; A very nice security upgrade, I might say.&#160; This will prevent a hacker from submitting malicious code through cookies or other means that you may be parsing. </p>  <h2>WYSIWYG and/or HTML Editors with .NET 4.0's CLR</h2>  <p>One common issue that immediately creeps up with this new security is when you want to use a rich-text editor or even a textbox that you want to submit HTML data through.&#160; This seems to be now impossible with .NET 4.0's CLR's default validation because you cannot override this behavior, if you remain in 4.0's validation.</p>  <p>And no, there is no way to selectively disable which items to validate.</p>  <h2>ASP.NET MVC's ValidateInput attribute does not work</h2>  <p>You, like me, most likely just slapped a big ol' fat <font face="Courier New">[ValidateInput]</font> attribute on your MVC controller's action method and thought you were done.&#160; But behold, the error still remains!</p>  <p>This is because your MVC website is running on the .NET 4.0 CLR and therefore continues to be validated.</p>  <h2>The Fix: HttpRuntime requestValidationMode</h2>  <p>The work-around is to place this into your web.config's <font face="Courier New">&lt;system.web&gt;</font> node:</p>  <p></p>  <pre><code>
&lt;httpRuntime requestValidationMode=&quot;2.0&quot; /&gt;

</code></pre>

<p></p>

<p>What this does is it forces the CLR to only check the Page's html fields, which you can now overwrite with the <font face="Courier New">[ValidateInput]</font> attribute in MVC controllers, or the <font face="Courier New">&lt;%@ Page validateRequest=&quot;false&quot; %&gt;</font>, or any other normal means. </p>

<p>Sadly though, this also disables all of those other checks for the request data.&#160; Obviously, this is not a preferred work-around and even though VS 2010 is due for release on April 12th (just around the corner!), I do not see any notations of this being changed anytime soon.</p>

<p>If someone knows a work around for 4.0, please let me know.&#160; This is a great new feature, but sadly we must disable it for just about any website we develop on.</p>

<p>Unless we move to <a href="http://daringfireball.net/projects/markdown/" target="_blank">MarkDown</a> that is (which I am a big fan of, clients not so much…).</p>

<p><a href="http://msdn.microsoft.com/en-us/library/system.web.configuration.httpruntimesection.requestvalidationmode(VS.100).aspx" target="_blank">You can find out more information about this over at MSDN</a></p>
