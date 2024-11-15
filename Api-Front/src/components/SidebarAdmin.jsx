import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirigir si no es ADMIN
import { useSelector } from 'react-redux'; // Para acceder al estado de Redux
import './styles/SidebarAdmin.css'; // Archivo CSS actualizado importado
import UsersContent from './UsersContent'; // Importa el nuevo componente para Usuarios
import ProductsContent from './ProductsContent';
import OrdersContent from './OrdersContent';
import CategoryContent from './CategoryContent';

const SidebarAdmin = () => {
  const [selectedOption, setSelectedOption] = useState('dashboard');
  const navigate = useNavigate(); // Hook para redirigir
  const [isAdmin, setIsAdmin] = useState(false); // Estado para verificar si el usuario es admin

  // Obtén el rol desde el estado de Redux
  const role = useSelector((state) => state.user.role);

  useEffect(() => {
    // Verifica si el rol es 'ADMIN' y establece el estado correspondiente
    if (role === 'ADMIN') {
      setIsAdmin(true);
    } else {
      navigate('/'); // Redirigir si no es ADMIN
    }
  }, [navigate, role]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  if (!isAdmin) {
    return <p>Redirigiendo...</p>;
  }

  return (
    <div className="sidebaradmin">
      <nav id="leftside-navigation-admin">
        {/* Logo del proyecto en la parte superior */}
        <div className="logo-container">
          <img src="/logo.png" alt="Logo del proyecto" className="logo" />
        </div>

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

export default SidebarAdmin;
