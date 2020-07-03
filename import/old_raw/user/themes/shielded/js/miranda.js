/**
 * Miranda – a very light carousel plugin for jQuery
 *	http://lab.morgante.net/miranda
 * 
 * Copyright (c) 2009 Morgante Pell (http://morgante.net)
 * Licensed under the MIT license
 */

(function($) {
	
	$.fn.carousel = function(options) {
		if($(this).data("carousel") != null) {
			return 'this';
		}
		
		var obj= {
		}
	
		obj.options= $.extend({}, $.fn.carousel.defaults, options);
		obj.element= $(this);
		obj.items= obj.element.children('li');
		
		obj.dimensions = {
			item: {
				height: obj.items.eq(0).outerHeight(),
				width: obj.items.eq(0).outerWidth()
			},
			pane: {
				height: obj.items.eq(0).outerHeight(),
				width: obj.items.eq(0).outerWidth() * obj.options.number
			}
		}
		
		obj.container= $('<div></div>');
		
		if(obj.options.containerID != null) {
			obj.container.attr('id', obj.options.containerID);
		}
		
		obj.container.css({
			overflow: 'hidden',
			position: 'relative',
			height: obj.dimensions.pane.height,
			width: obj.dimensions.pane.width
		});
				
		obj.element.wrap(obj.container);
		
		obj.element.css({
			position: 'absolute',
			left: 0,
			top: 0,
			width: 100000
		});
	
		index= 0;
		
		if(obj.items.filter('.active').length > 0) {
			index= obj.items.index(obj.items.filter('.active'));
		}
	
		$(this).data("carousel", obj);
		
		$(this).activate(index);
		
		if(obj.options.tabs != null) {
			obj.options.tabs.click(function() {
				index= obj.options.tabs.index($(this));
				
				obj.element.activate(index);
				
				return false;
			});
		}
	
		return this;
	}
	
	$.fn.activate = function(index) {
		var obj= $(this).data("carousel");
		
		index= index;
		
		obj.items.removeClass('active');
		obj.items.eq(index).addClass('active');
		
		if(obj.options.tabs != null) {
			obj.options.tabs.parents().removeClass('active');
			obj.options.tabs.eq(index).parent().addClass('active');
		}
		
		obj.element.stop().animate({left: '-' + (obj.dimensions.pane.width * index) + 'px'}, obj.options.time);
		
		return this;
		
		// obj.index= obj.index + 1;
	}
	
	$.fn.carousel.defaults = {
	    number: 1,
		time: 500,
		containerID: null
	};
	
})(jQuery);