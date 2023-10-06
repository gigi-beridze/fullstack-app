<?php
// Allow requests from any origin
header("Access-Control-Allow-Origin: *");

// Allow specified HTTP methods
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

// Allow specified HTTP headers
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token");

// Respond to preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
include_once '../classes/DatabaseManager.php';

$server = 'localhost';
$username = 'root';
$password = '123';
$dbname = 'scandiweb';

$dbManager = new DatabaseManager($server, $username, $password, $dbname);

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT * FROM products";
    $data = $dbManager->fetchData($sql);
    echo json_encode($data);
}

$dbManager->closeConnection();
?>
