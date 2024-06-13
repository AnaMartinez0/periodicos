import { useRouter } from 'next/router';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from '../../styles/viewPeriodico.module.css';

export default function ViewPeriodico() {
    const router = useRouter();
    const { id } = router.query;
    const [periodico, setPeriodico] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPeriodico = async () => {
            if (!id) return;

            try {
                const response = await axios.get(`https://preiodicos-strapi.onrender.com/api/periodicos/${id}?populate=periodico`);
                console.log('Response data:', response.data);
                setPeriodico(response.data.data);
            } catch (error) {
                console.error('Error fetching periodico:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPeriodico();
    }, [id]);

    useEffect(() => {
        if (!periodico) return;

        const periodicoData = periodico?.attributes?.periodico?.data;
        console.log('Periodico data:', periodicoData);

        if (!Array.isArray(periodicoData) || periodicoData.length === 0) return;

        const hash = periodicoData[0]?.attributes?.hash;
        if (!hash) return;

        const pdfUrl = `https://res.cloudinary.com/dillndimq/image/upload/${hash}.pdf`;

        const loadPDF = async () => {
            const loadingTask = window.pdfjsLib.getDocument(pdfUrl);
            loadingTask.promise.then(pdf => {
                const container = document.getElementById('pdfContainer');
                container.innerHTML = ''; // Clear any existing content

                const scale = 2; // Increase scale for better quality
                const renderPage = (page) => {
                    const viewport = page.getViewport({ scale });
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;
                    canvas.className = styles.pdfPage;
                    container.appendChild(canvas);

                    const renderContext = {
                        canvasContext: context,
                        viewport: viewport,
                    };

                    page.render(renderContext).promise.then(() => {
                        if (page.pageNumber < pdf.numPages) {
                            pdf.getPage(page.pageNumber + 1).then(renderPage);
                        }
                    });
                };

                pdf.getPage(1).then(renderPage);
            });
        };

        loadPDF();
    }, [periodico]);

    if (loading) return <p>Loading...</p>;

    if (!periodico) return <p>No se encontró el periódico.</p>;

    const { titulo } = periodico.attributes;

    return (
        <div style={{ width: '100%', textAlign: 'center', padding: '20px' }}>
            <h1 className={styles.pdfTitle}>{titulo}</h1>
            <div id="pdfContainer" className={styles.pdfContainer}></div>
        </div>
    );
}
