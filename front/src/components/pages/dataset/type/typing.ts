export interface TypingProblem {
  id: number
  displayText: string
  hiragana: string
}

export interface TypingDataset {
  id: number
  title: string
  difficulty: string
  problems: TypingProblem[]
  createdAt: string
  updatedAt: string
}
