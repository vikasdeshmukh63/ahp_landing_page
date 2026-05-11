import stepOneBlue from '../assets/1b.svg'
import stepOneLime from '../assets/1l.svg'
import stepTwoBlue from '../assets/2b.svg'
import stepTwoLime from '../assets/2l.svg'
import stepThreeBlue from '../assets/3b.svg'
import stepThreeLime from '../assets/3l.svg'
import stepFourBlue from '../assets/4b.svg'
import stepFourLime from '../assets/4l.svg'

export const processSteps = [
  {
    id: 1,
    title: 'Plan & Approve',
    description:
      'Define hiring demand, generate role descriptions with AI, and validate budgets before opening requisitions.',
    accent: 'define',
    illustration: { blue: stepOneBlue, lime: stepOneLime },
  },
  {
    id: 2,
    title: 'Source & Screen',
    description:
      'Broadcast across channels, parse resumes, and automatically shortlist the strongest profiles.',
    accent: 'vet',
    illustration: { blue: stepTwoBlue, lime: stepTwoLime },
  },
  {
    id: 3,
    title: 'Assess & Interview',
    description:
      'Run assessments and AI-avatar interviews with transcript-based scoring and structured decision support.',
    accent: 'hire',
    illustration: { blue: stepThreeBlue, lime: stepThreeLime },
  },
  {
    id: 4,
    title: 'Offer, Onboard & Optimize',
    description:
      'Automate scheduling, offers, and onboarding, then improve outcomes with analytics and recruiter copilot insights.',
    accent: 'scale',
    illustration: { blue: stepFourBlue, lime: stepFourLime },
  },
]
