---
layout: post
title: "Please put your blog under Source Control"
date: 2014-04-07 10:37:08 -0400
comments: true
published: false
categories: software
tags: ["source control"]
---

There are many benefits to both your readers and yourself if you were to put your
blog under source revisions.  I would go as far to say that you own it to the community
to publish all revisions of your blog that was ever public for pure archiving reasons.

<!-- more -->

## Revision those old files you linked to

Recently I setup [my hacker's blog](/software/my-hackers-blog.html) 
and I had a need to import my old blog posts from CommunityServer.  The steps were a bit
hackery itself as I had to get data out of CS and into a format that one of the common
importers of Jekyll/Octopress could read from.  I chose BlogML to export as that seemed
to have the oldest support (my CS blog was 9 years old).

### Finding that old import script no one cares about any longer

After spending a few days off and on tweaking the exported BlogML data, I basically found only 
a single BlogML importer for Jekyll.  This is why I chose this route to begin with.  So, when
it came time to perform the import guess what?  The blogml.rb ruby script links were all broken!

Then I had a thought: if the author of the script was running Jekyll/Octopress, especially on
GitHub pages, then perhaps there is a revision history.

I had to dig through about 2 years of commits; but, I found it!

[Commit 30ef1570f0 for blogml.rb from author](https://github.com/philippkueng/philippkueng.github.com/blob/30ef1570f06d33938b18d5eee7767d6641b9a779/source/_import/blogml.rb)

You can even backup a folder and see his entire snapshot of his blog during the import process.

Thank you Philipp Küng for revisioning your blog.

## Updates, Changes and Redactments

Opinions online can be heated and made in jest.  You may have published something that you wish you
didn't.  Or after some nice comments are posted, you update the post.  Maybe a DMCA takedown request
forced you to remove content.  Wouldn't be nice to know and show the revision history of your post?

I know that me for one is going to stop with the dozen minute edits for spelling and grammer because
of this.  Who knows, it may cause me to actually *think* before publishing.  

And FYI, you can see each revision of each post and page I make to my site here.