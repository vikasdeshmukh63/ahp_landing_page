import stepOneImage from '../assets/1.svg'
import stepTwoImage from '../assets/2.svg'
import stepThreeImage from '../assets/3.svg'
import stepFourImage from '../assets/4.svg'

export const processSteps = [
  {
    id: 1,
    title: 'Plan & Approve',
    description:
      'Define hiring demand, generate role descriptions with AI, and validate budgets before opening requisitions.',
    accent: 'define',
    img: stepOneImage,
  },
  {
    id: 2,
    title: 'Source & Screen',
    description:
      'Broadcast across channels, parse resumes, and automatically shortlist the strongest profiles.',
    accent: 'vet',
    img: stepTwoImage,
  },
  {
    id: 3,
    title: 'Assess & Interview',
    description:
      'Run assessments and AI-avatar interviews with transcript-based scoring and structured decision support.',
    accent: 'hire',
    img: stepThreeImage,
  },
  {
    id: 4,
    title: 'Offer, Onboard & Optimize',
    description:
      'Automate scheduling, offers, and onboarding, then improve outcomes with analytics and recruiter copilot insights.',
    accent: 'scale',
    img: stepFourImage,
  },
]
