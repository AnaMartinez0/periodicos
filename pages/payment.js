import Link from 'next/link';
import Layout from '../components/layout';
import styles from "../styles/home.module.css";
import paymentStyles from "../styles/payment.module.css";
import { useEffect, useState } from 'react';
import Router from 'next/router';

export default function Payment() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [hasProcessed, setHasProcessed] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const isAdminValue = localStorage.getItem('isAdmin');
            setIsAdmin(isAdminValue === 'true');
        }
    }, []);

    const handlePaymentSuccess = async () => {
        if (hasProcessed) return;

        const userId = parseInt(localStorage.getItem('id_user'), 10);
        const userName = localStorage.getItem('username');
        const token = localStorage.getItem('jwt');
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const purchaseDate = new Date().toISOString().split('T')[0];

        const purchasedItems = cart.map(item => ({
            Id_User: userId,
            User: userName,
            Id_periodico: item.id,
            Titulo: item.attributes.titulo,
            Fecha_compra: purchaseDate,
        }));

        try {
            for (let item of purchasedItems) {
                const response = await fetch('http://localhost:1337/api/compras', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ data: item })
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            }

            localStorage.removeItem('cart');
            setMessage('Compra exitosa 😄. Redirigiendo a tus periódicos...');
            setTimeout(() => {
                Router.push('/periodicos').catch(err => console.error("Failed to navigate: ", err));
            }, 2000);
        } catch (error) {
            console.error('Error durante la compra:', error);
            setMessage('Hubo un error durante la compra. Por favor, inténtalo de nuevo.');
        } finally {
            setHasProcessed(true);
        }
    };

    useEffect(() => {
        if (isProcessing) {
            const interval = setInterval(() => {
                setProgress((prevProgress) => {
                    if (prevProgress >= 100) {
                        clearInterval(interval);
                        return 100;
                    }
                    if (prevProgress >= 50 && prevProgress < 100) {
                        setMessage('Ya casi termina tu compra 💱');
                    }
                    return prevProgress + 5;
                });
            }, 400);
            handlePaymentSuccess();
            return () => clearInterval(interval);
        }
    }, [isProcessing]);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://checkout.wompi.co/widget.js";
        script.async = true;
        script.setAttribute('data-render', 'button');
        script.setAttribute('data-public-key', 'pub_prod_lmSE5np0EcEOgCggLPokNroe4JC4drJf');
        script.setAttribute('data-currency', 'COP');
        script.setAttribute('data-amount-in-cents', `4950000`);
        script.setAttribute('data-reference', '4XMPGKWWPKWQ');
        script.setAttribute('data-signature:integrity', 'prod_integrity_U8u5E2vT6omYsO3zk6HetR05Yy7EpHg4');
        document.getElementById('wompi-widget').appendChild(script);
    }, []);

    return (
        <Layout title='Pasarela de pago'>
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

            <div className={paymentStyles.paymentContainer}>
                <h1 className={paymentStyles.title}>Pasarela de Pago</h1>
                <div id="wompi-widget"></div>
                {isProcessing && (
                    <div className={paymentStyles.messageBox}>
                        <p className={paymentStyles.message}>{message}</p>
                        <div className={paymentStyles.progressBarContainer}>
                            <div className={paymentStyles.progressBar} style={{ width: `${progress}%` }}></div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}
