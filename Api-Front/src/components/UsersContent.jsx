import React, { useEffect, useState } from 'react';
import { getAllUsers, getUserById } from '../api/User'; // Asegúrate de que la ruta es correcta
import './styles/UsersContent.css'; // Ajusta la ruta según la estructura de tu proyecto

const UsersContent = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [searchId, setSearchId] = useState('');
  const [userById, setUserById] = useState(null);

  // Obtener todos los usuarios al cargar el componente
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (err) {
        setError('Error al obtener los usuarios.');
        console.error(err);
      }
    };
    fetchUsers();
  }, []);

  const handleSearchById = async () => {
    try {
      const user = await getUserById(searchId);
      setUserById(user);
    } catch (err) {
      setError(`Error al obtener el usuario con ID ${searchId}`);
      console.error(err);
    }
  };

  // Muestra un mensaje si hay error
  if (error) {
    return <div>{error}</div>;
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
          <div>
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
