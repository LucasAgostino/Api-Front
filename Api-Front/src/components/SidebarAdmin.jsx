import React, { useState } from 'react';
import './styles/SidebarAdmin.css'; // Archivo CSS actualizado importado
import UsersContent from './UsersContent'; // Importa el nuevo componente para Usuarios
import ProductsContent from './ProductsContent';
import OrdersContent from './OrdersContent';

const SidebarAdmin = () => {
  const [selectedOption, setSelectedOption] = useState('dashboard');

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleHomeClick = () => {
    window.location.href = '/'; // Cambia esto si usas React Router (puedes usar <Link /> en lugar de esto)
  };

  return (
    <div className="sidebaradmin">
      <nav id="leftside-navigation-admin">
        {/* Logo del proyecto en la parte superior */}
        <div className="logo-container">
          <img src="/logo.png" alt="Logo del proyecto" className="logo" />
        </div>

        <div onClick={() => handleOptionClick('users')}>
          <i className="fa fa-dashboard"></i>
          <span>Usuarios</span>
        </div>
        <div onClick={() => handleOptionClick('orders')}>
          <i className="fa fa-cogs"></i>
          <span>Ordenes</span>
        </div>
        <div onClick={() => handleOptionClick('products')}>
          <i className="fa fa-table"></i>
          <span>Productos</span>
        </div>
        <div onClick={() => handleOptionClick('category')}>
          <i className="fa fa-envelope"></i>
          <span>Categorias</span>
        </div>

       

        {/* Botón para volver al home */}
        <div className="home-button-container" onClick={handleHomeClick}>
          <i className="fa fa-home"></i>
          <span>Volver al Home</span>
        </div>
      </nav>

      {/* Sección del contenido que se muestra al hacer clic en las opciones */}
      <main>
        {selectedOption === 'users' && <UsersContent />}
        {selectedOption === 'orders' && <OrdersContent />}
        {selectedOption === 'products' && <ProductsContent />}
        {selectedOption === 'category' && <CategoryContent />}
      </main>
    </div>
  );
};

// Componentes para cada sección (estos ya estaban definidos)
const CategoryContent = () => {
  return <div>Contenido de Categorias</div>;
};

export default SidebarAdmin;
