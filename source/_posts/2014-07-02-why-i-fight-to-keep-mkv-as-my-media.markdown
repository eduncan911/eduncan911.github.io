---
published: true
layout: post
title: "Why I Fight to keep MKV as my Media"
description: "In a world of H264 compatibility across many formats, I continue to fight to keep using MKV.  Here is why."
image: 
video: 
date: 2014-07-02 09:57:26 -0400
comments: true
categories: technology
tags: [mkv, videos, home server]
---

I have a fairly high-end home media setup in where I store nearly 500 Blu-ray quality 1080p and 720p movies and dozens of TV shows.  I've archived all the blu-ray and dvds I've purchased over the last 15 years into a digital format.

Today I want to share with you my reasons for staying with the format MKV, otherwise known as [Matroska](http://www.matroska.org/), over all of these years in lieu of MP4, MOV, AVI, WMV and so on.

## What's wrong with MP4, MOV, AVI, etc?

Let me start by stating the inherit flaw of these.  I am not going to get into lossless, video quality, etc.  There are 1000s of posts on that.  There's also the fight that WMV won't play on iPads, and the Xbox refusing certain copyrighted encryptions.  No.  None of that.

Instead I want to focus on 1 flaw they all have in common: they are only a single layer of intermixed streams of video and audio, unable to be separated, switched off, or doubled up.  

Think about a standard DVD or Blu-ray movie: You have multiple audio tracks including multiple commentaries that makes you want to watch the movie over and over again (I recall watching *Alien (1979)* multiple times with Sigourney Weaver's commentary, *Aliens (1986)* is even funnier with Bill Paxton's commentary).  Sometimes there are alternative endings to choose from before you start your movie.  Other times, you may need foreign subtitles for the parts in another language; or, those foreign subtitles are translated incorrectly, and you'd rather turn them off and interrupt them yourself.

And there in-lies the problem with a single layer of video and audio in the above mentioned formats: whatever is selected at the time of encoding (English, Japanese subtitles, H264 video stream), is merged into a single layer - unable to be manipulated, turned off, or changed.

I prefer freedom...

## It's all about the Matroska Layers

At the very heart of the Matroska container (aka, file format) is its "layer" approach which gives it the power to encapsulate as many video, audio and subtitle tracks to your heart's content - all in their RAW format, unmolested by "encoders" that have to remix them into a single stream in the other formats. 

Want all 5 audio commentaries for *Alien (1979)*, including the two separate Ridley Scott and Sigourney Weaver tracks?  No problem, the MKV container allows you to store as many audio tracks as you like.

Want the alternative cut and ending to *The Abyss (1989)* in where the aliens are actually here for a different reason (I won't spoil it here)?  No problem with MKVs.

An MKV file can do this because it essentially is just a *wrapper* around your raw binary streams (or rips) of H264 video, AAC or FLAC audio, and the subtitle text file(s).  DVDs and Blu-rays store these streams separately - it is how you can switch audio tracks or alternative endings.  It is only natural that you take these raw streams from these disks, and wrap them in a container of sorts (MKV) to have them all at your fingertips to switch video, audio and languages with a click of the button.

Welcome to Matroska.

## Example: Multiple Camera Angles (multiple video streams)

One of my favorite DVDs is my [*Peter Gabriel's - Growing Up Live (2003)*](http://www.amazon.com/Peter-Gabriel-Growing-Up-Live/dp/B0000DZ3H4?tag=eduncan911-20), a live recording in Milan of his *Growing Up Tour* in 2003.  

What's interesting about this DVD (I really wish they would release a blu-ray) is that it has interactive camera angles during multiple titles.  You are able to "switch videos streams" to a different camera angles.  Pretty cool.

With Matroska, I retained these video angles within the single MKV file I created of the DVD when I ripped it.  Given though, I didn't copy the "cue markers" overlay from the original DVD viewing.  You kind of have to know when you can change angles, and you can select a different video stream while playing.

## Subtitles

This one is especially important to my family.  With a spouse of a different nationality, English sub-titles are a near must.

The other formats have to "burn-in" sub-titles on-top of the video, removing the option to turn it off.  Yes, many decoders allow you to add an .srt file alongside the MP4 and it will overlay the subtitles (if you get the right one, and if it is in sync with its time codes).

Again, thanks to Matroska's layers, this is only a matter of adding (or removing, or reording) the subtitle tracks that are part of the MKV layers.  

Don't like the Dutch sub-titles as default?  Reorder them, or remove them.

## MKV is open source and well documented

That's right.  No copyright or patents to infringe on.  The perhaps most importantly, the container format is very well documented allowing for anyone to create a set of tools themselves.

It is a real shame that the big players ignore this format, and it is up to us end-users to hack our devices to play them.

## Besides, I can always convert to any format later

Having the video and audio streams alongside the closed caption allows me to convert the MKV into any format I like in the future. 

Once such tool is [Handbrake](http://handbrake.fr/), which is a great free and open source app for converting MKVs into any format.  An example is is the Android Tablet profile they have which takes a 15 GB move and compresses it down to a 1.8 GB file (for the kiddo's tablet).  

## A callout to Microsoft, Apple and Google

Why hasn't MKV gone mainstream?  Why hasn't one of these companies openly embraced this superior format?

The answer is simple: copyright and encryption.  The Matroska does not support either with its free and open container format; and therefore, no media partner (MPAA) will ever support a company that openly embraces a format that splays their precious video and audio for all to see and use.

## Handle it myself

So that leaves me, a lone person, burdened to create my own Matroska MKV containers myself.  More cumbersome is the annoyance of getting the MKVs to play on multiple devices in different media centers and tables. 

It seems every few years I have to *re-evaluate* my media devices and setup to ensure everything is compatible.  Seems to come around with each new Windows release, since the hunt for decoders and setup starts all over.

Next time, it's Linux once and for all.
