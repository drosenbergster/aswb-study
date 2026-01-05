import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database
export interface Question {
  id: string
  category: string
  vignette: string
  question: string
  options: string[]
  correct_index: number
  explanation: string
  source?: string
  created_at: string
}

export interface StudySession {
  id: string
  started_at: string
  ended_at?: string
  questions_answered: number
  correct_answers: number
}

export interface QuestionAttempt {
  id: string
  question_id: string
  session_id?: string
  selected_index: number
  is_correct: boolean
  attempted_at: string
}

export const CATEGORIES = [
  "Human Development, Diversity, and Behavior in the Environment",
  "Assessment and Intervention Planning",
  "Interventions with Clients/Client Systems",
  "Professional Relationships, Values, and Ethics"
] as const

export type Category = typeof CATEGORIES[number]

