<?php
class DatabaseManager {
    private $conn;

    public function __construct($server, $username, $password, $dbname) {
        $this->conn = new mysqli($server, $username, $password, $dbname);
        if ($this->conn->connect_error) {
            die("Connection failed: " . $this->conn->connect_error);
        }
    }

    public function fetchData($sql) {
        $result = $this->conn->query($sql);
        $data = [];

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
        }

        return $data;
    }

    public function insertData($sql) {
        return $this->conn->query($sql);
    }

    public function closeConnection() {
        $this->conn->close();
    }
}
?>
