import { useRouter } from 'next/router'
import Layout from '../components/layout'
import styles from "../styles/home.module.css";
import Link from "next/link";
import Detail from '../components/detail';
import { useEffect, useState } from 'react'

export default function NewspaperDetails() {
    const router = useRouter()
    const { id } = router.query

    const [newspaper, setNewspaper] = useState(null)
    const [isAdmin, setIsAdmin] = useState(false);

    const fetchData = async () => {
        if (!id) return;
        try {
            const res = await fetch(`https://preiodicos-strapi.onrender.com/api/periodicos?filters[id]=${id}&populate=periodico`)
            const { data: newspaperData } = await res.json()
            if (newspaperData && newspaperData.length > 0) {
                setNewspaper(newspaperData[0])
            } else {
                console.error('No se encontró ningún periódico con el id proporcionado')
            }
        } catch (error) {
            console.error('Error al obtener los datos del periódico:', error)
        }
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const isAdminValue = localStorage.getItem('isAdmin');
            setIsAdmin(isAdminValue === 'true');
        }
    }, []);

    useEffect(() => {
        fetchData()
    }, [id])

    return (
        <Layout title={`Newspaper ${id}`} description={`Details for newspaper ${id}`}>
            <nav className={styles.navigation}>
                <Link href="/home"><a className={styles.link}>Inicio</a></Link>
                {!isAdmin && <Link href="/periodicos"><a className={styles.link}>Periodicos</a></Link>}
                {!isAdmin && <Link href="/nosotros"><a className={styles.link}>Acerca de Nosotros</a></Link>}
                {isAdmin && <Link href="/upload"><a className={styles.link}>Subir Periodico</a></Link>}
            </nav>
            {newspaper ? <Detail newspaper={newspaper} /> : <p>No se encontró ningún periódico con el id proporcionado</p>}
        </Layout>
    )
}
