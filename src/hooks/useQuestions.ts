'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase, Question, CATEGORIES } from '@/lib/supabase'

export function useQuestions() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchQuestions = useCallback(async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      
      // Transform the data to match our interface
      const transformed = (data || []).map(q => ({
        ...q,
        options: typeof q.options === 'string' ? JSON.parse(q.options) : q.options
      }))
      
      setQuestions(transformed)
    } catch (err) {
      console.error('Error fetching questions:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch questions')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchQuestions()
  }, [fetchQuestions])

  const addQuestion = async (question: Omit<Question, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('questions')
        .insert([{
          ...question,
          options: JSON.stringify(question.options)
        }])
        .select()
        .single()

      if (error) throw error
      
      const newQuestion = {
        ...data,
        options: typeof data.options === 'string' ? JSON.parse(data.options) : data.options
      }
      
      setQuestions(prev => [newQuestion, ...prev])
      return { success: true, data: newQuestion }
    } catch (err) {
      console.error('Error adding question:', err)
      return { success: false, error: err instanceof Error ? err.message : 'Failed to add question' }
    }
  }

  const importQuestions = async (questionsToImport: Omit<Question, 'id' | 'created_at'>[]) => {
    try {
      const formatted = questionsToImport.map(q => ({
        ...q,
        options: JSON.stringify(q.options)
      }))

      const { data, error } = await supabase
        .from('questions')
        .insert(formatted)
        .select()

      if (error) throw error
      
      const imported = (data || []).map(q => ({
        ...q,
        options: typeof q.options === 'string' ? JSON.parse(q.options) : q.options
      }))
      
      setQuestions(prev => [...imported, ...prev])
      return { success: true, count: imported.length }
    } catch (err) {
      console.error('Error importing questions:', err)
      return { success: false, error: err instanceof Error ? err.message : 'Failed to import questions' }
    }
  }

  const deleteQuestion = async (id: string) => {
    try {
      const { error } = await supabase
        .from('questions')
        .delete()
        .eq('id', id)

      if (error) throw error
      
      setQuestions(prev => prev.filter(q => q.id !== id))
      return { success: true }
    } catch (err) {
      console.error('Error deleting question:', err)
      return { success: false, error: err instanceof Error ? err.message : 'Failed to delete question' }
    }
  }

  return {
    questions,
    loading,
    error,
    addQuestion,
    importQuestions,
    deleteQuestion,
    refetch: fetchQuestions,
    categories: CATEGORIES
  }
}

