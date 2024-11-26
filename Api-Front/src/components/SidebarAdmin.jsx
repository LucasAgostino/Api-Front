import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirigir
import { useSelector } from 'react-redux'; // Para acceder al estado de Redux
import './styles/SidebarAdmin.css'; // Archivo CSS
import UsersContent from './UsersContent';
import ProductsContent from './ProductsContent';
import OrdersContent from './OrdersContent';
import CategoryContent from './CategoryContent';
import AdminWelcome from './AdminWelcome'; // Importa AdminWelcome si no está importado

const SidebarAdmin = () => {
  const [selectedOption, setSelectedOption] = useState('dashboard');
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  const role = useSelector((state) => state.user.role);

  useEffect(() => {
    if (role === 'ADMIN') {
      setIsAdmin(true);
    } else {
      navigate('/');
    }
  }, [navigate, role]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleLogoClick = () => {
    setSelectedOption('dashboard'); // Cambiar a la página de bienvenida
  };

  if (!isAdmin) {
    return <p>Redirigiendo...</p>;
  }

  return (
    <div className="sidebaradmin">
      <nav id="leftside-navigation-admin">
        {/* Logo del proyecto */}
        <div className="logo-container" onClick={handleLogoClick}>
          <img src="/logo.png" alt="Logo del proyecto" className="logo" />
        </div>

        {/* Opciones del menú */}
        <div onClick={() => handleOptionClick('users')}>
          <i className="fa fa-dashboard material-symbols-outlined">switch_account</i>
          <span>Usuarios</span>
        </div>
        <div onClick={() => handleOptionClick('orders')}>
          <i className="fa fa-cogs material-symbols-outlined">orders</i>
          <span>Ordenes</span>
        </div>
        <div onClick={() => handleOptionClick('products')}>
          <i className="fa fa-table material-symbols-outlined">computer</i>
          <span>Productos</span>
        </div>
        <div onClick={() => handleOptionClick('category')}>
          <i className="fa fa-envelope material-symbols-outlined">list</i>
          <span>Categorias</span>
        </div>

        {/* Botón para volver al home */}
        <div href="#" className="home-button-container" onClick={handleHomeClick}>
          <i className="fa fa-home material-symbols-outlined">home</i>
          <span>Volver al Home</span>
        </div>
      </nav>

      {/* Contenido principal */}
      <main>
        {selectedOption === 'dashboard' && <AdminWelcome />}
        {selectedOption === 'users' && <UsersContent />}
        {selectedOption === 'orders' && <OrdersContent />}
        {selectedOption === 'products' && <ProductsContent />}
        {selectedOption === 'category' && <CategoryContent />}
      </main>
    </div>
  );
};

export default SidebarAdmin;
