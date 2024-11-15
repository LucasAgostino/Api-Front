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

  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);
  const tags = useSelector((state) => state.product.tags);
  const categories = useSelector((state) => state.category.items);
  const token = useSelector((state) => state.user.token); // Usamos el token desde Redux

  // Obtener productos y etiquetas al cargar el componente
  useEffect(() => {
    dispatch(fetchProductsThunk());
    dispatch(fetchTagsThunk());
    dispatch(loadCategories());
  }, [dispatch]);

  // Crear un producto
  const handleCreateProduct = () => {
    const formData = new FormData();
    formData.append('productName', newProduct.productName);
    formData.append('productDescription', newProduct.productDescription);
    formData.append('price', newProduct.price);
    formData.append('stock', newProduct.stock);
    formData.append('categoryId', newProduct.categoryId);
    formData.append('discountPercentage', newProduct.discountPercentage);

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
  };

  // Eliminar un producto
  const handleDeleteProduct = (productId) => {
    dispatch(softDeleteProductsThunk(productId));
  };

  // Editar un producto
  const handleEditProduct = (productId) => {
    const productToEdit = products.find((product) => product.id === productId);
    setEditProductId(productId);
    setEditProductData({ ...productToEdit });
  };

  const handleSaveEditProduct = () => {
    const updatedData = { ...editProductData };
    delete updatedData.id; // Eliminamos el ID antes de enviar

    dispatch(updateProductsThunk({ productId: editProductId, updatedData }));
    setEditProductId(null);
    setEditProductData({});
  };

  // Subir imágenes para un producto
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

      {/* Crear nuevo producto */}
      <div className="create-product-form">
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
        <input
          type="number"
          placeholder="Descuento"
          value={newProduct.discountPercentage}
          onChange={(e) =>
            setNewProduct({ ...newProduct, discountPercentage: e.target.value })
          }
        />
        <input
          type="file"
          multiple
          onChange={handleImageUpload}
        />
        <button onClick={handleCreateProduct}>Crear Producto</button>
      </div>

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
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.productName}</td>
                <td>{product.price}</td>
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
        <div>
          <h3>Editar Producto</h3>
          <input
            type="text"
            value={editProductData.productName || ''}
            onChange={(e) =>
              setEditProductData({ ...editProductData, productName: e.target.value })
            }
          />
          <button onClick={handleSaveEditProduct}>Guardar</button>
        </div>
      )}
    </div>
  );
};

export default ProductsContent;