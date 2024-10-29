import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // Importa useDispatch y useSelector
import { authenticateUserThunk } from '../../api/SliceUser'; // Importa el thunk
import '../styles/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Obtén la función dispatch

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const authData = { username, password };
      
      // Utiliza dispatch para llamar al thunk de autenticación
      const response = await dispatch(authenticateUserThunk(authData)).unwrap();

      // Mostrar el token y el rol en la consola
      console.log('Token:', response.access_token);
      console.log('Rol:', response.role);
      // Redirigir al usuario al home
      navigate('/');

    } catch (error) {
      setErrorMessage('Error al iniciar sesión. Verifica tus credenciales.');
      console.error('Error en la autenticación:', error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Bienvenido!</h2>
        <p>Inicia sesión</p>
        <form onSubmit={handleLogin}>
          <div>
            <label>Nombre de Usuario</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Iniciar Sesión</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <p>
          ¿Todavía no tenés cuenta?{' '}
          <Link to="/register">Registrate acá</Link>
        </p>
      </div>
      <img className="login-image" src="/login.png" alt="Login Banner" />
      <div className="no-footer"></div>
    </div>
  );
};

export default Login;
