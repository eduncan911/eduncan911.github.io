---
published: true
layout: post
title: "AIY: Google Assistant Upgrades - May 2017"
description: "Google and the community has updated the Assistant SDK and AIY
Projects"
image: /stem/i/google-aiy-voice-kit.jpg
video: 
date: 2017-05-26 18:25:14 -0400
comments: true
categories: [stem, embedded]
tags: [STEM, Google, AIY]
---

{% include want-more-stem.html %}

Google and the community have jumped in with both feet with the AIY Projects
release and the Voice HAT kit from MagPi, submitting dozens of PRs and updates 
to both the Google Assistant SDK and Voice Recognizer projects.

* [Ability to play a confirmation wav sound for Triggers (see `config/voice-recognizer.ini.default`)](https://github.com/google/aiyprojects-raspbian/pull/60)
* [Added Philips Hue action type](https://github.com/google/aiyprojects-raspbian/pull/33)
* [Added "pi power off" and "pi reboot" commands](https://github.com/google/aiyprojects-raspbian/pull/30)
* Fixed distortion of voice command reply (e.g. "Volume Up"'s reply)
* Numerous fixes, especially for those hacking with custom setups.

In addition, the Google Assistant SDK has been updated to support:

* Hot Words detection to activate with "Ok Google" or "Hey Google", along with
  the AIY Projects update to support it.
* Alarms and Timers: "Hey Google, set a time for 10 minutes."

Before we get started, a quick refresher for those new to the projects.

## What is Google AIY?

Google has jumped into the A.I. World of Amazon's Alexa and IBM's Watson with
their own version called the [Google Assistant](https://assistant.google.com/).  The difference being Google
brings strong search, wide integration and an open SDK.

### Google AIYProjects for Raspberry Pi: Voice Kit

{% img /stem/i/google-aiy-voice-kit.jpg %}

{% img /stem/i/google-aiy-voice-kit-assembly.png %}

{% youtube 7WtSdWSv7uo %}

Google and the magazine MagPi teamed up to produce a simple AIY project called
the [Voice
Kit](https://www.raspberrypi.org/magpi/issues/57/), which is cardboard cube that houses a Raspberry Pi and a number
of components.  What's even more cool is everything that was included with the
kit, which came free with the MagPi magazine!

* Voice HAT 
* Dual-Microphone Board 
* Speaker
* Arcade Button complete with matching Lamp Holder, LED and inline resistor -
  and the resistor was even soldered inline already.
* Quick disconnects soldered onto everything

The only things required was a Raspberry Pi (I used a Pi 3), a power adapter and
a microSD card - standard things you should have laying around if your are a Pi
guru.

### Voice HAT

{% img /stem/i/google-aiy-voice-kit-voice-hat-1.png %}

{% img /stem/i/google-aiy-voice-kit-voice-hat-2.jpg %}

HAT stands for **Hardware Attached on Top**, which are devices you simply
attach directly to your device.  

The Voice HAT that is included with the Voice Kit, part of the AIY
Projects noted above, is impressive that it was free.  It has several GPIOs 
available on it, along with several soldered on connectors.  Hardcore Raspberry
Pi gurus have balked, "come on, a button and LED?"  But really, Google is
targeting a younger audience with these components to make it an easier barrier
of entry into the world of embedded devices.

Essentially, this Voice HAT makes it really easy for anyone to get involved.
If only the SDKs and code were as simple (see upgrading below).

### Google Assistant SDK

{% youtube Wsic12MXlsc %}

Google released a new SDK recently called the [Google Assistant SDK](https://developers.google.com/assistant/sdk/).
The tag line reads:

> Bring hotword detection, voice control, natural language understanding, Google's smarts, and more to your devices. 

Currently the only SDK available seems to be Python, and only for Raspberry Pi.
But Google has said they are committed to supporting several mainstream
hardwares and other languages in the future.

## Upgrading your AIY Project

Now back to the updates for May 2017.

{% ribbonp warning Warning %}
If you want to be on the bleeding edge to enable these updates, be
aware that pulling down the latest source code from the master branch is risky.
It can break the entire setup, forcing you to reinstall everything from scratch.
I have noticed the devs adding c.i. travis, coverage and tests, which really
helps stabilize it.  But be aware, something could still slip through.
{% endribbonp %}

These are the instructions as of late May 2017.

So far, here's what we'll be doing:

* Update Google Assistant SDK in `~/assistant-sdk-python`
* Update AIY Project for Raspberry Pi in `~/voice-recognizer-raspi`
* Fixing Python dependencies
* Setting the Voice Kit to auto-start.

Here's all the scripts in one go. Log into your Raspberry Pi,
or use the Start Dev Terminal from the desktop:

    # UPDATE GOOGLE ASSISTANT SDK
    cd ~/assistant-sdk-python
    git checkout master
    git pull origin master
    
    # UPDATE VOICE RECOGNIZER (AKA: AIY PROJECTS)
    cd ~/voice-recognizer-raspi
    git checkout master
    git pull origin master
    
    # UPDATE DEPENDENCIES
    cd ~/voice-recognizer-raspi 
    source env/bin/activate
    scripts/install-deps.sh

As long as you did not modify any of the files, those should have ran smoothly.
If you, like me, were tinkering with the `src/main.py` and got a conflict,
erase the changes by using `git checkout <file>` (make a backup if you want
first with `cp <file> <file>~`).

At this point, you should be able to test everything is working:

    sudo systemctl stop voice-recognizer.service    # if you had it running
    cd ~/voice-recognizer-raspi
    source env/bin/active 
    src/main.py 

See if you got the latest SDK by testing the "Timer" functionality:

    > "set a timer for 10 seconds"
    < "You got it, setting a timer for 10 seconds. Starting now."

*"OK Google"* needs a bit more configuration, see below.

*"Pi reboot"* and *"Pi Power Off"* needs some tweaking.  I've [opened an
issue](https://github.com/google/aiyprojects-raspbian/issues/69)
suggesting we change the leading word "Pi" to something else, because it isn't
detected very well.

## Setting to Auto-Start on Reboot/Power On

If you want it running all the time to let the family play Trivia
every morning, set your services to start on boot:

    # UPDATE AUTO-START SERVICES ON BOOT (optional)
    cd ~/voice-recognizer-raspi 
    sudo scripts/install-services.sh 
    sudo systemctl start status-led.service 
    sudo systemctl start status-monitor.service
    sudo systemctl start voice-recognizer.service 
    sudo reboot

Wait about 30 seconds and see if the button starts flashing again.

## Enabling *"OK Google"* and *"Hey Google"* Hot Words 

There is a [pending pull-request to do exactly
this](https://github.com/google/aiyprojects-raspbian/pull/64).  Considering the current
velocity of the repo, I'd say wait a few more days and then just update per
instructions above.  

Once [PR #64](https://github.com/google/aiyprojects-raspbian/pull/64) is merged
into master, you can switch the trigger to use the hot words.  So keep
monitoring that PR and when you see the purple tag say "MERGED", follow the 
instructions above again to `git pull` the latest and newest dependencies.  

This PR is much preferred over the manual method talked about in [Raspberry Pi forums](https://www.raspberrypi.org/forums/viewtopic.php?f=114&t=183932).
For one, it won't break your installation by modifying files that will create a
conflict if you update the repository to the latest.

Once updated, test the trigger:

    sudo systemctl stop voice-recognizer.service    # if you had it running
    cd ~/voice-recognizer-raspi 
    source env/bin/activate
    src/main.py --trigger="ok-google"

If you want this to stick, to be persisted for the auto-start services, edit the
`voice-recognizer.ini` file as per the original setup docs:

    nano ~/.config/voice-recognizer.ini

And make the trigger say "ok-google":

    # Select the trigger: gpio (default), clap, ok-google.
    trigger = ok-google

You can only have one trigger with the current project at this time.  Feel free
to submit a pull request to enable multiple triggers.

Press `CTRL-X` and `Y` to save.  Then restart the service: 

    sudo systemctl restart voice-recognizer.service 

Now, speaking *"OK Google"* or *"Hey Google"* should work.

Try having a ***conversation*** with *"Hey Google"* to confirm the SDK continues your
follow up questions:

    > "Hey Google, how far away is Japan?"
    < "Japan is 6,000 miles away as way of the crow flies."
    > "Hey Google, and from California?"
    < "Japan is 5,000 miles away from California"

Notice how the SDK remembered you previously searched for the distance of Japan?
This was a feature that Google announced back in 2015, contextually aware
searches of continued searches.  And it has been brought over to the Assistant
SDK.

Try the Trivia Game for a long extensive test of the **conversation**
feature:

    > "Hey Google, let's play trivia!"

I didn't know wolverines could climb trees.  

## Summary

You gotta love Google's Cardboard VR gimmick when they came out.  People were
paying $1000 for VR headsets, and here's Google with a $15 kit to do the same.
Sure, the experience is better on the $1000 kits (I myself have spent a lot of
time with the HTC Vive).  But there's something about going back to that
cardboard clip on that makes you feel like Google enjoys shaking up industries.  

And here we are, with Google jumping into the A.I. devices with a bottom-dollar
hackable entry that anyone with a few bucks can run out and pick up.  

Though, updating it, especially for non-Python gurus, is a PITA and subscribes
most people who can only enjoy this to a very small niche of developers, who
happen to know Python and git.

Feel free to reach out in the comments for help.  

## Troubleshooting: Missing Dependencies

Hopefully by the time you read this and try to implement the changes, they will
have fixed all the missing dependencies.  If not, continue below for some hints
on how to fix them.

### Activate virtualenv "env"

Remember to activate your `env/bin/activate` before doing any of this, to keep
it in the same virtualenv.

    cd ~/voice-recognizer-raspi
    source env/bin/activate 

This keeps everything installed in the original location that the
`install-deps.sh` file put them.  Don't worry, it's a Python thing.

### Google Assistant SDK manual install

I had to install the latest SDK to get the hot word detection fixed working in
the initial testing of the [branch by drigz](https://github.com/drigz/aiyprojects-raspbian/tree/assistant-library):

    pip install --upgrade https://github.com/googlesamples/assistant-sdk-python/releases/download/0.3.0/google_assistant_library-0.0.2-py2.py3-none-linux_armv7l.whl

That was 2 days ago.  As of now, it is part of pypi (part of the normal
dependency chain).  So it should be fixed and you shouldn't have to do this.

### ImportErrors

You may eventually see some import errors like this:

    $ cd ~/voice-recognizer-raspi 
    $ source env/bin/activate
    $ src/main.py
    Traceback (most recent call last):
      File "src/main.py", line 32, in <module>
        import tts
      File "/home/pi/voice-recognizer-raspi/src/tts.py", line 24, in <module>
        import numpy as np
    ImportError: No module named 'numpy'

Running the dependency chain that Google supplies should be the first step.

    cd ~/voice-recognizer-raspi 
    scripts/install-deps.sh

If you continue to see import errors, than try to install them.  They seem to be
good at picking very reliable dependencies.

    pip install <module-name-from-the-ImportError>

For example:

    $ pip install numpy
    Collecting numpy
      Downloading numpy-1.12.1.zip (4.8MB)
        100% |████████████████████████████████| 4.8MB 60kB/s
    Building wheels for collected packages: numpy
      Running setup.py bdist_wheel for numpy ... -
    done

NOTE: Numpy takes like 20 minutes to compile on a Pi3.  You'll have to sit and
wait.

Hopefully that continues to fix up the missing deps.
