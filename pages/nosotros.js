import styles from "../styles/nosotros.module.css";
import Layout from "../components/layout";
import Link from "next/link";


export default function nosotros() {
  return (
    <Layout title="Nosotros" description="Acerca de El Pilon">
            <nav className={styles.navigation}>
                <Link className={styles.link} href="/home">
                    Inicio
                </Link>
                <Link className={styles.link} href="/periodicos">
                    Periodicos
                </Link>
                <Link className={styles.link} href="/nosotros">
                    Acerca de Nosotros
                </Link>
            </nav>
            
            <section className={styles.container_nosotros}>
                <div className={styles.container_quienesSomos}>
                    <h2>¿Quienes Somos?</h2>
                    <p>
                        Bienvenidos a El Pilón, una voz arraigada en el corazón de nuestra comunidad. 
                        Desde nuestras humildes raíces hasta nuestro florecimiento como un referente periodístico en la región, 
                        nos enorgullece ser el puente entre la realidad cotidiana y la narrativa que une a nuestros lectores.
                    </p>
                    <p>
                        Fundado con el compromiso de informar, educar y entretener, 
                        El Pilón se erige como un faro de la verdad y la integridad periodística.
                        Nos esforzamos por reflejar la diversidad de nuestra sociedad, 
                        dando voz a todas las perspectivas y experiencias que conforman el 
                        tapiz de nuestra comunidad.
                    </p>
                    <p>
                        Nuestro equipo está compuesto por apasionados periodistas, 
                        escritores y profesionales comprometidos con la excelencia en la 
                        narración de historias que importan. Desde reportajes de investigación 
                        hasta crónicas locales, cada artículo que publicamos busca resonar con 
                        la esencia misma de nuestra comunidad.
                    </p>
                    <p>
                        Somos más que un periódico; somos un reflejo de quienes somos como 
                        comunidad. Nos enorgullece ser un espacio donde las ideas se entrelazan,
                        donde las voces encuentran eco y donde el espíritu de unidad se 
                        fortalece con cada página.
                    </p>
                    <p className="flex justify-center">
                        ¡Gracias por ser parte de esta emocionante aventura con nosotros!
                    </p>
                </div>
            </section>

            <section className={styles.container_misionVision}>
                <div className={styles.container_textosMiVi}>
                    <h3>Misión</h3>
                    <p>
                        En El Pilón, nuestra misión es ser el principal medio de 
                        comunicación de nuestra comunidad, comprometidos con la entrega 
                        de información veraz, relevante y oportuna. Nos esforzamos por promover 
                        la participación ciudadana, la diversidad de opiniones y el debate 
                        informado, contribuyendo así al desarrollo social, cultural y 
                        económico de nuestra región. A través de un periodismo ético, 
                        honesto y transparente, buscamos ser un aliado confiable para 
                        nuestros lectores, brindándoles las herramientas necesarias para 
                        comprender y participar activamente en los asuntos que impactan 
                        sus vidas.
                    </p>
                </div>
                <div className={styles.container_textosMiVi}>
                    <h3>Visión</h3>
                        <p>
                            Nuestra visión en El Pilón es ser reconocidos como el medio de 
                            comunicación líder en nuestra región, distinguidos por nuestra 
                            excelencia periodística, innovación y compromiso con la comunidad. 
                            Buscamos ser un referente en la generación de contenido multimedia 
                            de calidad, adaptándonos constantemente a las nuevas tendencias y 
                            tecnologías de comunicación. Aspiramos a ser un agente de cambio 
                            positivo en nuestra sociedad, inspirando a nuestros lectores a ser 
                            agentes de transformación y fomentando una cultura de diálogo, 
                            respeto y progreso. En resumen, queremos ser más que un periódico, 
                            queremos ser un motor de cambio y un punto de encuentro para 
                            nuestra comunidad.
                        </p>
                </div>
            </section>

            <div className={styles.container_servi}>
                <h2>Servicios</h2>

                <div className={styles.container_servicios}>
                    <section className={styles.servicios}>
                        <h3>Edición Impresa</h3>
                        <div className={styles.iconos}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                <path fill-rule="evenodd" d="M4.125 3C3.089 3 2.25 3.84 2.25 4.875V18a3 3 0 0 0 3 3h15a3 3 0 0 1-3-3V4.875C17.25 3.839 16.41 3 15.375 3H4.125ZM12 9.75a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H12Zm-.75-2.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1-.75-.75ZM6 12.75a.75.75 0 0 0 0 1.5h7.5a.75.75 0 0 0 0-1.5H6Zm-.75 3.75a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5H6a.75.75 0 0 1-.75-.75ZM6 6.75a.75.75 0 0 0-.75.75v3c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75v-3A.75.75 0 0 0 9 6.75H6Z" clip-rule="evenodd" />
                                <path d="M18.75 6.75h1.875c.621 0 1.125.504 1.125 1.125V18a1.5 1.5 0 0 1-3 0V6.75Z" />
                            </svg>
                        </div>
                        <p>Publicación diaria o semanal del periódico en formato impreso, que abarca noticias locales, nacionales e internacionales, así como secciones especializadas como deportes, cultura, economía, entre otros.</p>
                    </section>

                    <section className={styles.servicios}>
                        <h3>Edición Digital</h3>
                        <div className={styles.iconos}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                <path d="M11.625 16.5a1.875 1.875 0 1 0 0-3.75 1.875 1.875 0 0 0 0 3.75Z" />
                                <path fill-rule="evenodd" d="M5.625 1.5H9a3.75 3.75 0 0 1 3.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 0 1 3.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 0 1-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875Zm6 16.5c.66 0 1.277-.19 1.797-.518l1.048 1.048a.75.75 0 0 0 1.06-1.06l-1.047-1.048A3.375 3.375 0 1 0 11.625 18Z" clip-rule="evenodd" />
                                <path d="M14.25 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 16.5 7.5h-1.875a.375.375 0 0 1-.375-.375V5.25Z" />
                            </svg>
                        </div>
                        <p>Plataforma en línea que proporciona acceso a las noticias publicadas en el periódico impreso, además de contenido exclusivo, actualizaciones en tiempo real y herramientas multimedia.</p>
                    </section>

                    <section className={styles.servicios}>
                        <h3>Suscripciones</h3>
                        <div className={styles.iconos}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                <path fill-rule="evenodd" d="M2.25 4.125c0-1.036.84-1.875 1.875-1.875h5.25c1.036 0 1.875.84 1.875 1.875V17.25a4.5 4.5 0 1 1-9 0V4.125Zm4.5 14.25a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z" clip-rule="evenodd" />
                                <path d="M10.719 21.75h9.156c1.036 0 1.875-.84 1.875-1.875v-5.25c0-1.036-.84-1.875-1.875-1.875h-.14l-8.742 8.743c-.09.089-.18.175-.274.257ZM12.738 17.625l6.474-6.474a1.875 1.875 0 0 0 0-2.651L15.5 4.787a1.875 1.875 0 0 0-2.651 0l-.1.099V17.25c0 .126-.003.251-.01.375Z" />
                            </svg>
                        </div>
                        <p>Ofrecimiento de suscripciones para recibir la edición impresa en domicilio o acceso a la edición digital, con opciones de pago mensual, semestral o anual.</p>
                    </section>

                    <section className={styles.servicios}>
                        <h3>Publicidad</h3>
                        <div className={styles.iconos}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                <path d="M16.881 4.345A23.112 23.112 0 0 1 8.25 6H7.5a5.25 5.25 0 0 0-.88 10.427 21.593 21.593 0 0 0 1.378 3.94c.464 1.004 1.674 1.32 2.582.796l.657-.379c.88-.508 1.165-1.593.772-2.468a17.116 17.116 0 0 1-.628-1.607c1.918.258 3.76.75 5.5 1.446A21.727 21.727 0 0 0 18 11.25c0-2.414-.393-4.735-1.119-6.905ZM18.26 3.74a23.22 23.22 0 0 1 1.24 7.51 23.22 23.22 0 0 1-1.41 7.992.75.75 0 1 0 1.409.516 24.555 24.555 0 0 0 1.415-6.43 2.992 2.992 0 0 0 .836-2.078c0-.807-.319-1.54-.836-2.078a24.65 24.65 0 0 0-1.415-6.43.75.75 0 1 0-1.409.516c.059.16.116.321.17.483Z" />
                            </svg>
                        </div>
                        <p>Espacios publicitarios tanto en la edición impresa como en la digital, que permiten a empresas y organizaciones promocionar sus productos, servicios o eventos.</p>
                    </section>
                </div>
            </div>
        </Layout>
  )
}
