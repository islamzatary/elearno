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
	var audio_ob = document.getElementById('slide_audio');
	// Audio Duration
	var audio_dur = audio_ob.duration;
	// Slides in Array
	var slides_arr = new Array();
	var slides_arr_items = new Array();
	if ($(".slide_item").length) {
		// Loop over the slides, read the slide duration and the elemnt in array
		for ( var i=0; i < $(".slide_item").length; i++) {
			//Two Dimentional Array Contain ( Duration for Item, Item ID ).
			slides_arr[i] = Array($(".slide_item").eq(i).attr("id"),$(".slide_item").eq(i).data("duration"),$(".slide_item").eq(i).data("effect"));
			// How many sub slides in the slide
			var sub_items_length = $(".slide_item").eq(i).find("subslide").length;
			if (sub_items_length) {
				// Empty slides_arr_items Array
				slides_arr_items = [];
				for ( var j=0; j < sub_items_length; j++) {
					slides_arr_items[j] = Array($(".slide_item").eq(i).find("subslide").eq(j).attr("id"),$(".slide_item").eq(i).find("subslide").eq(j).data("duration"));
				}
				slides_arr[i].push(slides_arr_items);
			} else {
				slides_arr[i].push([]);
			}
		}
	}
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
	$(".play_slideshow").on("click",function(){
		audio_ob.play();
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
					}
				}
			} else {
				// hide current slide
				$("#"+slides_arr[j][0]).fadeOut("fast");
			}
		}
	}
});