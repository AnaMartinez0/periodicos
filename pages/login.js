import { useState } from 'react'
import Router from 'next/router'
import styles from '../styles/login.module.css'
import Link from 'next/link'
import { setCookie } from 'nookies';

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)


    async function handleLogin() {
        const loginInfo = {
            identifier: username,
            password: password
        }
        try {
            const login = await fetch("https://preiodicos-strapi.onrender.com/api/auth/local", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            })
            
            if (login.ok) {
                const responseJson = await login.json();
                const { jwt,user} = responseJson;

                if (user) {
                    const isAdmin = user.email === '4dm1n@4dm1n.com';
                    if(isAdmin){
                        localStorage.setItem('isAdmin','true')
                        localStorage.setItem('jwt',jwt)
                        localStorage.setItem('id_user',user.id)
                        localStorage.setItem('username',user.username)
                    }else{
                        localStorage.setItem('isAdmin','false')
                        localStorage.setItem('jwt',jwt)
                        localStorage.setItem('id_user',user.id)
                        localStorage.setItem('username',user.username)
                    }
                    setCookie(null, 'login', true, {
                        path: '/',
                        maxAge: 60 * 60 * 2, // 1 day
                        sameSite: 'strict',
                    })

                    Router.push('/home');
                } else {
                    setError("No se pudo obtener el correo electrónico. Intenta iniciar sesión nuevamente.");
                }
                console.log(responseJson)

            } else {
                setError("Credenciales inválidas. Por favor, inténtalo de nuevo.")
            }

        } catch (error) {
            setError("Hubo un error al iniciar sesión. Por favor, inténtalo de nuevo.")
        }
    }
    
    return (
        <div className={styles.bodyLogin}>
            <div className={styles.form}>
                <h2>Iniciar Sesión</h2>
                <div className={styles.inputContainer}>
                    <label htmlFor="username">Correo</label>
                    <input type="email" id="username" onChange={e => setUsername(e.target.value)} value={username} />
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" id="password" onChange={e => setPassword(e.target.value)} value={password} />
                    <button className={styles.submitButton} type="button" onClick={() => handleLogin()}>Entrar</button>
                    {error && <p className={styles.error}>{error}</p>}
                    <p><Link href="/register">Registrarse</Link></p>
                </div>
            </div>
        </div>
    );
}