import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PositionSelector = () => {
    const [positions, setPositions] = useState([]);
    const [selectedPosition, setSelectedPosition] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPositions = async () => {
            try {
                setLoading(true);
                // We need to fetch positions from the backend
                // This is a mock endpoint, you would need to create this endpoint in your backend
                const response = await axios.get('http://localhost:3010/positions');
                setPositions(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error loading positions. Please try again later.');
                setLoading(false);
            }
        };

        fetchPositions();
    }, []);

    const handlePositionChange = (e) => {
        setSelectedPosition(e.target.value);
    };

    const handleViewCandidates = () => {
        if (selectedPosition) {
            navigate(`/positions/${selectedPosition}/candidates`);
        }
    };

    if (loading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        );
    }

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card className="shadow-sm">
                        <Card.Header className="bg-primary text-white">
                            <h4>View Candidates by Position</h4>
                        </Card.Header>
                        <Card.Body>
                            {error && <Alert variant="danger">{error}</Alert>}
                            
                            {positions.length === 0 ? (
                                <Alert variant="info">
                                    No positions available. Please create a position first.
                                </Alert>
                            ) : (
                                <>
                                    <Form.Group className="mb-4">
                                        <Form.Label>Select Position</Form.Label>
                                        <Form.Select 
                                            value={selectedPosition} 
                                            onChange={handlePositionChange}
                                        >
                                            <option value="">Select a position...</option>
                                            {positions.map(position => (
                                                <option key={position.id} value={position.id}>
                                                    {position.title} - {position.location}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                    
                                    <div className="d-grid gap-2">
                                        <Button 
                                            variant="primary" 
                                            onClick={handleViewCandidates}
                                            disabled={!selectedPosition}
                                        >
                                            View Candidates
                                        </Button>
                                    </div>
                                </>
                            )}
                        </Card.Body>
                        <Card.Footer className="text-center">
                            <Link to="/" className="btn btn-link">Back to Dashboard</Link>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default PositionSelector; 