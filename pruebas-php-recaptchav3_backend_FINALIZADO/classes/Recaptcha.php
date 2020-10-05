<?php

class Recaptcha{

    private $v = 3;

    public function render(){
        global $smarty;

        $smarty->display('recaptcha.tpl');
    }

    public function InsertUser($name, $last_name, $second_name, $email, $phone, $ip){
    	global $db;

		$data = Array (
			'name'        => $name,
			'last_name'   => $last_name,
			'second_name' => $second_name,
			'email'       => $email,
			'phone'       => $phone,
			'ip'          => $ip
		);

		$insert = $db->insert("users",$data);
		if($insert)
			return ['error' => false, 'message' => 'Insert OK!'];
		else
			return ['error' => true, 'message' => 'Error on insert!'];
    }

    public function users(){
    	global $db;

    	$sql = "SELECT * FROM users";
    	$select = $db->rawQuery($sql);
    	return $select;
    }

    public function ediUser($id){
    	global $db;
		
		$db->where("id",$id);
    	
    	$select = $db->getOne ("users");
    	return $select;
    }

    public function updateUser($id, $name, $last_name, $second_name, $email, $phone){
    	global $db;

		$data = Array (
			'name'        => $name,
			'last_name'   => $last_name,
			'second_name' => $second_name,
			'email'       => $email,
			'phone'       => $phone
		);

    	$db->where('id',$id);
		if ($db->update ('users', $data))
		    return ['error' => false, 'message' => 'Update OK!'];
		else
			return ['error' => true, 'message' => 'Error when Update!'];
    }

    public function destroyUser($id){
    	global $db;
    	$db->where('id', $id);
		if($db->delete('users'))
		    return ['error' => false, 'message' => 'Deleted!'];
		else
			return ['error' => true, 'message' => 'Error when Delete!'];

    }

}
