/* This file needs to be divided */

import {  Route, Routes } from 'react-router-dom';

// HOMR
import Home from '../pages/Home';

// SUPPORT
import Help from '../pages/support/Help';
import Settings from '../pages/support/Settings';
import ContactUs from '../pages/support/ContactUs';

// PRODUCTS
import ProductList from '../pages/products/ViewProducts';
import AddProducts from '../pages/products/AddProducts';
import EditProducts from '../pages/products/UpdateProduct';
import Offers from '../pages/schemeandoffer/addoffer';
const Routing = () => {
    return (
        
        <Routes>
        
            <Route path="/" element={<Home />} />
        
            {/* SUPPORT */}
            <Route path="/help" element={<Help />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/contact" element={<ContactUs />} />
            
            {/* PRODUCTS */}
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/add" element={<AddProducts />} />
            <Route path="/products/edit/:productId" element={<EditProducts />} />
            <Route path="/offers" element={<Offers />} />
        </Routes>
    
    );
  };
  
export default Routing;