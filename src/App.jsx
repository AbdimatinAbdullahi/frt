import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Components/HomePage';
import ProductDetail from './Components/ProductDetail';
import Checkout from './Components/Checkout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/product/:id' element={<ProductDetail/>} />
        <Route path='/checkout/:id' element={<Checkout/>} />
      </Routes>
    </Router>
  );
}

export default App;
