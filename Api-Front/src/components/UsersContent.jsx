import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers, fetchUserById } from '../api/SliceUser'; // Importa las acciones del slice
import './styles/UsersContent.css'; // Ajusta la ruta según la estructura de tu proyecto

const UsersContent = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const error = useSelector((state) => state.user.error);
  const loading = useSelector((state) => state.user.loading);
  const [searchId, setSearchId] = React.useState('');
  const userById = useSelector((state) => state.user.searchedUser); // Accede al usuario buscado

  // Obtener todos los usuarios al cargar el componente
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleSearchById = () => {
    if (searchId) {
      dispatch(fetchUserById(searchId));
    }
  };

  // Muestra un mensaje si hay error
  if (error) {
    return <div>{error}</div>;
  }

  if (loading) {
    return <div>Cargando usuarios...</div>;
  }

  return (
    <div className="users-content">
      <h2>Lista de Usuarios</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName} {user.secondName}</td>
              <td>{user.userName}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Buscar usuario por ID */}
      <div>
        <h3>Buscar Usuario por ID</h3>
        <input
          type="text"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          placeholder="Ingrese ID del usuario"
        />
        <button onClick={handleSearchById}>Buscar</button>

        
        {userById && (
          <div className="user-found">
            <h4>Usuario encontrado:</h4>
            <p>ID: {userById.id}</p>
            <p>Nombre: {userById.firstName} {userById.secondName}</p>
            <p>Email: {userById.userName}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersContent;
