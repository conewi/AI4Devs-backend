import { Router } from 'express';
import { getCandidatesByPositionId } from '../presentation/controllers/positionController';

const router = Router();

// GET /positions/:id/candidates - Get all candidates for a specific position
router.get('/:id/candidates', getCandidatesByPositionId);

export default router; 