import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Home';
import SoapClient from './SoapClient';
import SoapInfoClient from './SoapInfoClient';
import SoapOperationClient from './SoapOperationClient';
import SoapTableClient from './SoapTableClient';
import SoapStudentsClient from './SoapStudentsClient';
import SoapStudentsListClient from './SoapStudentsListClient';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ejercicio1" element={<SoapClient />} />
          <Route path="/ejercicio2" element={<SoapInfoClient />} />
          <Route path="/ejercicio3" element={<SoapOperationClient />} />
          <Route path="/ejercicio4" element={<SoapTableClient />} />
          <Route path="/ejercicio5" element={<SoapStudentsClient />} />
          <Route path="/ejercicio6" element={<SoapStudentsListClient />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
