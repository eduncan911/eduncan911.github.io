---
layout: post
title: "The Static Blog Boom"
date: 2014-05-01 13:58:40 -0400
comments: true
categories: software
tags: ["blog", "Open Source"]
---
There is a new movement taking place in web development over the last few years.
It is called `static sites`. Just as it sounds, it is simply a collection of `.html`, `.css`, `.js` and images that serves up a complete site. What you may not know is that there are literately 100s of frameworks out there that generate these static sites for you from a single common theme/template.

## Static Site Generators
I stumbled upon a collection of these frameworks here:

http://staticsitegenerators.net/

This is pure opinion, but it would seem that most of these frameworks came 
out of the Linux/OSX world from developers that needed to generate a static site for this or that.  Those that did it often, needed a way to regenerate a whole static site by just changing, say, the header area.

I know that after my recent conversion to [Octopress](http://octopress.org) (aka Jekyll) I have been brainstorming about my own static site generator.  As you can see in the link above, I am not the only one that had a similar thought.

## Advantages to Static Sites
If you sit back and think about it, there are a number of advantages for running a static site.

### Hosting costs
Can you really get any cheaper than free?  GitHub pages can host your static site for free.  If you really want to pay for something, then upload your static site files to Amazon S3 file storage and serve your site from there - for about $0.25/mo for 1000 uniques.

### Security
You never have to worry about someone hacking your site.  No SQL injection, XSS, CSRF attacks.

Even if someone was to gain access to your hosting account, there is no database or code to hide backdoors in.

### Defacing
If someone gains access to where you are storing the files and defaces the site, just redeploy - which overwrites everything.

### Simplicity (aka Serenity)
It is just a bunch of html, images, css and js files.  You really can't get any simpler than that.

## How a static site becomes dynamic
The real power behind these static sites is the interactions that the end user have on your site using 3rd party remote widgets.  It makes your site seem fairly dynamic by giving recent information. Just to give you an idea, here are a few widgets built into most of these frameworks:

* Flickr photo albums, single photos
* Disqus commenting system
* Google Forms/Surveys (aka Contact Us, product support, etc)
* Stackexchange Profile
* GitHub Profile
* GitHub Repo browser
* Twitter feed, single quotes
* Sitemap generators

...and a lot more.  By using these widgets, and carefully skinned to look like your site, it creates a dynamic site of sorts that continually updates even it really is a static site.

I use Google Forms here on my site as an example for my [Contact page](/contact).  It looks and feels like I actually did something on the backend to send me an email - I didn't.

## Customizing the generated output
Almost all of these frameworks support plugins and extensions allowing for customizing the generated site to your preferences.  Basically these plugins work like this.

* Parse article/post content, usually on some plain-text form like Markdown
* Process categories and tags
* Redirects by creating `/old-url/index.html` kind of pages
* Code highlighting
* Pagination

And so on.  Perhaps an indicator of the quality of the framework is the article/post/page parser with its extensions built into it, and how extensible it is.  Take Octopress for example, it has butt load:

* blockquote
* code
* date
* GitHub gist
* img
* pullquote
* video

Creating your own tag is fairly straight forward using a well documented Liquid Template parser for ruby.  

## Speeding up writing is key (for me at least)

I am now free to write my thoughts in any place I can write notepad.  I insert things like {% raw %}`{% blockquote %}`{% endraw %} and write a small blurb and I'm done.  I've been wanting to switch to Markdown since I started using it with Unfuddle many many years ago, and now I can.

If this post made you think about making more sites static, drop me a line in the comments below.

~E