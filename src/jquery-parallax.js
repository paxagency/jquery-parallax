(function ($) {
    $.fn.parallax = function(options) {
    	var el = this;
		var app = {
			speed:20,
			mode:1,
			axis:"Y",
			scale:1,
			index:0,
			delay:1.4,
			blur:0,
			mobile:false,
			ready: function() {
				var self = this;
				this.isMobile = this.checkMobile();
				
				$(el).each(function(){
					 var css = {
						"will-change":"transform",
						"transition":"all "+self.delay+"s cubic-bezier(.165,.84,.44,1)",
					 };
					 if(self.blur) css["filter"] = "blur("+self.blur+"px)";
					 $(this).css(css);
					 self.parallax($(this))
				});
				$(window).scroll(function(){
					$(el).each(function(){
					   self.parallax($(this))
					});
				});
			},
			checkMobile:function() {
			   return ( $(window).width() <= 767 );
			},
			parallax:function(el){
				var self = this;
				var top = $(window).scrollTop();
				var bottom = top + $(window).height();
				var elTop = $(el).offset().top - 20;
				var elBottom = elTop + $(el).height() + 40;
				var botDif = bottom-elTop;
				var topDif = elBottom-top;
				var visible = (botDif>0 && topDif>0) ? 1 : 0;
				var perc = (topDif-botDif)/$(window).height();
				if(visible) self.animate(perc);
				return;
			},
			animate: function(perc) {
				if(this.isMobile && !this.mobile) {
					$(el).attr("styles","");
				} else {
					perc = (this.mode) ? perc : perc*-1;
					n= perc*this.speed;
					$(el).css({
						"z-index":this.index,
						"transform": "scale("+this.scale+") translate"+this.axis+"("+n+"%)"
					});
				}
			}
		}
		if(!options) options = {};
		if(options.speed) app.speed = options.speed;
		if(options.scale) app.scale = options.scale;
		if(options.mode) app.mode = options.mode;
		if(options.index) app.index = options.index;
		if(options.mobile) app.mobile = options.mobile;
		if(options.delay) app.delay = options.delay;
		if(options.axis) app.axis = options.axis;
		if(options.blur) app.blur = options.blur;
		app.ready();
	 };
}(jQuery));

