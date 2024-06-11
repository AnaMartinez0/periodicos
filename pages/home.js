import styles from "../styles/home.module.css";
import Layout from "../components/layout";
import Link from "next/link";
import Periodico from "../components/periodico";
import { useState, useEffect } from "react";


export default function HomePage({ periodicos }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const filteredPeriodicos = periodicos.filter((periodico) => {
      const periodicoDate = new Date(periodico.attributes.fecha);
      return (
        (startDate === "" || periodicoDate >= new Date(startDate)) &&
        (endDate === "" || periodicoDate <= new Date(endDate)) &&
        (title === "" || periodico.attributes.titulo.toLowerCase().includes(title.toLowerCase()))
      );
    });

    setPeriodicos(filteredPeriodicos);
  };

  // Set the periodicos as a state to update the UI when filtering
  const [periodicosState, setPeriodicos] = useState(periodicos);
  const [isAdmin, setIsAdmin] = useState(false);


  useEffect(() => {
    // Verificar si estamos en el navegador antes de intentar acceder a localStorage
    if (typeof window !== 'undefined') {
      const isAdminValue = localStorage.getItem('isAdmin');
      setIsAdmin(isAdminValue === 'true');
    }
  }, []);

  return (
    <Layout title="Pagina de inicio" description="Pagina principal el pilon">
      <nav className={styles.navigation}>
        <Link className={styles.link} href="/home">
          Inicio
        </Link>

        {!isAdmin && (
          <Link className={styles.link} href="/periodicos">
            Periodicos
          </Link>
        )}

        {!isAdmin && (
          <Link className={styles.link} href="/nosotros">
            Acerca de Nosotros
          </Link>
        )}

        {isAdmin && (
          <Link className={styles.link} href="/upload">
            Subir Periodico
          </Link>
        )}
      </nav>

      <section className={styles.section_search}>
        <form action="" className={styles.formulario_search} onSubmit={handleSubmit}>
          <fieldset>
            <div className={styles.contenedor_campos}>
              <div className={styles.campos}>
                <label htmlFor="fechaInicio">Fecha Inicio </label>
                <input
                  type="date"
                  name="fechaInicio"
                  id="fechaInicio"
                  placeholder="Fecha Inicio"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>

              <div className={styles.campos}>
                <label htmlFor="fechaFinal">Fecha Final </label>
                <input
                  type="date"
                  name="fechaFinal"
                  id="fechaFinal"
                  placeholder="Fecha Final"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>

              <div className={styles.campos}>
                <label htmlFor="titulo">Titulo </label>
                <input
                  type="search"
                  name="titulo"
                  id="titulo"
                  placeholder="Titulo"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className={styles.boton_search}>
                <input type="submit" value="Filtrar" />
              </div>
            </div>
          </fieldset>
        </form>
      </section>

      {/* Periodico grid */}
      <div className={styles.container_main}>
        <div className={styles.container_grid}>
          {periodicosState?.map((periodico) => (
            <Periodico
              key={periodico.id}
              periodico={periodico}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const respuesta = await fetch(`https://preiodicos-strapi.onrender.com/api/periodicos?populate=periodico`);
  const { data: periodicos } = await respuesta.json();

  // Ordenar los periódicos por fecha de manera descendente (de más reciente a más antigua)
  periodicos.sort((a, b) => {
    const fechaA = new Date(a.attributes.fecha);
    const fechaB = new Date(b.attributes.fecha);
    return fechaB - fechaA;
  });

  return {
    props: {
      periodicos,
    },
  };
}