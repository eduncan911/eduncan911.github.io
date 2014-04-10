---
layout: post
title: "Windows Azure SDK for Microsoft Visual Studio November 2009"
date: 2009-11-16 18:38:00 -0500
comments: true
published: true
categories: ["blog", "archives"]
tags: ["Geek Stuff", "Computer Programming", "Microsoft"]
alias: ["/blog/windows-azure-sdk-for-microsoft-visual-studio-november-2009.aspx"]
---
<!-- more -->
{% include imported_disclaimer.html %}
<P><A href="/blogs/eduncan911/productsoverviewinfographic_677ADB3A.gif" mce_href="/blogs/eduncan911/productsoverviewinfographic_677ADB3A.gif"><IMG style="BORDER-BOTTOM: 0px; BORDER-LEFT: 0px; WIDTH: 637px; DISPLAY: inline; HEIGHT: 191px; BORDER-TOP: 0px; BORDER-RIGHT: 0px" title=products-overview-infographic border=0 alt=products-overview-infographic src="/blog/archives/images/products-overview-infographic.gif" width=637 height=191 mce_src="/blog/archives/images/products-overview-infographic.gif"></A> </P>
<P>Over this past weekend, Microsoft released an updated Windows Azure SDK dated November 2009 for Visual Studio 2008 and 2010 Beta 2.&nbsp; It is great to hear this since my tinkering with with the old CTP release was a bit buggy (had to download a few hot-fixes).&nbsp; </P>
<P>Officially this SDK is known as version 20091111.1401, and released on November 13th, 2009.&nbsp; <A href="http://go.microsoft.com/fwlink/?LinkID=128752" target=_blank mce_href="http://go.microsoft.com/fwlink/?LinkID=128752">You can go straight to the SDK download here</A>.</P>
<P>I have compiled a list of improvements and details about this release.&nbsp; For those new to Windows Azure, the SDK add-on for Visual Studio 2008/2010 includes the following:</P>
<UL>
<LI>C# and VB Project creation support for creating a Windows Azure Cloud Service solution with multiple roles.</LI>
<LI>Tools to add and remove roles from the Cloud Service.</LI>
<LI>Tools to configure each Role.</LI>
<LI>Integrated local development via the Development Fabric and Development Storage services.</LI>
<LI>Running and Debugging a Cloud Service in the Development Fabric.</LI>
<LI>Building and packaging of Cloud Service Packages.</LI>
<LI>Browsing to the Windows Azure Developer Portal.</LI></UL>
<P>This updated includes a large number of enhancements and compatibility updates.&nbsp; The overview reads:</P>
<UL>
<LI>Windows Azure Service Runtime managed library: The latest version of the Service Hosting Runtime API includes support for enhanced communication between roles and for runtime notification of service configuration changes. Direct communication between role instances enables new application development scenarios, including applications that distribute state across role instances. Service configuration changes include an increase or decrease in the number of request role instances and changes to the values of configuration settings.</LI>
<LI>Windows Azure Diagnostics managed library: The new Diagnostics API enables logging using standard .NET APIs. The Diagnostics API provides built-in support for collecting standard logs and diagnostic information, including the Windows Azure logs, IIS 7.0 logs, Failed Request logs, crash dumps, Windows Event logs, performance counters, and custom logs. </LI>
<LI>Certificate Management: Enhanced support for SSL certificates in Windows Azure and in the Windows Azure SDK enables the secure automated deployment of certificates to services hosted on Windows Azure. </LI>
<LI>Variable-size Virtual Machines : Developers may now specify the size of the virtual machine to which they wish to deploy a role instance, based on the role's resource requirements. The size of the VM determines the number of CPU cores, the memory capacity, and the local file system size allocated to a running instance. </LI>
<LI>External endpoints for worker roles. A worker role may now define any number of external endpoints for HTTP, HTTPS, and TCP, and specify the desired port number for any external endpoint. </LI>
<LI>Persistent local resource storage: Developers can now choose to persist data written to a local storage resource at runtime when the role is recycled. </LI>
<LI>Windows Azure Storage Client managed library: The Storage Client library provides a .NET API for accessing the Windows Azure storage services. </LI>
<LI>Improved Development Storage: Development storage provides a high-fidelity simulation of the Windows Azure storage services in the cloud. Tables can now be created dynamically in the development storage Table service and are no longer required to be generated in advance. </LI>
<LI>Updated samples: The samples included with the Windows Azure SDK have been updated to demonstrate new features. The samples now include both C# and Visual Basic versions.</LI></UL>
<P>The actual technical updates are listed below.&nbsp; Some interesting parts such as ASP.NET MVC 2 support are now included.</P>
<UL>
<LI>Service Model UI: A redesigned and significantly more complete interface for manipulating Role configuration information. To access, double-click on a role node in the Solution Explorer.</LI>
<LI>Additional role templates: Support for ASP.NET MVC 2 (2010 only), F# worker roles (2010 only), and WCF Service Application web roles.</LI>
<LI>VS2010 Beta2 Support: Support for Visual Studio 2010 Beta 2 and VWD Express 2010 Beta 2.</LI>
<LI>Support for dynamically creating tables: The Create Tables functionality is now performed automatically; there is no longer a need to right-click and select Create Tables… on the project after your table definitions have changed.</LI>
<LI>Full support for and installation of the November Windows Azure SDK release (in short, similar to the above list):</LI>
<UL>
<LI>The sample storage client has been replaced by a new production quality library.</LI>
<LI>New Diagnostics library enables logging using .NET APIs and enables the collection of diagnostic information from the service.</LI>
<LI>Service Runtime library updated to support inter-role communication and notification of configuration changes . </LI>
<LI>Support for input endpoints on Worker Roles. </LI>
<LI>Higher fidelity simulation of Development Storage: supports all current cloud storage features, including dynamically creating tables. </LI>
<LI>Ability to choose the size of the VM for a role instance. </LI>
<LI>Ability to persist data in local storage even after the role is recycled. </LI>
<LI>Ability to manage certificates to install to the role VMs. </LI></UL></UL>
