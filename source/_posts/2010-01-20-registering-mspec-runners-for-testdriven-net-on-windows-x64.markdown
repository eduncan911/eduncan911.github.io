---
layout: post
title: "Registering MSpec runners for TestDriven.NET on Windows x64"
date: 2010-01-20 17:59:00 -0500
comments: true
published: true
categories: ["blog", "archives"]
tags: ["Computer Programming", "MSpec"]
alias: ["/blog/registering-mspec-runners-for-testdriven-net-on-windows-x64.aspx"]
---
<!-- more -->
{% include imported_disclaimer.html %}
<P>EDIT:&nbsp;MSpec v0.3 now supports <A href="http://weblogs.asp.net/nunitaddin/archive/2009/11/05/testdriven-net-2-24-xcopy-deployable-test-runners.aspx" mce_href="http://weblogs.asp.net/nunitaddin/archive/2009/11/05/testdriven-net-2-24-xcopy-deployable-test-runners.aspx">TestDriven.Net's v2.24 XCopy Deployable Test Runners</A>.&nbsp; So this blog post is legacy information at this time.&nbsp; </P>
<P><IMG style="BORDER-BOTTOM: 0px; BORDER-LEFT: 0px; DISPLAY: inline; MARGIN-LEFT: 0px; BORDER-TOP: 0px; MARGIN-RIGHT: 0px; BORDER-RIGHT: 0px" title=td_rocket2[1] border=0 alt=td_rocket2[1] align=left src="/blog/archives/images/MSpecrunnersforTestDrive.NETonWindowsx64_AD3B/td_rocket21.gif" width=141 height=100 mce_src="/blog/archives/images/MSpecrunnersforTestDrive.NETonWindowsx64_AD3B/td_rocket21.gif"> Machine.Specifications (MSpec) is my preferred Behavior-Driven Design (BDD) framework for Microsoft.NET.&nbsp; Aaron Jensen, <A href="http://codebetter.com/blogs/aaron.jensen/archive/tags/mspec/default.aspx" target=_blank mce_href="http://codebetter.com/blogs/aaron.jensen/archive/tags/mspec/default.aspx">the author of MSpec</A>, released support for TestDriven.NET, xUnit, nUnit, and Gallio.&nbsp; And with the latest release of v0.3, it adds official support for ReSharper's Unit Tests and and Selenium integration testing.&nbsp; Very cool stuff indeed, and a very active project!</P>
<P>What has bugged me a bit is getting TestDriven.NET to see my MSpec specifications, on my Windows 7 x64 platform.&nbsp; Aaron so kindly includes a InstallTDNetRunner.bat file to register MSpec with TestDrive.NET; but, it only works on x86 systems.</P>
<P>So why does it not work with x64 systems?&nbsp; It is because the installer for TestDriven.NET registers the runners in a different registry location.</P>
<H2>Windows Vista/7 x64 (64-bit) MSpec runner TestDriven.NET registry file</H2>
<P>Below, I have created a bat file you can copy and paste into your own InstallTDNetRunner-x64.bat if you are on Windows x64.&nbsp; Or, you can download it from here: </P>
<P><A href="/blog/binary/legacy/InstallTDNetRunner-x64.zip">/blog/binary/legacy/InstallTDNetRunner-x64.zip</A> </P><PRE><CODE>

@echo off &amp; if not "%ECHO%"=="" echo %ECHO%

setlocal
set LOCALDIR=%~dp0

echo Windows Registry Editor Version 5.00 &gt; MSpecTDNet.reg
echo [HKEY_CURRENT_USER\Software\MutantDesign\TestDriven.NET\TestRunners\MSpec] &gt;&gt; MSpecTDNet.reg
echo "Application"="" &gt;&gt; MSpecTDNet.reg
echo "AssemblyPath"="%LOCALDIR:\=\\%Machine.Specifications.TDNetRunner.dll" &gt;&gt; MSpecTDNet.reg
echo "TargetFrameworkAssemblyName"="Machine.Specifications" &gt;&gt; MSpecTDNet.reg
echo "TypeName"="Machine.Specifications.TDNetRunner.SpecificationRunner" &gt;&gt; MSpecTDNet.reg
echo @="5" &gt;&gt; MSpecTDNet.reg
echo. &gt;&gt; MSpecTDNet.reg

echo [HKEY_LOCAL_MACHINE\SOFTWARE\MutantDesign\TestDriven.NET\TestRunners\MSpec] &gt;&gt; MSpecTDNet.reg
echo "Application"="" &gt;&gt; MSpecTDNet.reg
echo "AssemblyPath"="%LOCALDIR:\=\\%Machine.Specifications.TDNetRunner.dll" &gt;&gt; MSpecTDNet.reg
echo "TargetFrameworkAssemblyName"="Machine.Specifications" &gt;&gt; MSpecTDNet.reg
echo "TypeName"="Machine.Specifications.TDNetRunner.SpecificationRunner" &gt;&gt; MSpecTDNet.reg
echo @="5" &gt;&gt; MSpecTDNet.reg
echo. &gt;&gt; MSpecTDNet.reg

echo [HKEY_LOCAL_MACHINE\SOFTWARE\Wow6432Node\MutantDesign\TestDriven.NET\TestRunners\MSpec] &gt;&gt; MSpecTDNet.reg
echo "Application"="" &gt;&gt; MSpecTDNet.reg
echo "AssemblyPath"="%LOCALDIR:\=\\%Machine.Specifications.TDNetRunner.dll" &gt;&gt; MSpecTDNet.reg
echo "TargetFrameworkAssemblyName"="Machine.Specifications" &gt;&gt; MSpecTDNet.reg
echo "TypeName"="Machine.Specifications.TDNetRunner.SpecificationRunner" &gt;&gt; MSpecTDNet.reg
echo @="5" &gt;&gt; MSpecTDNet.reg

regedit MSpecTDNet.reg

del MSpecTDNet.reg


</CODE></PRE>
<H2>Setup TestDriven.NET and MSpec</H2>
<P>Still a bit confused, getting TestDriven.NET and MSpec setup for the first time? Here's the steps to follow:</P>
<UL>
<LI>Go ahead and install TestDriven.NET.&nbsp; It can be installed and upgraded at any time. </LI>
<LI>Next, grab <A href="http://codebetter.com/blogs/aaron.jensen/archive/tags/mspec/default.aspx" target=_blank mce_href="http://codebetter.com/blogs/aaron.jensen/archive/tags/mspec/default.aspx">the latest release of MSpec</A>&nbsp; and extract the zip to a semi-permanent location.&nbsp; This is because things such as ReSharper and TestDriven.NET will need to know a common location for the mspec assemblies.&nbsp; I recommend C:\Program Files (x86)\MSpec\. 
<UL>
<LI>Included with the MSpec zip is an InstallTDNetRunner.bat, but it only works on 32-bit Windows.&nbsp; For 64-bit Windows, you want to copy my registry code above into a new file called InstallTDNetRunner-x64.bat. </LI>
<LI>Make sure to place this InstallTDNetRunner-x64.bat file in the same directory as your semi-permanent MSpec location above. </LI></UL></LI>
<LI>Finally, you want to double-click and execute the InstallTDNetRunner or InstallTDNetRunner-x64 from within this semi-permanent location.&nbsp; This will insert the registry values for a new runner called MSpec for TestDriven.NET to detect and execute. </LI></UL>
<P>From this point further, you can right-click within different places to execute your specifications within your MSpec.&nbsp; Some tips on locations you can right-click and execute the specs:</P>
<UL>
<LI>The project file: will execute all specs detected within that project. </LI>
<LI>The Namespace: will execute all specs detected within that namespace throughout the project. </LI>
<LI>Within the <FONT face="Courier New">Establish context</FONT> or <FONT face="Courier New">Because of</FONT> : Will execute all specs within that one class/scenario. </LI>
<LI>Within the <FONT face="Courier New">It</FONT> spec - Will execute just that one test. </LI></UL>
<P>Something to note is Aaron is currently upgrading MSpec (version 0.4, not released yet) to support TestDriven.NET's new 2.24 feature of version independent runners. I haven't looked completely into that myself, but should make registring TDNet runners in the future a bit easier.</P>
