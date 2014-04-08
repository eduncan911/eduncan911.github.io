---
layout: post
title: "My Hackers' Blog"
date: 2014-04-02 23:25:01 -0400
comments: true
categories: software
tags: ["ruby", "octopress"]
---
Three years, 11 months and 22 days... That's how long it has been since my last blog post.  

When I originally launched this blog, I was using the software I originally wrote for CommunityServer back in 
2004 and 2005.  Ever since then I have dreamed of grand visions of new blogging software.  Tinkering with new 
design patterns, following [Ken Robertson's advice of trying out new frameworks with the concept of an Hello Blog](http://invalidlogic.com/2008/12/22/blogging-apps-are-the-new-hello-world/), 
where you create a blog using whatever language you want.  While that was all said and good, I never got around to 
finishing any of them good enough to launch them live.

### Enter [Octopress](http://octopress.org/): A blogging framework for hackers

For those that haven't heard about it, go [read about it](http://octopress.org/).  In short, it uses Ruby to create a static blog for
you to upload anywhere.  Yes, just raw .html files and css/js/image files.  And, that's about it.

<!-- more -->

```
git clone git://github.com/imathis/octopress.git octopress
cd octopress
```

You write your posts in MarkDown, and be done with it. There are all sorts of little ~~hacks~~ shortcuts when writing posts that I
am going to have a lot of fun with.

```
rake preview
# now open browser to eduncan911.local:4000/
```

When you go completely static, interesting opportunities start to emerge...  You no longer need a "web host" - all you need is a place
to dump your files online somewhere.

```
rake deploy
```

### Enter [GitHub Pages](https://pages.github.com/)

GitHub allows you to [host static pages](https://pages.github.com/) in a public repo.  I've been hosting my code.eduncan911.com
there for years.

{% pullquote %}
A few Google searches revealed I wasn't the only one who thought this way. {" If I create a static blog, I can just host it at GitHub. "} 
At first I stumbled upon [Jekyll](https://github.com/jekyll/jekyll) which gives you full control over markup, css, etc.  But here I was in
the same position - writing code.  I found that Octopress is built upon Jekyll; but, it already has a default theme, css, plugins, etc.
{% endpullquote %}

The best part is they have step-by-step instructions on how to publish it straight to GitHub Pages.  It really can't get any easier than
this, for any ~~hacker~~ skill level.

```
git add --all
git commit -m "new post: My Hacker Blog"
git push origin source
```

That's right, this blog is hosted at [eduncan911.github.io](http://eduncan911.github.io/).  They have instructions on 
setting up a CNAME (in my case though, an ALIAS for the root eduncan911.com domain) and that's it, you're live.

As a matter of fact, [go browse my site](https://github.com/eduncan911/eduncan911.github.io) just like the old "directory browsing" method.
If you want to see the source code in how I generate the site, switch branches to [`source`](https://github.com/eduncan911/eduncan911.github.io/tree/source) to
check that out.  Tip: most of that is Octopress.  Drill into the /source/ directory to see the raw nit-n-gritty fun stuff.

I will admit though, it took some tinkering to get Octopress setup and working correctly on Windows with PoshGit and PowerShell.

### The way forward

There are a number of plug-ins, and there is some work I want to do to the asides (right column).  But I am liberated
to no longer wait, and just do.  

Most of all, being just raw MarkDown, I can write from any device now: tablets, smart phones, anywhere.  And, being on GitHub,
I can just browse to my source branch and create a new file to start blogging.  There are instructions for a C.I. server to
take callbacks from GitHub, and to publish it on the site after commits.  Yep, very fun stuff...

~E
