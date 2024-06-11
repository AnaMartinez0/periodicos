import { useEffect } from 'react';
import styles from '../styles/header.module.css';
import Link from 'next/link';
import { destroyCookie } from 'nookies';
import Router from 'next/router';
import Image from 'next/image';

// Constante para definir el tiempo de inactividad (10 minutos)
const INACTIVITY_LIMIT = 10 * 60 * 1000; // 10 minutos en milisegundos

function handleLogout() {
  // Destruir cookie de sesión
  destroyCookie(null, 'login');

  // Limpiar local storage
  localStorage.removeItem('username');
  localStorage.removeItem('jwt');
  localStorage.removeItem('isAdmin');
  localStorage.removeItem('ally-supports-cache');
  localStorage.removeItem('id_user');
  localStorage.removeItem('cart');

  // Redirigir al usuario a la página de inicio de sesión
  Router.push('/login');
}

function handleWindowClose() {
  const lastInteraction = new Date().getTime();
  sessionStorage.setItem('lastInteraction', lastInteraction);
}

function clearLocalStorageIfInactive() {
  const lastInteraction = sessionStorage.getItem('lastInteraction');
  if (lastInteraction) {
    const currentTime = new Date().getTime();
    const timeElapsed = currentTime - lastInteraction;
    if (timeElapsed > INACTIVITY_LIMIT) {
      localStorage.removeItem('username');
      localStorage.removeItem('jwt');
      localStorage.removeItem('isAdmin');
      localStorage.removeItem('ally-supports-cache');
      localStorage.removeItem('id_user');
      localStorage.removeItem('cart');
      destroyCookie(null, 'login');
    }
  }
}

export default function Header() {
  useEffect(() => {
    // Al cargar la página, verifica si han pasado más de 10 minutos de inactividad
    clearLocalStorageIfInactive();

    // Registrar la hora de la última interacción cuando el usuario cierra el navegador
    window.addEventListener('beforeunload', handleWindowClose);

    // Limpiar el evento al desmontar el componente
    return () => {
      window.removeEventListener('beforeunload', handleWindowClose);
    };
  }, []);

  return (
    <header className={styles.header}>
      <Link href='/home'>
        <Image className={styles.imgHeader} width={'200%'} height={'70%'} src={`/LOGO-PILON-1.png`} alt='Logo El Pilón' />
      </Link>
      <section className={styles.sectionIcons}>
        <div className={styles.containerIcons}>
          <Link href="/user">
            <a>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                </svg>
              </div>
            </a>
          </Link>
        </div>
        <div className={styles.containerIcons}>
          <Link href="/cart">
            <a>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                </svg>
              </div>
            </a>
          </Link>
        </div>
        <div className={styles.containerIcons}>
          <Link href="/">
            <a onClick={handleLogout}>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6ZM5.78 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 0 0 0 1.06l3 3a.75.75 0 0 0 1.06-1.06l-1.72-1.72H15a.75.75 0 0 0 0-1.5H4.06l1.72-1.72a.75.75 0 0 0 0-1.06Z" clipRule="evenodd" />
                </svg>
              </div>
            </a>
          </Link>
        </div>
      </section>

    </header>
  );
}

