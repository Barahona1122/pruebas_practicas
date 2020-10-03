<?php

require_once dirname(__FILE__).'/vendor/autoload.php';
require dirname(__FILE__).'/config.php';

global $db;
$sql = $db->get('users');
// echo json_encode($sql);
$export = new SqlExport();
	$export->exportQuery($sql);

