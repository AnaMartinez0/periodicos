import axios from 'axios';
import { useEffect, useState } from 'react';
import Router from 'next/router';
import styles from '../styles/user.module.css';
import Layout from '../components/layout';
import Link from 'next/link';
import style from "../styles/home.module.css";


export default function User() {
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const [initialUsername, setInitialUsername] = useState('');
  const [initialEmail, setInitialEmail] = useState('');

  const fetchUserData = async () => {
    const token = localStorage.getItem('jwt');

    if (!token) {
      Router.push('/login');
      return;
    }

    try {
      const response = await axios.get('https://preiodicos-strapi.onrender.com/api/users/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const user = response.data;
      setUserId(user.id);
      setUsername(user.username);
      setEmail(user.email);
      setInitialUsername(user.username);
      setInitialEmail(user.email);
      setPassword('');
    } catch (error) {
      setError('An error occurred while fetching user data');
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleUpdate = async () => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      Router.push('/login');
      return;
    }

    const updateInfo = {
      username,
      email,
    };

    if (password) {
      updateInfo.password = password;
    }

    try {
      const response = await axios.put(`https://preiodicos-strapi.onrender.com/api/users/${userId}`, updateInfo, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setSuccess('User information updated successfully');
        setEditMode(false);
        setInitialUsername(username);
        setInitialEmail(email);
        setPassword('');
      } else {
        setError('Failed to update user data');
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setError('You do not have permission to update this information.');
      } else {
        setError('An error occurred while updating user data');
      }
    }
  };

  const handleCancel = () => {
    setUsername(initialUsername);
    setEmail(initialEmail);
    setPassword('');
    setEditMode(false);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isAdminValue = localStorage.getItem('isAdmin');
      setIsAdmin(isAdminValue === 'true');
    }
  }, []);

  return (
    <Layout title='Información del Usuario' description='Aquí se encuentra la información del usuario'>
      <nav className={style.navigation}>
        <Link className={style.link} href="/home">
          Inicio
        </Link>

        {!isAdmin && (
          <Link className={style.link} href="/periodicos">
            Periódicos
          </Link>
        )}

        {!isAdmin && (
          <Link className={style.link} href="/nosotros">
            Acerca de Nosotros
          </Link>
        )}

        {isAdmin && (
          <Link className={style.link} href="/upload">
            Subir Periódico
          </Link>
        )}
      </nav>

      <div className={styles.containerMain}>
        <h2>Información del Usuario</h2>
        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}
        <div className={styles.form}>
          <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="username">Nombre de Usuario</label>
            <input
              className={styles.input}
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              readOnly={!editMode}
            />
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="email">Correo Electrónico</label>
            <input
              className={styles.input}
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              readOnly={!editMode}
            />
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="password">Contraseña</label>
            <input
              className={styles.input}
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Deja en blanco para mantener la contraseña actual"
              readOnly={!editMode}
            />
            {editMode && (
              <button
                type="button"
                className={styles.toggleButton}
                onClick={toggleShowPassword}
              >
                {showPassword ? "Ocultar" : "Mostrar"}
              </button>
            )}
          </div>
          {editMode ? (
            <div className={styles.buttonGroup}>
              <button className={styles.submitButton} onClick={handleUpdate}>Guardar Cambios</button>
              <button className={styles.cancelButton} onClick={handleCancel}>Cancelar</button>
            </div>
          ) : (
            <button className={styles.editButton} onClick={() => setEditMode(true)}>Editar</button>
          )}
        </div>
      </div>
    </Layout>
  );
}
