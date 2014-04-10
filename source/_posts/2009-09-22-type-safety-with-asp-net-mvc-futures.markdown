---
layout: post
title: "Type Safety with ASP.NET MVC Futures"
date: 2009-09-22 17:02:29 -0400
comments: true
published: true
categories: ["blog", "archives"]
tags: ["Geek Stuff", "Computer Programming", "Asp.Net Mvc", "Type Safety"]
alias: ["/blog/type-safety-with-asp-net-mvc-futures.aspx"]
---
<!-- more -->
{% include imported_disclaimer.html %}
<p>In this post, I will show you how to strongly type some parts of MVC to get rid of those “magic strings.”&#160; I will also publish a few extension methods that expand upon this concept later on.&#160; So, this is a continuation of my <a href="/blog/asp-net-mvc.aspx">Mvc series</a> that you can subscribe to.</p>  <h2>ASP.NET MVC 1.0 Futures</h2>  <p>You can download ASP.NET MVC 1.0 RTM from codeplex.&#160; You can even download the source code and step through what the framework is doing.&#160; What a lot of people overlook is an additional assembly available for download at these locations called ASP.NET MVC 1.0 Futures.&#160; You can download it from Codeplex from below:</p>  <blockquote>   <p><a href="http://aspnet.codeplex.com/Release/ProjectReleases.aspx?ReleaseId=24471" target="_blank">Download ASP.NET MVC 1.0 Futures from CodePlex</a></p> </blockquote>  <p>This is a darling of an assembly using the namespace <strong>Microsoft.Web.Mvc</strong>.&#160; Usually these Microsoft “Futures” releases are developer code that did not get approved for RTM release.&#160; This assembly is no exception and includes a plethora of strongly typed extensions.&#160; The reason some of this code did not get approved was because some of it did not conform to Medium Trust requirements for the 1.0 release.&#160; So if you have a strict medium trust application, you may not be able to use the some of the code contained within the assembly.</p>  <p>I am not going to cover all of the extensions within this assembly.&#160; You can do that on your own with <a href="http://www.red-gate.com/products/reflector/index.htm" target="_blank">.NET Reflector</a>.&#160; Instead, I am going to cover just a couple that you will be using on a daily basis.</p>  <p>To get started, go ahead and added a reference to the Microsoft.Web.Mvc assembly to your project.&#160; In addition, to make things a lot easier, go ahead and add a few namespaces to your web.config.</p>  <pre><code>&lt;namespaces&gt;
  &lt;add namespace=&quot;System.Web.Mvc&quot;/&gt;  
  &lt;add namespace=&quot;System.Web.Mvc.Ajax&quot;/&gt;
  &lt;add namespace=&quot;System.Web.Mvc.Html&quot;/&gt;
  &lt;add namespace=&quot;System.Web.Routing&quot;/&gt;
  &lt;add namespace=&quot;System.Linq&quot;/&gt;
  &lt;add namespace=&quot;System.Collections.Generic&quot;/&gt; 

  &lt;add namespace=&quot;AspNetMvcTypeSafety.Controllers&quot;/&gt;
  &lt;add namespace=&quot;AspNetMvcTypeSafety.Models&quot;/&gt;
  &lt;add namespace=&quot;Microsoft.Web.Mvc&quot;/&gt; &lt;!-- Add this assembly --&gt;  
&lt;/namespaces&gt;</code><p></p></pre>

<p>Hit CTRL-SHIFT-B to do a quick compile of your code (so the assembly is copied to your /bin). ASP.NET MVC 1.0 Futures is now available for your project.&#160; You’ll also note that I add my controllers and models’ namespaces.&#160; This is because you want them available from your views and controllers.</p>

<h2>Strong Typed Html ActionLink&lt;TController&gt;</h2>

<p>If you are already coding in ASP.NET MVC, you are using strings to reference controllers, actions, and views.&#160; An example to access to the MostRecent() action on a PostController would be something like:</p>

<pre><code>&lt;%-- // Old way--%&gt; <br />&lt;%= Html.ActionLink(Model.DisplayName, &quot;MostRecent&quot;, new { Controller=&quot;Post&quot; }) %&gt;<br /></code></pre>

<p>You have to create an anonymous type and reference a controller with “Post”, for the action method “MostRecent”.&#160; Using the Futures assembly, you’ll see a few new extension overloads for Html.ActionLink:</p>

<pre><code>Html.ActionLink&lt;TController&gt;(<br />    Expression&lt;Action&lt;TController&gt;&gt; action, String linkText)
Html.ActionLink&lt;TController&gt;(<br />    Expression&lt;Action&lt;TController&gt;&gt; action, String linkText, object attributes)<br /></code></pre>

<p>So, now you can re-write the first example to get the MostRecent() action like so:</p>

<pre><code>&lt;%-- // New way --%&gt;</code><code><br />&lt;%= Html.ActionLink&lt;PostController&gt;(c =&gt; c.MostRecent(), Model.DisplayName)%&gt;<br /></code></pre>

<p>Isn’t that much tidier?&#160; To break it down, TController is the controller you want to access an action method for.&#160; With it assigned as the generic type, now you have intellisense for your controller as the image below demonstrates.</p>

<p><a href="/blog/archives/images/StronglyTypedMVCwithASP.NETFutures_C956/923200981403PM.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="9-23-2009 8-14-03 PM" border="0" alt="9-23-2009 8-14-03 PM" src="/blog/archives/images/StronglyTypedMVCwithASP.NETFutures_C956/923200981403PM_thumb.png" width="664" height="239" /></a> </p>

<p>This pattern even supports the parameters on your controller’s actions!&#160; For example, say you want to pass in a username property for a PostController action with the signature of MyPosts(String username).&#160; Using the old method, you have to pass it an anonymous type like so (again, using strings):</p>

<pre>&lt;%-- // Old way --%&gt;<code><br />&lt;%= Html.ActionLink(Model.DisplayName, &quot;MyPosts&quot;, new { Controller=&quot;Post&quot;, id=Model.Username }) %&gt;<br /></code></pre>

<p>With the Futures assembly, it’s a simple as this:</p>

<pre>&lt;%-- // New way --%&gt;<code><br />&lt;%= Html.ActionLink&lt;PostController&gt;(c =&gt; c.MyPosts(Model.Username), Model.DisplayName)%&gt;<br /></code></pre>

<p>Notice that you pass the Model.Username parameter directly into the method c.MyPosts(), instead as an anonymous type like the old way. You even get the intellisense as well, as shown below:</p>

<p><a href="/blog/archives/images/StronglyTypedMVCwithASP.NETFutures_C956/923200982013PM.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="9-23-2009 8-20-13 PM" border="0" alt="9-23-2009 8-20-13 PM" src="/blog/archives/images/StronglyTypedMVCwithASP.NETFutures_C956/923200982013PM_thumb.png" width="631" height="121" /></a></p>

<h2>Html RenderAction&lt;TController&gt;</h2>

<p>This new function works exactly like the ActionLink&lt;TController&gt; above.&#160; No surprises.</p>

<pre><code>&lt;%-- // new way %&gt;
&lt;% Html.RenderAction&lt;PostController&gt;(c =&gt; c.MyPosts(Model.Username));%&gt;<code> </code></code></pre>

<p>You can <a href="/blog/html-renderaction-for-asp-net-mvc-1-0.aspx">read more about RenderAction&lt;TController&gt; here</a>.&#160; </p>

<h2>Strong Typed Html BeginForm&lt;TController&gt;</h2>

<p>Again, using the ASP.NET MVC Futures assembly, this is already done for you.&#160; This one is a bit tricky though.&#160; You want to pass your values within the form’s scope, not the BeginForm method itself.&#160; But, if you leave the parameters blank for your method, the view will not render and you will be an exception.&#160; Intelliense actually gives you a hint by the red underline.</p>

<p><a href="/blog/archives/images/StronglyTypedMVCwithASP.NETFutures_C956/923200990142PM.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="9-23-2009 9-01-42 PM" border="0" alt="9-23-2009 9-01-42 PM" src="/blog/archives/images/StronglyTypedMVCwithASP.NETFutures_C956/923200990142PM_thumb.png" width="504" height="93" /></a> </p>

<p>To get by this, you have to trick it and pass in some default values like so:</p>

<p><a href="/blog/archives/images/StronglyTypedMVCwithASP.NETFutures_C956/923200990258PM.png"><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="9-23-2009 9-02-58 PM" border="0" alt="9-23-2009 9-02-58 PM" src="/blog/archives/images/StronglyTypedMVCwithASP.NETFutures_C956/923200990258PM_thumb.png" width="536" height="101" /></a> </p>

<p>Yes, you can still pass a direct value into the method.&#160; And just like normal, if a route’s parameter does not match the name, it will be tacked on as a querystring.&#160; </p>

<h2>Summary</h2>

<p>That’s it for now.&#160; There are more to capitalize on within the Futures assembly such as the <strong>FileCollectionModelBinder</strong> for multiple files, the <strong>CookieTempDataProvider</strong> for setting a temp cookie only for the next request, or even the HtmlHelper extensions for <strong>Mailto()</strong> that wraps those ever daunting subject, body, multiple emails, etc all into a neat HtmlHelper.</p>

<p>For my next project, I will be developing heavy in Mvc across multiple sites.&#160; At that point, I am sure I will have more strongly typed extensions for things like RedirectToAction() at the controller level.&#160; I will post them as I run across them.</p>
