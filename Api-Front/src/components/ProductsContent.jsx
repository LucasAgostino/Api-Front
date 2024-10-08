import React, { useState, useEffect } from 'react';
import {
  fetchProductos,
  createProduct,
  softDeleteProduct,
  updateProduct,
  fetchTags, // Importa la función para traer las etiquetas (tags)
} from '../api/Product'; // Asegúrate de que la ruta es correcta
import { fetchCategories } from '../api/Category'; // Importa la función para traer las categorías
import './styles/ProductsContentAdmin.css'; // Importa el CSS
import { setAuthToken } from '../api/Product'; // O la ruta correcta donde está definida

const ProductsContent = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // Estado para las categorías
  const [tags, setTags] = useState([]); // Estado para los tags (etiquetas)
  const [selectedTags, setSelectedTags] = useState([]); // Estado para las etiquetas seleccionadas
  const [newProduct, setNewProduct] = useState({
    productName: '',
    price: 0,
    productDescription: '',
    stock: 0,
    categoryId: '', // Esto ahora será un select
    discountPercentage: 0.0,
    tags: '',
    imageBase64s: '', // Estado para almacenar la imagen en base64
  });
  const [editProductId, setEditProductId] = useState(null);
  const [editProductData, setEditProductData] = useState({});

  // Obtener todas las categorías y etiquetas al cargar el componente
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const categoryData = await fetchCategories();
        const tagData = await fetchTags();
        setCategories(categoryData); // Guarda las categorías en el estado
        setTags(tagData); // Guarda los tags en el estado
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };
    fetchAllData();
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

  // Añadir etiqueta seleccionada a la lista de etiquetas del producto
  const handleAddTag = (e) => {
    const selectedTag = e.target.value;
    if (selectedTag && !selectedTags.includes(selectedTag)) {
      const updatedTags = [...selectedTags, selectedTag];
      setSelectedTags(updatedTags);
      setNewProduct({ ...newProduct, tags: updatedTags.join(', ') }); // Actualiza las tags en el estado de newProduct
    }
  };

  // Eliminar etiqueta seleccionada de la lista
  const handleRemoveTag = (tagToRemove) => {
    const updatedTags = selectedTags.filter((tag) => tag !== tagToRemove);
    setSelectedTags(updatedTags);
    setNewProduct({ ...newProduct, tags: updatedTags.join(', ') }); // Actualiza las tags en el estado de newProduct
  };
  
  // Crear un nuevo producto
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
  
    // Agregar descuento, incluso si es 0
    formData.append('discountPercentage', parseFloat(newProduct.discountPercentage).toString());
  
    // Agregar imágenes, aunque no existan (se enviará null o vacío si no hay)
    if (newProduct.imageBase64s) {
      const blob = await fetch(newProduct.imageBase64s).then(res => res.blob());
      formData.append('images', blob, 'image.jpg');
    } else {
      formData.append('images', null); // Agregar un valor vacío o null si no hay imagen
    }
  
    // Agregar tags como un array
    const tagsArray = newProduct.tags.split(',').map(tag => tag.trim());
    tagsArray.forEach(tag => formData.append('tags', tag));
  
    // Imprimir los datos que se envían
    for (let [key, value] of formData.entries()) {
      console.log(key + ': ' + value);
    }
  
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
        imageBase64s: '',
      });
      setSelectedTags([]);
    } catch (error) {
      console.error('Error al crear el producto:', error);
    }
  };
  
  // Manejar la eliminación de un producto
  const handleDeleteProduct = async (productId) => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No se encontró un token');
      return;
    }

    setAuthToken(token);

    try {
      // Llamar a la función softDeleteProduct pasando el ID del producto
      await softDeleteProduct(productId);
      console.log(`Producto con ID ${productId} eliminado correctamente`);

      // Actualizar la lista de productos después de eliminar
      setProducts((prevProducts) => prevProducts.filter(product => product.productId !== productId));
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
    <div>No hay etiquetas seleccionadas.</div> // Mensaje si no hay etiquetas
  )}
</div>


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
