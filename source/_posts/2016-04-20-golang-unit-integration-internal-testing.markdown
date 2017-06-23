---
published: false
layout: post
title: "GoLang Unit, Integration and Internal Testing"
description: "A guide to testing on a mass scale in GoLang"
image:
video:
date: 2016-04-20 18:52:30 -0400
comments: true
categories:
tags:
---

Got unit tests?  How do you define integration tests?  Do you test private
methods?

...

Before we jump into my recommendations, let us review what options we have
with GoLang when it comes to `go test`.

### go test -flag ...

Build flags are a common filter.  They allow you to set variables at runtime
and to include/exclude files from compilation.  

In the context of testing, one could specify special build flags at the top
of the file.  For example, to specify an Integration Test:

```
//+Integration
package service

...
```
