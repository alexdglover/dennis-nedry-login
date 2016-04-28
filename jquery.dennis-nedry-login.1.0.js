/*
 * jQuery Raptorize Plugin 1.0
 * www.ZURB.com/playground
 * Copyright 2010, ZURB
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/


(function($) {

    $.fn.launchDennisNedry = function(options) {

        //Yo' defaults
        var defaults = {  
            enterOn: 'click', //timer, konami-code, click
            delayTime: 5000 //time before nedry pops up on timer mode
            };  
        
        //Extend those options
        var options = $.extend(defaults, options); 
	
        return this.each(function() {

			var _this = $(this);
			var audioSupported = false;
			//Stupid Browser Checking which should be in jQuery Support
			if ($.browser.mozilla && $.browser.version.substr(0, 5) >= "1.9.2" || $.browser.webkit) { 
				audioSupported = true;
			}
			
			//Nedry Vars
			var nedryImageMarkup = '<img id="elNedry" style="display: none" src="dennis.png" />'
			var nedryAudioMarkup = '<audio id="elYoudidntsaythemagicword" preload="auto"><source src="youdidntsaythemagicword.mp3" /></audio>';	
			var locked = false;
			
			//Append nedry and Style
			$('body').append(nedryImageMarkup);
 			if(audioSupported) { $('body').append(nedryAudioMarkup); }
			var nedry = $('#elNedry').css({
				"position":"fixed",
				"bottom": "-700px",
				"right" : "0",
				"display" : "block"
			})
			
			// Animating Code
			function init() {
				locked = true;
			
				//Sound Hilarity
				if(audioSupported) { 
					function playSound() {
						document.getElementById('elYoudidntsaythemagicword').play();
					}
					playSound();
				}
								
				// Movement Hilarity	
				nedry.animate({
					"bottom" : "0"
				}, function() { 			
					$(this).animate({
						"bottom" : "-130px"
					}, 100, function() {
						var offset = (($(this).position().left)+400);
						$(this).delay(300).animate({
							"right" : offset
						}, 2200, function() {
							nedry = $('#elNedry').css({
								"bottom": "-700px",
								"right" : "0"
							})
							locked = false;
						})
					});
				});
			}
			
			
			//Determine Entrance
			if(options.enterOn == 'timer') {
				setTimeout(init, options.delayTime);
			} else if(options.enterOn == 'click') {
				_this.bind('click', function(e) {
					e.preventDefault();
					if(!locked) {
						init();
					}
				})
			} else if(options.enterOn == 'konami-code'){
			    var kkeys = [], konami = "38,38,40,40,37,39,37,39,66,65";
			    $(window).bind("keydown.raptorz", function(e){
			        kkeys.push( e.keyCode );
			        if ( kkeys.toString().indexOf( konami ) >= 0 ) {
			        	init();
			        	$(window).unbind('keydown.raptorz');
			        }
			    }, true);
	
			}
			
        });//each call
    }//orbit plugin call
})(jQuery);

