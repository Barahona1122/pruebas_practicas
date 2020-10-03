<?php

require_once dirname(__FILE__).'../../vendor/autoload.php';
require dirname(__FILE__).'../../config.php';

$builder = new SqlBuilder();
echo json_encode($builder->Fields($_POST['id']));
// $smarty->assign('builder', $builder);

// $smarty->display('index.tpl');
