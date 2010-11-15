<?php 

function nprt_attendance_page(){
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

function nprt_player_items_page(){
	$table = array();
	$head = array(
				array('data' => t('Item')),
				array('data' => t('Zone')),
				array('data' => t('Boss')),
				array('data' => t('Player')),
				array('data' => t('Date')),
			);
			
	$drops = array();
	
	$sql = 	"SELECT i.*, pi.boss as itemboss, r.start as date, p.name AS player FROM {nprt_player_item} pi ".
			"LEFT JOIN {nprt_player} p ON p.id=pi.player_id ".
			"LEFT JOIN {nprt_item} i ON i.id=pi.item_id AND i.boss=pi.boss ".
			"LEFT JOIN {nprt_raid} r ON r.id=pi.raid_id";
	// Number of records to show per page.
	
	$res = db_query($sql);
	
	while($row = db_fetch_object($res)){
//		$amount = '';
//		if($row->amount > 1) $amount = $row->amount.'x&nbsp;';
		$drops[] = array(
			array('data' 	=>	'<a href="javascript:void(0);" class="rarity'.$row->quality.'" rel="item='.$row->id.'">'.$amount.$row->name.'</a>'),
			array('data'	=>	$row->zone),
			array('data'	=>	$amount>1?'-':$row->itemboss),
			array('data'	=>	$row->player),
			array('data'	=>	format_date(strtotime($row->date), 'custom', 'd.m.Y')),
		);
	}
	$output  =  theme('tablesort_pager');
	$output .=  theme('table', $head, $drops, array('id' => 'loots', 'class' => 'tablesorter'));
	return $output;
}

