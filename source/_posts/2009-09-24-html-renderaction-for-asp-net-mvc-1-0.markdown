---
layout: post
title: "Html.RenderAction for ASP.NET MVC 1.0"
date: 2009-09-24 16:04:00 -0400
comments: true
published: true
categories: ["blog", "archives"]
tags: ["Geek Stuff", "Computer Programming", "Asp.Net Mvc", "Type Safety"]
alias: ["/blog/html-renderaction-for-asp-net-mvc-1-0.aspx"]
---
<!-- more -->
{% include imported_disclaimer.html %}
<P>The <A href="/blog/type-safety-with-asp-net-mvc-futures.aspx" mce_href="/blog/type-safety-with-asp-net-mvc-futures.aspx">ASP.NET MVC 1.0 Futures assembly</A> (that is not included with ASP.NET MVC 1.0) has a powerful HtmlHelper extension method called RenderAction().&nbsp;&nbsp; It sounds similar to the Html extension method called RenderPartial() for a good reason.&nbsp; RenderAction() executes an action on a controller, allowing you to move your logic out of the views.</P>
<H2>The problem with Html.RenderPartial()</H2>
<P>There is no direct problem with this.&nbsp; It is just that developers are left with only the ability to render a Partial View.&nbsp; What if you want that partial view to act on model properties you pass into that partial view?&nbsp; What if you need to access the ambient values in the Routes collection to render some specifics?&nbsp; Unfortunately, developers are only left with RenderPartial() which only gives you access to a partial view.&nbsp; If you really need this logic, you have no choice but to put it into the partial view.&nbsp; Or, to put it into your controller’s action method that calls the view that calls the partialviews.&nbsp; Needless to say, that’s a bit hokey.</P>
<H2>What Html.RenderAction&lt;TController&gt;() Resolves</H2>
<P>It gives you the power of moving that complex View and Partial View logic to a Controller’s Action, where it belongs!&nbsp; Think of it as a “Render Partial Action” method of where you can call back into a controller to render some logic. This gives you the ability to clean up your partial views now by removing that logic and placing it on a controller’s action, that renders the partial view when done. The syntax looks like:</P><PRE><CODE>&lt;% Html.RenderAction&lt;ProductController&gt;(c =&gt; c.RenderProductResults()); %&gt;<BR></CODE><CODE>&lt;!-- Or... //--&gt;<BR>&lt;%= Html.RenderAction("RenderPartialResults", "Product"); %&gt; </CODE></PRE>
<P>Put simply, this renders an action on a controller directly in your view.&nbsp; You may be thinking “big deal”, but I assure you this is a big deal in large complex MVC sites.&nbsp; Having the power to abstract or breakup your controller’s actions into multiple <EM>partial-actions</EM> and multiple views is very powerful.&nbsp; Instead of relying on the 1 controller' action to wire up all of the data for all of the views, partial views, and logic for the views.&nbsp; Now, you can just focus on that one section - and abstract the rest into reusable parts.</P>
<P>You may be wondering where this extension method is with your ASP.NET MVC project.&nbsp; As mentioned above, it is part of the <A href="/blog/type-safety-with-asp-net-mvc-futures.aspx" mce_href="/blog/type-safety-with-asp-net-mvc-futures.aspx">Futures extension of the ASP.NET MVC project at codeplex</A>.</P>
<H2>ASP.NET MVC Sidebar Widget Example</H2>
<P>The current pattern suggests you use Html.RenderPartial to render those partial views as your sidebar widgets.&nbsp; What if you want those widgets to be more complex?&nbsp; What if you want those widgets to act on the the current Route?&nbsp; Well, you are left with little options with RenderPartial.&nbsp; Instead, you want to use RenderAction to call an action on a controller to handle that logic.&nbsp; </P>
<P>Assume we are viewing a blog post entry and on the right, we want a sidebar widget for related posts. To do this, first create an action on a controller called RelatedPosts().</P><PRE><CODE>public ActionResult RelatedPosts(Int32 postID)
{&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <BR>  // some complex logic, or simple logic, can go here now…<BR>  //<BR>  <BR>  if (postID &lt; 1)<BR>    return PartialView(“NoRelatedPosts”);<BR>&nbsp; var relatedPosts =<BR>&nbsp;&nbsp;&nbsp; _postService.FetchRelatedPosts(postID);<BR>  <BR>&nbsp; if (relatedPosts.Count &gt; 0)<BR>&nbsp;&nbsp; return PartialView("RelatedPosts", relatedPosts);<BR>&nbsp; else<BR>&nbsp;&nbsp;&nbsp; return PartialView(“NoRelatedPosts”);
}</CODE></PRE>
<P>Notice how the logic here accounts for empty or no results, and returns an a different partial view?&nbsp; Using RenderPartial(), this is logic could only be reflected with inline IF ELSE brackets within your PartialView - and ugly spaghetti mess.&nbsp; Also, how would you even retrieve the related posts collection?&nbsp; You have no choice but to obtain that collection back on the post entry view action - which should not be concerned about our little sidebar widget.&nbsp; All it should do is wire up the post.&nbsp; But, that is not the case with RenderPartial() - you have to wire up all of your data ahead of time in one large ViewModel with multiple entities dangling off of it.</P>
<P>No no.&nbsp; Let’s do it with RenderAction() and instead put this logic into the Controller (where it belongs, so we can test for it); and then, we can call it with the RenderAction() extension.&nbsp; We can do this now with a simple call within our larger post view like so:</P><PRE><CODE>&lt;% Html.RenderAction&lt;PostController&gt;(c =&gt; c.RelatedPosts(Model.PostID)); %&gt; </CODE></PRE>
<P>We instead kind of render a <EM>partial action</EM> by calling an action on a controller that handles the logic that we would otherwise have to put in the view.&nbsp; Now, our main post view action doesn’t have to be concerned about wiring up our sidebar partial view.&nbsp; We can just call RenderAction() in the view.</P>
<H2>ASP.NET MVC AJAX Example using RenderAction</H2>
<P>Taking an example from the book <A href="http://www.amazon.com/gp/product/0470384611?ie=UTF8&amp;tag=eduncan911com-20&amp;linkCode=as2&amp;camp=1789&amp;creative=390957&amp;creativeASIN=0470384611" mce_href="http://www.amazon.com/gp/product/0470384611?ie=UTF8&amp;tag=eduncan911com-20&amp;linkCode=as2&amp;camp=1789&amp;creative=390957&amp;creativeASIN=0470384611">Profressional ASP.NET MVC 1.0</A>, we’ll use the submitting a Form Using Ajax example to replace the limited RenderPartial() function with a richer RenderAction() from a Controller’s action to process the results more finely.</P>
<P>In the ProductController, you would add a new method with the signature RenderProductResults(IList&lt;Product&gt; products):</P><PRE><CODE>public ActionResult RenderProductResults(IList&lt;Product&gt; products)
{
    // insert some custom logic here, maybe even switch partial views, etc
    //
    if (products.Count &gt; 0)
        return PartialView("ProductSearchResults", products);
    else
        return EmptyResult();
}    </CODE></PRE>
<P>Now, you can update their ajax example to render this new action instead of the RenderPartial() from their example:</P><PRE><CODE>&lt;h1&gt;Product Search - jQuery&lt;/h1&gt;
&lt;form action="&lt;%= Url.Action("ProductSearch") %&gt;" method="post" id="jform"&gt;

  &lt;%= Html.TextBox("query", null, new { size=40 }) %&gt;
  &lt;input type="submit" id="jsubmit" value="go" /&gt; 

&lt;/form&gt;

&lt;div id="results2"&gt;
  &lt;% Html.RenderAction&lt;ProductController&gt;(c =&gt; c.RenderProductResults(Model.Results)); %&gt;
&lt;/div&gt;

&lt;script src="/Scripts/jquery-1.3.2.js" type="text/javascript"&gt; &lt;/script&gt;<BR>&lt;script src="/Scripts/jquery-form.js" type="text/javascript"&gt; &lt;/script&gt;<BR>&lt;script&gt; <BR>  $(function() { <BR>    $('#jform').submit(function(){ <BR>      $('#jform').ajaxSubmit({ target: '#results2' }); <BR>      return false; <BR>    }); <BR>  });<BR>&lt;/script&gt;</CODE></PRE>
<P>Look for the Html.RenderAction line above.&nbsp; What this does is instead of rendering a partial view in the id=”results2” location, you can now render a “partial Action” with the Html.RenderAction() call.&nbsp; Notice that how we are also passing strongly typed parameters directly into the method?&nbsp; Yep, fully supported.</P>
<P>By using the RenderAction instead of RenderPartial, you have much more control over what happens with that rendering of the partial (now, rendering of the action).&nbsp; <EM><U>This gives you an excellent opportunity to remove that complex view logic you may have, and place it in an Action where it belongs</U></EM>!</P>
<H2>Custom ViewEngines and Extensions</H2>
<P>Now, you can also resolve this logic issue by creating custom ViewEngines, or extensions that expand upon the ViewEngine, HtmlHelper, or UrlHelper.&nbsp; But, I see those methods as more application-wide common logic (like pagers and server controls for display name).&nbsp; I do not see that as a solution for your one-off partial view for the ajax response to something.&nbsp; Think of how bloated your ViewEngine would get, or how many different ViewEngines you’d have to choose from.&nbsp; No, ViewEngine extensions have a place which I will post about as well.</P>
<H2>Summary</H2>
<P>When your views start getting complex and messy, it may be time to switch to a RenderAction to handle that logic.&nbsp; I know I have cleaned up quite a lot using it.&nbsp; Also, custom view engines have a place in their own right to abstract more global/common logic across the entire site.</P><img alt='Html.RenderAction for ASP.NET MVC 1.0' src='http://www.spacedaily.com/images/solar-impulse-bg.jpg'/> 
