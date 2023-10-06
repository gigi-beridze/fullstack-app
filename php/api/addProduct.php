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

// Assuming you have a valid database connection established
$conn = new mysqli($server, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Data to insert
$name = "Product Name";
$price = 100;

// SQL query to insert data
$sql = "INSERT INTO products (name, price) VALUES ('$name', $price)";

if ($conn->query($sql) === TRUE) {
    echo "Record inserted successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Close the connection
$conn->close();

$dbManager->closeConnection();
?>
