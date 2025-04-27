import React from 'react';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../assets/lti-logo.png'; // Ruta actualizada para importar desde src/assets

const RecruiterDashboard = () => {
    return (
        <Container className="mt-5">
            <div className="text-center"> {/* Contenedor para el logo */}
                <img src={logo} alt="LTI Logo" style={{ width: '150px' }} />
            </div>
            <h1 className="mb-4 text-center">Dashboard del Reclutador</h1>
            <Row>
                <Col md={6} className="mb-4">
                    <Card className="shadow p-4 h-100">
                        <h5 className="mb-4">Añadir Candidato</h5>
                        <p className="text-muted">Register new candidates in the system.</p>
                        <div className="mt-auto">
                            <Link to="/add-candidate">
                                <Button variant="primary" className="w-100">Añadir Nuevo Candidato</Button>
                            </Link>
                        </div>
                    </Card>
                </Col>
                <Col md={6} className="mb-4">
                    <Card className="shadow p-4 h-100">
                        <h5 className="mb-4">Gestionar Candidatos</h5>
                        <p className="text-muted">View and manage candidates for different positions in a Kanban board.</p>
                        <div className="mt-auto">
                            <Link to="/positions">
                                <Button variant="success" className="w-100">Ver Tablero Kanban</Button>
                            </Link>
                        </div>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default RecruiterDashboard;