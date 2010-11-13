<?php 

/**
 * Returns an Array, containing all character classes
 * Collected from Mysql Enum field
 */

function getClassesFromEnum(){
	$sql = "SHOW COLUMNS FROM {nprt_player} LIKE 'class'";
	$res = db_query($sql);
	$enum = db_fetch_object($res);
	preg_match_all("/'([\w ]*)'/", $enum->Type, $values);
	return $values[1];
}