import { Link, Route, Routes, useLocation } from 'react-router-dom';
import ProductListPage from '../pages/ProductList';
import React from 'react';
import { PageNotFound } from '../pages/PageNotFound';
import '../assets/scss/navbar.scss';

export const Navbar = () => {
    
const ProductList = React.lazy(() => import("../pages/ProductList"));
const AddProduct = React.lazy(() => import("../pages/AddProduct"));

    return (
      <div className="navbar">
        <div className="container">
        <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ProductListPage />} />
          <Route
            path="productlist"
            element={
              <React.Suspense fallback={<>...</>}>
                {<ProductList />}
              </React.Suspense>
            }
          />
          <Route
            path="addproduct/*"
            element={
              <React.Suspense fallback={<>...</>}>
                <AddProduct />
              </React.Suspense>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
        </div>
      </div>
    );
}
function Layout() {
  const location = useLocation();
  
  return (
    <div>
      {location.pathname === '/' && 
        <nav>
          <span>Product List</span>
          <ul>
            <li>
              <Link to="/add-product">add</Link>
            </li>
            <li>
              <Link to="/">mass delete</Link>
            </li>
          </ul>
        </nav>
      }
      {location.pathname === '/add-product' &&
        <nav>
          <span>Product Add</span>
          <ul>
            <li>
              <Link to="/">Save</Link>
            </li>
            <li>
              <Link to="/">Cancel</Link>
            </li>
          </ul>
        </nav>
      }
    </div>
  );
}
