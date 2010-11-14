<?php 

function nprt_admin_list(){
	return nprt_admin_report_imported_raids_form();
}

function nprt_admin_report_imported_raids_form(){
	$sql =  "SELECT id, DATE_FORMAT (start, '%e. %M %Y ') AS date, zone FROM {nprt_raid}";
	$res = db_query($sql);
	$raids = array();
	$raids[] = t('-- Choose a Raid --');
	while($row = db_fetch_array($res)){
		$raids['admin/nprt/raidinfo/get/'.$row['id']] = $row['zone'].' - '.$row['date'];
	}
	
	$form = array();
	
	$form['raids'] = array(
		'#type'			=>	'fieldset',
		'#title'		=>	t('Raid Overview'),
		'#collapsible'	=>	true,
		'#collapsed'	=>	false,		
	);
	
	$form['raids']['infoTarget'] = array(
		'#type' 		=> 	'markup', 
		'#prefix' 		=> 	'<div id="infoTarget">',
		'#value' 		=> 	t('Click the button here and Raidinformations for the selected Raid will be loaded.'),
		'#weight'		=>	11, 
		'#suffix' 		=> 	'</div>',
	);
	
	$form['raids']['raid']	= array(
		'#type'			=>	'select',
		'#title'		=>	t('Imported Raids'),
		'#description'	=>	t('Select the imported Raids to retrieve a Raidinformation Overview.'),
		'#options'		=>	$raids,
	);
	$form['raids']['submit']	= array(
		'#type'			=>	'submit',
		'#value'		=>	t('Display Raidinformations'),
		'#weight'		=>	10,
	);
	return $form;
}

function nprt_admin_report_raidinfo(){
	$items = '<ul><li>Product 1</li><li>Product 2</li></ul>';
	return theme('nprt_ajax', $items);
}