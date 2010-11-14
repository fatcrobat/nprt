Drupal.behaviors.nprtxmlcdata = function (context){
	var $f = $(context).find("#nprt-parser-add-raid-form");
	var $xml = $(context).find("textarea[name=xml]");
	$(context).ready(function(){
		$xml.val("");
	});
	$f.submit(function(){
		var data = $xml.val();
		var encoded = data.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
		$xml.val(encoded);
	});
};