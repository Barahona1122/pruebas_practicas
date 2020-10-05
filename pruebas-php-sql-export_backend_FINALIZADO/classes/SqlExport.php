<?php

class SqlExport{

    /**
     * [[exporta a csv o excel. solo permite consultas SELECT.]]
     * @param {string} $sql [[consulta a exportar]]
     */
   //  public function exportQuery($users,$export_format){
   //  	if($export_format){
			// $this->ExportCsv($users,$format);
   //  	}
   //  }

    public function ExportCsv($users,$delimiter,$Lines){
		header('Content-Type: text/csv');
		header('Content-Disposition: attachment; filename="users.csv"');
		header("Pragma: no-cache");

		$fp = fopen('php://output', 'w');
		fputcsv( $fp, array_keys( $users[$Lines] ),$delimiter, '"' );
		foreach ( $users as $line ) {
		    fputcsv($fp,$line ,$delimiter, '"');
		}
		fclose($fp);
	}

    public function ExportXLS($users,$Lines){
		header("Content-Type: application/vnd.ms-excel");
		header("Content-Disposition: attachment; filename=users.xls");
		header("Pragma: no-cache");

		$columns = false;		 
		foreach($users as $key => $user) {
			for($i=0; $i<=$Lines; $i++){
				if($key == $i){
					echo implode("\t", array_keys($user)) . "\n";
				}
			}
			echo implode("\t", array_values($user)) . "\n";
		}
	}



	public function MakeFiles($users,$Lines, $delimiter, $value){
		$columns = false;
		$data = [];
		switch ($value) {
			case 'xls':
				foreach($users as $key => $user) {
					for($i=0; $i<=$Lines; $i++){
						if($key == $i){
							array_push($data, implode("\t", array_keys($user)) . "\n");
							echo implode("\t", array_keys($user)) . "\n";
						}
					}
					echo implode("\t", array_values($user)) . "\n";
					array_push($data, implode("\t", array_values($user)) . "\n");
				}

				file_put_contents("files/users.xls",$data);
			break;
			
			case 'csv':
				// CREATE CSV
					$fp = fopen('files/users.csv', 'w');
					fputcsv( $fp, array_keys( $users[$Lines] ),$delimiter,chr(27) );
					foreach ( $users as $line ) {
					    fputcsv($fp,$line,$delimiter,chr(27));
					}
					fclose($fp);
			break;
		}

	}

	public function MakeZip(){
		$zip = new ZipArchive();
		$filename = "./files/files.zip";

		if ($zip->open($filename, ZipArchive::CREATE) !== TRUE) {
		    exit("cannot open <$filename>\n");
		}

		$files = glob('files/*');
		foreach($files as $file){
		  if(is_file($file))
			$zip->addFile($file);
		}

		// $zip->addFile("files/users.csv");
		echo "create: " . $zip->numFiles . "\n";
		echo "status:" . $zip->status . "\n";
		$zip->close();

		// DOWNLOAD FILE
			$this->DownloadFile();
	}

	public function DownloadFile(){
		$file = basename("files.zip");
		$file = 'files/'.$file;

		if(!file_exists($file)){ // file does not exist
		    echo 'file not found';
		} else {
		    header("Cache-Control: public");
		    header("Content-Description: File Transfer");
		    header("Content-Disposition: attachment; filename=$file");
		    header("Content-Type: application/zip");
		    header("Content-Transfer-Encoding: binary");

		    readfile($file);

		    // CLEAN FOLDER
		    $this->CleanFolder();
		}

	}

	public function CleanFolder(){
		$files = glob('files/*');
		foreach($files as $file){
		  if(is_file($file))
		    unlink($file);
		}
	}

}
