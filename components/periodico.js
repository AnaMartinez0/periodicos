import Link from "next/link";
import styles from "../styles/periodico.module.css";
import axios from 'axios';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Periodico({ periodico }) {
    const [isAdmin, setIsAdmin] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);

    useEffect(() => {
        // Verificar si estamos en el navegador antes de intentar acceder a localStorage
        if (typeof window !== 'undefined') {
            const isAdminValue = localStorage.getItem('isAdmin');
            setIsAdmin(isAdminValue === 'true');

        }
    }, []);

    const handleDelete = async () => {
        if (!confirmDelete) {
            setConfirmDelete(true);
            return;
        }
        setTimeout(() => {
            window.location.reload();
        }, 1);
        try {
            const response = await axios.delete(`https://preiodicos-strapi.onrender.com/api/periodicos/${periodico.id}`);
            if (response.status === 200) {
                // Eliminar el periódico de la lista
                const newPeriodicos = periodicos.filter((p) => p.id !== periodico.id);
                // Actualizar el estado de la lista de periódicos
                setPeriodicos(newPeriodicos);
            }a
        } catch (error) {
            console.error(error);
        }
    };

    const { titulo, fecha, precio } = periodico.attributes;
    const hash = periodico.attributes.periodico.data[0].attributes.hash;

    return (
        <div className="relative flex w-81 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md h-auto" key={periodico.id}>
            <div className="relative mx-4 -mt-6 h-56 overflow-hidden rounded-xl bg-red-gray-500 bg-clip-border text-white shadow-lg shadow-black-gray-500/40 bg-gradient-to-r from-black-500 to-black-600">
                <Image
                    className={styles.imgMain}
                    src={`https://res.cloudinary.com/dillndimq/image/upload/f_auto,q_auto/${hash}.pdf`}
                    alt={titulo}
                    width={350}
                    height={200}
                />
            </div>
            <div className="p-6">
                <h3 className="mb-2 block font-sans text-1xl font-semibold leading-snug tracking-normal text-black-900 antialiased">{titulo}</h3>
                <p className="block font-sans text-4xl leading-relaxed text-inherit antialiased">{fecha}</p>
                <p className="mb-2 block font-sans text-4xl font-semibold leading-snug tracking-normal text-red-900 antialiased">${precio}</p>
            </div>

            {isAdmin && (
                <div className="p-6 pt-0 flex justify-evenly">
                    <button onClick={handleDelete}>
                        <div className="flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-12 ">
                                <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        {confirmDelete ? '¿Seguro que deseas eliminar?' : 'Eliminar'}
                    </button>

                    <Link href={`/${periodico.id}`}>
                        <div className="text-orange-500 cursor-pointer">
                            <div className="flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-12">
                                    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                    <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                                </svg> 
                            </div>
                            <span>Editar</span>
                        </div>
                    </Link>
                </div>
            )}

            {!isAdmin && (
                <div className={styles.botonAdd}>
                    <Link href={`/${periodico.id}`}>
                        <a>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                            </svg>
                        </a>
                    </Link>
                </div>
            )}
        </div>
    )
}