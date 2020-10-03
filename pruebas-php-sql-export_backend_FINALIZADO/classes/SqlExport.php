<?php

class SqlExport{

    /**
     * [[exporta a csv o excel. solo permite consultas SELECT.]]
     * @param {string} $sql [[consulta a exportar]]
     */
    public function exportQuery($users){
		$filename = "users.xls";
		header("Content-Type: application/vnd.ms-excel");
		header("Content-Disposition: attachment; filename=".$filename);

		$columns = false;		 
		foreach($users as $key => $user) {
			if(!$columns) {
				if($key == 0){
					echo implode("\t", array_keys($user)) . "\n";
				}
				$columns = true;
			}
			echo implode("\t", array_values($user)) . "\n";
		}
    }

}
