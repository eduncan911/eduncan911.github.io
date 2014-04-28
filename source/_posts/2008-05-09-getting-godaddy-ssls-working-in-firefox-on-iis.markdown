---
layout: post
title: "Getting GoDaddy SSLs working in Firefox on IIS"
date: 2008-05-09 05:15:00 -0400
comments: true
published: true
categories: ["blog", "archives"]
tags: ["Geek Stuff", "Computer Programming"]
alias: ["/blog/getting-godaddy-ssls-working-in-firefox-on-iis.aspx", "/archive/2008/05/09/getting-godaddy-ssls-working-in-firefox-on-iis.aspx"]
---
<!-- more -->

{% include imported_disclaimer.html %}

<P>Upon installing your SSL certificate purchased through GoDaddy, and your Firefox users get prompted with a certificate warning of "Unauthorized Authority", read on for a fix using Windows 2003 Server (and R2).&nbsp; This also works for any other authority that is not authorized by default in any browser.&nbsp; In this article, I provide links to GoDaddy's Intermediate Certificates.&nbsp; If you obtained your SSL certificate through another party, ask them for their "Intermediate Certificates" to download for IIS.</P>
<H3>Overview</H3>
<P><A href="http://en.wikipedia.org/wiki/Secure_Sockets_Layer" target=_blank mce_href="http://en.wikipedia.org/wiki/Secure_Sockets_Layer">SSL certificates</A> are commonly known to secure a channel of communications, such as the web and email.&nbsp; The problem when installing GoDaddy SSL certificates on a server is Firefox may prompt you stating that the certificate is from an "Unauthorized Authority".&nbsp; </P>
<P>Why is GoDaddy an unauthorized authority on SSL certificates?&nbsp; <A href="http://bloggit.livejournal.com/26595.html" target=_blank mce_href="http://bloggit.livejournal.com/26595.html">Bloggit</A> has a good definition over on his blog, as well as a resolution for <A href="http://www.stunnel.org/" target=_blank mce_href="http://www.stunnel.org/">stunnel</A> and apache systems.&nbsp; But, we are using IIS so things change a bit for us.&nbsp; The bottom-line is a simple quote from his blog post:</P>
<BLOCKQUOTE>
<P><EM>In practice, while </EM><A href="http://www.opera.com/products/desktop/" mce_href="http://www.opera.com/products/desktop/"><EM>Opera</EM></A><EM> and </EM><A href="http://www.newadvent.org/cathen/05649a.htm" mce_href="http://www.newadvent.org/cathen/05649a.htm"><EM>Internet Explorer</EM></A><EM> come [installed] knowing about GoDaddy [as an authorized authority], Firefox and Thunderbird do not. And therefore presumably several other devices also don't. They gripe that GoDaddy is an "Unknown Authority"... rather than silently accepting it.</EM></P></BLOCKQUOTE>
<P>To better describe what is happening, think of how an SSL certificate gets authorized by your browser.&nbsp; I am going to take a stab on how I think it works (feel free to correct me in the comments).&nbsp; The browser receives the header information for the SSL certificate upon the first communication to the web server.&nbsp; Within the header of this request is the complete information and public key of the SSL certificate information.&nbsp; But also included in the SSL certificate header information is the reference chain of the issuer, which is GoDaddy (or whomever issued your SSL certificate).&nbsp; If the client's browser does not have GoDaddy listed as a known and authorized issuer of SSL certificates (i.e. Firefox and Thunderbird do not, but IE7 does), the browser will prompt the user of the Unknown Authority.&nbsp; So the fix is to add a known issuer of SSL certificates that is "linked" to GoDaddy's (better known as Intermediate Certificates) at the server level.&nbsp; </P>
<H3>Resolution</H3>
<P>The fix is to get GoDaddy added to the list of companies that are authorized to issue SSL certificate.&nbsp; And, this is performed on the web server serving up your custom SSL certificate.&nbsp; We will need to add the GoDaddy company to the reference chain of authorized issuers of SSL certificates.&nbsp; </P>
<P>Basically we want to say, "GoDaddy is known as a child of the bigger company Starfield".&nbsp; Starfield is GoDaddy's parent company and is in Firefox and Thunderbird's list of authorized authorities.&nbsp; </P>
<P>And just like SSL certificates that must be issued by GoDaddy to be authorized, Starfield must issue a similar certificate that describes GoDaddy as a known authorized authority of SSL certificates.</P>
<P>I am going to list the steps first outlined by <A href="http://www.alagad.com/go/blog-entry/getting-rid-of-web-site-certified-by-an-unknown-authority-messages" target=_blank mce_href="http://www.alagad.com/go/blog-entry/getting-rid-of-web-site-certified-by-an-unknown-authority-messages">Doug Hughes</A>, with some modifications and pictures.&nbsp; Below are the set of instructions to get your new GoDaddy SSL certificate installed first.&nbsp; We will tackle the Starfield GoDaddy Intermediate Certificate later.</P>
<OL>
<LI>Copy your GoDaddy certificate into a file named domainname.cer on your web server.&nbsp; The name is arbitrary, but let it end in .cer for simplicity.<BR></LI>
<LI>Click Start -&gt; Run and type <FONT face=System>mmc</FONT> and press Enter.&nbsp; This opens the Microsoft Management Console.<BR></LI>
<LI>Click File -&gt; Add Remove Snap-In.&nbsp; <BR></LI>
<LI>Click Add to open the Add Standalone Snap-In Window<BR></LI>
<LI>Scroll to find the <FONT face=System>Certificates</FONT> snap-in as shown below.&nbsp; Select it and click Add.<BR><BR><IMG style="BORDER-BOTTOM: 0px; BORDER-LEFT: 0px; BORDER-TOP: 0px; BORDER-RIGHT: 0px" border=0 alt=step5 src="/blog/archives/images/GettingGoDaddySSLsworkinginFirefox_13F76/step5.jpg" width=702 height=492 mce_src="/blog/archives/images/GettingGoDaddySSLsworkinginFirefox_13F76/step5.jpg"> <BR></LI>
<LI>In the corresponding wizard, select <FONT face=System>Computer account</FONT> and click Next.<BR><BR><IMG style="BORDER-BOTTOM: 0px; BORDER-LEFT: 0px; BORDER-TOP: 0px; BORDER-RIGHT: 0px" border=0 alt=step6 src="/blog/archives/images/GettingGoDaddySSLsworkinginFirefox_13F76/step6.jpg" width=700 height=492 mce_src="/blog/archives/images/GettingGoDaddySSLsworkinginFirefox_13F76/step6.jpg"> <BR></LI>
<LI>Select <FONT face=System>Local computer</FONT> and click Finish.<BR><BR><IMG style="BORDER-BOTTOM: 0px; BORDER-LEFT: 0px; BORDER-TOP: 0px; BORDER-RIGHT: 0px" border=0 alt=step7 src="/blog/archives/images/GettingGoDaddySSLsworkinginFirefox_13F76/step7.jpg" width=699 height=492 mce_src="/blog/archives/images/GettingGoDaddySSLsworkinginFirefox_13F76/step7.jpg"> <BR></LI>
<LI>Click Close and then Ok.&nbsp; Now you will see the <FONT face=System>Certificates</FONT> snap-in in the MMC.<BR></LI>
<LI>Expand the <FONT face=System>Certificates</FONT> node, right-click on <FONT face=System>Trusted Root Certification Authorities</FONT> and select <FONT face=System>All Tasks -&gt; Import</FONT> as shown below.<BR><BR><IMG style="BORDER-BOTTOM: 0px; BORDER-LEFT: 0px; BORDER-TOP: 0px; BORDER-RIGHT: 0px" border=0 alt=step9 src="/blog/archives/images/GettingGoDaddySSLsworkinginFirefox_13F76/step9.jpg" width=700 height=490 mce_src="/blog/archives/images/GettingGoDaddySSLsworkinginFirefox_13F76/step9.jpg"> <BR></LI>
<LI>Click Next and then select the domainname.cer you created in step 1 above.<BR></LI>
<LI>The next step in the wizard should indicate that the certificates will be placed in the <FONT face=System>Trusted Root Certification Authorities</FONT>.&nbsp; If it does not, you will need to select it by clicking Browse...&nbsp; Once it looks like the below, click Next.<BR><BR><IMG style="BORDER-BOTTOM: 0px; BORDER-LEFT: 0px; BORDER-TOP: 0px; BORDER-RIGHT: 0px" border=0 alt=step11 src="/blog/archives/images/GettingGoDaddySSLsworkinginFirefox_13F76/step11.jpg" width=700 height=490 mce_src="/blog/archives/images/GettingGoDaddySSLsworkinginFirefox_13F76/step11.jpg"> <BR></LI>
<LI>Click Finish on the final page.&nbsp; You should be prompted with a dialog that states the import was successful.<BR></LI>
<LI>Finally, you will need to stop and restart the website that the SSL certificate belongs to for the changes to take affect.</LI></OL>
<P mce_keep="true">&nbsp;</P>
<H3>Final Procedure to install the Intermediate Certificate authority</H3>
<P>Unfortunately, you are not done.&nbsp; The above only installs the GoDaddy certificate in the root trusted root certificates.&nbsp; The client's browser will not authorize it just yet.&nbsp; To finish the process, you will need to install GoDaddy's Starfield version of their Intermediate Certificate.&nbsp; Here is the all important link to go download it:</P>
<P><A title=https://certs.godaddy.com/Repository.go href="https://certs.godaddy.com/Repository.go" mce_href="https://certs.godaddy.com/Repository.go">https://certs.godaddy.com/Repository.go</A></P>
<P>If you obtained your SSL certificate through another party, such as the discounted VeriSign type, you will need to obtain the Intermediate Certificate from your provider.&nbsp; But the steps are identical to resolve.</P>
<P>There are a number of certificates available in the link above.&nbsp; So for simplicity, I downloaded the bundled package that includes all of them named <FONT face=System>Go Daddy PKCS7 Certificate Intermediates Bundle (for Windows IIS)</FONT>.</P>
<P>Note: Take a special notice that this will download a file with the extension of .p7b.</P>
<P>The final step is to get the bundle of certificates installed.&nbsp; You do this by following exactly the steps I outlined above, 1 through 13 all over again.&nbsp; Except on step 10, you will need to filter the Files of type drop-down as shown below.</P>
<P>Note: You only need to perform this process once per server, as it will be installed at the root level of all certificates for the server.&nbsp; So any further GoDaddy SSL certificates installed will pickup the Starfield SSL certificate as the parent company of GoDaddy.</P>
<BLOCKQUOTE>
<P>Step 10 change:</P>
<P><IMG style="BORDER-BOTTOM: 0px; BORDER-LEFT: 0px; BORDER-TOP: 0px; BORDER-RIGHT: 0px" border=0 alt=step10 src="/blog/archives/images/GettingGoDaddySSLsworkinginFirefox_13F76/step10.jpg" width=703 height=550 mce_src="/blog/archives/images/GettingGoDaddySSLsworkinginFirefox_13F76/step10.jpg"> </P></BLOCKQUOTE>
<P>This will now let you browse to the gd_iis_intermediates.p7b file you downloaded from GoDaddy.&nbsp; Follow the rest of the steps exactly.</P>
<H3>Final thoughts</H3>
<P>That is it.&nbsp; Make sure to stop and restart the web site that your new SSL is to take effect on.&nbsp; Or you can do an IISRESET to force an update to all websites.</P>
