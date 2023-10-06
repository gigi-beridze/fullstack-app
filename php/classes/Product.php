class Product {
    private $conn;

    public function __construct($server, $username, $password, $dbname) {
        $this->conn = new mysqli($server, $username, $password, $dbname);
        if ($this->conn->connect_error) {
            die("Connection failed: " . $this->conn->connect_error);
        }
    }

    public function fetchProducts() {
        $sql = "SELECT * FROM products";
        $result = $this->conn->query($sql);
        $data = [];

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
        }

        return $data;
    }

    public function addProduct($sku, $name, $price, $productType, $size, $weight, $height, $width, $length) {
        // Sanitize and escape user inputs to prevent SQL injection
        $sku = $this->conn->real_escape_string($sku);
        $name = $this->conn->real_escape_string($name);
        $price = (int)$price; // Ensure price is an integer
        $productType = $this->conn->real_escape_string($productType);
        $size = $this->conn->real_escape_string($size);
        $weight = $this->conn->real_escape_string($weight);
        $height = $this->conn->real_escape_string($height);
        $width = $this->conn->real_escape_string($width);
        $length = $this->conn->real_escape_string($length);

        // Insert the product into the table
        $sql = "INSERT INTO products (SKU, Name, Price, ProductType, Size, Weight, Height, Width, Length) 
                VALUES ('$sku', '$name', $price, '$productType', '$size', '$weight', '$height', '$width', '$length')";

        return $this->conn->query($sql);
    }

    public function closeConnection() {
        $this->conn->close();
    }
}
