import { Request, Response } from 'express';
import { getCandidatesByPosition, updateCandidateInterviewStep, getAllPositionsService } from '../../application/services/positionService';

/**
 * Get all positions
 * @param req Request
 * @param res Response
 */
export const getAllPositions = async (req: Request, res: Response) => {
    try {
        const positions = await getAllPositionsService();
        res.json(positions);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

/**
 * Get all candidates for a specific position
 * @param req Request
 * @param res Response
 */
export const getCandidatesByPositionId = async (req: Request, res: Response) => {
    try {
        const positionId = parseInt(req.params.id);
        
        if (isNaN(positionId)) {
            return res.status(400).json({ error: 'Invalid position ID format' });
        }
        
        const candidates = await getCandidatesByPosition(positionId);
        res.json(candidates);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

/**
 * Update the interview stage of a candidate
 * @param req Request
 * @param res Response
 */
export const updateCandidateStage = async (req: Request, res: Response) => {
    try {
        const candidateId = parseInt(req.params.id);
        const { interviewStepId } = req.body;
        
        if (isNaN(candidateId)) {
            return res.status(400).json({ error: 'Invalid candidate ID format' });
        }
        
        if (!interviewStepId || isNaN(parseInt(interviewStepId))) {
            return res.status(400).json({ error: 'Invalid interview step ID' });
        }
        
        const updatedApplication = await updateCandidateInterviewStep(candidateId, parseInt(interviewStepId));
        res.json({ message: 'Candidate stage updated successfully', data: updatedApplication });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}; 