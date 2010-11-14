Drupal.behaviors.nprttooltip = function(context){
	$('a[rel^=item]').each(function(){
		var $link = $(this);	
		var parts = $link.attr('rel').split('=');
		var id = parts[1];
		var path = Drupal.settings.basePath+'/tooltip/'+id;
		$link.qtip({
			content: {
				text: '<img class="throbber" src="'+Drupal.settings.basePath+'/sites/all/modules/nprt/modules/tooltip/px/throbber.gif" alt="Loading..." />',
				url: path
			},
			style: 'nprt' 
		});
	});
};

$.fn.qtip.styles.nprt = { 
	width: 328,
	paddingLeft: 15,
	paddingRight: 15,
	paddingBottom: 10,
	paddingTop: 5,
	background: 'none',
	color: 'white',
	textAlign: 'left',
	border: {
    	width: 10,
    	radius: 10,
    	color: 'transparent'
	}
};