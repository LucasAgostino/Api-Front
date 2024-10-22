import React, { useState, useEffect } from 'react';
import {
  fetchCategories, // Importamos la función fetchCategories
  createCategory, // Importamos la función createCategory
  fetchCategoryById, // Importamos la función fetchCategoryById
  setAuthToken // Importamos la función setAuthToken para manejar el token
} from '../api/Category'; // Asegúrate de que la ruta es correcta
import './styles/CategoryContent.css'; // Importa el CSS

const CategoryContent = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [categoryDetails, setCategoryDetails] = useState(null);

  // Obtener todas las categorías al cargar el componente
  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
      }
    };
    fetchAllCategories();
  }, []);

  // Crear una nueva categoría
  const handleCreateCategory = async () => {
    if (!newCategory.trim()) return; // Verificar si el nombre de la categoría no está vacío

    // Obtener el token desde localStorage
    const token = localStorage.getItem('token');
    setAuthToken(token); // Asignar el token a las cabeceras de las peticiones

    try {
      // Usar la función createCategory para crear la nueva categoría
      const createdCategory = await createCategory({ categoryName: newCategory });
      console.log('Categoría creada:', createdCategory); // Verifica si la categoría fue creada
      setCategories([...categories, createdCategory]); // Actualizar la lista de categorías
      setNewCategory(''); // Reiniciar el campo de nueva categoría
    } catch (error) {
      console.error('Error al crear la categoría:', error);
    }
  };

  // Obtener una categoría por ID
  const handleGetCategoryById = async () => {
    try {
      const data = await fetchCategoryById(selectedCategoryId);
      setCategoryDetails(data);
    } catch (error) {
      console.error(`Error al obtener la categoría con ID ${selectedCategoryId}:`, error);
    }
  };

  return (
    <div className="category-content">
      <h2>Gestión de Categorías</h2>

      {/* Crear una nueva categoría */}
      <div className="create-category-form">
        <h3>Crear Nueva Categoría</h3>
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Nombre de la categoría"
        />
        <button onClick={handleCreateCategory}>Crear Categoría</button>
      </div>

      {/* Lista de todas las categorías */}
      <div className="categories-list">
        <h3>Lista de Categorías</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.categoryId}>
                <td>{category.categoryId}</td>
                <td>{category.categoryName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryContent;
