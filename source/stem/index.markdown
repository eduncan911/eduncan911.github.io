---
published: true
layout: page
title: "Our Adventures into STEM"
description: "Introducing technology to our kids with our own hands-on approach."
image:
video:
date: 2016-12-21 00:40
comments: true
sharing: true
footer: true
categories: [stem]
tags: [STEM, Robots, Rockets, Go, GoPiGo]
index: true
---


{% ribbonp warning Under Construction %}
I recently created this new section and have only started scaffolding a 
few dozen posts for this area.<br /><br />You can subscribe to updates by posting a quick comment below.
{% endribbonp %}

For a few years, I have been slowly introducing our daughter into technologies.
As time went on, she has shown more and more interest in science, technologies,
engineering and even math.

Now that our son was recently born, I feel it's time to start documenting our
missions as we move forward: both successes and failures.

Should be lots of fun.

## Coding

I taught myself to (incorrectly) type at 60 WPM by age 13.  This was mostly chatting with sysops of BBSes and teaching myself to code. 

We start off with some simple programming of her robot, a GoPiGo.  To start her off right, VIM on Linux of course.

## Computers

*"Dad, what's that do?"* <- daughter pointing at different components when looking at one of my liquid cooled gaming beasts.

Here we dive into different components, and build a few "rigs."

## Construction

At a very early age, we introduced them to the building blocks of life.
Literally.

## Educational Apps for Tablets and PCs

No "screen time" until age 2, period!  At age 2, we slowly introduced educational apps and tools with her own dedicated tablet.

I have curated a list of good, and no so good applications to use across Android and Windows tablets.

## Electronics Repair

*"Can I help?"* is the most common question when repairing her electronics.  Now, she continues to surprise me at how much she remembers.  *"Dad, you forgot this screw. I think it goes there"*, she has said more than once.

Here I document most of my electronic repairs for the last several years as she has been involved in every single one of them since!

## Embedded Hardware

*"See all of that in daddy's big computer?  It all fits into this, and we call it a Raspberry Pi."*  Her response, *"Can I have one?"*

We now have three Raspberry Pi projects going that I dive into here, and more.

## Origami and Paper Airplanes

With a spouse translating Japanese Origami books, we've had a blast folding some fairly complex objects.  

Complex paper airplanes are not except from this!

## Robotics

*"What do you want for Christmas?"*  
*"Just one thing: a Robot that I can build."*  Loved the fact she asked to get one to *build*, not just a robot.  

Come with us as we build and program these robots.

## Recent Posts

{% assign index = true %}
{% for post in site.categories["stem"] %}
{% capture this_year %}{{ post.date | date: "%Y" }}{% endcapture %}
{% unless year == this_year %}
  {% assign year = this_year %}
  <h2>{{ year }}</h2>
{% endunless %}
<article>
  {% include foo.casper/article_preview.html %}
</article>
{% endfor %}
