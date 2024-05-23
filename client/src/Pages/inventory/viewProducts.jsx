import React, { useState, useEffect } from 'react';
import data from '../../../data.json';
import { NavLink } from 'react-router-dom';
// import axios from 'axios';

const Inventory = () => {
  //   const [products, setProducts] = useState([]);
  //   const [loading, setLoading] = useState(true);
  //   const [error, setError] = useState(null);

  //   useEffect(() => {
  //     axios.get('http://localhost:3000/fetchproducts')
  //       .then(response => {
  //         setProducts(response.data);
  //         setLoading(false);
  //       })
  //       .catch(error => {
  //         setError(error);
  //         setLoading(false);
  //       });
  //   }, []);

  // if (loading) {
  //   return <div className="text-center text-gray-500">Loading...</div>;
  // }

  // if (error) {
  //   return <div className="text-center text-red-500">Error: {error.message}</div>;
  // }

  return (
    <div className="container mx-auto p-4">
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        <div className='lg:col-span-3'>
        <h1 className="text-4xl font-bold mb-4 text-center">Product List</h1>
        <p className='text-2xl pt-5 pb-10 text-center'>To View the Product List just scroll down.</p>
        </div>
        <div>
        <button className='pl-6 text-left'><NavLink to="/inventory/addProducts" >Add New Product</NavLink></button>
        <button className='pl-6 text-left'><NavLink to="/inventory/editProducts" >Edit Product Details</NavLink></button>
        </div>
        
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map(product => (
          <div key={product.id} className="border rounded-lg p-4 shadow-lg">
            <h2 className="text-xl font-semibold">{product.productName}</h2>
            <p className="text-gray-700">{product.category}</p>
            <p className="text-green-500 font-bold">${product.hsn}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inventory;
