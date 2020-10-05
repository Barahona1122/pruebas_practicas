<?php

require_once dirname(__FILE__).'/vendor/autoload.php';
require dirname(__FILE__).'/config.php';

global $db;
$sql = $db->get('users');
// echo json_encode($sql);
$export = new SqlExport();
	$export_format = [
						"csv",
						// "xls"
					];
	//MAKES FILES AND DOWNLOAD
	if(count($export_format) > 1){
		foreach ($export_format as $key => $value) {
			$export->MakeFiles($sql //ROWS TABLE
								,0 //LINES HEADER
								,";" //DELIMITER CSV
								,$value //FORMAT
							);
		}

		$export->MakeZip();
	}else{
		if($export_format[0] == 'csv'){
			$export->ExportCsv($sql,";",0);
		}

		if($export_format[0] == 'xls'){
			$export->ExportXLS($sql,0);
		}
	}


