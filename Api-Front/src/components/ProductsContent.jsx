import React, { useState, useEffect } from 'react';
import {
  fetchProductos,
  createProduct,
  softDeleteProduct,
  updateProduct,
} from '../api/Product'; // Asegúrate de que la ruta es correcta
import './styles/ProductsContent.css'; // Importa el CSS

const ProductsContent = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    productName: '',
    price: 0,
    productDescription: '',
    stock: 0,
    categoryName: '',
    discountPercentage: 0.0,
    tags: '',
  });
  const [editProductId, setEditProductId] = useState(null);
  const [editProductData, setEditProductData] = useState({});

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

  // Crear un nuevo producto
  const handleCreateProduct = async () => {
    try {
      // El campo tags es un string en el formulario, lo convertimos a un array
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
        <input
          type="text"
          value={newProduct.productName}
          onChange={(e) => setNewProduct({ ...newProduct, productName: e.target.value })}
          placeholder="Nombre del producto"
        />
        <input
          type="number"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          placeholder="Precio del producto"
        />
        <textarea
          value={newProduct.productDescription}
          onChange={(e) => setNewProduct({ ...newProduct, productDescription: e.target.value })}
          placeholder="Descripción del producto"
        ></textarea>
        <input
          type="number"
          value={newProduct.stock}
          onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
          placeholder="Stock"
        />
        <input
          type="text"
          value={newProduct.categoryName}
          onChange={(e) => setNewProduct({ ...newProduct, categoryName: e.target.value })}
          placeholder="Categoría"
        />
        <input
          type="number"
          value={newProduct.discountPercentage}
          onChange={(e) => setNewProduct({ ...newProduct, discountPercentage: e.target.value })}
          placeholder="Porcentaje de descuento"
        />
        <input
          type="text"
          value={newProduct.tags}
          onChange={(e) => setNewProduct({ ...newProduct, tags: e.target.value })}
          placeholder="Tags separados por coma"
        />
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
          <input
            type="text"
            value={editProductData.productName || ''}
            onChange={(e) => setEditProductData({ ...editProductData, productName: e.target.value })}
            placeholder="Nombre del producto"
          />
          <input
            type="number"
            value={editProductData.price || 0}
            onChange={(e) => setEditProductData({ ...editProductData, price: e.target.value })}
            placeholder="Precio del producto"
          />
          <textarea
            value={editProductData.productDescription || ''}
            onChange={(e) => setEditProductData({ ...editProductData, productDescription: e.target.value })}
            placeholder="Descripción del producto"
          ></textarea>
          <input
            type="number"
            value={editProductData.stock || 0}
            onChange={(e) => setEditProductData({ ...editProductData, stock: e.target.value })}
            placeholder="Stock"
          />
          <input
            type="text"
            value={editProductData.categoryName || ''}
            onChange={(e) => setEditProductData({ ...editProductData, categoryName: e.target.value })}
            placeholder="Categoría"
          />
          <input
            type="number"
            value={editProductData.discountPercentage || 0}
            onChange={(e) => setEditProductData({ ...editProductData, discountPercentage: e.target.value })}
            placeholder="Porcentaje de descuento"
          />
          <input
            type="text"
            value={editProductData.tags || ''}
            onChange={(e) => setEditProductData({ ...editProductData, tags: e.target.value })}
            placeholder="Tags separados por coma"
          />
          <button onClick={() => handleEditProduct(editProductId)}>Guardar Cambios</button>
        </div>
      )}
    </div>
  );
};

export default ProductsContent;
