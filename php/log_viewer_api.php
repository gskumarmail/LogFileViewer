<?php
/**
 * Ajax call
 * This file used to connect PHP class file
 * Sending Request and get response from PHP log-file-viewer
 * Handles pagination
 * Return JSON data with Lines and Logs details
 * @author Senthilkumar G
 */

include_once 'log_file_viewer.php';

/*
* Get file path / name from ajax call
* Checks files from local or external server and sending absolute path base on the location
* Read file fron LogFileViewer class
* @return data with associate arrays
*/
try {
    if(isset($_GET['file_path'])) {
		$file_path = isset($_GET['file_path']) ? $_GET['file_path'] :'';
		$file_location = (strpos($file_path, '/')) ? $file_path : '../logfiles/'.$file_path;
		$file = new LogFileViewer($file_location);
		$result = $file->getFormattedData();
		/*
		* handle to set pagination for First, Prev, Next and Last
		* Get conunt for total number of lines
		* Get number of rows to be displayed by selecting user end , Default rows is 10
		* Get current page number, default is 1
		* Get Total pages divided by total / number of rows
		*/
		$total = count($result['items']);
		$row_count = isset($_GET['row_count']) && (int) $_GET['row_count'] > 0 ? (int) $_GET['row_count'] : 10;
		$page = isset($_GET['page']) && (int) $_GET['page'] > 0 ? (int) $_GET['page'] : 1;
		$pages = ceil($total / $row_count);
		$page = ($page > $pages) ? $pages : $page;
		$offset = ($page - 1) * $row_count;
		/*
		* Get array items with paginate
		* Passing Paginate variable for maintainig pagination with perticular records
		* encode data with JSON structure and sending to User End
		*/
		$result['items'] = array_slice($result['items'], $offset, $row_count);
		$result['paginate'] = compact('page', 'pages', 'offset', 'row_count', 'total', 'file_path');
		/*
		* data encoded with JSON and send to the response
		*/
		header("Content-Type: application/json; charset=utf-8");
		echo json_encode($result);
	}else {
        throw new Exception('Request is not valid',400);
    }
} catch (Exception $e) {
    echo json_encode(['status'=>'error','message'=>$e->getMessage(),'data'=>$e->getCode()]);
}
?>