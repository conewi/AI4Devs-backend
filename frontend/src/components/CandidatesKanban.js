import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Alert, Button, Spinner, Badge } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { getCandidatesByPosition, updateCandidateStage } from '../services/positionService';

const CandidatesKanban = () => {
    const { positionId } = useParams();
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [stages, setStages] = useState([]);
    const [hasChanges, setHasChanges] = useState(false);

    // Fetch candidates and organize them by stage
    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                setLoading(true);
                const data = await getCandidatesByPosition(positionId);
                setCandidates(data);
                
                // Extract unique stages from candidates
                const uniqueStages = [...new Set(data.map(candidate => candidate.current_interview_step))];
                setStages(uniqueStages);
                
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchCandidates();
    }, [positionId]);

    // Handle drag end event
    const handleDragEnd = async (result) => {
        const { destination, source, draggableId } = result;

        // Drop outside droppable area or same column
        if (!destination || 
            (destination.droppableId === source.droppableId)) {
            return;
        }

        // Get the candidate and new stage
        const candidateId = parseInt(draggableId);
        const newStage = destination.droppableId;

        // Find the interview step ID for the new stage
        // This would need to be fetched from the API or stored in state
        // For now we'll use a placeholder - in a real app you'd need to map
        // stage names to their corresponding IDs
        const interviewStepId = getInterviewStepIdFromStageName(newStage);

        try {
            // Optimistic update
            const updatedCandidates = candidates.map(candidate => {
                if (candidate.id === candidateId) {
                    return {
                        ...candidate,
                        current_interview_step: newStage
                    };
                }
                return candidate;
            });
            
            setCandidates(updatedCandidates);
            setHasChanges(true);
            
            // Update in the backend
            await updateCandidateStage(candidateId, interviewStepId);
            
            setHasChanges(false);
        } catch (err) {
            // Revert on error
            setError('Failed to update candidate stage. Please try again.');
            // Revert the optimistic update
            const originalCandidates = await getCandidatesByPosition(positionId);
            setCandidates(originalCandidates);
            setHasChanges(false);
        }
    };

    // Placeholder function - In a real app, you would get this from your API
    const getInterviewStepIdFromStageName = (stageName) => {
        // This is a simplification. In a real app, you would have a mapping or API call
        // to get the actual interview step ID based on the name
        const mockStageMap = {
            'Initial Screening': 1,
            'Technical Interview': 2,
            'HR Interview': 3,
            'Final Decision': 4,
            'Offer': 5
        };
        
        return mockStageMap[stageName] || 1; // Default to 1 if not found
    };

    // Group candidates by stage
    const getCandidatesByStage = (stageName) => {
        return candidates.filter(candidate => candidate.current_interview_step === stageName);
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

    if (error) {
        return (
            <Container className="mt-4">
                <Alert variant="danger">
                    {error}
                    <div className="mt-3">
                        <Button variant="outline-primary" onClick={() => window.location.reload()}>
                            Try Again
                        </Button>
                    </div>
                </Alert>
            </Container>
        );
    }

    return (
        <Container fluid className="mt-4">
            <Row className="mb-4">
                <Col>
                    <Link to="/" className="btn btn-outline-secondary mb-3">
                        Back to Dashboard
                    </Link>
                    <h2>Candidates Pipeline</h2>
                    {hasChanges && (
                        <Alert variant="info">
                            Saving changes...
                        </Alert>
                    )}
                </Col>
            </Row>
            
            <DragDropContext onDragEnd={handleDragEnd}>
                <Row className="kanban-board" style={{ overflowX: 'auto', minHeight: '80vh' }}>
                    {stages.map((stageName) => (
                        <Col key={stageName} className="kanban-column" xs={12} md={6} lg={4} xl={3}>
                            <Card className="shadow-sm mb-4">
                                <Card.Header className="bg-light">
                                    <h5>{stageName}</h5>
                                    <Badge bg="secondary">{getCandidatesByStage(stageName).length}</Badge>
                                </Card.Header>
                                <Droppable droppableId={stageName}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            className="kanban-column-content"
                                            style={{ minHeight: '50vh', padding: '10px' }}
                                        >
                                            {getCandidatesByStage(stageName).map((candidate, index) => (
                                                <Draggable 
                                                    key={candidate.id.toString()} 
                                                    draggableId={candidate.id.toString()} 
                                                    index={index}
                                                >
                                                    {(provided) => (
                                                        <Card
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className="mb-2 candidate-card"
                                                        >
                                                            <Card.Body>
                                                                <Card.Title>{candidate.fullName}</Card.Title>
                                                                {candidate.averageScore !== null && (
                                                                    <Badge 
                                                                        bg={candidate.averageScore >= 7 ? "success" : 
                                                                            candidate.averageScore >= 5 ? "warning" : "danger"}
                                                                        className="me-2"
                                                                    >
                                                                        Score: {candidate.averageScore}
                                                                    </Badge>
                                                                )}
                                                            </Card.Body>
                                                        </Card>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </DragDropContext>
        </Container>
    );
};

export default CandidatesKanban; 