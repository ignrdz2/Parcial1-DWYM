import React from 'react';
import Home from './Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import AddPet from './AddPet';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-pet" element={<AddPet />} />
      </Routes>
    </Router>
  );
}

export default App;
