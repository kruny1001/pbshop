'use strict';

angular.module('template').controller('FrontUrimium1Controller', ['$scope','$timeout',
	function($scope,$timeout) {
		var allClouds = new TimelineLite(),
			$cloudContainer = $("#cloudContainer");

		var logo = $("#logoImg"),
			topTitle = $("#topTitle"),
			restartBtn = $("#restartBtn"),
			tl = new TimelineLite({paused:true});
		console.log(logo);
		console.log(topTitle);
		tl.from(logo, 0.7, {left:"-=60px", ease:Back.easeOut})
			.from(topTitle, 0.5, {left:"-=60px", ease:Back.easeOut})
			//.from(timelinelite, 0.5, {width:"0px", alpha:0    }, "-=0.02")
			//.staggerFrom(tagline, 0.5, {top:"-=30px", rotation:"-40deg", alpha:0, scale:1.8, ease:Back.easeOut}, 0.2);

		restartBtn.click(function() {
			tl.restart();
		});
		$scope.logo = function(){
			tl.play();
		}

		//show the demoBackground div after DOM is ready and all images loaded
		TweenLite.set($("#demoBackground"), {css:{visibility:"visible"}});


		function initClouds() {
			//loop through creation of 10 clouds
			for(var i = 0; i < 7; i ++){
				//dynamically create a cloud element
				var cloud = $('<div class="cloud"></div>').appendTo($cloudContainer);
				//set its initial position and opacity using GSAP
				TweenLite.set(cloud, {left:-100, top:i*40, opacity:0});
				//create a repeating timeline for this cloud
				var cloudTl = new TimelineMax({repeat:-1});
				//fade opacity to 1
				cloudTl.to(cloud, 0.5, {opacity:1})
					//move cloud across its container div with random duration. Start time = 0
					.to(cloud, 30 + (Math.random() * 8), {left:"100%", ease:Linear.easeNone}, 0)
					//0.5 seconds before timeline ends start fading opacity to 0
					.to(cloud, 0.5, {opacity:0}, "-=0.5")
				//add this cloud's timeline to the allClouds timeline at a random start time.
				allClouds.add(cloudTl, Math.random()*5);
			}
		}

		$timeout(function() {
			initClouds();
		}, 3000);


		var logo = $("#logo2"),
			txtContainer = $("#txtContainer2"),
			restartBtn2 = $("#restartBtn2"),
			tl2,
			progressSlider,
			totalProgressSlider,
			txt;
		function splitText(phrase) {
			var prevLetter, sentence,
				sentence = phrase.split("");
			$.each(sentence, function(index, val) {
				if(val === " "){
					val = "&nbsp;";
				}
				var letter = $("<div/>", {
					id : "txt" + index
				}).addClass('txt2').html(val).appendTo(txtContainer);

				if(prevLetter) {
					$(letter).css("left", ($(prevLetter).position().left + $(letter).width()) + "px");
				};
				prevLetter = letter;
			});
			txt = $(".txt2");
		}

		function buildTimeline() {

			//note this timeline uses 3D transforms which will only work in recent versions of Safari, Chrome, and FireFox. IE10 will support 3D transforms as well. All other browsers simply will not show those properties being tweened.

			TweenLite.set(txtContainer, {css:{perspective:500}});

			tl2 = new TimelineMax({onUpdate:updateUI, repeat:2, repeatDelay:1, yoyo:true});
			tl2.from(logo, 0.5, {left:'-=60px', ease:Back.easeOut});
			tl2.staggerFrom(txt, 0.4, {alpha:0}, 0.06, "textEffect");
			tl2.staggerFrom(txt, 0.8, {rotationY:"-270deg", top:80, transformOrigin: "50% 50% -80", ease:Back.easeOut}, 0.06, "textEffect");
			tl2.staggerTo(txt, 0.6, {rotationX:"360deg", color:"#90e500", transformOrigin:"50% 50% 10"}, 0.02);
		}

		function updateUI() {
			//change slider value
			//progressSlider.slider("value", tl.progress() *100);
			//totalProgressSlider.slider("value", tl.totalProgress() *100);

			//update display of values
//			progressValue.html(tl.progress().toFixed(2));
//			totalProgressValue.html(tl.totalProgress().toFixed(2));
//			timeValue.html(tl.time().toFixed(2));
//			totalTimeValue.html(tl.totalTime().toFixed(2));
		}

		restartBtn2.click(function() {
			//Start playing from a progress of 0.
			tl2.restart();
		});

		function init() {
			splitText("We Hope You Enjoyed the Tour");
			buildTimeline();

			//show the demoBackground div after DOM is ready and all images loaded
			TweenLite.set($("#demoBackground2"), {visibility:"visible"});
		}
		init();

	}
]);