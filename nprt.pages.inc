<?php 

function nprt_page(){
	return nprt_attendance();
}

function nprt_attendance(){
	timer_start('1');
	$tables = array();
	$head = array(
				array('data' => t('Player'), 'field' => 'name'),
				array('data' => t('%'), 'field' => 'attendance')
			);
			
	$sql =  "SELECT p.name, p.class ,".
			"ROUND(COUNT(pr.player_id)/(SELECT COUNT(*) FROM {nprt_raid})*100, 2) as attendance ".
			"FROM {nprt_player} p ".
			"LEFT JOIN {nprt_player_raid} pr ON pr.player_id = p.id ".
			"GROUP BY p.id, p.class " .tablesort_sql($head);
		
	$res = db_query($sql);
	$table = array();
	$rows = array();
	while($row = db_fetch_array($res)){
		$rows[$row['class']][] = array(
			'name' 			=> 	$row['name'], 
			'attendance'	=>	$row['attendance']);
	}
	foreach(getClassesFromEnum() as $class){
		$tables[$class] = theme('table', $head, $rows[$class], array('class' => $class), $class);
	}
	print_r(timer_stop('1'));
	return theme('item_list', $tables);
}