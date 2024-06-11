import Link from 'next/link';
import Layout from '../components/layout';
import styles from "../styles/home.module.css";
import periodicosStyles from "../styles/periodicos.module.css";
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Periodicos() {
    const [purchasedItems, setPurchasedItems] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [periodicos, setPeriodicos] = useState([]);

    useEffect(() => {
        const fetchPurchasedItems = async () => {
            const userId = parseInt(localStorage.getItem('id_user'), 10);
            if (!userId) return;

            try {
                const purchasesResponse = await axios.get('https://preiodicos-strapi.onrender.com/api/compras', {
                    params: {
                        filters: {
                            Id_User: {
                                $eq: userId
                            }
                        },
                        populate: '*'
                    }
                });

                const purchasedItems = purchasesResponse.data.data.map(purchase => ({
                    id: purchase.id,
                    Id_periodico: purchase.attributes.Id_periodico,
                    Fecha_compra: purchase.attributes.Fecha_compra
                }));

                // Ordenar por fecha de compra de más reciente a más antigua
                purchasedItems.sort((a, b) => new Date(b.Fecha_compra) - new Date(a.Fecha_compra));

                setPurchasedItems(purchasedItems);

                const periodicoIds = purchasedItems.map(item => item.Id_periodico);
                const periodicosResponse = await axios.get('https://preiodicos-strapi.onrender.com/api/periodicos', {
                    params: {
                        filters: {
                            id: {
                                $in: periodicoIds
                            }
                        },
                        populate: 'periodico'
                    }
                });

                setPeriodicos(periodicosResponse.data.data);

            } catch (error) {
                console.error('Error fetching purchased items:', error);
            }
        };

        fetchPurchasedItems();

        if (typeof window !== 'undefined') {
            const isAdminValue = localStorage.getItem('isAdmin');
            setIsAdmin(isAdminValue === 'true');
        }
    }, []);

    return (
        <Layout title='Periódicos'>
            <nav className={styles.navigation}>
                <Link className={styles.link} href="/home">Inicio</Link>
                {!isAdmin && (
                    <>
                        <Link className={styles.link} href="/periodicos">Periódicos</Link>
                        <Link className={styles.link} href="/nosotros">Acerca de Nosotros</Link>
                    </>
                )}
                {isAdmin && <Link className={styles.link} href="/upload">Subir Periódico</Link>}
            </nav>
            <div className={periodicosStyles.container}>
                <h2 className={periodicosStyles.title}>Mis Periódicos</h2>
                <ul className={periodicosStyles.list}>
                    {purchasedItems.length === 0 ? (
                        <p>No hay periódicos comprados.</p>
                    ) : (
                        purchasedItems.map(purchasedItem => {
                            const periodico = periodicos.find(p => p.id === purchasedItem.Id_periodico);
                            if (!periodico) return null;

                            const { id, attributes } = periodico;
                            const { titulo } = attributes;
                            const hash = attributes.periodico.data[0].attributes.hash;

                            return (
                                <li key={id} className={periodicosStyles.item}>
                                    <div className={periodicosStyles.itemDetails}>
                                        <img
                                            src={`https://res.cloudinary.com/dillndimq/image/upload/f_auto,q_auto/${hash}.jpg`}
                                            alt={titulo}
                                            className={periodicosStyles.itemImage}
                                        />
                                        <div className={periodicosStyles.itemInfo}>
                                            <h2 className={periodicosStyles.itemTitle}>{titulo}</h2>
                                            <p className={periodicosStyles.itemDate}>Fecha de compra: {new Date(purchasedItem.Fecha_compra).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <Link href={`/view/${id}`}>
                                        <a className={periodicosStyles.downloadButton}>Ver</a>
                                    </Link>
                                </li>
                            );
                        })
                    )}
                </ul>
            </div>
        </Layout>
    );
}
