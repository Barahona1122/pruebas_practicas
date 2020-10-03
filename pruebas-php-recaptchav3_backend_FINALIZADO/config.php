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

$smarty = new Smarty();
$smarty->setTemplateDir(ROOT_DIR.'/views/templates/');
$smarty->setCompileDir(ROOT_DIR.'/views/templates/compiles/');
