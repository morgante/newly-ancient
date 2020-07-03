var magicArchives_mine = {
	container: null,
	init: function() {
		if($('#magicArchives').length == 0) {
			return;
		}
		
		magicArchives_mine.container = $('#magicArchives');
				
		$('li.headings', magicArchives_mine.container).hide();
		$('#archiveItems', magicArchives_mine.container).css("font-size", "150%");
	}
}

var sidetabs = {
	init: function() {
		$('#sidetabs div.module').css('height', $(window).height());
		
		$('#sidetabs div.module h4 a').click(function() {
			var tab= $(this).parent().parent();

			sidetabs.open( tab );
		});
	},
	open: function( tab ) {
		$('#sidetabs div.module').animate({
			left: "300"
		}, 500, function() {
			$(this).removeClass('active');
		} );
		
		if(tab.hasClass('active') == false) {
			tab.animate({ 
				left: "0"
			}, 500, function() {
				tab.addClass('active');
			} );
			
		} else {
			
		}
		
		
	}
}

var postsSlider = {
	init: function() {
		if($('.pager .the_pages').length == 0) return;
		
		var pages= $('.pager .the_pages a:last-child').eq(1).text();
		
		var page= pages - parseInt($('.pager .the_pages span.current').eq(1).text());
		
		page= page + 1;
		
		var hash= location.hash.replace(/#page=/, "" );
		
		if(hash != '') {
			var page = hash;
		}
		
		// console.log(hash);
		// return;
		
		var updatez = true;
		
		// console.log(updatez);
		// return;
		
		$('.pager .the_pages').hide();
		
		$('.pager .slider').slider({
			min: 1,
			max: pages,
			steps: pages,
			value: page,
			slide: function(e,ui) {
				$(ui.handle).text(ui.value);

				$('.pager .page_selector h4 strong').text(ui.value);

				var id= $(this).parent().parent().attr('id');

				if($('.pager:not(#' + id + ') .slider').slider("value") != ui.value) {
					$('.pager:not(#' + id + ') .slider').slider( 'value', ui.value);	
				}
			},
			change: function(e, ui) {
				$(ui.handle).text(ui.value);
				
				$('.pager .page_selector h4 strong').text(ui.value);

				var id= $(this).parent().parent().attr('id');

				if($('.pager:not(#' + id + ') .slider').slider("value") != ui.value) {
					$('.pager:not(#' + id + ') .slider').slider( 'value', ui.value);	
				}
						
				var page= (parseInt(pages) - parseInt(ui.value)) + 1

				var url= location.href;
				var data= {
					'ajax': 'yes',
					'page': page
				};
				
				spinner.start();
				// return;
				
				$.post(
					url,
					data,
					function(result) {

						$('.pager .previous, .pager .next').removeClass('none');

						if(page == pages) $('.pager .previous').addClass('none');

						if(page == 1) {
							$('.pager .next').addClass('none');
							location.hash= '#';
						} else {
							location.hash= '#page=' + ui.value;
						}

						$('#post_feed').html(result);
						
						spinner.stop();
					}
				);
			}
		});

		postsSlider.controller = $('.pager .slider').eq(0);
			
		postsSlider.controller.slider( "value", postsSlider.controller.slider("value") ); 
				
		$('.pager .next a').click(function() {
			postsSlider.controller.slider( "value", postsSlider.controller.slider("value") + 1); 
			return false;
		});
		
		$('.pager .previous a').click(function() {
			postsSlider.controller.slider( "value", postsSlider.controller.slider("value") - 1);
			return false;
		});
		
		$('.pager .slider .ui-slider-handle').text(page);
	}
}

var carousel= {
	init: function() {
		$('#stories').carousel({
			containerID: "storySlider",
			tabs: $('#stories-nav li.story a')
		});
		
		index = Math.round(Math.random() * ($('#stories li').length - 1) );
		$('#stories').activate( index );
		// $('#stories').activate(0);
	}
}

var comment= {
	init: function() {
		// alert('foo');
	}
}

var search= {
	init: function() {
		$('#branding div.box div#search.lijit #lwp_2_searchbutton').val('Go!');
	}
}

var feeds= {
	init: function() {
		feeds.link= $('#branding div.box a.subscribe');
		feeds.box= $('#subscribe_box');
				
		feeds.link.click(function() {
			feeds.open();
			return false;
		});
	},
	open: function() {
		feeds.box.show();
		
		feeds.box.dialog({
			modal: true,
			bgiframe: true,
			height: 275,
			width: 500,			
			title: "Feed Subscription",
			buttons: {
				"Everything": function() {
					window.location = $('#feed_all').attr('href');
				},
				"Links": function() {
					window.location = $('#feed_links').attr('href');
				},
				"Entries": function() {
					window.location = $('#feed_entries').attr('href');
				},
				"Comments": function() {
					window.location = $('#feed_comments').attr('href');
				},
				"Cancel": function() {
					$(this).dialog("close");
				}
			},
			open: function(event, ui) {
				$('.ui-dialog-overlay').animate({
					opacity: 0.7
				}, "fast");
			}
			
		});
		
		return;
	}
}

// SPINNER
var spinner = {
	start: function() {
		$('#spinner').show();
	},
	stop: function () {
		$('#spinner').hide();
	}
};

$(document).ready(function(){
	carousel.init();
	magicArchives_mine.init();
	sidetabs.init();
	comment.init();
	search.init();
	feeds.init();
	
	postsSlider.init();
	
	$('#magicArchives #archiveControls').addClass('pseudize');
	
	// Enable pseudo-class support
	$('.pseudize > *:first-child').addClass('first-child');
	$('.pseudize > *:last-child').addClass('last-child');
	$('.pseudize > *:odd').addClass('odd');
	$('.pseudize > *:even').addClass('even');
});
