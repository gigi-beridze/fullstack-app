import React, { useState } from 'react';
import axios from 'axios';

function AddProduct() {
  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    price: '',
    productType: 'DVD', // Default to DVD
    size: '', // DVD-specific attribute
    weight: '', // Book-specific attribute
    height: '', // Furniture-specific attribute
    width: '', // Furniture-specific attribute
    length: '', // Furniture-specific attribute
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      // Send the form data to your server for insertion
      await axios.post('http://localhost/scandiweb-gigiberidze/php/api/addProduct.php', formData);
      alert('Product added successfully');
      // Reset the form after successful submission
      setFormData({
        sku: '',
        name: '',
        price: '',
        productType: 'DVD',
        size: '',
        weight: '',
        height: '',
        width: '',
        length: '',
      });
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add product');
    }
  };

  return (
    <div>
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>SKU:</label>
          <input type="text" name="sku" value={formData.sku} onChange={handleChange} required />
        </div>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Price:</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} required />
        </div>
        <div>
          <label>Product Type:</label>
          <select name="productType" value={formData.productType} onChange={handleChange}>
            <option value="DVD">DVD</option>
            <option value="Book">Book</option>
            <option value="Furniture">Furniture</option>
          </select>
        </div>
        {formData.productType === 'DVD' && (
          <div>
            <label>Size (MB):</label>
            <input type="text" name="size" value={formData.size} onChange={handleChange} required />
          </div>
        )}
        {formData.productType === 'Book' && (
          <div>
            <label>Weight (Kg):</label>
            <input type="text" name="weight" value={formData.weight} onChange={handleChange} required />
          </div>
        )}
        {formData.productType === 'Furniture' && (
          <div>
            <label>Dimensions:</label>
            <input type="text" name="height" placeholder="Height (cm)" value={formData.height} onChange={handleChange} required />
            <input type="text" name="width" placeholder="Width (cm)" value={formData.width} onChange={handleChange} required />
            <input type="text" name="length" placeholder="Length (cm)" value={formData.length} onChange={handleChange} required />
          </div>
        )}
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
