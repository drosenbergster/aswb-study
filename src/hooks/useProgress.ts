'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase, QuestionAttempt } from '@/lib/supabase'

interface ProgressStats {
  totalAttempts: number
  correctAttempts: number
  accuracy: number
  byCategory: Record<string, { total: number; correct: number; accuracy: number }>
  recentMissed: string[] // question IDs
  masteredQuestions: string[] // questions answered correctly multiple times
}

export function useProgress() {
  const [attempts, setAttempts] = useState<QuestionAttempt[]>([])
  const [stats, setStats] = useState<ProgressStats>({
    totalAttempts: 0,
    correctAttempts: 0,
    accuracy: 0,
    byCategory: {},
    recentMissed: [],
    masteredQuestions: []
  })
  const [loading, setLoading] = useState(true)

  const fetchProgress = useCallback(async () => {
    try {
      setLoading(true)
      
      // Fetch attempts with question data
      const { data: attemptsData, error: attemptsError } = await supabase
        .from('question_attempts')
        .select(`
          *,
          questions (
            category
          )
        `)
        .order('attempted_at', { ascending: false })

      if (attemptsError) throw attemptsError

      const allAttempts = attemptsData || []
      setAttempts(allAttempts)

      // Calculate stats
      const totalAttempts = allAttempts.length
      const correctAttempts = allAttempts.filter(a => a.is_correct).length
      
      // Group by category
      const byCategory: Record<string, { total: number; correct: number; accuracy: number }> = {}
      allAttempts.forEach(attempt => {
        const category = attempt.questions?.category || 'Unknown'
        if (!byCategory[category]) {
          byCategory[category] = { total: 0, correct: 0, accuracy: 0 }
        }
        byCategory[category].total++
        if (attempt.is_correct) byCategory[category].correct++
      })
      
      Object.keys(byCategory).forEach(cat => {
        byCategory[cat].accuracy = byCategory[cat].total > 0 
          ? Math.round((byCategory[cat].correct / byCategory[cat].total) * 100)
          : 0
      })

      // Find recently missed questions (last 50 attempts)
      const recentMissed = allAttempts
        .slice(0, 50)
        .filter(a => !a.is_correct)
        .map(a => a.question_id)
        .filter((id, i, arr) => arr.indexOf(id) === i) // unique

      // Find mastered questions (correct 3+ times, no recent misses)
      const questionStats: Record<string, { correct: number; incorrect: number }> = {}
      allAttempts.forEach(a => {
        if (!questionStats[a.question_id]) {
          questionStats[a.question_id] = { correct: 0, incorrect: 0 }
        }
        if (a.is_correct) questionStats[a.question_id].correct++
        else questionStats[a.question_id].incorrect++
      })
      
      const masteredQuestions = Object.entries(questionStats)
        .filter(([_, s]) => s.correct >= 3 && s.correct > s.incorrect * 2)
        .map(([id]) => id)

      setStats({
        totalAttempts,
        correctAttempts,
        accuracy: totalAttempts > 0 ? Math.round((correctAttempts / totalAttempts) * 100) : 0,
        byCategory,
        recentMissed,
        masteredQuestions
      })
    } catch (err) {
      console.error('Error fetching progress:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProgress()
  }, [fetchProgress])

  const recordAttempt = async (questionId: string, selectedIndex: number, isCorrect: boolean, sessionId?: string) => {
    try {
      const { error } = await supabase
        .from('question_attempts')
        .insert([{
          question_id: questionId,
          session_id: sessionId,
          selected_index: selectedIndex,
          is_correct: isCorrect
        }])

      if (error) throw error
      
      // Refresh stats
      await fetchProgress()
      return { success: true }
    } catch (err) {
      console.error('Error recording attempt:', err)
      return { success: false }
    }
  }

  return {
    attempts,
    stats,
    loading,
    recordAttempt,
    refetch: fetchProgress
  }
}

