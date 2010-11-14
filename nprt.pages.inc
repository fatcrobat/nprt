<?php 

function nprt_page(){
	$output  = nprt_player_items();
	$output .= nprt_attendance(); 
	return $output;
}

function nprt_attendance(){
	//timer_start('1');
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
	//print_r(timer_stop('1'));
	return theme('item_list', $tables);
}

function nprt_player_items(){
	$table = array();
	$head = array(
				array('data' => t('Item'), 'field' => 'name'),
				array('data' => t('Zone'), 'field' => 'zone'),
				array('data' => t('Boss'), 'field' => 'boss'),
				array('data' => t('Player'), 'field' => 'player'),
			);
			
	$drops = array();
	
	$sql = 	"SELECT COUNT(i.id) as amount, i.*, p.name as player FROM {nprt_player_item} pi ".
			"LEFT JOIN {nprt_player} p on p.id=pi.player_id ".
			"LEFT JOIN {nprt_item} i on i.id=pi.item_id ".
			"GROUP BY i.id, p.name";
	// Number of records to show per page.
	$count = 5;
	
	$res = db_query($sql . tablesort_sql($head));
	
	while($row = db_fetch_object($res)){
		$amount = '';
		if($row->amount > 1) $amount = $row->amount.'x&nbsp;';
		$drops[] = array(
			'name'		=>	'<a href="javascript:void(0);" class="rarity'.$row->quality.'" rel="item='.$row->id.'">'.$amount.$row->name.'</a>',
			'zone'		=>	$row->zone,
			'boss'		=>	$amount>1?'-':$row->boss,
			'player'	=>	$row->player,
		);
	}
	$output =  theme('table', $head, $drops);
	return $output;
}