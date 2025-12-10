import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';

export const DocumentadorViewNew: React.FC = () => {
    return (
        <>
            <Navbar activeLink="documentador" />

            <main className="container mt-5 pt-5 text-center">
                <h2 className="fw-bold text-success mb-4">Panel del Documentador</h2>
                <p>Accede a tus reportes de documentación y control operativo en tiempo real.</p>
                <div style={{ width: '100%', paddingBottom: '56.25%', position: 'relative', overflow: 'hidden', marginTop: '2rem' }}>
                    <iframe
                        title="Dashboards_Final_TW (5) (2)"
                        width="1140" height="541.25"
                        src="https://app.powerbi.com/reportEmbed?reportId=9c2ecb21-bae8-4a38-90f4-43637320a3f1&autoAuth=true&ctid=adc9c621-a36c-42e1-9f4a-edc610b1dfd1"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            border: 'none',
                        }}
                        allowFullScreen
                    ></iframe>
                </div>
            </main>

            <Footer />
        </>
    );
};
