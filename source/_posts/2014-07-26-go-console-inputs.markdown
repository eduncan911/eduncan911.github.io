---
published: true
layout: post
title: "Go - Reading Console Inputs"
description: Go's method of reading console inputs is raw, and it feels good.
image: 
video: 
date: 2014-07-26 18:39:43 -0400
comments: true
categories: [software, design]
tags: [Go, GoLang]
---
Recently it was time for me to grab some user input with a Go console tool I was writing.  It didn't surprise me to find that the bare-bones Go language didn't have the nuances that developers in other [larger and far more memory intensive] languages have come to take for granted.

In this post, I'll outline some common cases for reading characters in Go.

## fmt.Scan() reads the first word in Go

``` text fmt.Scan(...)
package main

import (
    "fmt"
)

func runScan() {

    // you must declare your var, and pass the pointer into Scan() below
    var input string

    fmt.Print("\nEnter some text and press enter: ")

    // using fmt.Scan, we can read single words in ascii string
    num, err := fmt.Scan(&input)
    if err != nil {
        fmt.Println(err)
        return
    }

    fmt.Println(input)
    fmt.Println(num)

}
```

Output:
```
Enter some text and press enter: Let's enter some text!
Let's
1
```

First, notice that Scan stops at the first space: it only reads 1 word.  Next, notice that the num of results is 1 (if you entered text).

Scan() requires that you must enter some text and press enter.  If you just press enter, a newline is echo'd back to the terminal and it continues to wait for some input other than CR.

## bufio.Reader.ReadString(...) reads the entire line of text

Say, you have to ask for a person's full name.  You will want to grab all text when they press enter:

``` text bufio.Reader.ReadString(...)
package main

import (
    "bufio"
    "fmt"
    "os"
    "strings"
)

// if using ReadString() a lot, consider using constants
const inputdelimiter = '\n'

func runReadString() {

    fmt.Print("\nEnter your Full Name: ")

    reader := bufio.NewReader(os.Stdin)
    input, err := reader.ReadString(inputdelimiter)
    if err != nil {
        fmt.Println(err)
        return
    }

    fmt.Println(input)
    fmt.Println("Exiting program.")

}
```


Output: 

```
Enter your Full Name: Eric Duncan
Eric Duncan

Exiting program.
```

Yay, we got the entire line of text!  But wait a second, we also got a CRLF at the end as well?  Yes, you have to be aware of this when using ReadString() - it captures the entire string, as well as the `\n` character into the buffer.

You'll need to filter that out:

```
    // convert CRLF to LF
    input = strings.Replace(input, "\n", "", -1)

    fmt.Println(input)
    fmt.Println("Exiting program.")

```

Output:

```
Enter your Full Name: Eric Duncan
Eric Duncan
Exiting program.
```

That's just a bit too hacky for me.

## bufio.Reader.ReadByte(...) gets you the first character

``` text bufio.Reader.ReadString(...)
package main

import (
    "bufio"
    "fmt"
    "os"
)

func runReadByte() {

    fmt.Print("\nContinue? [Y/N] ")

    reader := bufio.NewReader(os.Stdin)
    c, err := reader.ReadByte()
    if err != nil {
        fmt.Println(err)
        return
    }

    fmt.Printf("You entered: %q\n", c)

    if c == []byte("Y")[0] || c == []byte("y")[0] {
        fmt.Println("Thank you for pressing Y to continue!")
    } else {
        fmt.Println("No? Ok, we'll exit.")
    }
}

```

Output:

```
Continue? [Y/N] YES!
You entered: 'Y'
Thank you for pressing Y to continue!
```

As you can see above, it is pretty straight forward - except for the ninja shortcode `[]byte("y")[0]` to cast a human-readable `y` to a bytecode.  

That's a bit ugly.  There is a better way...

## Go Runes - A better way to read single chars

Go `runes` is defined as an alias to `int32`, "*so programs can be clear when an integer value represents a code point.*"  `runes` are used to represent a character constant (e.g. 'Y', 'y' and so on).

I prefer this method for reading single character inputs, like Y/N and menu choices.

``` text bufio.Reader.ReadRune()
package main

import (
    "bufio"
    "fmt"
    "os"
)

func runReadRune() {

    fmt.Print("\nContinue? [Y/N] ")

    reader := bufio.NewReader(os.Stdin)
    c, num, err := reader.ReadRune()
    if err != nil {
        fmt.Println(err)
        return
    }

    fmt.Printf("You entered: %q\n", c)
    fmt.Println("The size entered: ", num)

    if c == 'y' || c == 'Y' {
        fmt.Println("Thank you for pressing Y to continue!")
    } else {
        fmt.Println("No? Ok, we'll exit.")
    }
}

```

Output:

```
Continue? [Y/N] yes!
You entered: 'y'
The size entered:  1
Thank you for pressing Y to continue!
```

Notice how the logic is identical to the previous `ReadByte()` example above.  It is just cleaner without having to deal with the bytecode of `Y` and `y`.

## Final thoughts

As it has been said before, and will be said many times, Go's simplicity and bare-bones code is a bit annoying when focusing solely on a single feature or two.  But, taken as a whole, it just works.

I've published the code at the following gist:

https://gist.github.com/eduncan911/37a351731b0ddeeeb2d0


