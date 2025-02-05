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

