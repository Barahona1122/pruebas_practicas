<?php

require_once dirname(__FILE__).'../../vendor/autoload.php';
require dirname(__FILE__).'../../config.php';

$captcha = new Recaptcha();
$OpType      = $_POST['OperationType'];

if($OpType == '1'){
	//1 = SELECT
	echo json_encode($captcha->users());
}

if($OpType == '2'){
	//1 = INSERT

	$name        = $_POST['name'];
	$last_name   = $_POST['last_name'];
	$second_name = $_POST['second_name'];
	$email       = $_POST['email'];
	$phone       = $_POST['phone'];
	echo json_encode(
		$captcha->InsertUser($name, $last_name, $second_name, $email, $phone)
	);
}

if($OpType == '3'){
	//1 = EDIT
	$id = $_POST['id'];
	echo json_encode(
		$captcha->ediUser($id)
	);
}

if($OpType == '4'){
	//1 = UPDATE
	$id          = $_POST['id'];
	$name        = $_POST['name'];
	$last_name   = $_POST['last_name'];
	$second_name = $_POST['second_name'];
	$email       = $_POST['email'];
	$phone       = $_POST['phone'];
	echo json_encode(
		$captcha->updateUser($id,$name, $last_name, $second_name, $email, $phone)
	);
}

if($OpType == '5'){
	//1 = DESTROY
	$id   = $_POST['id'];
	echo json_encode(
		$captcha->destroyUser($id)
	);
}

