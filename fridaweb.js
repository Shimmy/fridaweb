
$( document ).ready(function() {
	console.log( jsondata );
 	var source = $("#request-template").html();
 	var template = Handlebars.compile(source);
 	// Todo: sections to avoid repeating code in template
 	var sections = ["Request", "Response"]
 	var exclude_filters = ["ads.mopub.com","engine.widespace.com", "googleads.g.doubleclick.net", "pagead2.googleadservices.com"];
	$.each(jsondata.trace, function(index,value) {
		var exclude_entry = false;
		$.each(exclude_filters, function(i,filter_str) {
			if (value.request.url.indexOf(filter_str) !== -1) {
				exclude_entry = true;
			}
		});

		if (!exclude_entry) {
			// Todo: detect body type, binary etc.
			try {
				var req_body_json = JSON.stringify(JSON.parse(value.request.body), null, 2); 
			} catch(err) {
				var req_body_json = value.request.body;
			}

			try {
				var resp_body_json = JSON.stringify(JSON.parse(value.response.body), null, 2); 

			} catch(err) {
				var resp_body_json = value.response.body;
			}
			// Template variables
			var context = {id: value.ts, //Timestamp used to make unique ID's in HTML (Bad?)
						  raw_response: JSON.stringify(value.response, null, 2), 
						  raw_request: JSON.stringify(value.request, null, 2), 
						  entry: value, 
						  resp_body_json: resp_body_json, 
						  req_body_json: req_body_json}


			var html = template(context);
			$("#container").append( html );
		}
	});
   

	// Hide the right arrow on load
	$(this).find(".expand").toggle();

	$(".panel-heading").click(function(e) {
		$(this).siblings().toggle();
		$(this).find(".expanded, .expand").toggle();
	})

	$(".title").click(function(e) {
		$(this).next().toggle();
		$(this).find(".expanded, .expand").toggle();
	})

});
