---
published: true
layout: post
title: "Fix Slow Scrolling in VIM and Neovim"
description: "This is a post on how to debug and resolve slow scrolling in VIM/NeoVIM"
image: 
video: 
date: 2016-04-01 12:43:22 -0400
comments: true
categories: software
tags: [Go, GoLang, Vim, Neovim]
---

I am three months into my (4th) new development environment that I have bounced
around over the last three decades.  I finally put in the time to learn
vim/neovim to get away from graphical IDEs and return back to shell development.
With this brings a whole new timesuck of constantly tweaking your `.vimrc` to
the never reaching goal of perfection.

Now that I have my plugins and environments setup, I recently enabled a setting
to help me find my cursor faster in my `.vimrc` file.

    set cursorline

I was warned in the vim documentation that *"Will make screen redrawing
slower."*  Little did I know just how slow it would make it crawl! I first
noticed it with neovim.  To confirm it wasn't neovim itself, I attempted to load
vim with the same config and oh wow how horrible slow things scrolled.  CPU
usage of both neovim and vim spiked to 99% on OS X under iterm2 and tmux.

The issue is exasperated when you increase your keyboard's key repeat and
shorten the repeat delay.  OS X is not fast enough for me; so, I have to use
*Karabiner*'s Key Repeat feature to speed things up greatly (Delay @ 150ms, Key
Repeat at 10ms is just right).

A few quick Google searches surfaced the issue: `cursorline`, and similar
`cursorcolumn` was the issue when you have a plugin that highlights a bunch of
text.  Most people were having issues with Ruby's code plugins.

I was using `vim-go`, and its highlighting, when I noticed the issue.

This [Stackoverflow answer](http://stackoverflow.com/a/20519492/56693) is, as the comments say,
a lifesaver.  Basically it outlines the very reason why scrolling is slow and
how to debug exactly what regex pattern is causing it.

## How to Debug Slow Scrolling in VIM

You can debug what is slowing things down by first enabling the vim option
called `syntime` which is adequately defined as *"When scrolling is slow."*

    :syntime on

Then scroll up and down a lot, get it to bog down.  I also recommend doing this
within vim instead of neovim to really make things slow.  After 10 seconds or
so, generate a report with the following.

    :syntime report

For me, here's the top 10 results when a `FileType` of `go` was being scrolled:

    TOTAL      COUNT  MATCH   SLOWEST     AVERAGE   NAME               PATTERN
    2.482624   7066   0       0.009561    0.000351  goInterfaceDef     \(type\s\+\)\@<=\w\+\(\s\+interface\s\+{\)\@=
    2.476090   7066   0       0.008820    0.000350  goStructDef        \(type\s\+\)\@<=\w\+\(\s\+struct\s\+{\)\@=
    2.457858   7278   212     0.008375    0.000338  goFunction         \(func\s\+\)\@<=\w\+\((\)\@=
    2.440439   7066   0       0.007554    0.000345  goFunction         \()\s\+\)\@<=\w\+\((\)\@=
    0.757577   7180   114     0.001380    0.000106  goInterface        \(.\)\@<=\w\+\({\)\@=
    0.745827   7104   38      0.001105    0.000105  goStruct           \(.\)\@<=\w\+\({\)\@=
    0.640945   7064   0       0.004620    0.000091  goSpaceError       \(\(^\|[={(,;]\)\s*<-\)\@<=\s\+
    0.223065   12827  5910    0.000239    0.000017  goMethod           \(\.\)\@<=\w\+\((\)\@=
    0.071478   7064   0       0.000128    0.000010  goSpaceError       \(\(<-\)\@<!\<chan\>\)\@<=\s\+\(<-\)\@=
    0.058679   7064   0       0.000100    0.000008  goSpaceError       \(\(\<chan\>\)\@<!<-\)\@<=\s\+\(\<chan\>\)\@=

Immediately you can see it is `vim-go`'s regex patterns that is slowing down the
scrolling.  Interesting how there were two `goFunction` regex patterns caught,
and both are slow.

At first glance, there doesn't seem to be any big issues with them.  Just a lot
of matching.  Running the first one through regex101.com shows the following
definition:

    /\(type\s\+\)\@<=\w\+\(\s\+interface\s\+{\)\@=/
    \( matches the character ( literally
    type matches the characters type literally (case sensitive)
    \s match any white space character [\r\n\t\f ]
    \+ matches the character + literally
    \) matches the character ) literally
    \@ matches the character @ literally
    <= matches the characters <= literally
    \w match any word character [a-zA-Z0-9_]
    \+ matches the character + literally
    \( matches the character ( literally
    \s match any white space character [\r\n\t\f ]
    \+ matches the character + literally
    interface matches the characters interface literally (case sensitive)
    \s match any white space character [\r\n\t\f ]
    \+ matches the character + literally
    { matches the character { literally
    \) matches the character ) literally
    \@ matches the character @ literally
    = matches the character = literally

That is a lot of matching in a single regex!  Perhaps vim's regex interrupter is
just that bad.  I notice a significant speedup when using Neovim over Vim; but,
it is still very slow.

## The Fix for Slow Scrolling in VIM

Now, I could spend some time debugging this regex, inserting conditionals and
groupings in an attempt to limit the amount of matching which should in theory
speed that up.  But I need to get some work done.

One could just toggle off `cursorline` when it is slow and move on and toggle it
back on with the same command later.  Set it to a mapped key to make it faster.

    :set cursorline!

An option that I found in the help that does speed things up is `lazyredraw`.  
Though, it is tolerable with Neovim, vim was still a little bit choppy.  I have 
this enabled as default in my `.vimrc` regardless.

    :set lazyredraw

Some people have gotten success by disabling syntax highlighting after 128
columns and/or minlines set to 256.  Neither worked for my environment though.

    set synmaxcol=128
    syntax sync minlines=256

Personally, I just disabled some of (but not all of) `vim-go`'s syntax
highlighting because I visually value the  `cursorline` highlighting more
than syntax highlight.  Besides, [Rob Pike calls syntax highlighting
juvenile](https://groups.google.com/forum/#!msg/golang-nuts/hJHCAaiL0so/kG3BHV6QFfIJ).  

This option is very `plugin` specific; so, your mileage will vary of rather
your vim plugin supports selective disabling of syntax highlighting.  

For `vim-go`, they have highlighting disabled by default and you must explicitly 
enable it.  To disable syntax highlighting, just remove what you did to enable it
in the first place in your `.vimrc`:

```
function! VimGoSetup()
  " vim-go related mappings
  au FileType go nmap <Leader>r <Plug>(go-run)
  au FileType go nmap <Leader>b <Plug>(go-build)
  au FileType go nmap <Leader>t <Plug>(go-test)
  au FileType go nmap <Leader>i <Plug>(go-info)
  au FileType go nmap <Leader>s <Plug>(go-implements)
  au FileType go nmap <Leader>c <Plug>(go-coverage)
  au FileType go nmap <Leader>e <Plug>(go-rename)
  au FileType go nmap <Leader>gi <Plug>(go-imports)
  au FileType go nmap <Leader>gI <Plug>(go-install)
  au FileType go nmap <Leader>gd <Plug>(go-doc)
  au FileType go nmap <Leader>gv <Plug>(go-doc-vertical)
  au FileType go nmap <Leader>gb <Plug>(go-doc-browser)
  au FileType go nmap <Leader>ds <Plug>(go-def-split)
  au FileType go nmap <Leader>dv <Plug>(go-def-vertical)
  au FileType go nmap <Leader>dt <Plug>(go-def-tab)
  let g:go_auto_type_info = 1
  let g:go_fmt_command = "gofmt"
  let g:go_fmt_experimental = 1
  let g:go_dispatch_enabled = 0 " vim-dispatch needed
  let g:go_metalinter_autosave = 1
  let g:go_metalinter_autosave_enabled = ['vet', 'golint']
  let g:go_metalinter_enabled = ['vet', 'golint', 'errcheck']
  let g:go_term_enabled = 0
  let g:go_term_mode = "vertical"
" let g:go_highlight_functions = 1
  let g:go_highlight_methods = 1
" let g:go_highlight_structs = 1
" let g:go_highlight_interfaces = 1
  let g:go_highlight_operators = 1
  let g:go_highlight_extra_types = 1
  let g:go_highlight_build_constraints = 1
  let g:go_highlight_chan_whitespace_error = 1
endfunction
call VimGoSetup()
```

You can see the three lines I commented out above.  I still get plenty of syntax
highlighting without it.  So I'm good with this for now.

Finally, one could just use more of PageUp/PageDown to move around the file.

