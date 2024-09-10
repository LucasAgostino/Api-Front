// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home'; // Página de inicio
import Catalogo from './components/Catalogo'; // Página del catálogo
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} /> {/* Ruta a la página principal */}
            <Route path="/catalogo" element={<Catalogo />} /> {/* Ruta al catálogo */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
