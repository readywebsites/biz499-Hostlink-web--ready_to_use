/*
 * jQuery One Page Nav Plugin
 * http://github.com/davist11/jQuery-One-Page-Nav
 *
 * Copyright (c) 2010 Trevor Davis (http://trevordavis.net)
 * Dual licensed under the MIT and GPL licenses.
 * Uses the same license as jQuery, see:
 * http://jquery.org/license
 *
 * @version 3.0.0
 *
 * Example usage:
 * $('#nav').onePageNav({
 *   currentClass: 'current',
 *   changeHash: false,
 *   scrollSpeed: 750
 * });
 */

!function(a,b,c,d){var e=function(d,e){this.elem=d,this.$elem=a(d),this.options=e,this.metadata=this.$elem.data("plugin-options"),this.$win=a(b),this.sections={},this.didScroll=!1,this.$doc=a(c),this.docHeight=this.$doc.height()};e.prototype={defaults:{navItems:"a",currentClass:"current",changeHash:!1,easing:"swing",filter:"",scrollSpeed:750,scrollThreshold:.5,begin:!1,end:!1,scrollChange:!1},init:function(){return this.config=a.extend({},this.defaults,this.options,this.metadata),this.$nav=this.$elem.find(this.config.navItems),""!==this.config.filter&&(this.$nav=this.$nav.filter(this.config.filter)),this.$nav.on("click.onePageNav",a.proxy(this.handleClick,this)),this.getPositions(),this.bindInterval(),this.$win.on("resize.onePageNav",a.proxy(this.getPositions,this)),this},adjustNav:function(a,b){a.$elem.find("."+a.config.currentClass).removeClass(a.config.currentClass),b.addClass(a.config.currentClass)},bindInterval:function(){var b,a=this;a.$win.on("scroll.onePageNav",function(){a.didScroll=!0}),a.t=setInterval(function(){b=a.$doc.height(),a.didScroll&&(a.didScroll=!1,a.scrollChange()),b!==a.docHeight&&(a.docHeight=b,a.getPositions())},250)},getHash:function(a){return a.attr("href").split("#")[1]},getPositions:function(){var c,d,e,b=this;b.$nav.each(function(){c=b.getHash(a(this)),e=a("#"+c),e.length&&(d=e.offset().top,b.sections[c]=Math.round(d))})},getSection:function(a){var b=null,c=Math.round(this.$win.height()*this.config.scrollThreshold);for(var d in this.sections)this.sections[d]-c<a&&(b=d);return b},handleClick:function(c){var d=this,e=a(c.currentTarget),f=e.parent(),g="#"+d.getHash(e);f.hasClass(d.config.currentClass)||(d.config.begin&&d.config.begin(),d.adjustNav(d,f),d.unbindInterval(),d.scrollTo(g,function(){d.config.changeHash&&(b.location.hash=g),d.bindInterval(),d.config.end&&d.config.end()})),c.preventDefault()},scrollChange:function(){var c,a=this.$win.scrollTop(),b=this.getSection(a);null!==b&&(c=this.$elem.find('a[href$="#'+b+'"]').parent(),c.hasClass(this.config.currentClass)||(this.adjustNav(this,c),this.config.scrollChange&&this.config.scrollChange(c)))},scrollTo:function(b,c){var d=a(b).offset().top;a("html, body").animate({scrollTop:d},this.config.scrollSpeed,this.config.easing,c)},unbindInterval:function(){clearInterval(this.t),this.$win.unbind("scroll.onePageNav")}},e.defaults=e.prototype.defaults,a.fn.onePageNav=function(a){return this.each(function(){new e(this,a).init()})}}(jQuery,window,document);