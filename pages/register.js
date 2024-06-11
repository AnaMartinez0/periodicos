import getConfig from 'next/config'
import { useState } from 'react'
import styles from '../styles/register.module.css'
import Router from 'next/router'

const { publicRuntimeConfig } = getConfig();

function Register() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function handleRegister() {
        const registerInfo = {
            username: username,
            email: email,
            password: password
        }

        const register = await fetch(`https://preiodicos-strapi.onrender.com/api/auth/local/register`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerInfo)
        })

        const registerResponse = await register.json();
        
        Router.push('/login')
    }

    return (
        <div className={styles.containerMainRegister}>
            <div className={styles.form}>
                <h2>
                    Crear Cuenta
                </h2>

                <div className={styles.inputContainer}>
                    <div className={styles.inputs}>
                        <label htmlFor="">Nombre de usuario</label>
                        <input type="text" onChange={e => setUsername(e.target.value)} value={username} placeholder="Usuario" /><br />
                    </div>
                    <div className={styles.inputs}>
                        <label htmlFor="">Correo</label>
                        <input type="email" onChange={e => setEmail(e.target.value)} value={email} placeholder="Correo" /><br />
                    </div>
                    <div className={styles.inputs}>
                        <label htmlFor="">Contraseña</label>
                        <input type="password" onChange={e => setPassword(e.target.value)} value={password} placeholder="Contraseña" /><br />
                    </div>
                    <button className={styles.submitButton} type="button" onClick={() => handleRegister()}>Registrarse</button>
                </div>
            </div>
        </div>
    );
}




export default Register;