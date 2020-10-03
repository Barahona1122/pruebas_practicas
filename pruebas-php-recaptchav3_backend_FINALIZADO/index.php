<?php

require_once dirname(__FILE__).'/vendor/autoload.php';
require dirname(__FILE__).'/config.php';

$recaptcha = new Recaptcha();
$smarty->assign(array(
    'recaptcha' => $recaptcha
));

$smarty->display('formulario.tpl');
