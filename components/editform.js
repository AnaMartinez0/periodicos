import { useState } from 'react';
import axios from 'axios';
import styles from '../styles/editar.module.css';

export default function EditForm({ newspaper, setIsEditing }) {
    const [formData, setFormData] = useState({
        titulo: newspaper.attributes.titulo,
        fecha: newspaper.attributes.fecha,
        precio: newspaper.attributes.precio,
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Request body:', formData); // Log the request body
            const response = await axios.put(`https://preiodicos-strapi.onrender.com/api/periodicos/${newspaper.id}`, { data: formData });
            if (response.status === 200) {
                setSuccess('Newspaper updated successfully');
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
                setIsEditing(false);
            } else {
                setError('Error updating newspaper');
            }
        } catch (error) {
            setError(`Error updating newspaper: ${error.response.data.error.message}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={`bg-white shadow-md rounded-lg p-8 w-1/2 mx-auto ${styles.containerForm}`}>
            <div className="mb-4">
                <label htmlFor="titulo" className="block text-gray-700 font-bold mb-2">
                    Título
                </label>
                <input
                    type="text"
                    id="titulo"
                    name="titulo"
                    value={formData.titulo}
                    onChange={handleChange}
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="fecha" className="block text-gray-700 font-bold mb-2">
                    Fecha
                </label>
                <input
                    type="date"
                    id="fecha"
                    name="fecha"
                    value={formData.fecha}
                    onChange={handleChange}
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="precio" className="block text-gray-700 font-bold mb-2">
                    Precio
                </label>
                <input
                    type="number"
                    id="precio"
                    name="precio"
                    value={formData.precio}
                    onChange={handleChange}
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <span className="block sm:inline">{error}</span>
                </div>
            )}

            {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                    <span className="block sm:inline">{success}</span>
                </div>
            )}

            <div className="flex justify-end">
                <button type="submit" className={`bg-slate-500 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${styles.buttonGuardar}`}>
                    Guardar cambios
                </button>
                <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className={`bg-slate-500 hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2 ${styles.buttonCancelar}`}
                >
                    Cancelar
                </button>
            </div>
        </form>
    );
}
