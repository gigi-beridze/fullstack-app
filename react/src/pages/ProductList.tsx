import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch the list of products from your API
    axios.get('http://localhost/scandiweb-gigiberidze/php/api/getProducts.php')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Product List</h1>
      <table>
        <thead>
          <tr>
            <th>SKU</th>
            <th>Name</th>
            <th>Price</th>
            <th>Product Type</th>
            <th>Product Type-Specific Attribute</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: any) => (
            <tr key={product.id}>
              <td>{product.sku}</td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.productType}</td>
              <td>
                {product.productType === 'DVD' && (
                  <input type="text" placeholder="Size (MB)" value={product.size} />
                )}
                {product.productType === 'Book' && (
                  <input type="text" placeholder="Weight (Kg)" value={product.weight} />
                )}
                {product.productType === 'Furniture' && (
                  <div>
                    <input type="text" placeholder="Height (cm)" value={product.height} />
                    <input type="text" placeholder="Width (cm)" value={product.width} />
                    <input type="text" placeholder="Length (cm)" value={product.length} />
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;