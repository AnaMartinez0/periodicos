import React from "react";
import styles from '../styles/footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <section className={styles.section_footer}>
        <div className={styles.footer__texto}>
          EL PILÓN S.A., 2024 - MIEMBROS DE AMI
          <br />
          <a href="https://elpilon.com.co/politica-de-privacidad/">
            POLÍTICA DE PRIVACIDAD
          </a>
        </div>
        <div className={styles.footer__texto}>
          Cra 7 #14-50 Edificio Quitorres
          <p>Mercadeo: 3013528676 - 3043839018</p>
        </div>
        <div className={styles.footer__redes}>
        </div>
      </section>
    </footer>
  );
}
