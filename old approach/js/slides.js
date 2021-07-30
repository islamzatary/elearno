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
							<img src='"+data.slide_info['cover_letter']+"' alt='"+data.slide_info['cover_letter']+"' class='img-thumbnail' /> \
							<span class='play_slideshow'></span> \
					</div><br class='clearfix' />";
				$(".slider_title_h1").html(data.slide_info['Slide_title']);
				$.each(data.slide_items, function (entryIndex, entry) {
					progress += entry['duration_s'];
					block_output += "<div id='item"+entry['slide_id']+"'data-duration='"+progress+"' data-effect='"+entry['effect_type']+"' class='slide_item hide_o center-block' draggable='true'> \
										<h2>"+entry['slide_title']+"</h2><span class='slide_order'>"+entry['slide_order']+"</span>";
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
					block_output += "</div>";
				});
			block_output += "</div>";
			block_output += "<br class='clearfix' /> \
								<div class=''>\
									<audio id='slide_audio' controls> \
										<source src='audio/"+data.slide_info['audio_name']+"' type='audio/mp4'> \
									</audio> \
								</div>";
				block_output += '<div class="progress">';
				$.each(data.slide_items, function (entryIndex2, entry2) {
					duration_s = (entry2['duration_s']/progress)*100;
					block_output += '<div class="progress-bar progress-bar-sep" style="width: '+duration_s+'%"> \
										<span class="sr-only1">s '+entryIndex2+'</span> \
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