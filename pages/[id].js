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
        const res = await fetch(`https://preiodicos-strapi.onrender.com/api/periodicos?filters[id]=${id}&populate=periodico`)
        const { data: newspaperData } = await res.json()
        if (newspaperData.length > 0) {
            setNewspaper(newspaperData[0])
        } else {
            console.error('No se encontró ningún periódico con el id proporcionado')
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
        <Layout title={`Newsp ${id} description={Details for newspaper ${id}`}>
            <nav className={styles.navigation}>
                <Link className={styles.link} href="/home">Inicio</Link>
                {!isAdmin && <Link className={styles.link} href="/periodicos">Periodicos</Link>}
                {!isAdmin && <Link className={styles.link} href="/nosotros">Acerca de Nosotros</Link>}
                {isAdmin && <Link className={styles.link} href="/upload">Subir Periodico</Link>}
            </nav>
            {newspaper ? <Detail newspaper={newspaper} /> : <p>No se encontró ningún periódico con el id proporcionado</p>}
        </Layout>
    )
}