import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadCategories, addCategory, loadCategoryById } from '../api/SliceCategory';
import './styles/CategoryContent.css';

const CategoryContent = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.items);
  const categoryDetails = useSelector((state) => state.category.selectedCategory);
  const loading = useSelector((state) => state.category.loading);
  const error = useSelector((state) => state.category.error);  

  const [newCategory, setNewCategory] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');

  // Obtener todas las categorías al cargar el componente
  useEffect(() => {
    dispatch(loadCategories());
  }, [dispatch]);

  // Crear una nueva categoría
  const handleCreateCategory = () => {
    if (newCategory.trim()) {
      dispatch(addCategory({ categoryName: newCategory }));
      setNewCategory(''); // Reiniciar el campo de nueva categoría
    }
  };

  // Obtener una categoría por ID
  const handleGetCategoryById = () => {
    if (selectedCategoryId) {
      dispatch(loadCategoryById(selectedCategoryId));
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
        {loading ? (
          <p>Cargando categorías...</p>
        ) : error ? (
          <p>Error al cargar categorías: {error}</p>
        ) : (
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
        )}
      </div>

      {/* Obtener categoría por ID */}
      <div className="category-details">
        <h3>Obtener Categoría por ID</h3>
        <input
          type="text"
          value={selectedCategoryId}
          onChange={(e) => setSelectedCategoryId(e.target.value)}
          placeholder="ID de la categoría"
        />
        <button onClick={handleGetCategoryById}>Obtener Categoría</button>
        {categoryDetails && (
          <div>
            <h4>Detalles de la Categoría</h4>
            <p><strong>ID:</strong> {categoryDetails.categoryId}</p>
            <p><strong>Nombre:</strong> {categoryDetails.categoryName}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryContent;
