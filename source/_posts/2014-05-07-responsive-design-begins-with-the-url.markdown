---
layout: post
title: "Responsive Design Begins with the URL"
image: http://eduncan911.com/blog/images/responsive-design-url-schema.jpg
date: 2014-05-07 11:27:36 -0400
comments: true
categories: [software, design]
tags: [responsive]
---
[Responsive Design Begins with the URL](http://www.smashingmagazine.com/2014/05/02/responsive-design-begins-with-the-url/)

{% blockquote David Marland http://www.smashingmagazine.com/2014/05/02/responsive-design-begins-with-the-url Responsive Design Begins with the URL %}
{% img /blog/images/responsive-design-url-schema.jpg "Responsive Design URL Schema" %}

The core principle in creating a potentially enormous website that will last forever is to get the information architecture right in the first place. This involves knowing your data objects and how they fit together. It should also determine the URL structure, which for Programmes is the most important aspect. Take the URL for Top Gear’s home page:

http://www.bbc.co.uk/programmes/b006mj59

After the domain name comes the word “programmes,” which is a simple, unchanging English word. It is intended to describe the object, and is not a brand or product name. Plurals are used so that the URL can be hacked backwards to retrieve an index.

Next is the programme identifier. Note the lack of hierarchy and the lack of a title. Titles change over time, and many programmes do not have a unique title, which would cause a clash. Hierarchies also change — a one-off pilot could be commissioned for a full series. Understanding your objects allows you to recognize what is permanent. In this case, nothing is particularly guaranteed to be permanent, so a simple ID is used instead. Users aren’t expected to type these URLs, though. They will usually arrive through a search engine or by typing in a friendly redirect that has been read out on air, such as bbc.co.uk/topgear. But the key principle of a permanent URL is that inward links are trusted to be shareable and work forever. Cool URIs don’t change.

A clear information architecture defines the URL scheme. A piece of content is given a clear canonical home, where appropriate. Links and aggregations between them then clearly appear.

{% endblockquote %}

For a decade I have spent a considerable amount of time getting the URLs *right* for what the user was looking at.  I must have gone through 20 different iterations over the years trying out all sorts of designs, deep linking, "walk the url backwards" and so on.  

You can see on my static site blog here that I paid close attention as well, trying out yet another theme.  I am on my 4th iteration of a url schema for my blog and it has become a PITA when having to keep redirects working of old urls, especially on [this static site with no URL rewrite module](https://github.com/eduncan911/eduncan911.github.io/tree/master/blog).

I almost went the *post_id* route here on this iteration; but, Jekyll (and therefore Octopress) makes the title url-safe already so I kept it.  Besides that, I agree that urls should play a role in your web architecture.

As long as we are talking about it, ASP.NET MVC's default `/Controller/Action/Id` has always pissed me off since I first started using it back in 2007.  Coming from a pure-RESTful background, the pure REST urls are more similar to `/Controller/Id/Action` so you end up with urls like this:

```
/product/2832/
/product/2832/edit
/product/2832/clips
/product/2832/videos
```

And so on.  Which, actually, falls inline with what the BBC article above was saying.

{% hattip ForgetFoo http://forgetfoo.com %}