---
layout: post
title: "Managed Extensibility Framework (MEF) - Microsoft's Official Inversion of Control Container"
date: 2010-02-16 00:50:00 -0500
comments: true
published: true
categories: ["blog", "archives"]
tags: ["Geek Stuff", "Computer Programming", "Asp.Net Mvc", "MSpec", "Inversion of Control", "MEF"]
alias: ["/blog/managed-extensibility-framework-mef-microsofts-official-inversion-of-control-container.aspx"]
---
<!-- more -->
{% include imported_disclaimer.html %}
<p>This new Microsoft feature in .NET Framework 4 is a programming model for reusing components, very similar to those Inversion of Control container frameworks out there that we all know and love (Castle Windsor, Structured Map, their own Unity from the Patterns and Practices team and etc).&nbsp; Now, they have built their own to address the pain points of these frameworks called the Managed Extensibility Framework, or MEF for short.</p> <p>I was pleasantly surprised this weekend when reading the February 02010's issue of MSDN Magazine.&nbsp; Getting up-to-speed on some new features in .NET Framework 4, I saw the headline "<a href="http://msdn.microsoft.com/en-us/magazine/ee291628.aspx" target="_blank">Building Composable Apps in .NET 4 with the Managed Extensibility Framework</a>" by Glenn Block.&nbsp; Yeah, it just rolls off your tongue eh?&nbsp; So I decided I had a few minutes while waiting for the water to boil and scanned the article.&nbsp; I am glad I did.</p> <p>In this post, I will try to give a very brief overview on how to use MEF coming from a background of using other Inversion of Control (IoC) containers, including some of the gotchas that you must be aware of during the switch.&nbsp; Yeah, you will want to make the switch - the switch away from those other bulky frameworks.&nbsp; I, for one, am officially announcing my abandonment of Castle and Unity for all future projects.&nbsp; Because once you add-in .NET 4's new data annotations for seriously improved validation, mixed with MEF, the only other 3rd party component I am left with is Castle's Logger abstraction - which I am hoping I can find a replacement for with .NET 4's new features.</p> <h2>MEF Terminology</h2> <p>First and fore-most for those of you already using an IoC container, it's time for a quick review on what MEF calls a few things and concepts.&nbsp; Below is a table I whipped up to help compare the two terminologies (the MEF portions largely taken from Glenn's excellent article).</p> <p>&nbsp;<img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="2-15-2010 10-41-32 PM" border="0" alt="2-15-2010 10-41-32 PM" src="/blog/archives/images/ManagedExtensibilityFrameworkMicrosoftsO_A9C4/2152010104132PM_3.png" width="832" height="649"> </p> <p>Below is an image from Glenn's article that helps visualize the concepts above of MEF.</p> <p><img style="border-right-width: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px" title="ee291628_Block_Fig1(en-us,MSDN_10)" border="0" alt="ee291628_Block_Fig1(en-us,MSDN_10)" src="/blog/archives/images/ManagedExtensibilityFrameworkMicrosoftsO_A9C4/ee291628_Block_Fig1enusMSDN_10.png" width="413" height="288"> </p> <p>You can see that the overall concept is called Composition.&nbsp; A 'part' is the type or service you want to export.&nbsp; The part (or parts) is marked for Export via Contracts (which are automatic).&nbsp; And other parts that want to ask for another part can do so by Importing.</p> <h2>Managed Extensibility Framework - Why they built it</h2> <p>Glenn mentions in the article that they needed a way to compose of reusable types or components in the up coming Visual Studio 2010, Oslo, Acropolis and I am sure many more.&nbsp; What is important to note is why they created one themselves, instead of using Unity or alike.&nbsp; Glenn mentions some key points:</p> <ul> <li>Third-party Extensibility (allowing vendors to generate plug-ins for Visual Studio, or your own application, with minimal work on your part now)  <li>Other frameworks were too heavyweight for a simple programming model.&nbsp; <li>Or other frameworks required too much effort on the part of either the host or the extension developer. </li></ul> <p>Those last two is what struck a cord with me, and got my attention.&nbsp; Try to sit back and think about how you would allow your applications to be extended with Castle, StructureMap or even Unity.&nbsp; That's a lot of work, a lot of 3rd party assemblies to wire up and configure properly.&nbsp; Especially if you want runtime changes, which MEF supports out of the box with no configuration.</p> <p>That last point is particularly interesting.&nbsp; All too often I see a released developer framework or contrib project by a group of inspired individuals.&nbsp; This is great and all, but those projects quickly grow to be a large project requiring documentation, support, and even refactorings for performance.</p> <p>It got me thinking a lot about what I see wrong with Castle - only two things, it's learning curve and size.&nbsp; While Unity was very well documented, it comes with some significant bloat and only what I can refer to as hoop-jumping.&nbsp; The earlier versions of Unity violated Dependency Injection pricipals and concepts (no ctor injection!).&nbsp; Perfect example of refactoring.</p> <p>MEF really strives to resolve all of these issues, with some extremely simple programming models that I will show you below.</p> <p></p> <h2>MEF Programming Models - Straight Attributed Declarations</h2> <p>Another rip from Glenn's article.&nbsp;&nbsp; But he did it so well.</p> <blockquote> <p>Developers consume MEF through a programming model.&nbsp; A programming model provides a means to declare components as MEF parts.&nbsp; Out of the box, MEF provides an attributed programming model, which will be the main focus of this article.&nbsp; That model is just one of many possible programming models that MEF enables.&nbsp; MEF's core API is completely agnostic to attributes.</p></blockquote> <p>Yep, you heard that right.&nbsp; MEF supports Attributes - for out-of-the-box functionality.&nbsp; No configuration, no setup, nothing.&nbsp; This is so much easier than you are even thinking.&nbsp; So much so, I feel guilty by writing all of this text.&nbsp; Let's just show you how it's done now.</p> <h2>The Blog "Hello World" Snippets</h2> <p>As what seems to be an invasion, the common Hello World for websites these days <a href="http://invalidlogic.com/2008/12/22/blogging-apps-are-the-new-hello-world/" target="_blank">are blogs</a>.&nbsp; So without further delay, here's some code snippets.</p> <p>The post object</p> <p></p><pre><code>
public partial class Post
{
	public Int32 PostId { get; set; }
	public String Title { get; set; }
	public String Description { get; set; }
	public String Body { get; set; }
	public Guid AuthorId { get; set; }
}

</code></pre>
<p></p>
<p>And the PostService that will service the post.</p>
<p></p><pre><code>
[Export(typeof(IPostService))]
public class PostService : IPostService
{
	[Import]
	public IPostRepository PostRepository { get; set; }

	public Post FetchById(Int32 postId)
	{
		return
			(from p in PostRepository.GetAll()
			 where p.PostId == postId
			 select p as Post).FirstOrDefault();
	}
}

</code></pre>
<p>Please note that the above code is not production-code.&nbsp; You should always provide proper cache, concurrency and disposable patterns.&nbsp; This code has been cleaned up for easier reading.</p>
<p>Notice that the PostService has been marked to be exportable, using a specific contract type for IPostService. Now, you do not have to specify the contract type or name. You can simply use [Export]. But remember, we do want to allow for simply extensibility in the future by plugging in different components to be served during composition.&nbsp; How to do that?&nbsp; Easy, just specify the interface type as the contract.&nbsp; Now how easy was that?</p>
<p>Also, notice that we have a dependency on IPostRepository. This is marked with the simple [Import] attribute.&nbsp; It does exactly as you think.&nbsp; MEF composes the first part that matches the contract for IPostRepository and supplies it </p>
<p>Now, some will cry fowl here since I am not directly injecting IPostRepository, or not demanding it in the constructor. Yes, MEF fully supports constructor injection. But, there is a few gotchas you have to be aware of with MEF and constructor composition that I get into a little further down. There's also a new pattern I am designing, when mixed with .NET 4 and some nifty T4 templates I'm tinkering with. That's another article I'll write though. Check the comments, or leave a comment for more information on, "Managing BDD Contexts and Mocks Automatically with .NET 4, MEF, and T4 Templates." Nice. I just named my next blog post. </p>
<h2>Constructor Dependency Injection - MEF Gotcha</h2>
<p>As mentioned above, constructor injection is a bit tricky with MEF.&nbsp; There are some rules to follow:</p>
<ul>
<li>MEF assumes all parameters are imports, making the import attribute unnecessary.&nbsp; I leave it up to the reader to figure out how to get around this. 
<li>Recomposition is not supported on constructor parameters.</li></ul>
<p>That last one is almost a deal breaker for me.&nbsp; Recomposition is a feature of MEF that allows parts to automatically have their imports updated as new matching exports appear in the system.&nbsp; Given, this isn't the case with most websites out there.&nbsp; It's an issue for websites and applications that want to support dynamic (e.g. downloadable) plugins.&nbsp; The plugins would overwrite, at runtime, certain contracts and therefore allow the parts to automatically be updated with the new plugin versions - all without an application restart!</p>
<p>So with that said (and you will never be developing plugins right?), you can use constructor injection with MEF as follows.</p>
<p><pre><code>
[Export(typeof(IPostService))]
public class PostService : IPostService
{
	private IPostRepository _postRepo;
	private IUserRepository _userRepo

	[ImportingConstructor]
	public PostService(IPostRepository postRepo, IUserRepository userRepo)
	{
		_postRepo = postRepo;
		_userRepo = userRepo;
	}

	public Post FetchById(Int32 postId)
	{
		return
			(from p in _postRepo.GetAll()
			 where p.PostId == postId
			 select p as Post).FirstOrDefault();
	}
}

</code></pre>
<p>Don't fret too much though about the all-or-nothing constructor.&nbsp; You have a Factory option later on in this post.</p>
<h2>Bootstrapping MEF for Application Startup</h2>
<p>Glenn nailed it right on the head when he called this procedure "bootstrapping."&nbsp; I've always struggled with the proper terminology for this composition process with other Inversion of Control containers.&nbsp; Bootstrapping.&nbsp; Yep, just like my hacked MP3 players have.</p>
<p>To get things up and running, you will need to to insert some bootstrapping code for your application.&nbsp; This code is required with any type of IoC container, and with MEF as well.</p>
<p>Below is a small code snippet from a typical ASP.NET MVC 2 global.asax file.&nbsp; Notice I added the two using blocks at the end of the Application_Start().&nbsp; This process would be the same for any type of application you have.</p>
<p><pre><code>
using System.ComponentModel.Composition;
using System.ComponentModel.Composition.Hosting;

protected void Application_Start()
{
	AreaRegistration.RegisterAllAreas();

	RegisterRoutes(RouteTable.Routes);

	using (var catalog = new DirectoryCatalog(@".\"))
	{
		using (var container = new CompositionContainer(catalog))
		{
			container.ComposeParts(this);
		}
	}
}

</code></pre>
<p></p>
<p>Now, this code is running from with the website assembly.&nbsp; If you, like me, create a seperate assembly to hold your Domain and Repository models, then you simply reference the assembly by replacing the 'this' keyword with Assembly.GetAssembly(typeof(MyProject.Domain)).&nbsp; And yes, you can reference multiple catalogs and assemblies and build up your list as well.</p>
<p>Note that I included the namespaces here.&nbsp; This is important as normally this bootstrapping code is in the Hosting namespace.&nbsp; What they don't tell you is there is an extension in the namespace one higher for CompositionContainer, that enables the ComposeParts() extension method in the System.ComponentModel.Composition namespace.</p>
<p>There are tons of options here with the composition containers.&nbsp; Please refer to the .NET 4 documentation on MEF, as well as Glenn's article for a few more tips.&nbsp; You can specify an assembly to reference for the catalog.&nbsp; You can have aggregated catalogs for grouping/namespacing purposes.&nbsp; And yet, you can still have that aged-old configuration file if you really really really want to manually register (export) each type.</p>
<h2>All Parts are Singletons, out of the box</h2>
<p>Yep.&nbsp; All of your part's instances are composed and referenced throughout all of your code as singletons (or "statics").&nbsp; This is a great solution for that stubborn developer you may have working in your group that just won't let go of static managers.&nbsp; Make it instance based, and slap an [Export] on it.&nbsp; Done, now use [Import] wherever you like.</p>
<p>This is important to note because Castle and StructuredMap both default to transient composition (Unity uses whatever you configured the container to use as default).&nbsp; So, make sure you are coding to be thread-safe if you are making the switch over to MEF.</p>
<p>But do not fret, it's easy to specify the lifestyle within the contract definitions.&nbsp; There are three possible configurations you can set with the [PartCreationPolicy()] attribute:</p>
<ul>
<li>CreationPolicy.Shared (singleton, default) 
<li>CreationPolicy.NonShared (transient) 
<li>CreationPolicy.Any</li></ul>
<p>The "Any" option is interesting as it leaves it up to the context configuration of the host and/or the configuration of the [Import] contract to specify.&nbsp; You can use RequiredCreationPolicy on the [Import] contract definition to specify the preference.</p>
<p><pre><code>
[PartCreationPolicy(CreationPolicy.Any)]
[Export(typeof(IUserAccountService))]
public class UserAccountService : IUserAccountService
{
	...
}

public class Post
{
	public Int32 PostId { get; set; }
	public String Title { get; set; }
	...

	[Import(RequiredCreationPolicy=CreationPolicy.NonShared]
	public IUserService UserService { get; set; }
}

</pre></code>
<p>There is a problem with this concept though.&nbsp; With a current project we are working on at the moment, we identified the need to have a security context around our services to ensure the current WebRequest has the correct security credentials.&nbsp; With this, we elected to use Castle's WebRequest lifestyle feature.&nbsp; Sadly, this is not possible (yet) with the PartCreationPolicy.&nbsp; So it is left up to the implementer to handle custom composition on their own with a Factory pattern (see below).</p>
<h2>Lazy Loading within Entities</h2>
<p>Those of you that are wanting Lazy Loading within your entities, but are struggling with a solution that is compatible with Inversion of Control, fear not!&nbsp; The answer is now possible with MEF.</p><pre><code>
public partial class Post
{
	[Range(0, Int32.MaxValue)]
	public Int32 PostId { get; set; }
	
	[Required, StringLength(64, MinimumLength = 5)]
	public String Title { get; set; }

	[Required, StringLength(1024, MinimumLength = 5)]
	public String Description { get; set; }

	[Required, StringLength(Int32.MaxValue, MinimumLength = 5)]
	public String Body { get; set; }

	[Required]
	public Guid AuthorId { get; set; }

	[Import]
	public IUserService UserService { get; set; }

	private User _user;
	public User Author
	{
		get
		{
			if (_user == null)
				_user = UserService.FetchById(this.AuthorId);
			return _user;
		}
	}
}

</code></pre>
<p>With our updated Post entity, notice we now have a dependency on IUserService marked with the [Import] attribute.&nbsp; Yep, MEF composes that for you, and you have the UserService to access your lazy objects as needed.</p>
<h2>Using MEF as a Static Wrapper</h2>
<p>Time and time again I find myself writing wrapper classes around static members of a 3rd party component, just so I can unit test my code without having to rely on that static class.&nbsp; Using MEF, if you haven't guesses already, is just as easy as you might think.</p>
<p></p><pre><code>
public class Loggerpart
{
	[Export]
	public ILogger Logger
	{
		get
		{
			return LogManager.GetLogger("LoggerInstance", "config");
		}
	}
}

</code></pre>
<p></p>
<p>This pattern allows you to make a wrapper around any 3rd party or legacy code.</p>
<h2>MEF Composition with a Factory Pattern</h2>
<p>Here's another one not in Glenn's article.&nbsp; How to use MEF with a factory pattern to initiate a complex type.</p>
<p><pre><code>
public class UserService : IUserService
{
	public UserService(ISecurityContext securityContext)
	{
		...
	}
}

public class UserServiceFactory
{
	[Export(typeof(IUserService))]
	[PartCreationPolicy(CreationPolicy.Shared)]
	public IUserService Instance
	{
		get
		{
			var context = HttpContext.Current;
			var securityContext = 
				SecurityContextProvider.Setup(context)
			return new UserService(securityContext);
		}
	}
}

</code></pre>
<p></p>
<p>Notice how the UserService is not exported?&nbsp; Instead, we designate a property member of UserServiceFactory called Instance as the Export composition location.&nbsp; </p>
<p>Remember, you are only Exporting for Composition at runtime.&nbsp; Nothing gets composed during your unit tests, as you are mocking them.&nbsp; So anywhere you use [Import] will be still be mockable for any of your unit tests with this pattern.</p>
<h2>Exporting with Multiple Contracts</h2>
<p>Here's a nice trick, you can specify multiple Export contracts for multiple types.&nbsp; Why would you do this?&nbsp; If you are a big DDD follower, you may be using IUserService and IAccountService combined to give you an UserAccountService part.</p>
<p><pre><code>
[Export(typeof(IUserService))]
[Export(typeof(IAccountService))]
public class UserAccountService : IUserService, IAccountService
{
	...
}</code><code>
</pre></code>
<p></p>
<h2>MEF Does Not Blow Up on Rejection</h2>
<p>This one is going to take some getting used to.&nbsp; As Glenn mentions, MEF does not throw exceptions if a part cannot be satisfied.&nbsp; It simply will not exist in the object graph for MEF to return - you'll get a null, and will most likely see a NullReferenceException in your containing code that is trying to use the part you wanted to import.</p>
<p>MEF will simply reject the request for the Import of a part for a number of reasons.&nbsp; For example, if there is no part defined as the correct Export contract type.&nbsp; Say you wanted to import IUserService, but only exported UserService with [Export] and no contract type of IUserService was defined.&nbsp; That was the typical one I found myself forgetting to do.&nbsp; As recommended above, always include the Contract Type when designated a part as Export with [Export(typeof(IUserService))].</p>
<p>I agree that MEF's Rejection policy is a power feature because it stabilizes the code and allows debugging.&nbsp; Glenn links to a good article on why to ensure application stability: <a title="http://blogs.msdn.com/gblock/archive/2009/08/02/stable-composition-in-mef-preview-6.aspx" href="http://blogs.msdn.com/gblock/archive/2009/08/02/stable-composition-in-mef-preview-6.aspx">http://blogs.msdn.com/gblock/archive/2009/08/02/stable-composition-in-mef-preview-6.aspx</a></p>
<p>But in short, if you get Rejection happening quite often, check your Export contract definition on your part.</p>
<h2>In Summary</h2>
<p>As you can see, it is dead simple to use MEF.&nbsp; The Export functionality is what was missing with Unity, and completely with all other IoC containers.&nbsp; And, it's what gives MEF such great, simplistic power.&nbsp; I highly recommend reading through Glenn's complete article, as he covers a few other concepts such as using the new <strong>Lazy&lt;T&gt;</strong> for importing lazy exports and metadata.</p>
<p>Some additional things Glenn covers is the very strong support for debugging and tracing, things you want to be aware of if you use MEF even moderately.&nbsp; He also hints at the up-n-coming support for MEF with IronRuby.&nbsp; He also covers some external links, which I will list here (for my own archiving purposes):</p>
<ul>
<li><a href="http://codebetter.com/blogs/glenn.block/archive/2009/05/14/customizing-container-behavior-part-2-of-n-defaults.aspx" target="_blank">Customizing Container Behavior Part 2 of N - Defaults</a> for Facilities 
<li><a href="http://mef.codeplex.com/releases/view/33536" target="_blank">MEF Analysis Tool (mefx) for .NET 4.0</a> for debugging those contracts in large projects 
<li><a href="http://blogs.msdn.com/dsplaisted/archive/2009/06/08/a-crash-course-on-the-mef-primitives.aspx" target="_blank">A Crash Course on the MEF Primitives</a> for the underlying "quantum universe of MEF, its über extensibility points" as Glenn says</li></ul>
<p>Once concept I am tinkering with is utilizing the [Import] attribute in the attributed programming model of MEF to define the complete contexts of my BDD tests for me with all dependencies already mocked up and ready, with T4 templates largely driving that effort.</p>
<p>MEF wacked me upside the head.&nbsp; It does everything right, and even allowed me to step back and realized, "Dang. I was bloating my code."&nbsp; Yes, they have done it right.&nbsp; So right that the next project I am starting this week will be on Visual Studio 2010 RC - not even released yet.&nbsp; </p>
