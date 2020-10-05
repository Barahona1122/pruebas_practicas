<?php

require_once dirname(__FILE__).'../../vendor/autoload.php';
require dirname(__FILE__).'../../config.php';

$captcha = new Recaptcha();
$OpType = $_POST['OperationType'];

if($OpType == '1'){
	//1 = SELECT
	echo json_encode($captcha->users());
}

if($OpType == '2'){
	//1 = INSERT
	$recaptcha_response = $_POST['recaptcha_response']; 
	if($recaptcha_response){
		$recaptcha_secret   = '6Le7qtMZAAAAAPVAPgkNazjGbQJHm3o-Bqf_OLl2'; 
		$url = 'https://www.google.com/recaptcha/api/siteverify';

		$data = array( 'secret' => $recaptcha_secret
						, 'response' => $recaptcha_response
						, 'remoteip' => $_SERVER['REMOTE_ADDR'] 
					);


		$curlConfig = array( CURLOPT_URL => $url, CURLOPT_POST => true, CURLOPT_RETURNTRANSFER => true, CURLOPT_POSTFIELDS => $data ); 
		$ch = curl_init(); 
		curl_setopt_array($ch, $curlConfig); 
		$response = curl_exec($ch); 
		curl_close($ch);

		$jsonResponse = json_decode($response);
		if ($jsonResponse->success === true) { 
		    	$name        = $_POST['name'];
				$last_name   = $_POST['last_name'];
				$second_name = $_POST['second_name'];
				$email       = $_POST['email'];
				$phone       = $_POST['phone'];
				$ip          =  $_SERVER['REMOTE_ADDR'];
				echo json_encode(
					$captcha->InsertUser($name, $last_name, $second_name, $email, $phone, $ip)
				);
		} else {
		   // Código para aviso de error
			echo json_encode(["error" => true, "message" => 'Error 500!']);
		}
	}else{
		echo json_encode(["error" => true, "message" => 'Recaptcha is not Valid, please reload Page!']);
	}
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

