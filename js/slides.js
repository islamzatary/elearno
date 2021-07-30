/******************************
*  Built by Islam AlZatary
*  Please let me know if you need to use this script.	
*  Website: www.islamzatary.com
*  Twitter: @islamzatary
*******************************/

(function( $ ){
	$.fn.drawSlides = function(options){
		var settings = $.extend( {
		  'JsonName'        : 'default.json'
		}, options);
		function draw_slide_item() {
			var block_output = "";
			var progress = 0;
			var progress_item = 0;
			var item_child = "";
			var duration_s = 0;
			var duration_s_item = 0;
			$.ajaxSetup({
				async: false
			});
			block_output += "<div class='slide_items overflow-h'>";
			$.getJSON(''+settings.JsonName+'', function (data) {
				block_output += "<div class='center-block text-center cover_letter'> \
							"+data.slide_info['cover_letter']+" \
							<span class='play_slideshow'></span> \
					</div>";
				$(".slider_title_h1").html(data.slide_info['Slide_title']);
				var item_len = data.slide_items.length;
				var course_id = 0;
				$.each(data.slide_items, function (entryIndex, entry) {
					progress += entry['duration_s'];
					course_id = entry['slide_id'];
					block_output += "<div id='item"+course_id+"' data-duration='"+progress+"' data-effect='"+entry['effect_type']+"' class='slide_item hide_o center-block' draggable='true'> \
										<h2>"+entry['slide_title']+"</h2><span class='slide_order'>"+entry['slide_order']+"</span>";
					block_output += "<i class='hide course-duration' data-item-duration='"+entry['duration_s']+"'></i>"
					/*if (entry['slider_html'] != "") {
						block_output += entry['slider_html'];
					}*/
					if (entry.slide_sub_items != "") {
						$.each(entry.slide_sub_items, function(entryIndexChild, entryC) {
							progress_item += entryC.duration_s;
							//block_output += "<div class='slide_sub_item hide_o' data-duration='"+progress_item+"'>";
							block_output += "<subslide data-duration='"+progress_item+"' id='item_sub_"+entryC.item_id+"'>"+entryC.item_html+"</subslide>";
							//block_output += "</div>";
						});
						progress_item = 0;
					} else {
						if (entry['slider_html'] != "") {
							block_output += entry['slider_html'];
						}
					}
					if (entryIndex == 0) {
						block_output += '<div class="next_item hide_o" onClick="go_to_course(\'next\');"><img src="img/next.png" alt="next" /></div>';
					} else if (entryIndex >= 1 && entryIndex < (item_len-1)) {
						block_output += '<div class="next_item hide_o" onClick="go_to_course(\'next\');"><img src="img/next.png" alt="next" /></div>';
						block_output += '<div class="prev_item hide_o" onClick="go_to_course('+(parseInt(entry['slide_id'])-1)+');"><img src="img/prev.png" alt="prev" /></div>';
					} else {
						block_output += "<div class='prev_item hide_o' onClick='go_to_course('+(parseInt(entry['slide_id'])-1)+');'><img src='img/prev.png' alt='prev' /></div>";
					}
					block_output += "</div>";
				});
			block_output += "</div>";
			block_output += "<br class='clearfix' /> \
								<div class=''>\
									<audio id='slide_audio' preload volume> \
										<source src='audio/"+data.slide_info['audio_name']+"' type='audio/mp4'> \
									</audio> \
									<button class='play-btn btn ' title='play'>&#x25BA;</button/> \
								</div>";
				block_output += '<div class="progress">';
				$.each(data.slide_items, function (entryIndex2, entry2) {
					duration_s = (entry2['duration_s']/progress)*100;
					block_output += '<div class="progress-bar progress-bar-sep" onClick="go_to_course('+entry2['slide_id']+');" style="width: '+duration_s+'%"> \
										<span class="course_item">s '+entryIndex2+'</span> \
										</div>';
				});
				block_output += "</div>";
			});
			$.ajaxSetup({
				async: true
			});
			return block_output;
		}
		return this.html(draw_slide_item());
	};
})( jQuery );