import React, { useState, useEffect } from 'react';
import {
  fetchProductos,
  createProduct,
  softDeleteProduct,
  updateProduct,
} from '../api/Product'; // Asegúrate de que la ruta es correcta
import { fetchCategories } from '../api/Category'; // Importa la función para traer las categorías
import './styles/ProductsContentAdmin.css'; // Importa el CSS

const ProductsContent = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // Estado para las categorías
  const [newProduct, setNewProduct] = useState({
    productName: '',
    price: 0,
    productDescription: '',
    stock: 0,
    categoryName: '', // Esto ahora será un select
    discountPercentage: 0.0,
    tags: '',
    imageBase64s: '', // Estado para almacenar la imagen en base64
  });
  const [editProductId, setEditProductId] = useState(null);
  const [editProductData, setEditProductData] = useState({});

  // Obtener todas las categorías al cargar el componente
  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const data = await fetchCategories(); // Trae las categorías desde la API
        setCategories(data); // Guarda las categorías en el estado
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
      }
    };
    fetchAllCategories();
  }, []);

  // Obtener todos los productos al cargar el componente
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

  // Manejar la carga de imágenes y convertirla a base64
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewProduct({ ...newProduct, imageBase64s: [reader.result] }); // Actualiza el estado con la imagen en base64
    };
    if (file) {
      reader.readAsDataURL(file); // Lee el archivo y lo convierte a base64
    }
  };

  // Crear un nuevo producto
  const handleCreateProduct = async () => {
    try {
      const productData = {
        ...newProduct,
        tags: newProduct.tags.split(',').map((tag) => tag.trim()), // Convierte la cadena de tags a un array
      };

      const createdProduct = await createProduct(productData);
      console.log('Producto creado:', createdProduct); // Verifica si llega la respuesta del backend
      setProducts([...products, createdProduct]);
      setNewProduct({
        productName: '',
        price: 0,
        productDescription: '',
        stock: 0,
        categoryName: '',
        discountPercentage: 0.0,
        tags: '',
        imageBase64s: '', // Reiniciar la imagen
      }); // Reinicia el formulario
    } catch (error) {
      console.error('Error al crear el producto:', error);
    }
  };

  // Eliminar un producto (soft delete)
  const handleDeleteProduct = async (productId) => {
    try {
      await softDeleteProduct(productId);
      setProducts(products.filter((product) => product.productId !== productId));
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  // Manejar la edición de un producto
  const handleEditProduct = async (productId) => {
    try {
      const productData = {
        ...editProductData,
        tags: editProductData.tags.split(',').map((tag) => tag.trim()), // Convierte la cadena de tags a un array
      };

      const updatedProduct = await updateProduct(productId, productData);
      setProducts(products.map((product) => (product.productId === productId ? updatedProduct : product)));
      setEditProductId(null); // Finaliza la edición
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
    }
  };

  return (
    <div className="products-content">
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
          value={newProduct.categoryName}
          onChange={(e) => setNewProduct({ ...newProduct, categoryName: e.target.value })}
        >
          <option value="">Seleccione una categoría</option>
          {categories.map((category) => (
            <option key={category.categoryId} value={category.categoryName}>
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
        <label htmlFor="tags">Tags separados por coma</label>
        <input
          type="text"
          id="tags"
          value={newProduct.tags}
          onChange={(e) => setNewProduct({ ...newProduct, tags: e.target.value })}
        />
        <label htmlFor="imageUpload">Subir imagen</label>
        <input type="file" id="imageUpload" onChange={handleImageUpload} />
        {newProduct.imageBase64s && (
          <div className="image-preview">
            <img src={newProduct.imageBase64s} alt="Preview" style={{ width: '100px' }} />
          </div>
        )}
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