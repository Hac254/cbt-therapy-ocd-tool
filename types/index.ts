export interface DoubtSequence {
  id: string
  date: string
  trigger: {
    description: string
    type: "internal" | "external"
  }
  doubt: string
  consequences: string
  anxietyLevel: number
  compulsiveBehavior: string
}

export interface RealityCheck {
  id: string
  date: string
  obsessionalThought: string
  sensoryEvidence: string[]
  realityRating: number
}

export interface SocraticQuestion {
  id: string
  date: string
  thought: string
  evidence: string
  reality: string
  anxiety: string
  conclusion: string
}

export interface ProgressEntry {
  id: string
  date: string
  doubtIntensity: number
  realityConfidence: number
  compulsionFrequency: number
  notes: string
}

export interface LearningModule {
  id: string
  title: string
  description: string
  content: string
  type: "article" | "video" | "exercise"
  completed: boolean
}

