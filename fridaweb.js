
$( document ).ready(function() {
   console.log( jsondata );
 	var source = $("#request-template").html();
 	var template = Handlebars.compile(source);

	$.each(jsondata.trace, function(index,value) {

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

		var context = {entry: value, resp_body_json: resp_body_json, req_body_json: req_body_json}
		var html = template(context);
		$("#container").append( html );
	});
   
   $(".panel-heading").click(function(e) {
   	$(this).siblings().toggle();
   })
   $(".title").click(function(e) {
   	$(this).next().toggle();
   })

});
