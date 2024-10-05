// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home'; // Página de inicio
import Products from './components/Products'; // Página del catálogo
import Login from './components/Auth/Login'; // Página de login
import Register from './components/Auth/Register';
import ProductDetail from './components/ProductDetail'; // Página de detalles del producto
import Footer from './components/Footer';
import SidebarAdmin from './components/SidebarAdmin'; // Sidebar del admin

// Creamos un layout para las rutas públicas con Header y Footer
const PublicLayout = () => (
  <>
    <Header />
    <main>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Ruta a la página principal */}
        <Route path="/products" element={<Products />} /> {/* Ruta al catálogo */}
        <Route path="/login" element={<Login />} /> {/* Ruta al login */}
        <Route path="/register" element={<Register />} /> {/* Ruta al registro */}
        <Route path="/products/:id" element={<ProductDetail />} /> {/* Ruta a la página de detalles del producto */}
      </Routes>
    </main>
    <Footer />
  </>
);

// Creamos un layout para la parte de administración sin Header ni Footer
const AdminLayout = () => (
  <>
    <SidebarAdmin />
    <main>
      <Routes>
        <Route path="/admin/*" element={<SidebarAdmin />} /> {/* Ruta para la parte de administración */}
      </Routes>
    </main>
  </>
);

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<PublicLayout />} /> {/* Rutas públicas con Header y Footer */}
        <Route path="/admin/*" element={<AdminLayout />} /> {/* Rutas de administración sin Header ni Footer */}
        <Route path="*" element={<h1>404: Not Found</h1>} /> {/* Ruta para manejar errores 404 */}
      </Routes>
    </Router>
  );
};

export default App;
