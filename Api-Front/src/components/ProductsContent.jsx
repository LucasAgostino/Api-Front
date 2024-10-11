import React, { useState, useEffect } from 'react';
import {
  fetchProductos,
  createProduct,
  softDeleteProduct,
  updateProduct,
  fetchTags,
} from '../api/Product';
import { fetchCategories } from '../api/Category';
import './styles/ProductsContentAdmin.css';
import { setAuthToken } from '../api/Product';

const ProductsContent = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [newProduct, setNewProduct] = useState({
    productName: '',
    price: 0,
    productDescription: '',
    stock: 0,
    categoryId: '',
    discountPercentage: 0.0,
    tags: '',
    imageBase64s: [], // Almacenamos múltiples imágenes
  });
  const [editProductId, setEditProductId] = useState(null);
  const [editProductData, setEditProductData] = useState({});

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const categoryData = await fetchCategories();
        const tagData = await fetchTags();
        setCategories(categoryData);
        setTags(tagData);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };
    fetchAllData();
  }, []);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const data = await fetchProductos();
        setProducts(data);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };
    fetchAllProducts();
  }, []);

  // Manejar la carga de múltiples imágenes y convertirlas a base64
  const handleImageUpload = (e) => {
    const files = e.target.files;
    const promises = Array.from(files).map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises).then((base64Images) => {
      setNewProduct((prevState) => ({
        ...prevState,
        imageBase64s: [...prevState.imageBase64s, ...base64Images], // Agregamos imágenes nuevas manteniendo el orden
      }));
    });
  };

  // Eliminar una imagen de la lista seleccionada
  const handleRemoveImage = (index) => {
    const updatedImages = newProduct.imageBase64s.filter((_, i) => i !== index);
    setNewProduct({ ...newProduct, imageBase64s: updatedImages });
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

  const handleCreateProduct = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No se encontró un token');
      return;
    }

    setAuthToken(token);

    const formData = new FormData();
    formData.append('productName', newProduct.productName);
    formData.append('productDescription', newProduct.productDescription);
    formData.append('price', parseFloat(newProduct.price).toString());
    formData.append('stock', parseInt(newProduct.stock, 10).toString());
    formData.append('categoryId', parseInt(newProduct.categoryId, 10).toString());
    formData.append('discountPercentage', parseFloat(newProduct.discountPercentage).toString());

    // Agregar múltiples imágenes al FormData
    if (newProduct.imageBase64s.length > 0) {
      for (let i = 0; i < newProduct.imageBase64s.length; i++) {
        const blob = await fetch(newProduct.imageBase64s[i]).then((res) => res.blob());
        formData.append('images', blob, `image${i}.jpg`);
      }
    } else {
      formData.append('images', null);
    }

    const tagsArray = newProduct.tags.split(',').map((tag) => tag.trim());
    tagsArray.forEach((tag) => formData.append('tags', tag));

    try {
      const createdProduct = await createProduct(formData);
      console.log('Producto creado:', createdProduct);

      // Reiniciar formulario
      setNewProduct({
        productName: '',
        price: '',
        productDescription: '',
        stock: '',
        categoryId: '',
        discountPercentage: 0.0,
        tags: '',
        imageBase64s: [],
      });
      setSelectedTags([]);
    } catch (error) {
      console.error('Error al crear el producto:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No se encontró un token');
      return;
    }

    setAuthToken(token);

    try {
      await softDeleteProduct(productId);
      console.log(`Producto con ID ${productId} eliminado correctamente`);

      // Actualizar la lista de productos después de eliminar
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.productId !== productId)
      );
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  return (
    <div className="products-contents-admin">
      <h2>Gestión de Productos</h2>

      {/* Crear nuevo producto */}
      <div className="create-product-form">
        <h3>Crear Nuevo Producto</h3>
        <label htmlFor="productName">Nombre del producto</label>
        <input
          type="text"
          id="productName"
          value={newProduct.productName}
          onChange={(e) => setNewProduct({ ...newProduct, productName: e.target.value })}
        />
        <label htmlFor="price">Precio del producto</label>
        <input
          type="number"
          id="price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <label htmlFor="productDescription">Descripción del producto</label>
        <textarea
          id="productDescription"
          value={newProduct.productDescription}
          onChange={(e) => setNewProduct({ ...newProduct, productDescription: e.target.value })}
        ></textarea>
        <label htmlFor="stock">Stock</label>
        <input
          type="number"
          id="stock"
          value={newProduct.stock}
          onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
        />
        <label htmlFor="categoryName">Categoría</label>
        <select
          id="categoryName"
          value={newProduct.categoryId}
          onChange={(e) => setNewProduct({ ...newProduct, categoryId: e.target.value })}
        >
          <option value="">Seleccione una categoría</option>
          {categories.map((category) => (
            <option key={category.categoryId} value={category.categoryId}>
              {category.categoryName}
            </option>
          ))}
        </select>
        <label htmlFor="discountPercentage">Porcentaje de descuento</label>
        <input
          type="number"
          id="discountPercentage"
          value={newProduct.discountPercentage}
          onChange={(e) => setNewProduct({ ...newProduct, discountPercentage: e.target.value })}
        />
        <label htmlFor="tags">Etiquetas</label>
        <select id="tags" onChange={handleAddTag}>
          <option value="">Seleccione una etiqueta</option>
          {tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>

        {/* Mostrar etiquetas seleccionadas */}
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

        <label htmlFor="imageUpload">Subir imágenes</label>
        <input type="file" id="imageUpload" multiple onChange={handleImageUpload} />
        <div className="image-preview">
          {newProduct.imageBase64s.map((imageBase64, index) => (
            <div key={index} className="image-container">
              <img
                src={imageBase64}
                alt={`Imagen ${index + 1}`}
                style={{ width: '100px' }}
              />
              <button onClick={() => handleRemoveImage(index)}>Eliminar</button>
            </div>
          ))}
        </div>
        <button onClick={handleCreateProduct}>Crear Producto</button>
      </div>

      {/* Lista de productos */}
      <div className="products-list">
        <h3>Lista de Productos</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Categoría</th>
              <th>Descuento</th>
              <th>Tags</th>
              <th>Imagen</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.productId}>
                <td>{product.productId}</td>
                <td>{product.productName}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td>{product.categoryName}</td>
                <td>{product.discountPercentage}%</td>
                <td>{product.tags.join(', ')}</td>
                <td>
                  {product.imageBase64s && (
                    <img src={product.imageBase64s[0]} alt={product.productName} style={{ width: '50px' }} />
                  )}
                </td>
                <td>
                  <button onClick={() => setEditProductId(product.productId)}>Editar</button>
                  <button onClick={() => handleDeleteProduct(product.productId)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edición de producto */}
      {editProductId && (
        <div className="edit-product-form">
          <h3>Editar Producto</h3>
          <label htmlFor="editProductName">Nombre del producto</label>
          <input
            type="text"
            id="editProductName"
            value={editProductData.productName || ''}
            onChange={(e) => setEditProductData({ ...editProductData, productName: e.target.value })}
          />
          <label htmlFor="editPrice">Precio del producto</label>
          <input
            type="number"
            id="editPrice"
            value={editProductData.price || 0}
            onChange={(e) => setEditProductData({ ...editProductData, price: e.target.value })}
          />
          <label htmlFor="editProductDescription">Descripción del producto</label>
          <textarea
            id="editProductDescription"
            value={editProductData.productDescription || ''}
            onChange={(e) => setEditProductData({ ...editProductData, productDescription: e.target.value })}
          ></textarea>
          <label htmlFor="editStock">Stock</label>
          <input
            type="number"
            id="editStock"
            value={editProductData.stock || 0}
            onChange={(e) => setEditProductData({ ...editProductData, stock: e.target.value })}
          />
          <label htmlFor="editCategoryName">Categoría</label>
          <select
            id="editCategoryName"
            value={editProductData.categoryName}
            onChange={(e) => setEditProductData({ ...editProductData, categoryName: e.target.value })}
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
            value={editProductData.discountPercentage || 0}
            onChange={(e) => setEditProductData({ ...editProductData, discountPercentage: e.target.value })}
          />
          <label htmlFor="editTags">Tags separados por coma</label>
          <input
            type="text"
            id="editTags"
            value={editProductData.tags || ''}
            onChange={(e) => setEditProductData({ ...editProductData, tags: e.target.value })}
          />
          <button onClick={() => handleEditProduct(editProductId)}>Guardar Cambios</button>
        </div>
      )}
    </div>
  );
};

export default ProductsContent;
