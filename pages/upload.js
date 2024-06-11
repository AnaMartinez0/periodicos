import { useEffect, useState } from 'react';
import Layout from '../components/layout';
import styles from "../styles/cargarPeriodico.module.css";
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Upload() {
  const [titulo, setTitulo] = useState('');
  const [fecha, setFecha] = useState('');
  const [precio, setPrecio] = useState('');
  const [periodico, setPeriodico] = useState(null);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [jwt, setJwt] = useState('');

  const router = useRouter();


  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isAdminValue = localStorage.getItem('isAdmin');
      const JWT = localStorage.getItem('jwt');
      setIsAdmin(isAdminValue === 'true');
      setJwt(JWT);
    }
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    if (file.type !== 'application/pdf') {
      setError('Only PDF files are allowed');
      return;
    }
    if (file.size > 1024 * 1024 * 20) { // 20MB limit
      setError('File size exceeds 20MB');
      return;
    }
    setPeriodico(file);
  };

  const addPeriodico = async () => {
    const formData = new FormData();
    formData.append('data', JSON.stringify({
      titulo,
      fecha,
      precio,
      periodico: {
        create: {
          name: periodico.name,
          alternativeText: null,
          caption: null,
          width: null,
          height: null,
          formats: null,
          hash: periodico.hash,
          ext: periodico.ext,
          mime: periodico.mime,
          size: periodico.size,
          url: periodico.url,
          previewUrl: null,
          provider: "cloudinary",
          provider_metadata: periodico.provider_metadata
            ? {
              public_id: periodico.provider_metadata.public_id,
              resource_type: periodico.provider_metadata.resource_type,
            }
            : null,
          createdAt: periodico.createdAt,
          updatedAt: periodico.updatedAt,
        },
      },
    }));
    formData.append('files.periodico', periodico);

    try {
      const response = await axios.post(`https://preiodicos-strapi.onrender.com/api/periodicos`, formData, {
        headers: {
          'Authorization': `Bearer ${jwt}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      router.push('/home');
      console.log(response.data)
      // if (response) {
      //   console.log(response.data)
      //   Router.push('/home');
      // } else {
      //   setError(`Error al subir el periódico: ${response.statusText}`);
      // }
    } catch (error) {
      setError(`Error al subir el periódico: ${error.message}`);
    }

  };

  return (
    <Layout title="Subir Periodico" description="Página principal de El Pilon">
      <nav className={styles.navigation}>
        <Link className={styles.link} href="/home">Inicio</Link>
        {!isAdmin && <Link className={styles.link} href="/periodicos">Periodicos</Link>}
        {!isAdmin && <Link className={styles.link} href="/nosotros">Acerca de Nosotros</Link>}
        {isAdmin && <Link className={styles.link} href="/upload">Subir Periodico</Link>}
      </nav>
      <div className="flex items-center justify-center h-50" class={styles.containerMain}>
          <form className="bg-slate-300 shadow-md rounded px-8 pt-5 pb-8 mb-4" class={styles.containerForm}>
            <h2 className="block text-gray-700 text-4xl font-bold mb-2" htmlFor="titulo">
              Carga de Archivos
            </h2>
            <div class={styles.containerInputs}>
              <div className="mb-4">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="titulo"
                  type="text"
                  placeholder="Titulo"
                  value={titulo}
                  onChange={e => setTitulo(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="fecha"
                  type="date"
                  value={fecha}
                  onChange={e => setFecha(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="precio"
                  type="number"
                  placeholder="Precio $ 1500"
                  value={precio}
                  onChange={e => setPrecio(e.target.value)}
                  min='1500'
                  required
                />
              </div>
            </div>
            <div className="mb-4" class={styles.containerArchivo}>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="pdf"
                type="file"
                onChange={handleFileChange}
                
              />
            </div>
            <button
              className="bg-slate-400 hover:bg-green-500 text-slate-100 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={addPeriodico}
            >
              Subir Periódico
            </button>
          </form>
        </div>

      {error && <p>Error: {error}</p>}
    </Layout>
  );
}