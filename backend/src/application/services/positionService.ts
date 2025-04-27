import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Get all candidates for a specific position with their average score
 * @param positionId Position ID
 * @returns Array of candidates with their information
 */
export const getCandidatesByPosition = async (positionId: number) => {
    try {
        // First, check if the position exists
        const position = await prisma.position.findUnique({
            where: { id: positionId }
        });

        if (!position) {
            throw new Error('Position not found');
        }

        // Get all applications for this position with related data
        const applications = await prisma.application.findMany({
            where: { positionId },
            include: {
                candidate: true,
                interviewStep: true,
                interviews: {
                    select: {
                        score: true
                    }
                }
            }
        });

        // Transform the data for the response
        const candidates = applications.map(application => {
            // Calculate average score if there are any interviews with scores
            const scores = application.interviews
                .map(interview => interview.score)
                .filter(score => score !== null) as number[];
            
            const averageScore = scores.length > 0
                ? scores.reduce((sum, score) => sum + score, 0) / scores.length
                : null;

            return {
                id: application.candidate.id,
                fullName: `${application.candidate.firstName} ${application.candidate.lastName}`,
                current_interview_step: application.interviewStep.name,
                averageScore: averageScore !== null ? Number(averageScore.toFixed(2)) : null
            };
        });

        return candidates;
    } catch (error) {
        console.error('Error fetching candidates by position:', error);
        throw error;
    }
};

/**
 * Update a candidate's interview step
 * @param candidateId Candidate ID
 * @param interviewStepId New interview step ID
 * @returns Updated application
 */
export const updateCandidateInterviewStep = async (candidateId: number, interviewStepId: number) => {
    try {
        // First, check if the candidate exists
        const candidate = await prisma.candidate.findUnique({
            where: { id: candidateId }
        });

        if (!candidate) {
            throw new Error('Candidate not found');
        }

        // Check if the interview step exists
        const interviewStep = await prisma.interviewStep.findUnique({
            where: { id: interviewStepId }
        });

        if (!interviewStep) {
            throw new Error('Interview step not found');
        }

        // Find the application for this candidate
        const application = await prisma.application.findFirst({
            where: { candidateId }
        });

        if (!application) {
            throw new Error('No application found for this candidate');
        }

        // Update the application with the new interview step
        const updatedApplication = await prisma.application.update({
            where: { id: application.id },
            data: { currentInterviewStep: interviewStepId },
            include: {
                interviewStep: true
            }
        });

        return {
            applicationId: updatedApplication.id,
            candidateId: updatedApplication.candidateId,
            newStage: updatedApplication.interviewStep.name
        };
    } catch (error) {
        console.error('Error updating candidate interview step:', error);
        throw error;
    }
}; 