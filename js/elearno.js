/******************************
*  Built by Islam AlZatary
*  Please let me know if you need to use this script.	
*  Website: www.islamzatary.com
*  Twitter: @islamzatary
*******************************/

$("document").ready(function() {
	$('[data-toggle="modal"]').click(function(e) {
		e.preventDefault();
        if($('#prmModal').attr('aria-hidden'))
        {
            var url = $(this).attr('href');
            if (url.indexOf('#') == 0)
            {
                $(url).modal('open');
            } else {
				var modal_title = $(this).attr("data-modal-title");
				//$('.modal-title').html(data);
                $.get(url, function(data){
					alert(data);
                    $('.modal-body').html(data);
                });
            }
        }
    });
		
	// Select Audio Object
	window.audio_ob = document.getElementById('slide_audio');
	// Audio Duration
	window.audio_dur = audio_ob.duration;
	// Slides in Array
	window.slides_arr = new Array();
	window.slides_arr_items = new Array();
	window.slides_duration = new Array();
	window.slides_duration_sum = 0;
	if ($(".slide_item").length) {
		// Loop over the slides, read the slide duration and the elemnt in array
		for ( var i=0; i < $(".slide_item").length; i++) {
			//Two Dimentional Array Contain ( Duration for Item, Item ID ).
			slides_arr[i] = Array($(".slide_item").eq(i).attr("id"),$(".slide_item").eq(i).data("duration"),$(".slide_item").eq(i).data("effect"));
			slides_duration[i] = Array($(".slide_item").eq(i).attr("id"),$(".slide_item").eq(i).data("duration"));
			slides_duration_sum =  $(".slide_item").eq(i).find(".course-duration").data("item-duration");
			// How many sub slides in the slide
			var sub_items_length = $(".slide_item").eq(i).find("subslide").length;
			if (sub_items_length) {
				// Empty slides_arr_items Array
				slides_arr_items = [];
				for ( var j=0; j < sub_items_length; j++) {
					slides_arr_items[j] = Array($(".slide_item").eq(i).find("subslide").eq(j).attr("id"),$(".slide_item").eq(i).find("subslide").eq(j).data("duration"));
					
				}
				slides_arr[i].push(slides_arr_items);
				slides_duration[i].push(slides_duration_sum);
			} else {
				slides_arr[i].push([]);
				slides_duration[i].push([]);
			}
		}
	}
	//console.log(slides_duration);
	// Old Slide
	var old_slide = 0;
	// Array length
	var slides_arr_len = slides_arr.length;
	// Hide Cover Letter page when play
	audio_ob.addEventListener('play', function(){
		$(".cover_letter").fadeOut("slow");
	}, false);
	// Show Cover Letter page when play
	audio_ob.addEventListener('ended', function(){
		$(".cover_letter").fadeIn("slow");
	}, false);
	audio_ob.addEventListener('timeupdate', function(){
		var now_sec = parseInt(audio_ob.currentTime);
		if ( now_sec > old_slide) {
			showSlides(now_sec);
		}
		old_slide = now_sec;
		
	}, false);
	audio_ob.addEventListener('seeking', function(){
		return false;
	}, false);
	$(".play_slideshow").on("click",function(){
		audio_ob.play();
	});
	
	$(".play-btn").on("click",function () {
	  if (audio_ob.paused || audio_ob.ended) {
		if (audio_ob.ended) {
		  audio_ob.currentTime = 0;
		}
		this.innerHTML = '&#x2590;&#x2590;'; // &#x2590;&#x2590; doesn't need escaping here
		this.title = 'pause';
		audio_ob.play();
	  } else {
		this.innerHTML = '&#x25BA;'; // &#x25BA;
		this.title = 'play';
		audio_ob.pause();
	  }
	});
	
	function showSlides(now) {
		for( var j=0;j<slides_arr_len;j++) {
			// previous slide duration
			var prev_slide = 0;// first slide duration
			if (j>0){
				var prev_slide = parseInt(slides_arr[j-1][1]/1000);
			}
			// take current slide duration
			now_slide = parseInt(slides_arr[j][1]/1000);
			if ( now > prev_slide && now < now_slide ) {
				// display current slide
				$("#"+slides_arr[j][0]).fadeIn();
				// sub slide if exist
				sub_slide_arr = slides_arr[j][3];
				if (sub_slide_arr.length) {
					// loop sub slide in side main slide
					for (var m=0;m<sub_slide_arr.length;m++) {
						// previous sub slide duration + previous main slide duration
						var prev_sub_slide = 0+prev_slide;
						if (m>0){
							var prev_sub_slide = parseInt(sub_slide_arr[m-1][1]/1000)+prev_slide;
						}
						// current sub slide duration + sub slide duration
						now_sub_slide = parseInt(sub_slide_arr[m][1]/1000)+prev_slide;
						if (now>prev_sub_slide && now<now_sub_slide) {
							// display current sub slide
							$("#"+slides_arr[j][0]).find("#"+sub_slide_arr[m][0]+" .slide_sub_item").fadeIn("fast");
						}
						//if ( (m == (sub_slide_arr.length-1)) && (now>prev_sub_slide && now<now_sub_slide)) {
						//console.log("m "+m+" >>>> "+"now "+now+" now_sub_slide "+now_sub_slide);
						if ( (m == (sub_slide_arr.length-1)) && (now>prev_sub_slide && now<now_sub_slide)) {
							//console.log("m "+m+" >>>> "+"now "+(now-1)+" now_sub_slide "+now_sub_slide);
							if (now==(now_sub_slide-1)) {
								$("#"+slides_arr[j][0]).find(".next_item, .prev_item").fadeIn("fast");
								audio_ob.pause();
							}
						}
					}
				}
			} else {
				// hide current slide
				$("#"+slides_arr[j][0]).fadeOut("fast");
			}
		}
	}
	
	
	/**************** Check Answers ******************/
	$(".quiz1").on("click", function(){
		var name_checked=$("#quiz1").find("input[type='radio']:checked").val();
		if(typeof name_checked !="undefined"){
			if(name_checked=="a1") {
				go_to_specific_time(282,310);
			} else {
				go_to_specific_time(310,340);
			}
		} else {
			alert("Please Choose Answer!!");
		}
	  return false;
	});
	/*************** Disable Right Click **************/
	$(document).bind("contextmenu", function(event) {
		event.preventDefault();
		$("<div class='custom-menu'>Custom menu</div>")
			.appendTo("body")
			.css({top: event.pageY + "px", left: event.pageX + "px"});
	});
});
//// Go To Specific Item
function go_to_course(course) {
	//audio_ob.pause();
	//console.log(course);
	var slide_block = $(".slide_items");
	if(course==1 || course=="next") {
		audio_ob.play();
	} else {
		if (typeof course !== "undefined" && course !== "") {
			slide_block.find(".slide_item").hide();
			slide_block.find("#item"+course+"").show();
			var cureent_item_dur_arr = slides_arr[(course-1)][3];
			srt_course_time = (slides_duration[(course-1)][1]/1000)-(slides_duration[(course-1)][2]/1000);
			audio_ob.currentTime = srt_course_time;
			//console.log(audio_ob.currentTime);
			audio_ob.addEventListener("canplay",function() { 
					audio_ob.play();
			});
		}
	}
	return false;
}
function go_to_specific_time(st_time, nd_time) {
	if (typeof st_time !== "undefined" && st_time !== "") {
		audio_ob.currentTime = st_time;
		console.log(audio_ob.currentTime);
		audio_ob.addEventListener("canplay",function() { 
				audio_ob.play();
		});
		audio_ob.ontimeupdate = function() {
		if (audio_ob.currentTime >= nd_time) {
			audio_ob.pause();
		  }
		};
	}
	return false;
}