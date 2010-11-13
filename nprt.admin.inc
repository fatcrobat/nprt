<?php 

function nprt_admin_list(){
	return nprt_admin_report_imported_raids();
}

function nprt_admin_report_imported_raids(){
	$tables = array();
	$head = array(
				array('data' => t('ID'), 'field' => 'id'),
				array('data' => t('Date'), 'field' => 'date'),
				array('data' => t('Zone'), 'field' => 'zone')
			);
			
	$sql =  "SELECT id, DATE_FORMAT (start, '%e. %M %Y ') AS date, zone FROM {nprt_raid}" .tablesort_sql($head);

	$res = db_query($sql);
	$table = array();
	$rows = array();
	while($row = db_fetch_array($res)){
		$rows[] = $row;
	}
	return theme('table', $head, $rows);
}