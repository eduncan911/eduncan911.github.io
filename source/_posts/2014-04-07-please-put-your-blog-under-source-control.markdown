---
layout: post
title: "Please put your blog under Source Control"
date: 2014-04-07 10:37:08 -0400
comments: true
published: true
categories: software
tags: ["source control"]
---

There are many benefits to both your readers and yourself if you were to put your
blog under source revisions.  I would go as far to say that you own it to the community
to publish all revisions of your blog that was ever public for pure archiving reasons.

## Revision those files you linked to

Recently I setup [my hacker's blog](/software/my-hackers-blog.html) 
and I had a need to import my old blog posts from CommunityServer.  The steps were a bit
hackery itself as I had to get data out of CS and into a format that one of the common
importers of Jekyll/Octopress could read from.  I chose BlogML to export as that seemed
to have the oldest support (my CS blog was 9 years old).

## Finding that old file that no one cares about any longer

After spending a few days off and on tweaking the exported BlogML data, I basically found only 
a single BlogML importer for Jekyll.  This is why I chose this route to begin with.  So, when
it came time to perform the import guess what?  The blogml.rb ruby script links were all broken!

Then I had a thought: if the author of the script was running Jekyll/Octopress, especially on
GitHub pages, then perhaps there is a revision history.

I had to dig through about 2 years of commits; but, I found it!

[Commit 30ef1570f0 for blogml.rb from author](https://github.com/philippkueng/philippkueng.github.com/blob/30ef1570f06d33938b18d5eee7767d6641b9a779/source/_import/blogml.rb)

You can even backup a folder and see his entire snapshot of his blog during the import process.

Thank you Philipp Küng for revisioning your blog.

## Changing blogging platforms

What if you are switch blogging software every 5 years?  Keep old snapshots and revisions of your old site
in tags and refer to them in your change revisions.  Even if you don't keep the same technology,
having an old copy around for public reference can be useful to the community.

## Domain expiration, hosting company goes under, etc

So your domain expires or got snatched up by a squatter?  Or your hosting company pulls the plug?
At least having a revision available will allow you the flexibility, even if you don't continue
a blog any longer.

## Updates, changes and redactions

Opinions online can be heated and made in jest.  You may have published something that you wish you
didn't.  Or after some nice comments are posted, you update the post.  Maybe a DMCA takedown request
forced you to remove a piece of content.  Wouldn't it be nice to know and show the revision history of your post?

I know that me for one is going to stop with the dozen tiny edits for spelling and grammar because
of this.  Who knows, it may cause me to actually *think* before publishing.  

And FYI, you can see each revision of each post and page I make to my site here.

## Backups

Similar to the above, having a full backup you can take with you can be advantageous.

Personally, I not only publish my source code here at GitHub; but, I also have an additional
remote added for BitBucket and always do the following:

``` bash
> git add .
> git commit -m "fixed spelling and corrected a quote"
> git push backup source
> git push origin source
```

Now, you can do this for any source code sure.  It's these next steps that make it viable.

``` bash
> rake deploy
    ^- this publishes the live site to GitHub pages
> cd ./_deploy
> git push backup master
```

Yep, I also deploy a 2nd copy to my BitBucket account.  Even though it will never be used as a real
site, it's a full backup of the live site in the master branch.

The Optopress command `rake deploy` also pushed it up to GitHub pages on master - that's how it
"publishes."  So all I have to do is make a quick backup.  What's even nice is the script does
a pull request as well, to keep the _deploy folder in sync so when I do perform a backup, it's all there.
I am new to git branch tracking; so, I may have to tweak that last command by forcing `-f` up the
push to backup if it gets out of sync or something.

Finally, having multiple copies of your repo online and publicly accessible can help with...

## Government seizers

All too often, governments are taking domains and peoples' hosting accounts in the name of DMCA and
copyright infringements.  Oh, and free speech as well.

Why not publish your blog open source?

The last step to further solidify your published site and source would be automate a bittorrent release
for every deployment.  Doesn't seem to far out of reach with these snapshots readily available.  

## Death

What if you were to pass away?  Would your annual payment to your domains continue for decades? What
about the fee you pay your hosting company?  Same as the previous reason, publishing it may very well
keep it going for a long time even if the domain is gone, people can still get to the source.

Especially at a place like GitHub pages.

## Why not?

I hope I sparked some food for thought and I would like your opinions on the matter.

I cannot come up with solid reasons for not to publish your blog open source.  I know at first I
wrestled with the idea that:

{% blockquote %}
Wait, my database connection strings would be publicly visible.  I can't do that.
{% endblockquote %}

Then it hit me that Octopress/Jekyll is completely static - there are no database connection strings.
Q
{% blockquote %}
My secret keys for my 3rd party integrations may be exposed.
{% endblockquote %}

Actually not.  Twitter, Disqus, LinkedIn and so on all use public kesy/ids to identify you with their
widgets.  Even Flickr allows for a vast array of public apis.

You would only need private keys on your site if you were programatically pushing or changing content
elsewhere in a write-permission need.  But again, this was planned as a static site - no problem here.

{% blockquote %}
I have private downloads I don't want others to see.
{% endblockquote %}

Ok, this one did get me.  I do have private downloads of password-protected files on my old site.  

I have to think back to the longevity of my blog - do I want the downloads archived forever?  Short
answer, no.

~E

