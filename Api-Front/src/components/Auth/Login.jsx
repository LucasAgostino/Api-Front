// components/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

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
    <div>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>

      {/* Enlace para redirigir a la página de registro */}
      <p>
        ¿Aún no estás registrado?{' '}
        <Link to="/register">Regístrate aquí</Link>
      </p>
    </div>
  );
};

export default Login;
