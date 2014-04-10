---
layout: post
title: "Dynamic Instance Names of TextFields - A work around"
date: 2007-03-07 20:08:00 -0500
comments: true
published: true
categories: ["blog", "archives"]
tags: ["Geek Stuff", "Computer Programming", "Flash"]
alias: ["/blog/dynamic-instance-names-of-textfields-a-work-around.aspx"]
---
<!-- more -->
{% include imported_disclaimer.html %}
<P>As I am starting to get back into heavy Flash development&nbsp;after my 5+ year hiatus, I see that Macromedia has added quite a lot of interesting concepts to the newer versions of ActionScript.</P>
<P>But the purpose of this post is to outline that Macromedia (err now Adobe) still has a lot of work to do on their ActionScript engine, specifically with Dynamic Instance naming conventions (and new-object intellisense would really be nice by now, after all of these years).&nbsp;&nbsp;I am assuming you know flash, a little bit.&nbsp; At least to the level of knowing that you need set an InstanceName of a Symbol, in order to be able to edit its properties at runtime.&nbsp; </P>
<P>I just spent too much time today trying to figure out why my code wasn't working.&nbsp; I am creating numerous dynamic TextFields, but I need to be able to access them for updates in code.&nbsp; And to complicate things, the TextFields will be loaded from different XML files - meaning they will have different InstanceNames.</P>
<P>You usually can create a dynamic instance name by using the old-school method of&nbsp;<SPAN style="FONT-FAMILY: 'Courier New'; FONT-SIZE: 10pt">hardCodedName[variable]</SPAN> or the even older&nbsp;<SPAN style="FONT-FAMILY: 'Courier New'; FONT-SIZE: 10pt">eval("hardCodedName" + variable)</SPAN> method.&nbsp; For example, say I want to create a new movie into a dynamic variable made up of an integer I have in a for i++ loop:</P><PRE><CODE>for (int i = 0; i &lt; total; i++)
{
  loadMovie( "myMovie" + i + ".swf", _root.myMovie[ i ] );
}
</CODE></PRE>
<P>Or...</P><PRE><CODE>for (int i = 0; i &lt; total; i++)
{
  loadMovie( "myMovie" + i + ".swf", _root.eval("myMovie" + i) );
}
</CODE></PRE>
<P>Both of these examples should result in loading myMovie0.swf into the dynamic variable name of /level0/myMovie0 (or _root.myMovie0 per dot-syntax).&nbsp; </P>
<P>What&nbsp;I found today is that when using some of the newer ActionScript 2.0 and 3.0 functions, they do not honor these methods completely.&nbsp; I had to use a mixture of the two examples above to get it work, and actually could not use either method when creating the object!&nbsp; This is the craziest thing I've seen to where eval() works in referencing the object, but does not work in the creation of the object.&nbsp; </P><PRE><CODE>var _root.totalCount:Number = 0;
function CreateMenuItem(Text:String, Href:String, Title:String, Spacer:Boolean)
{
    // create the symbol at the last Y position we are tracking
    this.createTextField("movFlyoutText" + _root.totalCount
        , _root.totalCount, _root.textXpos, _root.lastYpos, _root.textWidth, _root.textHeight);
    eval("movFlyoutText" + _root.totalCount).wordWrap = true;
    eval("movFlyoutText" + _root.totalCount).multiline = true;
    eval("movFlyoutText" + _root.totalCount).border = false;
    eval("movFlyoutText" + _root.totalCount).type = "dynamic";
    eval("movFlyoutText" + _root.totalCount).antiAliasType = "advanced";
    
    textFormat = new TextFormat();
    textFormat.color = 0xffffff;
    textFormat.size = 12;
    textFormat.font = "Futura Condensed";
    
    if (Spacer != true)
    {
      formatText.url = Href;
    }
    
    if (Text.length &gt; 0)
    {
        eval("movFlyoutText" +  _root.totalCount).text = Text;
    }
    else
    {
        eval("movFlyoutText" + _root.totalCount).text = " ";
    }
    
    eval("movFlyoutText" + _root.totalCount).setTextFormat(textFormat);
    
    // reset some vars
    var tmp:Number = eval("movFlyoutText" + _root.totalCount)._height;
    _root.lastYpos = _root.lastYpos + tmp;
    
    _root.totalCount++;
}

</CODE></PRE>
<P>Above is the code I wrote today, to where I can not use [] reference or the eval() reference to get the TextField created properly using the newer <SPAN style="FONT-FAMILY: 'Courier New'; COLOR: blue; FONT-SIZE: 10pt">createTextField</SPAN>method.&nbsp; But in other methods throughout my code, using the [] reference works at the baseline.&nbsp; Go figure.</P>
<P>And as mentioned above, I can not use brackets[] when referencing the object either to set its properties!&nbsp; I had to use eval().&nbsp; Man, how ugly is this code?&nbsp; I'm open to other suggestions.</P><img alt='Dynamic Instance Names of TextFields - A work around' src='http://www.adobe.com/support/flash/images/h1_icon.gif'/> 
