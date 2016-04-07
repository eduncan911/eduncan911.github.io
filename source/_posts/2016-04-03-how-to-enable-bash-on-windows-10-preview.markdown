---
published: true
layout: post
title: "How to Enable Bash on Windows 10 Preview"
description: "This post describes how to install Bash that is part of Windows 10 Preview."
image:
video:
date: 2016-04-03 13:13:34 -0400
comments: true
categories: [software]
tags: [windows, bash]
---

Today I am going to outline how you can install and use the [Linux User Mode
(UML)](http://www.hanselman.com/blog/DevelopersCanRunBashShellAndUsermodeUbuntuLinuxBinariesOnWindows10.aspx)
in Windows 10 based on the new [Windows Subsystem for Linux
(WSL)](https://blogs.windows.com/buildingapps/2016/03/30/run-bash-on-ubuntu-on-windows/)
that was announced at Windows Build 2016.

## Why Bother?  OS X works fine.

I am writing this jamming away on my Macbook Pro 15" connected to three external
1080p 120 Hz 3D monitors, my precision mouse and CODE mechanical keyboard.  Once
running ArchLinux for over a year, I've recently went back to OS X purely for
the user experience.  I miss my Arch installs; but, I don't miss the annoyances
around docking/undocking my tri-monitor setup and switching from HiDPI and my
1080p monitors.  It was a painful experience when disconnecting and reconnecting.

I also ran Windows 10 natively on it for a few months as I got annoyed at VMware
crashing Arch all the time.  I was doing my C# Mono work in my Linux VM anyways
and not natively on Windows.  Battery life sucked with the VM though.

OS X just nails HiDPI perfectly when docking and undocking, switching primary
monitors, etc.  

No.  The real reason I am interested in Linux on Windows is:

* Going back to Desktop Development

I have a 4.8 Ghz hex-core, 5300+ GPU core gaming beast of a machine (also
connected to those same 3 monitors) just sitting idle, unused for months.
ArchLinux natively on that Asus motherboard was ok; but, I miss my Windows games
and no longer could control my TEC waterchiller (it was Windows software I wrote
for it).

All Windows was missing was my GNU Linux tooling.  I spent the better part of a
week replacing all OS X versions of the tools (sed, ack, grep, etc) with the
real GNU versions.  OS X has Homebrew; Windows now has WSL.

To have the ability to have Linux natively available on Windows is just perfect
for my desktop machine.

I only develop using NeoVim + Tmux anyhow; so, I don't need GUI or Windows
interactions.  I just need bash and proper screen redraw with 256 colors.  
That's it.

## WSL and Linux User Mode RTM Release Date

It was suspiciously awkward that nothing made note of its availability; not from
the keynote nor from Hanselman's and MSDN's introduction blog posts.  All that
was said was that the Windows 10 Insider Preview refresh released in January
2016 contained this new WSL platform, and that the bash tooling would be
released for it soon.  There was even a Windows Insider/dev that noticed the new
WSL binaries/framework available back in January, before it was announced.

So a few of us kept poking and prodding at our MS resources, trying to get our
hands on it.  

It turns out that you have to take a few initiatives to get your system ready
for UML.  This experience has taught me the *new* way in which MS will be
releasing features into Windows going forward.  

## Enough Already, How to Install It?

First, you can't install it on your existing Windows 10.  Not for some time, not
until it is ready for public consumption.  Currently Microsoft has said it will
be part of the Anniversary build due out this summer.

This post is about getting access to the Insider Preview edition, before it is
released.

Here's the overview of what you need to do:

* Download Windows Insider Preview 14295 (14316 ISO is not out as of the time
  this writing.  But there is a Windows Update to upgrade to 14316).
* Install it (recommended in a VM, as Previews usually expire).
* Go straight to Start -> Settings -> Updates and Security.
* Under "Update settings", click Advanced options.
* Under "Get Insider Preview Builds", click "Fix me" or whatever may show here.

You should end up with a slider, asking you to *Choose your insider level*.
Like this:

![Windows Insider Preview slider level](/blog/images/windows-insider-preview-builds.png)

Move it all the way to the right, for *Fast*.

The next series of mouse-contortions is to turn on *Developer Mode*.

* Start -> Settings -> Update & security
* On the left, click **For developers**
* Select the option for **Developer mode**
* Restart.

You should be able to run Windows Update and see that **Windows 10 Insider Preview 14316** is available.  

![Windows 10 Insider Preview 14316 Update](/blog/images/windows-insider-preview-build-14316.png)

Download and install.  You may want to go make some tea.

The final set of mouse-ninja-moves is to add the Bash features:

* click **Start** and type *"Windows Features"* and choose *"Turn Windows
features on or off"*
* scroll down and enable ***"Windows Subsystem for Linux (Beta)"***
* Click OK and Restart.

![Enabling Windows Subsystem for Linux](/blog/images/windows-subsystem-for-linux-enabling.png)

You now have Linux bash (based on Ubuntu).

## Windows 10 Bash: Let's Poke around

I wanted to end the article with a number of tools to install and get started
with.  But sadly, I kept being greeted with the errors:

    Err http://security.ubuntu.com trusty-security Release.gpg
    Could not resolve 'security.ubuntu.com'

    W: Failed to fetch http://archive.ubuntu.com/ubuntu/dists/trusty/Release.gpg  
    Could not resolve 'archive.ubuntu.com'

So, no package installer works just quite yet.  Most likely a network issue or something. I'll debug it in the morning.

Next up is my **Inconsolata** development font, Vim/NeoVim plugins I use and
more.

I'll play around for a little while and if I can become productive with my
CLI-fu, I'll create another blog post about some additional features.
