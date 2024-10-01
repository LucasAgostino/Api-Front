// components/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Login.css'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Aquí deberías enviar las credenciales al backend para autenticar al usuario
    console.log({ email, password });
    // Si la autenticación es exitosa, redirigir al usuario
    navigate('/');
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Bienvenido!</h2>
        <p>Inicia sesión</p>
        <form onSubmit={handleLogin}>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <div className="remember-me">
          </div>
          <button type="submit">Iniciar Sesión</button>
        </form>
        <p>
          ¿Todavía no tenes cuenta?{' '}
          <Link to="/register">Registrate acá</Link>
        </p>
      </div>
      <img className="login-image" src="/login.png" alt="Login Banner" />
      <div className="no-footer"></div>
    </div>
  );
};

export default Login;
