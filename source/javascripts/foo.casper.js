( function() {
	var is_webkit = navigator.userAgent.toLowerCase().indexOf( 'webkit' ) > -1,
	    is_opera  = navigator.userAgent.toLowerCase().indexOf( 'opera' )  > -1,
	    is_ie     = navigator.userAgent.toLowerCase().indexOf( 'msie' )   > -1;

	if ( ( is_webkit || is_opera || is_ie ) && 'undefined' !== typeof( document.getElementById ) ) {
		var eventMethod = ( window.addEventListener ) ? 'addEventListener' : 'attachEvent';
		window[ eventMethod ]( 'hashchange', function() {
			var element = document.getElementById( location.hash.substring( 1 ) );

			if ( element ) {
				if ( ! /^(?:a|select|input|button|textarea)$/i.test( element.tagName ) )
					element.tabIndex = -1;

				element.focus();
			}
		}, false );
	}
})();

/*! pace 0.4.10 */
(function(){var a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L=[].slice,M={}.hasOwnProperty,N=function(a,b){function c(){this.constructor=a}for(var d in b)M.call(b,d)&&(a[d]=b[d]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a},O=[].indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(b in this&&this[b]===a)return b;return-1};q={catchupTime:500,initialRate:.03,minTime:500,ghostTime:250,maxProgressPerFrame:10,easeFactor:1.25,startOnPageLoad:!0,restartOnPushState:!0,restartOnBackboneRoute:!0,target:"body",elements:{checkInterval:100,selectors:["body"]},eventLag:{minSamples:10},ajax:{trackMethods:["GET"],trackWebSockets:!0}},y=function(){var a;return null!=(a="undefined"!=typeof performance&&null!==performance?"function"==typeof performance.now?performance.now():void 0:void 0)?a:+new Date},A=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame,p=window.cancelAnimationFrame||window.mozCancelAnimationFrame,null==A&&(A=function(a){return setTimeout(a,50)},p=function(a){return clearTimeout(a)}),C=function(a){var b,c;return b=y(),c=function(){var d;return d=y()-b,b=y(),a(d,function(){return A(c)})},c()},B=function(){var a,b,c;return c=arguments[0],b=arguments[1],a=3<=arguments.length?L.call(arguments,2):[],"function"==typeof c[b]?c[b].apply(c,a):c[b]},r=function(){var a,b,c,d,e,f,g;for(b=arguments[0],d=2<=arguments.length?L.call(arguments,1):[],f=0,g=d.length;g>f;f++)if(c=d[f])for(a in c)M.call(c,a)&&(e=c[a],null!=b[a]&&"object"==typeof b[a]&&null!=e&&"object"==typeof e?r(b[a],e):b[a]=e);return b},u=function(a,b){var c,d,e;if(null==a&&(a="options"),null==b&&(b=!0),e=document.querySelector("[data-pace-"+a+"]")){if(c=e.getAttribute("data-pace-"+a),!b)return c;try{return JSON.parse(c)}catch(f){return d=f,"undefined"!=typeof console&&null!==console?console.error("Error parsing inline pace options",d):void 0}}},null==window.Pace&&(window.Pace={}),z=Pace.options=r(q,window.paceOptions,u()),b=function(){function a(){this.progress=0}return a.prototype.getElement=function(){var a;return null==this.el&&(this.el=document.createElement("div"),this.el.className="pace pace-active",this.el.innerHTML='<div class="pace-progress">\n  <div class="pace-progress-inner"></div>\n</div>\n<div class="pace-activity"></div>',a=document.querySelector(z.target),null!=a.firstChild?a.insertBefore(this.el,a.firstChild):a.appendChild(this.el)),this.el},a.prototype.finish=function(){var a;return a=this.getElement(),a.className=a.className.replace("pace-active",""),a.className+=" pace-inactive"},a.prototype.update=function(a){return this.progress=a,this.render()},a.prototype.destroy=function(){return this.getElement().parentNode.removeChild(this.getElement()),this.el=void 0},a.prototype.render=function(){var a,b;return null==document.querySelector(z.target)?!1:(a=this.getElement(),a.children[0].style.width=""+this.progress+"%",(!this.lastRenderedProgress||0|(this.lastRenderedProgress|0!==this.progress))&&(a.setAttribute("data-progress-text",""+(0|this.progress)+"%"),this.progress>=100?b="99":(b=this.progress<10?"0":"",b+=0|this.progress),a.setAttribute("data-progress",""+b)),this.lastRenderedProgress=this.progress)},a.prototype.done=function(){return this.progress>=100},a}(),g=function(){function a(){this.bindings={}}return a.prototype.trigger=function(a,b){var c,d,e,f,g;if(null!=this.bindings[a]){for(f=this.bindings[a],g=[],d=0,e=f.length;e>d;d++)c=f[d],g.push(c.call(this,b));return g}},a.prototype.on=function(a,b){var c;return null==(c=this.bindings)[a]&&(c[a]=[]),this.bindings[a].push(b)},a}(),I=window.XMLHttpRequest,H=window.XDomainRequest,G=window.WebSocket,s=function(a,b){var c,d,e,f;f=[];for(d in b.prototype)try{e=b.prototype[d],null==a[d]&&"function"!=typeof e?f.push(a[d]=e):f.push(void 0)}catch(g){c=g}return f},h=function(a){function b(){var a,c=this;b.__super__.constructor.apply(this,arguments),a=function(a){var b;return b=a.open,a.open=function(d,e){var f;return f=(null!=d?d:"GET").toUpperCase(),O.call(z.ajax.trackMethods,f)>=0&&c.trigger("request",{type:d,url:e,request:a}),b.apply(a,arguments)}},window.XMLHttpRequest=function(b){var c;return c=new I(b),a(c),c},s(window.XMLHttpRequest,I),null!=H&&(window.XDomainRequest=function(){var b;return b=new H,a(b),b},s(window.XDomainRequest,H)),null!=G&&z.ajax.trackWebSockets&&(window.WebSocket=function(a,b){var d;return d=new G(a,b),c.trigger("request",{type:"socket",url:a,protocols:b,request:d}),d},s(window.WebSocket,G))}return N(b,a),b}(g),x=new h,a=function(){function a(){var a=this;this.elements=[],x.on("request",function(){return a.watch.apply(a,arguments)})}return a.prototype.watch=function(a){var b,c,d;return d=a.type,b=a.request,c="socket"===d?new k(b):new l(b),this.elements.push(c)},a}(),l=function(){function a(a){var b,c,d,e,f,g,h=this;if(this.progress=0,null!=window.ProgressEvent)for(c=null,a.addEventListener("progress",function(a){return h.progress=a.lengthComputable?100*a.loaded/a.total:h.progress+(100-h.progress)/2}),g=["load","abort","timeout","error"],d=0,e=g.length;e>d;d++)b=g[d],a.addEventListener(b,function(){return h.progress=100});else f=a.onreadystatechange,a.onreadystatechange=function(){var b;return 0===(b=a.readyState)||4===b?h.progress=100:3===a.readyState&&(h.progress=50),"function"==typeof f?f.apply(null,arguments):void 0}}return a}(),k=function(){function a(a){var b,c,d,e,f=this;for(this.progress=0,e=["error","open"],c=0,d=e.length;d>c;c++)b=e[c],a.addEventListener(b,function(){return f.progress=100})}return a}(),d=function(){function a(a){var b,c,d,f;for(null==a&&(a={}),this.elements=[],null==a.selectors&&(a.selectors=[]),f=a.selectors,c=0,d=f.length;d>c;c++)b=f[c],this.elements.push(new e(b))}return a}(),e=function(){function a(a){this.selector=a,this.progress=0,this.check()}return a.prototype.check=function(){var a=this;return document.querySelector(this.selector)?this.done():setTimeout(function(){return a.check()},z.elements.checkInterval)},a.prototype.done=function(){return this.progress=100},a}(),c=function(){function a(){var a,b,c=this;this.progress=null!=(b=this.states[document.readyState])?b:100,a=document.onreadystatechange,document.onreadystatechange=function(){return null!=c.states[document.readyState]&&(c.progress=c.states[document.readyState]),"function"==typeof a?a.apply(null,arguments):void 0}}return a.prototype.states={loading:0,interactive:50,complete:100},a}(),f=function(){function a(){var a,b,c,d=this;this.progress=0,a=0,c=0,b=y(),setInterval(function(){var e;return e=y()-b-50,b=y(),a+=(e-a)/15,c++>z.eventLag.minSamples&&Math.abs(a)<3&&(a=0),d.progress=100*(3/(a+3))},50)}return a}(),j=function(){function a(a){this.source=a,this.last=this.sinceLastUpdate=0,this.rate=z.initialRate,this.catchup=0,this.progress=this.lastProgress=0,null!=this.source&&(this.progress=B(this.source,"progress"))}return a.prototype.tick=function(a,b){var c;return null==b&&(b=B(this.source,"progress")),b>=100&&(this.done=!0),b===this.last?this.sinceLastUpdate+=a:(this.sinceLastUpdate&&(this.rate=(b-this.last)/this.sinceLastUpdate),this.catchup=(b-this.progress)/z.catchupTime,this.sinceLastUpdate=0,this.last=b),b>this.progress&&(this.progress+=this.catchup*a),c=1-Math.pow(this.progress/100,z.easeFactor),this.progress+=c*this.rate*a,this.progress=Math.min(this.lastProgress+z.maxProgressPerFrame,this.progress),this.progress=Math.max(0,this.progress),this.progress=Math.min(100,this.progress),this.lastProgress=this.progress,this.progress},a}(),E=null,D=null,n=null,F=null,m=null,o=null,v=function(){return z.restartOnPushState?Pace.restart():void 0},null!=window.history.pushState&&(J=window.history.pushState,window.history.pushState=function(){return v(),J.apply(window.history,arguments)}),null!=window.history.replaceState&&(K=window.history.replaceState,window.history.replaceState=function(){return v(),K.apply(window.history,arguments)}),t=!0,z.restartOnBackboneRoute&&setTimeout(function(){return null!=window.Backbone?Backbone.history.on("route",function(a,b){var c,d,e,f,g;if(d=z.restartOnBackboneRoute){if(t)return t=!1,void 0;if("object"==typeof d){for(g=[],e=0,f=d.length;f>e;e++)if(c=d[e],c===b){Pace.restart();break}return g}return Pace.restart()}}):void 0},0),i={ajax:a,elements:d,document:c,eventLag:f},(w=function(){var a,c,d,e,f,g,h,k,l;for(Pace.sources=E=[],h=["ajax","elements","document","eventLag"],d=0,f=h.length;f>d;d++)c=h[d],z[c]!==!1&&E.push(new i[c](z[c]));for(l=null!=(k=z.extraSources)?k:[],e=0,g=l.length;g>e;e++)a=l[e],E.push(new a(z));return Pace.bar=n=new b,D=[],F=new j})(),Pace.stop=function(){return n.destroy(),o=!0,null!=m&&("function"==typeof p&&p(m),m=null),w()},Pace.restart=function(){return Pace.stop(),Pace.go()},Pace.go=function(){return n.render(),o=!1,m=C(function(a,b){var c,d,e,f,g,h,i,k,l,m,p,q,r,s,t,u,v,w;for(k=100-n.progress,d=r=0,e=!0,h=s=0,u=E.length;u>s;h=++s)for(p=E[h],m=null!=D[h]?D[h]:D[h]=[],g=null!=(w=p.elements)?w:[p],i=t=0,v=g.length;v>t;i=++t)f=g[i],l=null!=m[i]?m[i]:m[i]=new j(f),e&=l.done,l.done||(d++,r+=l.tick(a));return c=r/d,n.update(F.tick(a,c)),q=y(),n.done()||e||o?(n.update(100),setTimeout(function(){return n.finish()},Math.max(z.ghostTime,Math.min(z.minTime,y()-q)))):b()})},Pace.start=function(a){return r(z,a),n.render(),document.querySelector(".pace")?Pace.go():setTimeout(Pace.start,50)},"function"==typeof define&&define.amd?define(function(){return Pace}):"object"==typeof exports?module.exports=Pace:z.startOnPageLoad&&Pace.start()}).call(this);

/*
// @name: Responsive-img.js
// @version: 1.1
// 
// Copyright 2013-2014 Koen Vendrik, http://kvendrik.com
// Licensed under the MIT license
*/function makeImagesResponsive(){var e=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,t=document.getElementsByTagName("body")[0].getElementsByTagName("img");if(t.length===0)return;var n;t[0].hasAttribute?n=function(e,t){return e.hasAttribute(t)}:n=function(e,t){return e.getAttribute(t)!==null};var r=window.devicePixelRatio?window.devicePixelRatio>=1.2?1:0:0;for(var i=0;i<t.length;i++){var s=t[i],o=r&&n(s,"data-src2x")?"data-src2x":"data-src",u=r&&n(s,"data-src-base2x")?"data-src-base2x":"data-src-base";s.onload=function(q){this.style.opacity='1';};if(!n(s,o))continue;var a=n(s,u)?s.getAttribute(u):"",f=s.getAttribute(o),l=f.split(",");for(var c=0;c<l.length;c++){var h=l[c].replace(":","||").split("||"),p=h[0],d=h[1],v,m;if(p.indexOf("<")!==-1){v=p.split("<");if(l[c-1]){var g=l[c-1].split(/:(.+)/),y=g[0].split("<");m=e<=v[1]&&e>y[1]}else m=e<=v[1]}else{v=p.split(">");if(l[c+1]){var b=l[c+1].split(/:(.+)/),w=b[0].split(">");m=e>=v[1]&&e<w[1]}else m=e>=v[1]}if(m){var E=d.indexOf("//")!==-1?1:0,S;E===1?S=d:S=a+d;s.src!==S&&s.setAttribute("src",S);break}}}}if(window.addEventListener){window.addEventListener("load",makeImagesResponsive,!1);window.addEventListener("resize",makeImagesResponsive,!1)}else{window.attachEvent("onload",makeImagesResponsive);window.attachEvent("onresize",makeImagesResponsive)};


/**
 * Main JS file for Casper behaviours
 */

/*globals jQuery, document */
//(function ($) {
//    "use strict";

//    $(document).ready(function(){
        //$(".post-content").fitVids();
//    });

//}(jQuery));


/***
 * Eric's own twists to this design
 ***/
var eduncan911 = (function() {
	var playerIndex = 0;

	var init = function() {

		// wire up the posts and pages content
		posts.init();

		// handle all audio players
		audio.init();

	};

	var posts = (function() {
		var disqusPublicKey = 'p5ah01gnHyXhmQgrsBgkPQlcXA8QuHqiPEDSSiCW1ZmBlyqpc7pUMmUtaXtwWaxk';
		var disqusShortname = 'eduncan911com';

		var init = function() {

			bindMetadataClickEvents();
			displayCommentCounts();
		
		};

		var displayCommentCounts = function() {
			// are we on a post index page?  if not, exit
			var commentCountsAnchors = $(".comment-count");
			if (typeof commentCountsAnchors === 'undefined')
				return;

			// get an array of all posts we want comment counts for
			var urlArray = [];
			commentCountsAnchors.each(function () {
			  var url = $(this).attr('data-disqus-url');
			  urlArray.push('link:' + url);
			});
			if (urlArray.length == 0)
				return;

			// reach out to disqus with out collection
			$.ajax({
		    type: 'GET',
		    url: "https://disqus.com/api/3.0/threads/set.jsonp",
		    data: { api_key: disqusPublicKey, forum : disqusShortname, thread : urlArray },
		    cache: false,
		    dataType: 'jsonp',
		    success: function (result) {
		      for (var i in result.response) {
		        var countText = " comments";
		        var count = result.response[i].posts;
		        if (count == 1)
		          countText = " comment";
		        $('a[data-disqus-url="' + result.response[i].link + '"]').html(count + countText);
		      }
		    }
		  });
		};

		var bindMetadataClickEvents = function() {
			// wire up any meta data for the page/post
			$(".collapsable").each(function () {
				$(".collapsable-trigger", this).click(function() {
					$(this).parents(".collapsable:first").find(".post-metadata").toggle();
					return false;
				})
			});
		};

		return {
			init: init
		};
	})();

	var audio = (function() {
		var init = function() {
			$("audio").each(function () {
				var a = $(this);
				a.attr("id", "audio" + playerIndex);
				var m = a.attr("data-mins");
				var s = a.attr("data-secs");
				var t = a.attr("data-title");
				a.before(renderTemplate(m, s, t, a.attr("id")));
				playerIndex++;
				bndEvents(this);
			});
		};

		var renderTemplate = function(minutes, seconds, title, id) {
			return '\
<div class="audioplayer">\
	<div class="button" id="' + id + '_button"><svg id="' + id + '_svg" viewBox="0 0 64 64" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" version="1.1">\
    <defs><style><![CDATA[ .hidden { display: none; } ]]></style></defs>\
    <g id="play"><path id="play" d="M 0,0 64,32 0,64 z" /></g>\
    <g id="stop" class="hidden"><path id="stop" d="M 0,64 H 64 V 0 H 0 z" /></g></svg></div>\
	<div class="audioinfo">\
		<div class="audiotext">\
			<span class="audiocallout">Listen to the audio<br /></span>\
			<span class="audiotitle">' + title +'</span>\
		</div>\
		<div class="audiotime">\
		' + minutes + ' min ' + seconds + ' sec<br />\
			<span class="audioposition" id="' + id + '_audioposition">00:00:00</span>\
		</div>\
	</div>\
</div><div class="clear"></div>';
		};
		/*
		<svg viewBox="0 0 64 64" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" version="1.1">
		  <g><path id="stop" style="color:#004225" d="M 0,64 H 64 V 0 H 0 z"/></g>
		</svg>
		*/
		var bndEvents = function(audio) {
			if (typeof audio === 'undefined') { alert('oops, nothing found'); return; };
			var index = $(audio).attr("id");
			$("#" + index + "_button").click(function(){ audio.play(); return false; });

			$(audio).bind("timeupdate", function() {
				var time = Math.floor(audio.currentTime);
				$("#" + index + "_audioposition").text(formatSecondsAsTime(time));
			});
			$(audio).bind("play", function() {
				$("#" + index + "_button").click(function(){ audio.pause(); return false; });
				$("#" + index + "_svg g#play").attr("class", "hidden");
				$("#" + index + "_svg g#stop").attr("class", "");
			});
			$(audio).bind("pause ended error", function() {
				$("#" + index + "_button").click(function(){ audio.play(); return false; });
				$("#" + index + "_svg g#play").attr("class", "");
				$("#" + index + "_svg g#stop").attr("class", "hidden");
			});
		};
		var formatSecondsAsTime = function (secs) {
		  var hr  = Math.floor(secs / 3600);
		  var min = Math.floor((secs - (hr * 3600))/60);
		  var sec = Math.floor(secs - (hr * 3600) -  (min * 60));
		  if (hr < 10) hr = "0" + hr;
		  if (min < 10) min = "0" + min; 
		  if (sec < 10) sec  = "0" + sec;
		  return hr + ":" + min + ':' + sec;
		}
		return {
			init: init
		};
	})();

	return {
		init: init
	};
})();
eduncan911.init();