<?php

require_once dirname(__FILE__).'/vendor/autoload.php';
require dirname(__FILE__).'/config.php';

$builder = new SqlBuilder();

	$arr = json_decode(stripslashes($_POST['parms']));
	
	$builder->exportToExcel($arr);


