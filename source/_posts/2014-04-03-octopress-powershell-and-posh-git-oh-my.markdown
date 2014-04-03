---
layout: post
title: "Octopress, PowerShell and Posh-Get - Oh my"
date: 2014-04-03 16:11:01 -0400
comments: true
categories: software
---
As announced previously, I've recently [converted my blog over to Octopress](/software/my-hackers-blog.html).
This was not without a few stumbling blocks on Windows using Posh-Git.  I've also recently started to suspect some issues with [Posh-Git](https://github.com/dahlbyk/posh-git) now that I am using 
it on a daily basis.  

In this post, I hope to document the procedure for future installs; and, maybe I can help someone else who runs across the
same issues.

## `> rake setup_github_pages`

The next step is to call the task to setup your repo for GitHub deployments.  Just take a quick gander a what it does,
as listed on the Octopress install guide:

1. Ask for and store your Github Pages repository url.
2. Rename the remote pointing to imathis/octopress from 'origin' to 'octopress'
3. Add your Github Pages repository as the default origin remote.
4. Switch the active branch from master to source.
5. Configure your blog's url according to your repository.
6. Setup a master branch in the _deploy directory for deployment.

If that sounds like a lot, wait until you see what actually does happen below.  So, we'll run it and look at the output:

``` mark:7,16,20
C:\gd\code\eduncan911 [master +2 ~1 -0 !]> rake setup_github_pages
## Set the codepage to 65001 for Windows machines
Enter the read/write url for your repository
(For example, 'git@github.com:your_username/your_username.github.io.git)
           or 'https://github.com/your_username/your_username.github.io')
Repository url: git@github.com:eduncan911/eduncan911.github.io.git
fatal: remote origin already exists.
Added remote git@github.com:eduncan911/eduncan911.github.io.git as origin
Set origin as default remote
Master branch renamed to 'source' for committing your blog source files
rm -rf _deploy
mkdir _deploy
cd _deploy
Initialized empty Git repository in C:/gd/code/eduncan911/_deploy/.git/
'My Octopress Page is coming soon
'hellip' is not recognized as an internal or external command, operable program or batch file.
[master (root-commit) f1e0e3f] Octopress init
 1 file changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 index.html
fatal: remote origin already exists.
cd -

---
## Now you can deploy to git@github.com:eduncan911/eduncan911.github.io.git with `rake deploy` ##
C:\gd\code\eduncan911 [source +2 ~3 -0 !]>
```

Btw, kudos to the developers of Octopress to put this much output in the build processes - makes 
things much easier to debug than the vast majority of scripts you run.

But doh!  We have our first stumbling blocks.  We have a number of errors to work out here, three exactly.

Fortunately, `line 7` is an extremely common problem when working git.  Unfortunately though,
the common fixes doesn't seem to work with any Posh-Git install I've used to date.  

Before we get to that though, let's take a look at the ruby task to see exactly what is going on 
before we jump to any conclusions.

``` ruby RakeFile
desc "Set up _deploy folder and deploy branch for Github Pages deployment"
task :setup_github_pages, :repo do |t, args|
  if args.repo
    repo_url = args.repo
  else
    puts "Enter the read/write url for your repository"
    puts "(For example, 'git@github.com:your_username/your_username.github.io.git)"
    puts "           or 'https://github.com/your_username/your_username.github.io')"
    repo_url = get_stdin("Repository url: ")
  end
  protocol = (repo_url.match(/(^git)@/).nil?) ? 'https' : 'git'
  if protocol == 'git'
    user = repo_url.match(/:([^\/]+)/)[1]
  else
    user = repo_url.match(/github\.com\/([^\/]+)/)[1]
  end
  branch = (repo_url.match(/\/[\w-]+\.github\.(?:io|com)/).nil?) ? 'gh-pages' : 'master'
  project = (branch == 'gh-pages') ? repo_url.match(/\/([^\.]+)/)[1] : ''
  unless (`git remote -v` =~ /origin.+?octopress(?:\.git)?/).nil?
    # If octopress is still the origin remote (from cloning) rename it to octopress
    system "git remote rename origin octopress"
    if branch == 'master'
      # If this is a user/organization pages repository, add the correct origin remote
      # and checkout the source branch for committing changes to the blog source.
      system "git remote add origin #{repo_url}"
      puts "Added remote #{repo_url} as origin"
      system "git config branch.master.remote origin"
      puts "Set origin as default remote"
      system "git branch -m master source"
      puts "Master branch renamed to 'source' for committing your blog source files"
    else
      unless !public_dir.match("#{project}").nil?
        system "rake set_root_dir[#{project}]"
      end
    end
  end
  jekyll_config = IO.read('_config.yml')
  jekyll_config.sub!(/^url:.*$/, "url: #{blog_url(user, project)}")
  File.open('_config.yml', 'w') do |f|
    f.write jekyll_config
  end
  rm_rf deploy_dir
  mkdir deploy_dir
  cd "#{deploy_dir}" do
    system "git init"
    system "echo 'My Octopress Page is coming soon &hellip;' > index.html"
    system "git add ."
    system "git commit -m \"Octopress init\""
    system "git branch -m gh-pages" unless branch == 'master'
    system "git remote add origin #{repo_url}"
    rakefile = IO.read(__FILE__)
    rakefile.sub!(/deploy_branch(\s*)=(\s*)(["'])[\w-]*["']/, "deploy_branch\\1=\\2\\3#{branch}\\3")
    rakefile.sub!(/deploy_default(\s*)=(\s*)(["'])[\w-]*["']/, "deploy_default\\1=\\2\\3push\\3")
    File.open(__FILE__, 'w') do |f|
      f.write rakefile
    end
  end
  puts "\n---\n## Now you can deploy to #{repo_url} with `rake deploy` ##"
end
```

Let's step through what this task does to our repo:

``` ruby RakeFile start:20
    # If octopress is still the origin remote (from cloning) rename it to octopress
    system "git remote rename origin octopress"
```

Ok, no problem.  We are renaming origin.  But what you don't know is with Posh-Git, when
you rename origin, it seems creates an empty origin!  So, when the next system command executes:

``` ruby RakeFile start:22
    if branch == 'master'
      # If this is a user/organization pages repository, add the correct origin remote
      # and checkout the source branch for committing changes to the blog source.
      system "git remote add origin #{repo_url}"
```

We get our first error, `fatal: remote origin already exists.`

Ok, back on task of what the `RakeFile` is doing to move forward.

``` ruby RakeFile start:26 mark:27,29
      puts "Added remote #{repo_url} as origin"
      system "git config branch.master.remote origin"
      puts "Set origin as default remote"
      system "git branch -m master source"
      puts "Master branch renamed to 'source' for committing your blog source files"
    else
      unless !public_dir.match("#{project}").nil?
        system "rake set_root_dir[#{project}]"
      end
    end
  end
```

Interesting.  I haven't seen this in my git-ninja code before.  A quick Google and we come up
with this SO answer on how to setup master to track a remote branch:

{% blockquote Paul Hedderly http://stackoverflow.com/a/625460/56693 %}
You can do the following (assuming you are checked out on master and want to push to a remote branch master):

Set up the 'remote' if you don't have it already

`# git remote add origin ssh://...`
Now configure master to know to track:

`# git config branch.master.remote origin`
`# git config branch.master.merge refs/heads/master`
And push:

`# git push origin master`
{% endblockquote %}

So now we have master tracking a remote branch and on `line 29`, we've created a new branch
called `source` (which also switches us to `source` for future commands).

Continuing...

``` ruby RakeFile start:37 mark:45-48
  jekyll_config = IO.read('_config.yml')
  jekyll_config.sub!(/^url:.*$/, "url: #{blog_url(user, project)}")
  File.open('_config.yml', 'w') do |f|
    f.write jekyll_config
  end
  rm_rf deploy_dir
  mkdir deploy_dir
  cd "#{deploy_dir}" do
    system "git init"
    system "echo 'My Octopress Page is coming soon &hellip;' > index.html"
    system "git add ."
    system "git commit -m \"Octopress init\""
```

Ah, we are create a new directory (`_deploy` by default Octopress config) and by calling
`git init` we create a new bank repo!  This was not clear to me as to why at first, until I got things
working.  You'll see why in a bit.

And look here, on `line 46`, we have our 2nd error in the output.  It would seem this
is a parsing typo on Windows machines.  So, we never get this index.html file!  No biggie,
we'll be replacing that very shortly anyways.  

Let's move forward.

``` ruby RakeFile start:49
    system "git branch -m gh-pages" unless branch == 'master'
```

This is my first Ruby playground, so I am not exactly sure what this line does.  I would say we create
a branch called gh-pages, but that is for GitHub Projects (for corporate accounts), not our
GitHub Pages that we using here.

I suspect the `unless branch == 'master'` is what prevents this line from running on my installation.

``` ruby RakeFile start:50 mark:50
    system "git remote add origin #{repo_url}"
    rakefile = IO.read(__FILE__)
    rakefile.sub!(/deploy_branch(\s*)=(\s*)(["'])[\w-]*["']/, "deploy_branch\\1=\\2\\3#{branch}\\3")
    rakefile.sub!(/deploy_default(\s*)=(\s*)(["'])[\w-]*["']/, "deploy_default\\1=\\2\\3push\\3")
    File.open(__FILE__, 'w') do |f|
      f.write rakefile
    end
  end
  puts "\n---\n## Now you can deploy to #{repo_url} with `rake deploy` ##"
end
```

Finally we are at the end.  Let's see, back on `line 48` we are sitting in a new directory
called `_deploy` with a new clean `git init`.  So, on `line 50` we add a remote for origin...

And get our 3rd and final error, that we have already seen before:

`fatal: remote origin already exists.`

### fatal: remote origin already exists

As I mentioned earlier, this is most likely because Posh-Git already creates an origin and never
leaves an empty remote.

I've seen this [fatal: remote origin already exists](https://www.google.com/search?q=fatal%3A+remote+origin+already+exists&oq=fatal%3A+remote+origin+already+exists&aqs=chrome..69i57j69i58.840j0j7&sourceid=chrome&espv=210&es_sm=122&ie=UTF-8) 
error all too often and it usually means you already have an origin and cannot add another one.  Usually `git` on Linux allows you to fix with a set of simple and meaningful commands:

``` bash
# pseudo code, not actually used during this install guide
$ git remote add temp user@my-url.com/repo.git
$ git remote rm origin
$ git remote add origin user@my-url.com/repo.git
$ git remote rm temp
```

But this has never worked for me using Posh-Git.  When trying to remove origin with Posh-Git, you get a new and blocking 
error:

```
C:\gd\code\eduncan911 [source +2 ~3 -0 !]> git remote rm origin
error: Could not remove config section 'remote.origin'
```

Searching online basically leads you to a dead end in that this normally works using other versions of git.  I did stumble upon
a related SO question about remotes using `set-url`, which [lead me to come up with this solution](http://stackoverflow.com/a/22826225/56693):

```
C:\gd\code\eduncan911 [source +2 ~3 -0 !]> git remote -v
octopress       git://github.com/imathis/octopress.git (fetch)
octopress       git://github.com/imathis/octopress.git (push)
origin
```

As you can see, the `rake setup_github_pages` has renamed our origin to octopress.  But Posh-Git seemed to have created
another empty origin and it won't the script add one.  Let's fix that:

```
C:\gd\code\eduncan911 [source +2 ~3 -0 !]> git remote set-url --add origin git@github.com:eduncan911/eduncan911.github.io.git
C:\gd\code\eduncan911 [source +2 ~3 -0 !]> git remote -v
octopress       git://github.com/imathis/octopress.git (fetch)
octopress       git://github.com/imathis/octopress.git (push)
origin  git@github.com:eduncan911/eduncan911.github.io.git (fetch)
origin  git@github.com:eduncan911/eduncan911.github.io.git (push)
```

There we go.  Let's `rake` that `setup_github_pages` script again, shall we?

``` mark:17
C:\gd\code\eduncan911 [source +2 ~3 -0 !]> rake setup_github_pages
## Set the codepage to 65001 for Windows machines
Enter the read/write url for your repository
(For example, 'git@github.com:your_username/your_username.github.io.git)
           or 'https://github.com/your_username/your_username.github.io')
Repository url: git@github.com:eduncan911/eduncan911.github.io.git
rm -rf _deploy
mkdir _deploy
cd _deploy
Initialized empty Git repository in C:/gd/code/eduncan911/_deploy/.git/
'My Octopress Page is coming soon
'hellip' is not recognized as an internal or external command,
operable program or batch file.
[master (root-commit) 27d2dd5] Octopress init
 1 file changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 index.html
fatal: remote origin already exists.
cd -

---
## Now you can deploy to git@github.com:eduncan911/eduncan911.github.io.git with `rake deploy` ##
```

Well crap. We still get that `fatal: remote origin already exists` on `line 17` error after all we did!

Ah, but remember what I said earlier about a directory called `_deploy`?  They are making a new repo
and setting up the `origin` manually.

So, we have to set that `origin` ourselves again.

```
C:\gd\code\eduncan911 [source +2 ~3 -0 !]> cd .\_deploy
C:\gd\code\eduncan911\_deploy [master]> git remote -v
origin
```

This is just checking to see what was there and as we suspected the `git remote add origin` command in the task did not work.   

You may also notice that when you change directories to the `_deploy` new repo, we are on `master` now of a different repo.
We were previously on `source' branch of the root repo from the previous scripts.

So let's fix that up.

```
C:\gd\code\eduncan911\_deploy [master]> git remote set-url --add origin git@github.com:eduncan911/eduncan911.github.io.git
C:\gd\code\eduncan911\_deploy [master]> git remote -v
origin  git@github.com:eduncan911/eduncan911.github.io.git (fetch)
origin  git@github.com:eduncan911/eduncan911.github.io.git (push)
C:\gd\code\eduncan911\_deploy [master]> cd ..
C:\gd\code\eduncan911 [source +2 ~3 -0 !]> 
```

There we go.  All fixed up and ready to continue.  Make sure to change directories `cd ..` to backup to where you were
before continuing.

At this point, it is not necessary to run the `rake setup_github_pages` again because the script continues even with
errors, as we've seen above.  The last part of the script seems to modify the `RakeFile`.  We'll leave that for another
topic as we want to keep hacking on our new blog to get it up.

{%ribbonp (info) checkpoint: that new repo? %}
To the keen observer, you may notice that we have two branches of the same repo:

```
git@github.com:eduncan911/eduncan911.github.io.git
# master
# source
```

The first part of Octopress' instructions for github actually branches what you cloned from Octopress' github
into a `source` branch.  Ok, check.

But recall that we created a sub-directory called `_deploy` and we `git init` a new clean repo there.  It was
already set to `master`, and finally we made its origin the same as our original source.

What this means is now you will have two branches with completely different code.  Your `source` branch is what
you will work from, commit to and push up.  While the Octopress ruby framework will handle the generation of the
static site and deployments to the `master` branch.

The last piece to remember is that GitHub Pages will only use the `master` branch to serve your static site.

Sweet!  Our website (aka `master` branch) will be nice and clean based on this `_deploy` directory, whereas
our `source` branch will be the work committed.
{%endribbonp%}

## `rake generate`

This runs without issue.  

## `rake deploy`

Aw shit, it would seem we still have some issues because this task generates errors:

``` mark:6-7,24-28
C:\gd\code\eduncan911 [source +2 ~3 -0 !]> rake deploy
## Set the codepage to 65001 for Windows machines
## Deploying branch to Github Pages
## Pulling any updates from Github Pages
cd _deploy
fatal: No remote repository specified.  Please, specify either a URL or a
remote name from which new revisions should be fetched.
cd -
rm -rf _deploy/index.html

## Copying public to _deploy
cp -r public/. _deploy
cd _deploy

## Committing: Site updated at 2014-04-03 22:58:56 UTC
[master 5257cf9] Site updated at 2014-04-03 22:58:56 UTC
 61 files changed, 1118 insertions(+)
 create mode 100644 assets/jwplayer/glow/controlbar/background.png
 ...(snip)...
 create mode 100644 sitemap.xml
 create mode 100644 stylesheets/screen.css

## Pushing generated _deploy website
fatal: 'origin' does not appear to be a git repository
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.

## Github Pages deploy complete
cd -
C:\gd\code\eduncan911 [source +2 ~3 -0 !]>
```

We got two errors to sort out.  Let's take a look at the first one.

### fatal: No remote repository specified.  Please, specify either a URL or a remote name from which new revisions should be fetched.

Humm, this sounds like a simple `git pull` was issued.  Let's take a look at the ruby commands for this.  Again, thanks to
the great output from the developers, a quick search in the `RakeFile` finds this code.

``` ruby RakeFile mark:5-6,18
desc "deploy public directory to github pages"
multitask :push do
  puts "## Deploying branch to Github Pages "
  puts "## Pulling any updates from Github Pages "
  cd "#{deploy_dir}" do 
    system "git pull"
  end
  (Dir["#{deploy_dir}/*"]).each { |f| rm_rf(f) }
  Rake::Task[:copydot].invoke(public_dir, deploy_dir)
  puts "\n## Copying #{public_dir} to #{deploy_dir}"
  cp_r "#{public_dir}/.", deploy_dir
  cd "#{deploy_dir}" do
    system "git add -A"
    puts "\n## Committing: Site updated at #{Time.now.utc}"
    message = "Site updated at #{Time.now.utc}"
    system "git commit -m \"#{message}\""
    puts "\n## Pushing generated #{deploy_dir} website"
    system "git push origin #{deploy_branch}"
    puts "\n## Github Pages deploy complete"
  end
end
```

Ah hah, there marked on lines 5 and 6 is the `git pull` for the `_deploy` directory.  Smart, they are pulling down any
changes you may have made manually to your static pages.  For example, using GitHub's edit file feature to edit a file
directly in the browser.

I wonder why that didn't work because as you recall, we setup the `origin` correctly.  Let's figure out why.

```
C:\gd\code\eduncan911 [source +2 ~3 -0 !]> cd .\_deploy
C:\gd\code\eduncan911\_deploy [master]> git remote -v
origin
```

Wha...  We already set this before.  What happened?  Well, I can tell you that it is because I re-ran the 
`rake setup_github_pages` a 2nd and 3rd time.  If you recall from the script, it doesn't care if you have
an existing deployment directory or not - it blows it out and creates it again!

So, just go add the origin again.  *facepalm*

```
C:\gd\code\eduncan911\_deploy [master]> git remote set-url --add origin git@github.com:eduncan911/eduncan911.github.io.git
C:\gd\code\eduncan911\_deploy [master]> git remote -v
origin  git@github.com:eduncan911/eduncan911.github.io.git (fetch)
origin  git@github.com:eduncan911/eduncan911.github.io.git (push)
C:\gd\code\eduncan911\_deploy [master]> git remote -v
C:\gd\code\eduncan911\_deploy [master]> cd ..
C:\gd\code\eduncan911 [source +2 ~3 -0 !]>
```

Before we continue, let's take a quick look at that second error.  Scrolling down to `line 18` in the same ruby
task above we see a `git push origin master` being executed. 

Because we had no `origin` set correctly, this would cause yet another error.  We got that fixed already though.

Let's try to deploy again now that we fixed the `_deploy` folder.

```
C:\gd\code\eduncan911 [source +2 ~3 -0 !]> rake deploy
## Set the codepage to 65001 for Windows machines
## Deploying branch to Github Pages
## Pulling any updates from Github Pages
cd _deploy
Warning: Permanently added 'github.com,192.30.252.131' (RSA) to the list of known hosts.
There is no tracking information for the current branch.
Please specify which branch you want to merge with.
See git-pull(1) for details

    git pull <remote> <branch>

If you wish to set tracking information for this branch you can do so with:

    git branch --set-upstream-to=origin/<branch> master

cd -
rm -rf _deploy/assets
rm -rf _deploy/atom.xml
rm -rf _deploy/blog
rm -rf _deploy/favicon.png
rm -rf _deploy/images
rm -rf _deploy/index.html
rm -rf _deploy/javascripts
rm -rf _deploy/robots.txt
rm -rf _deploy/sitemap.xml
rm -rf _deploy/stylesheets

## Copying public to _deploy
cp -r public/. _deploy
cd _deploy

## Committing: Site updated at 2014-04-03 23:21:58 UTC
# On branch master
nothing to commit, working directory clean

## Pushing generated _deploy website
Warning: Permanently added 'github.com,192.30.252.131' (RSA) to the list of known hosts.
Counting objects: 79, done.
Delta compression using up to 12 threads.
Compressing objects: 100% (72/72), done.
Writing objects: 100% (79/79), 186.45 KiB | 0 bytes/s, done.
Total 79 (delta 1), reused 0 (delta 0)
To git@github.com:eduncan911/eduncan911.github.io.git
 * [new branch]      master -> master

## Github Pages deploy complete
cd -
C:\gd\code\eduncan911 [source +2 ~3 -0 !]>
```

Humm, a few warnings about no tracking information for the remote branch, which we setup to be `source` from `master`.
I think this is normal because we haven't pushed `source` up yet.

### git push origin source

Now, let's see if we can fix the tracking information for our `source` branch by pushing our changes up.

```
git add .
git commit -m 'initial commit of source branch'
git push origin source
```

Seems like we are good here.

Let's head over to our GitHub Page and see what's there in the repo.  What's this?  My master is a nice and clean static 
site?  Sweet!

And lookie here, the `source` branch has the source!

I'm sticking a fork in her and calling it...  These may be normal warnings with the way the remote tracking is handled
as I don't have a lot of experience with that part of git.  

## It's all downhill from here

If you have stuck with me this long, I have some good news: you're done!  Time to start blogging!

You can read the rest of the deployment guide from here as they have some useful tips.  Also, make sure to commit
your work (they mention this too).  

My last piece of advice after you get the hang of things and create a few test posts is to look into these commands.

```
rake generate   # Generates posts and pages into the public directory
rake watch      # Watches source/ and sass/ for changes and regenerates
rake preview    # Watches, and mounts a webserver at http://localhost:4000
```

You've already run `rake generate`; but, take a look at the other two.  

`rake watch` is nice to auto-generate files as you change them.  

`rake preview` is even better!  It will watch for and auto-generate your site; but, more so it runs a very lightweight
tiny webserver (much less tiny than IIS!) in the background where you can open a browser and hit refresh to your heart's
content.

I advise everyone to do that to keep the number of commits down because once  you have a few 100 pages, that generate and
deploy is going to take a long while.  Might as well get into the habit early!

~E

PS: I am thinking of renting a [Macbook Pro](http://technichi.com/) because of the time lost with stuff like this 
under Windows.  Argh...
