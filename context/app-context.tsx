"use client"

import { createContext, useContext, useReducer, type ReactNode } from "react"
import type { DoubtSequence, RealityCheck, SocraticQuestion, ProgressEntry } from "@/types"

interface AppState {
  doubtSequences: DoubtSequence[]
  realityChecks: RealityCheck[]
  socraticQuestions: SocraticQuestion[]
  progressEntries: ProgressEntry[]
}

type Action =
  | { type: "ADD_DOUBT_SEQUENCE"; payload: DoubtSequence }
  | { type: "ADD_REALITY_CHECK"; payload: RealityCheck }
  | { type: "ADD_SOCRATIC_QUESTION"; payload: SocraticQuestion }
  | { type: "ADD_PROGRESS_ENTRY"; payload: ProgressEntry }

const initialState: AppState = {
  doubtSequences: [],
  realityChecks: [],
  socraticQuestions: [],
  progressEntries: [],
}

const AppContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<Action>
} | null>(null)

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "ADD_DOUBT_SEQUENCE":
      return {
        ...state,
        doubtSequences: [action.payload, ...state.doubtSequences],
      }
    case "ADD_REALITY_CHECK":
      return {
        ...state,
        realityChecks: [action.payload, ...state.realityChecks],
      }
    case "ADD_SOCRATIC_QUESTION":
      return {
        ...state,
        socraticQuestions: [action.payload, ...state.socraticQuestions],
      }
    case "ADD_PROGRESS_ENTRY":
      return {
        ...state,
        progressEntries: [action.payload, ...state.progressEntries],
      }
    default:
      return state
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}

