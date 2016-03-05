---
published: true
layout: post
title: "Google Authenticator's Databases: Copy, Move and Fix"
description: "You can backup and/or copy your Google Authenticator from device to device, providing you follow a few rules."
image: http://eduncan911.com/blog/images/FeatureImage-GoogleAuthenticator.jpg
video: 
date: 2015-08-31 18:03:55 -0400
comments: true
categories: [technology,hardware]
tags: ["Google Authenticator", "Google"]
---

{% img /blog/images/FeatureImage-GoogleAuthenticator.jpg "Google Authenticator" %}

Google Authenticator is a two-factor application that runs on your mobile or tablet device.  Typically you only run it on one device because the secrets you store in its databases cannot be shared between devices.

In this post, I explain some technical details about this database and how you can exploit the details for your gain (from an Android's perspective).

## Factor Resets

So when an Android update comes out, I can not update.  I am forced to backup my configurations first, upgrade the device and then restore my configurations after the apps are reloaded.  The reason I have to do this is because I run a custom bootloader.  I also encrypt my device which further mandates a factor reset upon unlocking and locking to regain root access.  What a PITA.

But these annoyances have afforded me the luxury of learning more details about the apps and system processes, along with their configurations.

I use custom bootloaders to gain access to the device in the event of a MMC failure (has happened once, I was able to get important data off of it before it totally was lost).

Encryption is used because, well, I'm just [paranoid like that](http://motherboard.vice.com/read/fbi-director-if-apple-and-google-wont-decrypt-phones-well-force-them-to).

## Google's Warning: Stay away from GA's Databases!

Google has stated (insert ref here) that you should not be copying your Google Authenticator's databases from device to device.  This is true as it could lead to you leaking your secrets by, say, copying the file to your cloud storage to sync to another device.  

Not only have you given your cloud provider access to your secrets (that is now backed up and replicated on their systems); but, if hackers gain access to your cloud platform (which several have Undelete options!), that's game over man.

Me?  I always copy directly from my device to a USB stick.  Do my thing on the device and when ready, push it back from the USB stick to my device.  When done, wipe the USB stick (or write an ISO to it, which I do very very often).

## Why Even Bother?

So why do I go to such extremes?  Google's very own security supplies a way for you to move your secret (a new secret) to a new device, a process I consider the absolute model of perfection of moving your secrets.

One answer: 17.

I have 17 Google Authenticator "secrets" on my device for 17 services across my personal services and several clients' access.

Have you ever tried to regain access to an account once you lost your two-factor authentication secret?  I have.  I have a 2:5 win/loss ratio when I had to play that game.  No more.

So, it's time to hack this thing to take matters into my own hands.

This, ladies and gentlemen, is why I own Android...

## Google Authenticator's Database

If you got Root, then you have more options.

On Android, the Google Authenticator `databases` file is located at:

```
/data/data/com.google.android.apps.authenticator2/databases/
```

Within this directory is a 'databases' file:

```
root@hammerhead:/data/data/com.google.android.apps.authenticator2/databases # ls -l
-rwxrw-rw- u0_a92     u0_a92        16384 2015-06-22 19:17 databases
```

And no, that's not a misprint.  There is a directory called `databases` with a file in it called `databases`.

## Permissions

The first dumbfounded thing I found during my first attempt at copying my second version of GA's databases is the permissions.  Take a look closely at the `ls` command above.  Notice anything?

```
-rwx------
World: Read/Write/Execute

----rw----
Group: Read/Write

-------rw-
User: Read/Write
```

WTF?  Everyone has access to this file?

During my first restore, I had Google Authenticator constantly crashing on launch.  Come to find out, it did not like my `700` permissions access I first gave it.  Only after frustration of the app crashing over and over did I just give it full 777 permissions...  And the app opened without a crash?  It needs world read/write?

I then found out the parent `databases` directly itself needed the same permissions.

Now, I know that Android has some special user-space for each app to isolate each app's access to the rest of the file system.  Perhaps it's enough to *trust* Android in that its app isolation is good enough.  

I don't trust anyone with this data; but, unfortunately if you want GA running you have to set the correct permissions at this time:

```
# NOTE: You will need to be "su" root user to run these

cd /data/data/com.google.android.apps.authenticator2/
chmod 766 databases
cd databases/
chmod 766 databases
```

The parent `databases/` folder, and the `databases` file itself requires world read and write access - or the Google Authenticator's app won't even open (crashes).

## Ownership

In addition, and what stemmed me to write this post, is I had another issue.  I was not able to add any new entries to my Google Authenticator.  I had the permissions right, so I thought.

Upon inspection, I could see that the directories surrounding the databases/ directory was owned by a different user.  In my case, that userid was `u0_a92`.  

I am not sure if this was the user space dedicated to this app or not.  But in any case, once I set the owner and group to this user, I was able to add new entries:

```
# NOTE: you will need to be "su" root user to run these
# NOTE 2: perform an "ls -l" like I did above and change u0_a92 to match.

cd /data/data/com.google.android.apps.authenticator2/
chown u0_a92:u0_a92 databases
cd databases
chown u0_a92:u0_a92 databases
```

And now I was able to add new entries.

## Inspecting the Database

The `databases` file itself is a `sqlite` database.  This makes it easy to write an application to look at the database and query directly against it.

```
$ sqlite3 ./databases
SQLite version 3.8.11.1 2015-07-29 20:00:57
Enter ".help" for usage hints.
sqlite> .fullschema
CREATE TABLE android_metadata (locale TEXT);
CREATE TABLE accounts (_id INTEGER PRIMARY KEY, email TEXT NOT NULL, secret TEXT NOT NULL, counter INTEGER DEFAULT 0, type INTEGER, provider INTEGER DEFAULT 0, issuer TEXT DEFAULT NULL, original_name TEXT DEFAULT NULL);
/* No STAT tables available */
```

Here above we can see two tables in this file.  An `android_metadata` table and an `accounts` table.

Run this command:

```
sqlite> SELECT * FROM accounts;
```

Did you notice everything is in the clear here?  No encryption?

It was so much so that I started to copy and paste my output of 17 accounts; but, it was too much to redact.  I figured I'll just posted the schema above and let you query your own database.

## Takeaways

There a few things to take away from all of this.  

Google Authenticator has world read/write permissions: Is that a security issue?

Google Authenticator stores everything in the clear in Sqlite: Is that a security issue?

I am going to reach out to Google for comment about this one.  But for now, you have the details and know-how to move this file as you see fit.  No more having to reset 17+ accounts, just for an Android update!
