import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
    });

    useEffect(() => {
        axios.get('http://localhost/scandiweb-gigiberidze/php/api/getProducts.php')
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleInputChange = (e:any) => {
        const { name, value } = e.target;
        setNewProduct({
            ...newProduct,
            [name]: value,
        });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        axios.post('http://localhost/scandiweb-gigiberidze/php/api/addProduct.php', newProduct)
            .then((response) => {
                console.log(response.data, 'fa');
                // Refresh the product list after adding
                axios.get('http://localhost/scandiweb-gigiberidze/php/api/getProducts.php')
                    .then((response) => {
                        setProducts(response.data);
                    })
                    .catch((error) => {
                        console.error('Error fetching data:', error);
                    });
            })
            .catch((error) => {
                console.error('Error adding product:', error);
            });
    };

    return (
        <div>
            <h1>Add Product</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" onChange={handleInputChange} value={newProduct.name} required />
                </div>
                <div>
                    <label>Price:</label>
                    <input type="number" name="price" onChange={handleInputChange} value={newProduct.price} required />
                </div>
                <button type="submit">Add Product</button>
            </form>

            <h1>Product List</h1>
            <ul>
                {products.map((product: any) => (
                    <li key={product.id}>{product.name} - ${product.price}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
