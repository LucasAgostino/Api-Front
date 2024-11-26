import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProductsThunk,
  createProductsThunk,
  softDeleteProductsThunk,
  updateProductsThunk,
  fetchTagsThunk,
  addImagesToProductThunk,
  removeImageFromProductThunk,
} from '../api/ProductSlice';
import { loadCategories } from '../api/SliceCategory';
import './styles/ProductsContentAdmin.css';

const ProductsContent = () => {
  const [newProduct, setNewProduct] = useState({
    productName: '',
    price: '',
    productDescription: '',
    stock: '',
    categoryId: '',
    discountPercentage: '',
    tags: '',
    imageBase64s: [],
  });
  const [selectedTags, setSelectedTags] = useState([]);
  const [editProductId, setEditProductId] = useState(null);
  const [editProductData, setEditProductData] = useState({});
  const [showCreateForm, setShowCreateForm] = useState(false); // Controlar visibilidad del formulario

  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);
  const tags = useSelector((state) => state.product.tags);
  const categories = useSelector((state) => state.category.items);

  useEffect(() => {
    dispatch(fetchProductsThunk());
    dispatch(fetchTagsThunk());
    dispatch(loadCategories());
  }, [dispatch]);

  const handleCreateProduct = () => {
    const formData = new FormData();
    formData.append('productName', newProduct.productName);
    formData.append('productDescription', newProduct.productDescription);
    formData.append('price', newProduct.price);
    formData.append('stock', newProduct.stock);
    formData.append('categoryId', newProduct.categoryId);
    const discountValue = newProduct.discountPercentage / 100;
    formData.append('discountPercentage', discountValue);
    

    newProduct.imageBase64s.forEach((image, index) => {
      formData.append('images', image, `image${index}.jpg`);
    });

    const tagsArray = newProduct.tags.split(',').map((tag) => tag.trim());
    tagsArray.forEach((tag) => formData.append('tags', tag));

    dispatch(createProductsThunk(formData));
    setNewProduct({
      productName: '',
      price: '',
      productDescription: '',
      stock: '',
      categoryId: '',
      discountPercentage: '',
      tags: '',
      imageBase64s: [],
    });
    setSelectedTags([]);
    setShowCreateForm(false); // Ocultar el formulario tras crear el producto
  };

  const handleDeleteProduct = (productId) => {
    dispatch(softDeleteProductsThunk(productId));
  };

  const handleEditProduct = (productId) => {
    const productToEdit = products.find((product) => product.productId === productId);
    setEditProductId(productId);
  
    // Asegúrate de que todos los valores estén definidos
    setEditProductData({
      productName: productToEdit.productName || '',
      price: productToEdit.price || 0,
      productDescription: productToEdit.productDescription || '',
      stock: productToEdit.stock || 0,
      categoryName: productToEdit.categoryName || '',
      discountPercentage: productToEdit.discountPercentage*100 || 0,
      tags: productToEdit.tags || '',
      imageBase64s: productToEdit.imageBase64s || [],
      imageIds: productToEdit.imageid || [],
    });
  };
  

  const handleSaveEditProduct = () => {
    // Crear una copia de los datos editados
    const updatedData = { ...editProductData };
  
    // Convertir discountPercentage entre 0 y 1 antes de enviarlo
    updatedData.discountPercentage = updatedData.discountPercentage / 100;
  
    // Eliminar propiedades no necesarias si es necesario
    delete updatedData.id;
  
    // Despachar la acción de actualización del producto
    dispatch(updateProductsThunk({ productId: editProductId, updatedData }));
  
    // Limpiar el estado después de guardar los cambios
    setEditProductId(null);
    setEditProductData({});
  };

  const handleImageUpload = (e) => {
    const files = e.target.files;
    const fileArray = Array.from(files);
    setNewProduct((prevState) => ({
      ...prevState,
      imageBase64s: [...prevState.imageBase64s, ...fileArray],
    }));
  };

  const handleEditImageUpload = (e) => {
    const files = e.target.files;
    const fileArray = Array.from(files);
    dispatch(addImagesToProductThunk({ productId: editProductId, images: fileArray }));
  };

  const handleRemoveEditImage = (index) => {
    const imageId = editProductData.imageIds[index];
    dispatch(removeImageFromProductThunk({ productId: editProductId, imageId }));
  };

  const handleAddTag = (e) => {
    const selectedTag = e.target.value;
    if (selectedTag && !selectedTags.includes(selectedTag)) {
      const updatedTags = [...selectedTags, selectedTag];
      setSelectedTags(updatedTags);
      setNewProduct({ ...newProduct, tags: updatedTags.join(', ') });
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    const updatedTags = selectedTags.filter((tag) => tag !== tagToRemove);
    setSelectedTags(updatedTags);
    setNewProduct({ ...newProduct, tags: updatedTags.join(', ') });
  };

  return (
    <div className="products-contents-admin">
      <h2>Gestión de Productos</h2>

      {/* Botón para mostrar/ocultar formulario */}
      <button
        onClick={() => setShowCreateForm(!showCreateForm)}
        className="toggle-form-btn"
      >
        {showCreateForm ? 'Cerrar Formulario de Creación' : 'Crear Nuevo Producto'}
      </button>

      {/* Mostrar formulario de creación solo si showCreateForm es true */}
      {showCreateForm && (
        <div className={`create-product-form ${showCreateForm ? 'active' : ''}`}>
          <h3>Crear Nuevo Producto</h3>
          <input
            type="text"
            placeholder="Nombre del producto"
            value={newProduct.productName}
            onChange={(e) => setNewProduct({ ...newProduct, productName: e.target.value })}
          />
          <input
            type="number"
            placeholder="Precio"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          />
          <textarea
            placeholder="Descripción"
            value={newProduct.productDescription}
            onChange={(e) => setNewProduct({ ...newProduct, productDescription: e.target.value })}
          ></textarea>
          <input
            type="number"
            placeholder="Stock"
            value={newProduct.stock}
            onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
          />
          <select
            value={newProduct.categoryId}
            onChange={(e) => setNewProduct({ ...newProduct, categoryId: e.target.value })}
          >
            <option value="">Selecciona una categoría</option>
            {categories.map((category) => (
              <option key={category.categoryId} value={category.categoryId}>
                {category.categoryName}
              </option>
            ))}
          </select>
          <label htmlFor="tags">Etiquetas</label>
          <select id="tags" onChange={handleAddTag}>
            <option value="">Seleccione una etiqueta</option>
            {tags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
          <div className="selected-tags">
            {selectedTags.length > 0 ? (
              selectedTags.map((tag) => (
                <div key={tag} className="tag">
                  {tag}
                  <span className="remove" onClick={() => handleRemoveTag(tag)}>
                    &times;
                  </span>
                </div>
              ))
            ) : (
              <div>No hay etiquetas seleccionadas.</div>
            )}
          </div>
          <input
          type="number"
          placeholder="Descuento"
          value={newProduct.discountPercentage}
          onChange={(e) => {
            const value = e.target.value;
            
            // Validar si el valor está entre 0 y 100
            if (value === '' || (value >= 0 && value <= 100)) {
              setNewProduct({ ...newProduct, discountPercentage: value });
            }
          }}
        />
          <input type="file" multiple onChange={handleImageUpload} />
          <button onClick={handleCreateProduct}>Crear Producto</button>
        </div>
      )}

      {/* Lista de productos */}
      <div className="products-list">
      <h3>Lista de Productos</h3>
      {loading && <p>Cargando...</p>}
      {error && <p>Error: {error}</p>}
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th> {/* Nueva columna */}
            <th>Descuento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.productName}</td>
              <td>${product.price}</td>
              <td>{product.stock}</td> {/* Agregar stock aquÃ */}
              <td>{(product.discountPercentage * 100).toFixed(1)}%</td>
              <td>
                <button onClick={() => handleEditProduct(product.productId)}>Editar</button>
                <button onClick={() => handleDeleteProduct(product.productId)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      
      {/* Formulario de edición */}
      {editProductId && (
      <div className="edit-product-form">
        <button className="close-btn" onClick={() => setEditProductId(null)}>
        ✖
        </button>
        <h3>Editar Producto</h3>
        <label htmlFor="editProductName">Nombre del producto</label>
        <input
          type="text"
          id="editProductName"
          value={editProductData.productName}
          onChange={(e) =>
            setEditProductData({ ...editProductData, productName: e.target.value })
          }
        />
        <label htmlFor="editPrice">Precio del producto</label>
        <input
          type="number"
          id="editPrice"
          value={editProductData.price}
          onChange={(e) =>
            setEditProductData({ ...editProductData, price: e.target.value })
          }
        />
        <label htmlFor="editProductDescription">Descripción del producto</label>
        <textarea
          id="editProductDescription"
          value={editProductData.productDescription}
          onChange={(e) =>
            setEditProductData({ ...editProductData, productDescription: e.target.value })
          }
        ></textarea>
        <label htmlFor="editStock">Stock</label>
        <input
          type="number"
          id="editStock"
          value={editProductData.stock}
          onChange={(e) =>
            setEditProductData({ ...editProductData, stock: e.target.value })
          }
        />
        <label htmlFor="editCategoryName">Categoría</label>
        <select
          id="editCategoryName"
          value={editProductData.categoryName}
          onChange={(e) =>
            setEditProductData({ ...editProductData, categoryName: e.target.value })
          }
        >
          <option value="">Seleccione una categoría</option>
          {categories.map((category) => (
            <option key={category.categoryId} value={category.categoryName}>
              {category.categoryName}
            </option>
          ))}
        </select>
        <label htmlFor="editDiscountPercentage">Porcentaje de descuento</label>
        <input
        type="number"
        id="editDiscountPercentage"
        value={editProductData.discountPercentage}
        onChange={(e) => {
          const value = e.target.value;

          // Validar si el valor está entre 0 y 100
          if (value === '' || (value >= 0 && value <= 100)) {
            setEditProductData({ ...editProductData, discountPercentage: value });
          }
        }}
      />

        <label htmlFor="editTags">Tags separados por coma</label>
        <input
          type="text"
          id="editTags"
          value={editProductData.tags}
          onChange={(e) => setEditProductData({ ...editProductData, tags: e.target.value })}
        />
        <label htmlFor="editImageUpload">Subir nuevas imágenes</label>
        <input type="file" id="editImageUpload" multiple onChange={handleEditImageUpload} />
        <div className="image-preview">
          {editProductData.imageBase64s?.map((imageBase64, index) => (
            <div key={editProductData.imageIds[index]} className="image-container">
              <img src={imageBase64} alt={`Imagen ${index}`} style={{ width: '100px' }} />
              <button onClick={() => handleRemoveEditImage(index)}>Eliminar</button>
            </div>
          ))}
        </div>
        <button onClick={handleSaveEditProduct}>Guardar Cambios</button>
      </div>
    )}

    </div>
  );
};

export default ProductsContent;
