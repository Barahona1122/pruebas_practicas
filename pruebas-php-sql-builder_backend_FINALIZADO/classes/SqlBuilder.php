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

    	$sql_arr     = [];
        $sql_query   = [];
        if(count($table) > 0){
            foreach ($table as $field) {
                $sql  = "SELECT ".$field['field']." FROM ".$field['table'];
                $rows = $db->rawQuery($sql);
                // INSERT DATA INTO ARRAY
                    array_push($sql_arr, ['table'   => $field['table']
                                            ,'data' => $rows
                                        ]);
                // INSERT QUERY
                    array_push($sql_query, $sql);
            }
        }
    	return ['data' => $sql_arr, 'sql' =>$sql_query];
    }
}
