document.writeln('<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js" type="text/javascript"></sc'+'ript>');

function parse() {
	var result, name, time, long, lat, depth, depthUnc, mag, magUnc;
	$.ajax({
		type: "GET",
		url: "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.quakeml",
		dataType: "html",
		success: function(xml) {
			xmlDoc = $.parseXML(xml),
			$xml = $(xmlDoc),
			$title = $xml.find("eventParameters");

			$(xml).find("eventParameters").each(function() {
					$(this).find("event").each(function() {
						name = $(this).find("description text").text();
						$(this).find("origin").each(function() {
							time = $(this).find("time value").text();
							long = $(this).find("longitude value").text();
							lat = $(this).find("latitude value").text();
							depth = $(this).find("depth value").text();
							depthUnc = $(this).find("depth uncertainty").text();
						})
						
						$(this).find("magnitude").each(function() {
							mag = $(this).find("mag value").text();
							magUnc = $(this).find("mag uncertainty").text();
						})

				console.log(name);
				console.log(time);
				console.log(long);
				console.log(lat);
				console.log(depth);
				console.log(depthUnc);
				console.log(mag);
				console.log(magUnc);
				})
			})

			return $xml;
		},
		error: function(xml) {
			alert(xml.status + ' ' + xml.statusText);
			return 0;
		}
	})


}
