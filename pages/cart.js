import Link from 'next/link';
import Layout from '../components/layout';
import styles from "../styles/home.module.css";
import style from "../styles/cart.module.css";
import { useEffect, useState } from 'react';

export default function Cart() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const isAdminValue = localStorage.getItem('isAdmin');
            setIsAdmin(isAdminValue === 'true');

            const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
            setCart(cartItems);
            const totalAmount = cartItems.reduce((sum, item) => sum + item.attributes.precio, 0);
            setTotal(totalAmount);
        }
    }, []);

    useEffect(() => {
        const totalAmount = cart.reduce((sum, item) => sum + item.attributes.precio, 0);
        setTotal(totalAmount);
    }, [cart]);

    const handleRemoveFromCart = (index) => {
        const updatedCart = [...cart];
        updatedCart.splice(index, 1);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handleBuyNow = async () => {
        const userId = parseInt(localStorage.getItem('id_user'), 10);
        const userName = localStorage.getItem('username');
        const token = localStorage.getItem('jwt');
        const date = new Date().toISOString().split('T')[0];

        const purchasedItems = cart.map(item => ({
            Id_User: userId,
            User: userName,
            Id_periodico: parseInt(item.id, 10),
            Titulo: item.attributes.titulo,
            Fecha_compra: date
        }));

        try {
            for (let item of purchasedItems) {
                const response = await fetch(`https://preiodicos-strapi.onrender.com/api/compras`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ data: item })
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('Error response from API:', errorText);
                    throw new Error('Error al guardar la compra');
                }
            }

            localStorage.removeItem('cart');
            console.log('Compra guardada exitosamente');

            // Redirigir a la pasarela de pago de Wompi
            Router.push('https://checkout.wompi.co/l/test_PsMWbA');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Layout title='Carrito de compras'>
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
            <div className={style.cartContainer}>
                <h1 className={style.title}>Carrito de Compras</h1>
                {cart.length === 0 ? (
                    <p className={style.emptyCartMessage}>El carrito está vacío.</p>
                ) : (
                    <div className={style.cartContent}>
                        <ul className={style.cartList}>
                            {cart.map((item, index) => (
                                <li key={index} className={style.cartItem}>
                                    <div className={style.itemDetails}>
                                        <img src={`https://res.cloudinary.com/dillndimq/image/upload/f_auto,q_auto/${item.attributes.periodico.data[0].attributes.hash}.pdf`} alt="" className={style.itemImage} />
                                        <div className={style.itemInfo}>
                                            <span className={style.itemTitle}>{item.attributes.titulo}</span>
                                            <span className={style.itemPrice}>${item.attributes.precio}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleRemoveFromCart(index)}
                                        className={style.removeButton}
                                    >
                                        Quitar
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <div className={style.cartSummary}>
                            <div className={style.summaryBox}>
                                <p className={style.totalText}>Total a Pagar: ${total} ({cart.length} artículos)</p>
                                {cart.length > 0 && (
                                    <button
                                        onClick={handleBuyNow}
                                        className={style.buyButton}
                                    >
                                        Comprar ahora
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}
