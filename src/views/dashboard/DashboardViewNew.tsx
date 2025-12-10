import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import './Dashboard.css';

export const DashboardViewNew: React.FC = () => {
    return (
        <>
            <Navbar activeLink="dashboard" />

            {/* Hero Section */}
            <header className="bg-primary text-white text-center py-5" style={{ marginTop: '80px' }}>
                <div className="container py-5">
                    <h1 className="display-5 fw-bold">Bienvenido a TEMWOK</h1>
                    <p className="lead">Soluciones estratégicas para tus operaciones</p>
                </div>
            </header>

            {/* Contenido principal */}
            <section className="container text-center my-5">
                <h2 className="fw-bold mb-4">CRONOGRAMA</h2>

                {/* Etapas y tiempos */}
                <div className="row g-4 mb-5">
                    <div className="col-md-2">
                        <div className="card h-100 border-0 shadow-sm">
                            <div className="card-body">
                                <h6 className="card-title text-primary fw-bold">📅 Diario</h6>
                                <p className="card-text small">Enviar check list y confirmar radicación.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="card h-100 border-0 shadow-sm">
                            <div className="card-body">
                                <h6 className="card-title text-success fw-bold">&lt;= 1 Día</h6>
                                <p className="card-text small">Solicitud de confirmación HB y validación SD.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="card h-100 border-0 shadow-sm">
                            <div className="card-body">
                                <h6 className="card-title text-warning fw-bold">&lt;= 2 Días</h6>
                                <p className="card-text small">Consumo Power, video GPS y comisionamiento.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="card h-100 border-0 shadow-sm">
                            <div className="card-body">
                                <h6 className="card-title text-danger fw-bold">Etapa Cuadrilla</h6>
                                <p className="card-text small">Consumo Power POS y validación de videos.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="card h-100 border-0 shadow-sm">
                            <div className="card-body">
                                <h6 className="card-title text-info fw-bold">POS Videos</h6>
                                <p className="card-text small">Radicar ADIs y notificar al DEC.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="card h-100 border-0 shadow-sm">
                            <div className="card-body">
                                <h6 className="card-title text-secondary fw-bold">&lt;= 8 Días</h6>
                                <p className="card-text small">Radicación DOC y HV, justificación si excede.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recomendaciones diarias */}
                <div className="card mt-4 border-0 shadow-sm">
                    <div className="card-body text-start">
                        <div className="alert alert-warning mt-3 mb-0 text-center fw-semibold">
                            ⚠️ Cada vez que se confirme una radicación, deberá enviar inmediatamente una captura de pantalla que muestre claramente la hora y fecha del registro, Adicionalmente deberá compartir el enlace correspondiente a dicha radicación a través del canal de Telegram designado
                        </div>
                        <div className="alert alert-danger mt-3 mb-0 text-center fw-semibold">
                            ⚠️ Recuerda: No cumplir con el procedimiento puede acarrear procesos disciplinarios.
                        </div>
                    </div>
                </div>
            </section>

            {/* Sección Power BI */}
            <section className="container-fluid mt-5 pt-5 pb-5" style={{ backgroundColor: '#f8f9fa' }}>


                <h2 className="fw-bold mb-4 text-center text-primary">📊 PLANEACIÓN DE SITIOS</h2>
                <p className="text-center text-muted mb-5">Consulta y visualiza la planeación de los asignados a los sitios.</p>
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
            </section>

            <Footer />
        </>
    );
};
