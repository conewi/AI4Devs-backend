import { PrismaClient } from '@prisma/client';
import * as process from 'process';

const prisma = new PrismaClient();

async function main() {
  // Create Companies
  const company1 = await prisma.company.create({
    data: {
      name: 'LTI',
    },
  });

  // Create Interview Flows
  const interviewFlow1 = await prisma.interviewFlow.create({
    data: {
      description: 'Standard development interview process',
    },
  });

  const interviewFlow2 = await prisma.interviewFlow.create({
    data: {
      description: 'Data science interview process',
    },
  });

  // Create Positions
  const position1 = await prisma.position.create({
    data: {
      title: 'Software Engineer',
      description: 'Develop and maintain software applications.',
      status: 'Open',
      isVisible: true,
      location: 'Remote',
      jobDescription: 'Full-stack development',
      companyId: company1.id,
      interviewFlowId: interviewFlow1.id,
      salaryMin: 50000,
      salaryMax: 80000,
      employmentType: 'Full-time',
      benefits: 'Health insurance, 401k, Paid time off',
      contactInfo: 'hr@lti.com',
      requirements: '3+ years of experience in software development, knowledge in React and Node.js',
      responsibilities: 'Develop, test, and maintain software solutions.',
      companyDescription: 'LTI is a leading HR solutions provider.',
      applicationDeadline: new Date('2024-12-31')
    },
  });

  const position2 = await prisma.position.create({
    data: {
      title: 'Data Scientist',
      description: 'Analyze and interpret complex data.',
      status: 'Open',
      isVisible: true,
      location: 'Remote',
      jobDescription: 'Data analysis and machine learning',
      companyId: company1.id,
      interviewFlowId: interviewFlow2.id,
      salaryMin: 60000,
      salaryMax: 90000,
      employmentType: 'Full-time',
      benefits: 'Health insurance, 401k, Paid time off, Stock options',
      contactInfo: 'hr@lti.com',
      requirements: 'Master degree in Data Science or related field, proficiency in Python and R',
      responsibilities: 'Analyze data sets to derive business insights and develop predictive models.',
      companyDescription: 'LTI is a leading HR solutions provider.',
      applicationDeadline: new Date('2024-12-31')
    },
  });

  const position3 = await prisma.position.create({
    data: {
      title: 'Frontend Developer',
      description: 'Build responsive user interfaces',
      status: 'Open',
      isVisible: true,
      location: 'Madrid, Spain',
      jobDescription: 'Frontend development with React and TypeScript',
      companyId: company1.id,
      interviewFlowId: interviewFlow1.id,
      salaryMin: 45000,
      salaryMax: 70000,
      employmentType: 'Full-time',
      benefits: 'Health insurance, Flexible schedule, Remote work options',
      contactInfo: 'hr@lti.com',
      requirements: '2+ years experience with React, HTML, CSS, and JavaScript',
      responsibilities: 'Develop user interfaces and implement responsive design',
      companyDescription: 'LTI is a leading HR solutions provider.',
      applicationDeadline: new Date('2024-12-31')
    },
  });

  // Create Candidates
  const candidate1 = await prisma.candidate.create({
    data: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@gmail.com',
      phone: '1234567890',
      address: '123 Main St',
      educations: {
        create: [
          {
            institution: 'University A',
            title: 'BSc Computer Science',
            startDate: new Date('2015-09-01'),
            endDate: new Date('2019-06-01'),
          },
        ],
      },
      workExperiences: {
        create: [
          {
            company: 'Eventbrite',
            position: 'Software Developer',
            description: 'Developed web applications',
            startDate: new Date('2019-07-01'),
            endDate: new Date('2021-08-01'),
          },
        ],
      },
      resumes: {
        create: [
          {
            filePath: '/resumes/john_doe.pdf',
            fileType: 'application/pdf',
            uploadDate: new Date(),
          },
        ],
      },
    },
  });

  const candidate2 = await prisma.candidate.create({
    data: {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@gmail.com',
      phone: '0987654321',
      address: '456 Elm St',
      educations: {
        create: [
          {
            institution: 'Maryland',
            title: 'MSc Data Science',
            startDate: new Date('2016-09-01'),
            endDate: new Date('2020-06-01'),
          },
        ],
      },
      workExperiences: {
        create: [
          {
            company: 'Gitlab',
            position: 'Data Scientist',
            description: 'Analyzed data sets',
            startDate: new Date('2020-07-01'),
            endDate: new Date('2022-08-01'),
          },
        ],
      },
      resumes: {
        create: [
          {
            filePath: '/resumes/jane_smith.pdf',
            fileType: 'application/pdf',
            uploadDate: new Date(),
          },
        ],
      },
    },
  });

  const candidate3 = await prisma.candidate.create({
    data: {
      firstName: 'Carlos',
      lastName: 'García',
      email: 'carlos.garcia@example.com',
      phone: '1122334455',
      address: '789 Pine St',
      educations: {
        create: [
          {
            institution: 'Instituto Tecnológico',
            title: 'Ingeniería en Sistemas Computacionales',
            startDate: new Date('2017-01-01'),
            endDate: new Date('2021-12-01'),
          },
        ],
      },
      workExperiences: {
        create: [
          {
            company: 'Innovaciones Tech',
            position: 'Ingeniero de Software',
            description: 'Desarrollo y mantenimiento de aplicaciones de software',
            startDate: new Date('2022-01-01'),
            endDate: new Date('2023-01-01'),
          },
        ],
      },
      resumes: {
        create: [
          {
            filePath: '/resumes/carlos_garcia.pdf',
            fileType: 'application/pdf',
            uploadDate: new Date(),
          },
        ],
      },
    },
  });

  const candidate4 = await prisma.candidate.create({
    data: {
      firstName: 'Maria',
      lastName: 'Rodriguez',
      email: 'maria.rodriguez@example.com',
      phone: '5566778899',
      address: '101 Oak St',
      educations: {
        create: [
          {
            institution: 'Universidad Politécnica',
            title: 'Computer Engineering',
            startDate: new Date('2018-01-01'),
            endDate: new Date('2022-12-01'),
          },
        ],
      },
      workExperiences: {
        create: [
          {
            company: 'Global Solutions',
            position: 'Frontend Developer',
            description: 'Created responsive UIs using React',
            startDate: new Date('2022-02-01'),
            endDate: new Date('2023-06-01'),
          },
        ],
      },
      resumes: {
        create: [
          {
            filePath: '/resumes/maria_rodriguez.pdf',
            fileType: 'application/pdf',
            uploadDate: new Date(),
          },
        ],
      },
    },
  });

  const candidate5 = await prisma.candidate.create({
    data: {
      firstName: 'Alex',
      lastName: 'Chen',
      email: 'alex.chen@example.com',
      phone: '3344556677',
      address: '202 Maple Ave',
      educations: {
        create: [
          {
            institution: 'Stanford University',
            title: 'MSc Artificial Intelligence',
            startDate: new Date('2016-09-01'),
            endDate: new Date('2018-06-01'),
          },
        ],
      },
      workExperiences: {
        create: [
          {
            company: 'AI Solutions',
            position: 'Machine Learning Engineer',
            description: 'Developed ML models for recommendation systems',
            startDate: new Date('2018-07-01'),
            endDate: new Date('2022-12-01'),
          },
        ],
      },
      resumes: {
        create: [
          {
            filePath: '/resumes/alex_chen.pdf',
            fileType: 'application/pdf',
            uploadDate: new Date(),
          },
        ],
      },
    },
  });

  // Create Interview Types
  const interviewType1 = await prisma.interviewType.create({
    data: {
      name: 'HR Interview',
      description: 'Assess overall fit, tech stack, salary range and availability',
    },
  });

  const interviewType2 = await prisma.interviewType.create({
    data: {
      name: 'Technical Interview',
      description: 'Assess technical skills',
    },
  });

  const interviewType3 = await prisma.interviewType.create({
    data: {
      name: 'Hiring manager interview',
      description: 'Assess cultural fit and professional goals',
    },
  });

  const interviewType4 = await prisma.interviewType.create({
    data: {
      name: 'Final Interview',
      description: 'Final round with senior management',
    },
  });

  // Create Interview Steps for software development flow
  const interviewStep1 = await prisma.interviewStep.create({
    data: {
      interviewFlowId: interviewFlow1.id,
      interviewTypeId: interviewType1.id,
      name: 'Initial Screening',
      orderIndex: 1,
    },
  });

  const interviewStep2 = await prisma.interviewStep.create({
    data: {
      interviewFlowId: interviewFlow1.id,
      interviewTypeId: interviewType2.id,
      name: 'Technical Interview',
      orderIndex: 2,
    },
  });

  const interviewStep3 = await prisma.interviewStep.create({
    data: {
      interviewFlowId: interviewFlow1.id,
      interviewTypeId: interviewType3.id,
      name: 'Manager Interview',
      orderIndex: 3,
    },
  });

  const interviewStep4 = await prisma.interviewStep.create({
    data: {
      interviewFlowId: interviewFlow1.id,
      interviewTypeId: interviewType4.id,
      name: 'Final Decision',
      orderIndex: 4,
    },
  });

  const interviewStep5 = await prisma.interviewStep.create({
    data: {
      interviewFlowId: interviewFlow1.id,
      interviewTypeId: interviewType1.id,
      name: 'Offer',
      orderIndex: 5,
    },
  });

  // Create Interview Steps for data science flow
  const dsInterviewStep1 = await prisma.interviewStep.create({
    data: {
      interviewFlowId: interviewFlow2.id,
      interviewTypeId: interviewType1.id,
      name: 'Initial Screening',
      orderIndex: 1,
    },
  });

  const dsInterviewStep2 = await prisma.interviewStep.create({
    data: {
      interviewFlowId: interviewFlow2.id,
      interviewTypeId: interviewType2.id,
      name: 'Technical Assessment',
      orderIndex: 2,
    },
  });

  const dsInterviewStep3 = await prisma.interviewStep.create({
    data: {
      interviewFlowId: interviewFlow2.id,
      interviewTypeId: interviewType2.id,
      name: 'Case Study',
      orderIndex: 3,
    },
  });

  const dsInterviewStep4 = await prisma.interviewStep.create({
    data: {
      interviewFlowId: interviewFlow2.id,
      interviewTypeId: interviewType3.id,
      name: 'Team Interview',
      orderIndex: 4,
    },
  });

  const dsInterviewStep5 = await prisma.interviewStep.create({
    data: {
      interviewFlowId: interviewFlow2.id,
      interviewTypeId: interviewType4.id,
      name: 'Final Decision',
      orderIndex: 5,
    },
  });

  // Create Employees
  const employee1 = await prisma.employee.create({
    data: {
      companyId: company1.id,
      name: 'Alice Johnson',
      email: 'alice.johnson@lti.com',
      role: 'Interviewer',
    },
  });

  const employee2 = await prisma.employee.create({
    data: {
      companyId: company1.id,
      name: 'Bob Miller',
      email: 'bob.miller@lti.com',
      role: 'Hiring Manager',
    },
  });

  const employee3 = await prisma.employee.create({
    data: {
      companyId: company1.id,
      name: 'Elena Martinez',
      email: 'elena.martinez@lti.com',
      role: 'Technical Lead',
    },
  });

  const employee4 = await prisma.employee.create({
    data: {
      companyId: company1.id,
      name: 'David Wang',
      email: 'david.wang@lti.com',
      role: 'CTO',
    },
  });

  // Create Applications for position 1 (Software Engineer) in different stages
  const application1 = await prisma.application.create({
    data: {
      positionId: position1.id,
      candidateId: candidate1.id,
      applicationDate: new Date('2023-11-15'),
      currentInterviewStep: interviewStep3.id, // Manager Interview
    },
  });

  const application2 = await prisma.application.create({
    data: {
      positionId: position1.id,
      candidateId: candidate2.id,
      applicationDate: new Date('2023-11-10'),
      currentInterviewStep: interviewStep2.id, // Technical Interview
    },
  });

  const application3 = await prisma.application.create({
    data: {
      positionId: position1.id,
      candidateId: candidate3.id,
      applicationDate: new Date('2023-12-01'),
      currentInterviewStep: interviewStep1.id, // Initial Screening
    },
  });

  const application4 = await prisma.application.create({
    data: {
      positionId: position1.id,
      candidateId: candidate4.id,
      applicationDate: new Date('2023-10-20'),
      currentInterviewStep: interviewStep4.id, // Final Decision
    },
  });

  const application5 = await prisma.application.create({
    data: {
      positionId: position1.id,
      candidateId: candidate5.id,
      applicationDate: new Date('2023-10-05'),
      currentInterviewStep: interviewStep5.id, // Offer
    },
  });

  // Create applications for position 2 (Data Scientist)
  const application6 = await prisma.application.create({
    data: {
      positionId: position2.id,
      candidateId: candidate1.id,
      applicationDate: new Date('2023-11-20'),
      currentInterviewStep: dsInterviewStep2.id, // Technical Assessment
    },
  });

  const application7 = await prisma.application.create({
    data: {
      positionId: position2.id,
      candidateId: candidate5.id,
      applicationDate: new Date('2023-11-05'),
      currentInterviewStep: dsInterviewStep3.id, // Case Study
    },
  });

  // Create applications for position 3 (Frontend Developer)
  const application8 = await prisma.application.create({
    data: {
      positionId: position3.id,
      candidateId: candidate2.id,
      applicationDate: new Date('2023-12-05'),
      currentInterviewStep: interviewStep1.id, // Initial Screening
    },
  });

  const application9 = await prisma.application.create({
    data: {
      positionId: position3.id,
      candidateId: candidate4.id,
      applicationDate: new Date('2023-11-25'),
      currentInterviewStep: interviewStep2.id, // Technical Interview
    },
  });

  // Create Interviews with varied scores for position 1 (Software Engineer)
  await prisma.interview.createMany({
    data: [
      // John Doe - Software Engineer
      {
        applicationId: application1.id,
        interviewStepId: interviewStep1.id,
        employeeId: employee1.id,
        interviewDate: new Date('2023-11-18'),
        result: 'Passed',
        score: 8,
        notes: 'Strong communication skills, good cultural fit',
      },
      {
        applicationId: application1.id,
        interviewStepId: interviewStep2.id,
        employeeId: employee3.id,
        interviewDate: new Date('2023-11-25'),
        result: 'Passed',
        score: 7,
        notes: 'Good technical skills, especially in backend development',
      },
      
      // Jane Smith - Software Engineer
      {
        applicationId: application2.id,
        interviewStepId: interviewStep1.id,
        employeeId: employee1.id,
        interviewDate: new Date('2023-11-12'),
        result: 'Passed',
        score: 9,
        notes: 'Excellent communication, very enthusiastic about the role',
      },
      
      // Carlos García - Software Engineer
      {
        applicationId: application3.id,
        interviewStepId: interviewStep1.id,
        employeeId: employee1.id,
        interviewDate: new Date('2023-12-03'),
        result: 'In Progress',
        score: null,
        notes: 'Scheduled for initial screening',
      },
      
      // Maria Rodriguez - Software Engineer
      {
        applicationId: application4.id,
        interviewStepId: interviewStep1.id,
        employeeId: employee1.id,
        interviewDate: new Date('2023-10-22'),
        result: 'Passed',
        score: 8,
        notes: 'Good fit for the company culture',
      },
      {
        applicationId: application4.id,
        interviewStepId: interviewStep2.id,
        employeeId: employee3.id,
        interviewDate: new Date('2023-10-29'),
        result: 'Passed',
        score: 9,
        notes: 'Excellent frontend skills and knowledge of modern frameworks',
      },
      {
        applicationId: application4.id,
        interviewStepId: interviewStep3.id,
        employeeId: employee2.id,
        interviewDate: new Date('2023-11-05'),
        result: 'Passed',
        score: 8,
        notes: 'Team seems excited to work with her',
      },
      
      // Alex Chen - Software Engineer
      {
        applicationId: application5.id,
        interviewStepId: interviewStep1.id,
        employeeId: employee1.id,
        interviewDate: new Date('2023-10-07'),
        result: 'Passed',
        score: 9,
        notes: 'Excellent communication and experience',
      },
      {
        applicationId: application5.id,
        interviewStepId: interviewStep2.id,
        employeeId: employee3.id,
        interviewDate: new Date('2023-10-14'),
        result: 'Passed',
        score: 10,
        notes: 'Outstanding technical skills across full stack',
      },
      {
        applicationId: application5.id,
        interviewStepId: interviewStep3.id,
        employeeId: employee2.id,
        interviewDate: new Date('2023-10-21'),
        result: 'Passed',
        score: 9,
        notes: 'Great potential to lead projects in the future',
      },
      {
        applicationId: application5.id,
        interviewStepId: interviewStep4.id,
        employeeId: employee4.id,
        interviewDate: new Date('2023-10-28'),
        result: 'Passed',
        score: 9,
        notes: 'Strongly recommended for hire',
      },
      
      // John Doe - Data Scientist
      {
        applicationId: application6.id,
        interviewStepId: dsInterviewStep1.id,
        employeeId: employee1.id,
        interviewDate: new Date('2023-11-22'),
        result: 'Passed',
        score: 7,
        notes: 'Good background in data analysis',
      },
      
      // Alex Chen - Data Scientist
      {
        applicationId: application7.id,
        interviewStepId: dsInterviewStep1.id,
        employeeId: employee1.id,
        interviewDate: new Date('2023-11-08'),
        result: 'Passed',
        score: 10,
        notes: 'Perfect fit for the data science role',
      },
      {
        applicationId: application7.id,
        interviewStepId: dsInterviewStep2.id,
        employeeId: employee3.id,
        interviewDate: new Date('2023-11-15'),
        result: 'Passed',
        score: 9,
        notes: 'Excellent ML knowledge and practical experience',
      },
      
      // Jane Smith - Frontend Developer
      {
        applicationId: application8.id,
        interviewStepId: interviewStep1.id,
        employeeId: employee1.id,
        interviewDate: new Date('2023-12-07'),
        result: 'In Progress',
        score: null,
        notes: 'Recently applied, screening scheduled',
      },
      
      // Maria Rodriguez - Frontend Developer
      {
        applicationId: application9.id,
        interviewStepId: interviewStep1.id,
        employeeId: employee1.id,
        interviewDate: new Date('2023-11-27'),
        result: 'Passed',
        score: 8,
        notes: 'Good communication skills, relevant frontend experience',
      }
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
