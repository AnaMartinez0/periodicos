import { useState, useEffect } from 'react';
import EditForm from './editform';
import styles from '../styles/editar.module.css';
import Image from 'next/image';

export default function Detail({ newspaper }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const hash = newspaper.attributes.periodico.data[0].attributes.hash;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isAdminValue = localStorage.getItem('isAdmin');
      setIsAdmin(isAdminValue === 'true');
    }
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(newspaper);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Producto añadido al carrito');
  };

  return (
    <div className={`bg-white p-8 justify-center rounded-lg shadow-md ${styles.containerPrincipal}`}>
      <div className={`flex justify-center ${styles.containerImage}`}>
        <Image src={`https://res.cloudinary.com/dillndimq/image/upload/f_auto,q_auto/${hash}.pdf`} alt="" width={'340%'} height={'100%'} className="w-64 h-90 object-cover rounded-lg" />
      </div>
      <div className={`mt-8 ${styles.containerTextos}`}>
        <h3 className={`text-4xl font-bold mb-4 text-end ${isEditing && 'hidden'}`}>{newspaper.attributes.titulo}</h3>
        <p className={`mb-2 text-xl font-bold text-center ${styles.textoFecha} ${isEditing && 'hidden'}`}>{newspaper.attributes.fecha}</p>
        <p className={`mb-2 text-xl font-bold text-center ${styles.textoPrecio} ${isEditing && 'hidden'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10">
            <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 0 1-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004ZM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 0 1-.921.42Z" />
            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v.816a3.836 3.836 0 0 0-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 0 1-.921-.421l-.879-.66a.75.75 0 0 0-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 0 0 1.5 0v-.81a4.124 4.124 0 0 0 1.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 0 0-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 0 0 .933-1.175l-.415-.33a3.836 3.836 0 0 0-1.719-.755V6Z" clipRule="evenodd" />
          </svg>
          {newspaper.attributes.precio}
        </p>

        {!isAdmin && (
          <button
            className={`block mx-auto bg-red-500 hover:bg-orange-700 text-black font-bold py-3 px-12 rounded mt-8 text-xl ${styles.botonOpcion}`}
            onClick={handleAddToCart}
          >
            Añadir al carrito
          </button>
        )}

        {isAdmin && (
          <button
            className={`block mx-auto bg-red-500 hover:bg-orange-700 text-black font-bold py-3 px-12 rounded mt-8 text-xl ${styles.botonOpcion} ${isEditing && 'hidden'}`}
            onClick={handleEditClick}
          >
            Editar
          </button>
        )}

        {isEditing && <EditForm newspaper={newspaper} setIsEditing={setIsEditing} />}
      </div>
    </div>
  );
}