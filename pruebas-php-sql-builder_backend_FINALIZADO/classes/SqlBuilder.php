<?php
	
class SqlBuilder{

    public function render(){
        global $smarty;

        $smarty->display('builder.tpl');
    }

    public function Tables(){
    	// global $smarty;
    	global $db;

		$tables = $db->rawQuery('SHOW TABLES');
		return $tables;
    }

    public function Fields($id){
    	global $db;
	    $sql = "SHOW COLUMNS FROM ".$id[0];
	    $tables = $db->rawQuery($sql);

	    return $tables;
    }

    public function QueryFromFields($table){
    	global $db;

    	$sql_arr = [];
        if(count($table) > 0){
            foreach ($table as $field) {
                $sql  = "SELECT ".$field['field']." FROM ".$field['table'];
                $rows = $db->rawQuery($sql);
                array_push($sql_arr, ['table'   => $field['table']
                                        ,'data' => $rows
                                    ]);
            }
        }
    	return $sql_arr;
    }

    public function exportToExcel($arr){
        $filename = "tables.xls";
        header("Content-Type: application/vnd.ms-excel");
        header("Content-Disposition: attachment; filename=".$filename);

        $columns = false;
        if($arr){
            $first_arr = [];
            $second_arr =[];
            foreach($arr as $key => $tables) {
                array_push($first_arr, $tables->table);
                array_push($second_arr, $tables->data);
            }

            foreach ($first_arr as $key => $value) {
                echo $value."\n";
            }

            foreach ($second_arr as $keyOne => $valueOne) {
                if($valueOne){
                    echo json_encode($valueOne);
                }
            }
            // foreach ($second_arr as $key => $value) {
            //     if(!$columns) {
            //         if($key == 0){
            //             echo implode("\t",array_keys(json_decode($value, true))) . "\n";
            //         }
            //         $columns = true;
            //     }
            //     // echo implode("\t", array_values($second_arr[$key])) . "\n";

            // }
        }
    }

}
