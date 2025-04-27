import axios from 'axios';

const API_URL = 'http://localhost:3010';

// Get all candidates for a specific position
export const getCandidatesByPosition = async (positionId) => {
    try {
        const response = await axios.get(`${API_URL}/positions/${positionId}/candidates`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching candidates: ${error.message}`);
    }
};

// Update a candidate's stage
export const updateCandidateStage = async (candidateId, interviewStepId) => {
    try {
        const response = await axios.put(`${API_URL}/candidates/${candidateId}/stage`, {
            interviewStepId
        });
        return response.data;
    } catch (error) {
        throw new Error(`Error updating candidate stage: ${error.message}`);
    }
}; 