document.writeln('<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js" type="text/javascript"></sc'+'ript>');
document.writeln('<script src="http://d3js.org/d3.v3.min.js"></sc'+'ript>')
document.writeln('<script src="http://d3js.org/topojson.v1.min.js"></sc'+'ript>')

dataCall = {
	getData: function(callback) {
		var result, name, time, longitude, latitude, depth, depthUnc, mag, magUnc;
		var quake, data;
		data = [ ];
		$.ajax({
			type: "GET",
			url: "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.quakeml",
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
							longitude = $(this).find("longitude value").text();
							latitude = $(this).find("latitude value").text();
							depth = $(this).find("depth value").text();
							depthUnc = $(this).find("depth uncertainty").text();
						});

						$(this).find("magnitude").each(function() {
							mag = $(this).find("mag value").text();
							magUnc = $(this).find("mag uncertainty").text();
						});

						quake = new Array();
						quake.push(name);
						quake.push(time);
						quake.push(longitude);
						quake.push(latitude);
						quake.push(depth);
						quake.push(depthUnc);
						quake.push(mag);
						quake.push(magUnc);

						data.push(quake);
					});
				});



				callback.call(this, data);
			},
			error: function(xml) {
				alert(xml.status + ' ' + xml.statusText);
				return 0;
			}
		}).done(function(result) {

			map();

		});

	}
}
