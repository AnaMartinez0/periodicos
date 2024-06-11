import Head from "next/head"
import Header from "./header"
import Footer from "./footer"
import styles from '../styles/layout.module.css'

export default function Layout({children,title ='',description=''}) {
    return (
      <div className={styles.body}>
          <Head>
              <title>{`EL PILON - ${title}`}</title>
              <meta name="description" content={description}/>
          </Head>
          <Header/>
          {children}
          <Footer/>
      </div>
    )
  }