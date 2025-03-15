import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import DataTable from './pages/dataTable';
import Products from './pages/products';
import Users from './pages/users';

function App() {
  return (
    <div className="App m-[10px]">
      <Router>
        <div className='page-header flex cursor-default'>
          <h3 className='me-1'>Home</h3> / <h3 className='font-extrabold shadow-[inset_0px_-10px] shadow-yellow ms-1'>{window.location.pathname.charAt(1).toUpperCase() + window.location.pathname.slice(2)}</h3>
        </div>
        <Routes>
              <Route path="/" element={<div>No route specified.</div>} />
              <Route path="/products" element={<Products/>} />
              <Route path="/users" element={<Users/>}/>
              <Route path="/datatable-reusable" element={<DataTable dataLabel='products' tableFields={["title","description","rating","sku","shippingInformation"]} filterFields={[["Rating","rating"]]}/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
