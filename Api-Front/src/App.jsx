// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home'; // Página de inicio
import Catalogo from './components/Catalogo'; // Página del catálogo
import Footer from './components/Footer';
import Login from './components/Auth/Login'; // Página de login
import Register from './components/Auth/Register';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} /> {/* Ruta a la página principal */}
            <Route path="/catalogo" element={<Catalogo />} /> {/* Ruta al catálogo */}
            <Route path= "/login" element={<Login />}/> {/* Ruta al login */}
            <Route path= "/register" element={<Register />}/> {/* Ruta al registro */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
