// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home'; // Página de inicio
import Catalogo from './components/Catalogo'; // Página del catálogo
import Login from './components/Auth/Login'; // Página de login
import Register from './components/Auth/Register';
import ProductDetail from './components/ProductDetail'; // Página de detalles del producto
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
            <Route path= "/login" element={<Login />}/> {/* Ruta al login */}
            <Route path= "/register" element={<Register />}/> {/* Ruta al registro */}
            <Route path="*" element={<h1>404: Not Found</h1>} /> {/* Ruta para manejar errores 404 */}
            <Route path="/products/:id" element={<ProductDetail />} /> {/* Ruta a la página de detalles del producto */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
