import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
    return (
        <Html>
            <Head>
                <Script 
                    src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.min.js" 
                    strategy="beforeInteractive" 
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}