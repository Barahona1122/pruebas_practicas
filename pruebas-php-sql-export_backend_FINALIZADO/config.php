<?php

define('ROOT_DIR', dirname(__FILE__));

$db = new MysqliDb (Array (
		                'host'      => 'localhost'
		                ,'username' => 'root'
		                ,'password' => ''
		                ,'db'       => 'pruebas'
		                ,'port'     => 3306
		                ,'prefix'   => ''
		                ,'charset'  => 'utf8'
            		)
				);
