'use client'

import { useState, useEffect, useMemo } from 'react'
import { useQuestions } from '@/hooks/useQuestions'
import { useProgress } from '@/hooks/useProgress'
import { Question, CATEGORIES } from '@/lib/supabase'

type Mode = 'menu' | 'quiz' | 'results' | 'add' | 'progress' | 'import'

interface SessionResult {
  questionId: string
  question: Question
  selected: number
  correct: boolean
}

export default function Home() {
  const { questions, loading: questionsLoading, addQuestion, importQuestions } = useQuestions()
  const { stats, recordAttempt, loading: progressLoading } = useProgress()
  
  const [mode, setMode] = useState<Mode>('menu')
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [sessionResults, setSessionResults] = useState<SessionResult[]>([])
  const [reviewMode, setReviewMode] = useState(false)
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([])
  
  // Form state for adding questions
  const [newQuestion, setNewQuestion] = useState<{
    category: string
    vignette: string
    question: string
    options: string[]
    correct_index: number
    explanation: string
    source: string
  }>({
    category: CATEGORIES[0],
    vignette: '',
    question: '',
    options: ['', '', '', ''],
    correct_index: 0,
    explanation: '',
    source: ''
  })
  
  // Import state
  const [importText, setImportText] = useState('')

  // Filter questions for display on menu (not shuffled)
  const filteredQuestionsForMenu = useMemo(() => {
    let filtered = selectedCategory === 'All Categories'
      ? questions
      : questions.filter(q => q.category === selectedCategory)
    
    // If review mode, only show missed questions
    if (reviewMode && stats.recentMissed.length > 0) {
      filtered = filtered.filter(q => stats.recentMissed.includes(q.id))
    }
    
    return filtered
  }, [questions, selectedCategory, reviewMode, stats.recentMissed])

  const currentQuestion = shuffledQuestions[currentIndex]
  const sessionCorrect = sessionResults.filter(r => r.correct).length
  
  // Shuffle helper function
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  const handleAnswer = async (index: number) => {
    if (selectedAnswer !== null || !currentQuestion) return
    
    const isCorrect = index === currentQuestion.correct_index
    setSelectedAnswer(index)
    setShowExplanation(true)
    
    setSessionResults(prev => [...prev, {
      questionId: currentQuestion.id,
      question: currentQuestion,
      selected: index,
      correct: isCorrect
    }])
    
    // Record to database
    await recordAttempt(currentQuestion.id, index, isCorrect)
  }

  const nextQuestion = () => {
    if (currentIndex < shuffledQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      setMode('results')
    }
  }

  const startQuiz = (review = false) => {
    // Get questions to use for this session
    let questionsToUse = selectedCategory === 'All Categories'
      ? questions
      : questions.filter(q => q.category === selectedCategory)
    
    // If review mode, only show missed questions
    if (review && stats.recentMissed.length > 0) {
      questionsToUse = questionsToUse.filter(q => stats.recentMissed.includes(q.id))
    }
    
    // Shuffle and store in state (this won't change during the session)
    setShuffledQuestions(shuffleArray(questionsToUse))
    setReviewMode(review)
    setCurrentIndex(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setSessionResults([])
    setMode('quiz')
  }

  const handleAddQuestion = async () => {
    if (!newQuestion.vignette || !newQuestion.question || newQuestion.options.some(o => !o)) {
      alert('Please fill in all required fields')
      return
    }
    
    const result = await addQuestion({
      category: newQuestion.category,
      vignette: newQuestion.vignette,
      question: newQuestion.question,
      options: newQuestion.options,
      correct_index: newQuestion.correct_index,
      explanation: newQuestion.explanation,
      source: newQuestion.source || undefined
    })
    
    if (result.success) {
      setNewQuestion({
        category: CATEGORIES[0],
        vignette: '',
        question: '',
        options: ['', '', '', ''],
        correct_index: 0,
        explanation: '',
        source: ''
      })
      alert('Question added successfully!')
    } else {
      alert('Error: ' + result.error)
    }
  }

  const handleImport = async () => {
    try {
      const parsed = JSON.parse(importText)
      const questionsToImport = Array.isArray(parsed) ? parsed : [parsed]
      
      // Transform to match our format
      const formatted = questionsToImport.map(q => ({
        category: q.category,
        vignette: q.vignette,
        question: q.question,
        options: q.options,
        correct_index: q.correctIndex ?? q.correct_index,
        explanation: q.explanation,
        source: q.source || 'Imported'
      }))
      
      const result = await importQuestions(formatted)
      
      if (result.success) {
        setImportText('')
        alert(`Successfully imported ${result.count} questions!`)
        setMode('menu')
      } else {
        alert('Error: ' + result.error)
      }
    } catch (err) {
      alert('Invalid JSON format. Please check your input.')
    }
  }

  if (questionsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="card p-8 text-center">
          <div className="animate-spin w-8 h-8 border-4 border-sage-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-sage-700">Loading your study session...</p>
        </div>
      </div>
    )
  }

  // Menu Screen
  if (mode === 'menu') {
  return (
      <div className="min-h-screen p-4 md:p-8 flex justify-center">
        <div className="card p-8 md:p-10 max-w-xl w-full mt-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-sage-800 font-serif mb-2">
              ASWB Clinical Exam
          </h1>
            <p className="text-sage-600">Study Tool</p>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-cream-100 rounded-xl p-4 text-center">
              <div className="text-2xl md:text-3xl font-bold text-sage-800">{questions.length}</div>
              <div className="text-sm text-sage-600">Questions</div>
            </div>
            <div className="bg-cream-100 rounded-xl p-4 text-center">
              <div className="text-2xl md:text-3xl font-bold text-sage-800">{stats.accuracy}%</div>
              <div className="text-sm text-sage-600">Accuracy</div>
            </div>
            <div className="bg-cream-100 rounded-xl p-4 text-center">
              <div className="text-2xl md:text-3xl font-bold text-terracotta-500">{stats.recentMissed.length}</div>
              <div className="text-sm text-sage-600">To Review</div>
            </div>
          </div>

          {/* Category Select */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-sage-700 mb-2">Category</label>
            <select
              className="w-full p-3 rounded-lg border-2 border-cream-300 bg-white text-sage-800 focus:border-sage-400 focus:outline-none"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All Categories">All Categories</option>
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <p className="text-sm text-sage-500 mt-2">
              {filteredQuestionsForMenu.length} questions in this category
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button 
              className="btn-primary w-full"
              onClick={() => startQuiz(false)}
              disabled={filteredQuestionsForMenu.length === 0}
            >
              Start Practice
            </button>
            
            {stats.recentMissed.length > 0 && (
              <button 
                className="btn-secondary w-full"
                onClick={() => startQuiz(true)}
              >
                Review Missed ({stats.recentMissed.length})
              </button>
            )}
            
            <button 
              className="btn-secondary w-full"
              onClick={() => setMode('progress')}
            >
              View Progress
            </button>
            
            <button 
              className="btn-secondary w-full"
              onClick={() => setMode('add')}
            >
              Add Question
            </button>
            
            <button 
              className="btn-secondary w-full"
              onClick={() => setMode('import')}
            >
              Import Questions
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Progress Screen
  if (mode === 'progress') {
    return (
      <div className="min-h-screen p-4 md:p-8 flex justify-center">
        <div className="card p-8 md:p-10 max-w-xl w-full mt-8">
          <button 
            className="text-sage-600 hover:text-sage-800 mb-6 font-medium"
            onClick={() => setMode('menu')}
          >
            ← Back to Menu
          </button>
          
          <h2 className="text-2xl font-bold text-sage-800 font-serif mb-6">Your Progress</h2>
          
          {/* Overall Stats */}
          <div className="bg-gradient-to-br from-sage-600 to-sage-700 rounded-xl p-6 text-white mb-6">
            <div className="text-center">
              <div className="text-5xl font-bold mb-1">{stats.accuracy}%</div>
              <div className="text-sage-200">Overall Accuracy</div>
              <div className="text-sm text-sage-300 mt-2">
                {stats.correctAttempts} correct out of {stats.totalAttempts} attempts
              </div>
            </div>
          </div>
          
          {/* Category Breakdown */}
          <h3 className="font-semibold text-sage-700 mb-3">By Category</h3>
          <div className="space-y-3 mb-6">
            {CATEGORIES.map(cat => {
              const catStats = stats.byCategory[cat] || { total: 0, correct: 0, accuracy: 0 }
              return (
                <div key={cat} className="bg-cream-100 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-sage-700 font-medium">{cat.split(',')[0]}</span>
                    <span className="text-sm font-bold text-sage-800">
                      {catStats.accuracy}%
                    </span>
                  </div>
                  <div className="h-2 bg-cream-300 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-sage-500 rounded-full transition-all"
                      style={{ width: `${catStats.accuracy}%` }}
                    />
                  </div>
                  <div className="text-xs text-sage-500 mt-1">
                    {catStats.correct}/{catStats.total} correct
                  </div>
                </div>
              )
            })}
          </div>
          
          {/* Mastered Questions */}
          {stats.masteredQuestions.length > 0 && (
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <div className="text-green-800 font-medium">
                🎯 {stats.masteredQuestions.length} questions mastered
              </div>
              <div className="text-sm text-green-600">
                Questions you've answered correctly multiple times
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Add Question Screen
  if (mode === 'add') {
    return (
      <div className="min-h-screen p-4 md:p-8 flex justify-center">
        <div className="card p-6 md:p-8 max-w-2xl w-full mt-8 mb-8">
          <button 
            className="text-sage-600 hover:text-sage-800 mb-6 font-medium"
            onClick={() => setMode('menu')}
          >
            ← Back to Menu
          </button>
          
          <h2 className="text-2xl font-bold text-sage-800 font-serif mb-6">Add New Question</h2>
          
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-sage-700 mb-2">Category *</label>
              <select
                className="w-full p-3 rounded-lg border-2 border-cream-300 bg-white focus:border-sage-400 focus:outline-none"
                value={newQuestion.category}
                onChange={(e) => setNewQuestion({...newQuestion, category: e.target.value})}
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-sage-700 mb-2">Clinical Vignette *</label>
              <textarea
                className="w-full p-3 rounded-lg border-2 border-cream-300 bg-white focus:border-sage-400 focus:outline-none min-h-[120px] resize-y"
                value={newQuestion.vignette}
                onChange={(e) => setNewQuestion({...newQuestion, vignette: e.target.value})}
                placeholder="A social worker is meeting with a client who..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-sage-700 mb-2">Question *</label>
              <input
                className="w-full p-3 rounded-lg border-2 border-cream-300 bg-white focus:border-sage-400 focus:outline-none"
                value={newQuestion.question}
                onChange={(e) => setNewQuestion({...newQuestion, question: e.target.value})}
                placeholder="What should the social worker do NEXT?"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-sage-700 mb-2">Answer Options *</label>
              <p className="text-xs text-sage-500 mb-3">Select the radio button for the correct answer</p>
              {newQuestion.options.map((opt, i) => (
                <div key={i} className="flex items-center gap-3 mb-3">
                  <input
                    type="radio"
                    name="correctAnswer"
                    checked={newQuestion.correct_index === i}
                    onChange={() => setNewQuestion({...newQuestion, correct_index: i})}
                    className="w-5 h-5 accent-sage-600"
                  />
                  <span className="option-letter">{String.fromCharCode(65 + i)}</span>
                  <input
                    className="flex-1 p-2.5 rounded-lg border-2 border-cream-300 bg-white focus:border-sage-400 focus:outline-none"
                    value={opt}
                    onChange={(e) => {
                      const newOpts = [...newQuestion.options]
                      newOpts[i] = e.target.value
                      setNewQuestion({...newQuestion, options: newOpts})
                    }}
                    placeholder={`Option ${String.fromCharCode(65 + i)}`}
                  />
                </div>
              ))}
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-sage-700 mb-2">Explanation *</label>
              <textarea
                className="w-full p-3 rounded-lg border-2 border-cream-300 bg-white focus:border-sage-400 focus:outline-none min-h-[100px] resize-y"
                value={newQuestion.explanation}
                onChange={(e) => setNewQuestion({...newQuestion, explanation: e.target.value})}
                placeholder="This is correct because..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-sage-700 mb-2">Source (optional)</label>
              <input
                className="w-full p-3 rounded-lg border-2 border-cream-300 bg-white focus:border-sage-400 focus:outline-none"
                value={newQuestion.source}
                onChange={(e) => setNewQuestion({...newQuestion, source: e.target.value})}
                placeholder="e.g., Dawn Apgar Ch. 5, TDC Practice Exam 2"
              />
            </div>
            
            <button 
              className="btn-primary w-full mt-4"
              onClick={handleAddQuestion}
            >
              Add Question
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Import Screen
  if (mode === 'import') {
    return (
      <div className="min-h-screen p-4 md:p-8 flex justify-center">
        <div className="card p-6 md:p-8 max-w-2xl w-full mt-8">
          <button 
            className="text-sage-600 hover:text-sage-800 mb-6 font-medium"
            onClick={() => setMode('menu')}
          >
            ← Back to Menu
          </button>
          
          <h2 className="text-2xl font-bold text-sage-800 font-serif mb-4">Import Questions</h2>
          
          <div className="bg-cream-100 rounded-lg p-4 mb-6 text-sm text-sage-700">
            <p className="font-medium mb-2">Expected JSON format:</p>
            <pre className="bg-white rounded p-3 overflow-x-auto text-xs">
{`[
  {
    "category": "Assessment and Intervention Planning",
    "vignette": "A social worker...",
    "question": "What should...",
    "options": ["A", "B", "C", "D"],
    "correctIndex": 0,
    "explanation": "This is correct because..."
  }
]`}
            </pre>
          </div>
          
          <textarea
            className="w-full p-4 rounded-lg border-2 border-cream-300 bg-white focus:border-sage-400 focus:outline-none min-h-[200px] font-mono text-sm"
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
            placeholder="Paste your JSON here..."
          />
          
          <button 
            className="btn-primary w-full mt-4"
            onClick={handleImport}
            disabled={!importText.trim()}
          >
            Import Questions
          </button>
        </div>
      </div>
    )
  }

  // Results Screen
  if (mode === 'results') {
    const percentage = sessionResults.length > 0 
      ? Math.round((sessionCorrect / sessionResults.length) * 100) 
      : 0
    
    // Group results by category
    const byCategory: Record<string, { total: number; correct: number }> = {}
    sessionResults.forEach(r => {
      const cat = r.question.category
      if (!byCategory[cat]) byCategory[cat] = { total: 0, correct: 0 }
      byCategory[cat].total++
      if (r.correct) byCategory[cat].correct++
    })

    return (
      <div className="min-h-screen p-4 md:p-8 flex justify-center">
        <div className="card p-8 md:p-10 max-w-xl w-full mt-8 text-center">
          <h2 className="text-2xl font-bold text-sage-800 font-serif mb-6">Session Complete!</h2>
          
          {/* Score Circle */}
          <div className="w-36 h-36 rounded-full bg-gradient-to-br from-sage-600 to-sage-700 flex flex-col items-center justify-center mx-auto mb-6">
            <span className="text-4xl font-bold text-white">{percentage}%</span>
            <span className="text-sage-200 text-sm">{sessionCorrect} / {sessionResults.length}</span>
          </div>
          
          {/* Category Breakdown */}
          {Object.keys(byCategory).length > 0 && (
            <div className="bg-cream-100 rounded-xl p-5 mb-6 text-left">
              {Object.entries(byCategory).map(([cat, data]) => (
                <div key={cat} className="flex justify-between py-2 border-b border-cream-300 last:border-0">
                  <span className="text-sm text-sage-700">{cat.split(',')[0]}</span>
                  <span className="text-sm font-semibold text-sage-800">
                    {data.correct}/{data.total}
                  </span>
                </div>
              ))}
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="space-y-3">
            <button 
              className="btn-primary w-full"
              onClick={() => setMode('menu')}
            >
              Back to Menu
            </button>
            
            {sessionResults.filter(r => !r.correct).length > 0 && (
              <button 
                className="btn-secondary w-full"
                onClick={() => startQuiz(true)}
              >
                Review Missed ({sessionResults.filter(r => !r.correct).length})
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Quiz Screen
  if (!currentQuestion) {
    return (
      <div className="min-h-screen p-4 md:p-8 flex justify-center">
        <div className="card p-8 max-w-xl w-full mt-8 text-center">
          <p className="text-sage-700 mb-4">No questions available for this category.</p>
          <button 
            className="btn-primary"
            onClick={() => setMode('menu')}
          >
            Back to Menu
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 md:p-8 flex justify-center">
      <div className="card p-6 md:p-8 max-w-3xl w-full mt-4 mb-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button 
            className="text-sage-400 hover:text-sage-600 text-xl"
            onClick={() => setMode('menu')}
          >
            ✕
          </button>
          <span className="text-sm font-semibold text-sage-600">
            {currentIndex + 1} / {shuffledQuestions.length}
          </span>
          <span className="ml-auto text-xs bg-cream-200 text-sage-700 px-3 py-1 rounded-full">
            {currentQuestion.category.split(',')[0]}
          </span>
        </div>
        
        {/* Vignette */}
        <div className="vignette-box mb-5">
          <p className="text-sage-800 leading-relaxed font-serif">
            {currentQuestion.vignette}
          </p>
        </div>
        
        {/* Question */}
        <h3 className="text-lg font-semibold text-sage-900 mb-3 leading-snug">
          {currentQuestion.question}
        </h3>
        
        {/* Source Footer */}
        {currentQuestion.source && (
          <p className="text-xs text-sage-400 mb-5 italic">
            {currentQuestion.source}
          </p>
        )}
        
        {/* Options */}
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => {
            let className = 'option-btn w-full'
            if (selectedAnswer !== null) {
              if (index === currentQuestion.correct_index) {
                className += ' correct'
              } else if (index === selectedAnswer) {
                className += ' incorrect'
              }
            }
            
            return (
              <button
                key={index}
                className={className}
                onClick={() => handleAnswer(index)}
                disabled={selectedAnswer !== null}
              >
                <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                <span className="leading-relaxed">{option}</span>
              </button>
            )
          })}
        </div>
        
        {/* Explanation */}
        {showExplanation && (
          <div className="explanation-box mt-6">
            <p className="leading-relaxed">
              <strong>Explanation:</strong> {currentQuestion.explanation}
            </p>
            {currentQuestion.source && (
              <p className="text-sm mt-2 opacity-75">
                Source: {currentQuestion.source}
              </p>
            )}
          </div>
        )}
        
        {/* Next Button */}
        {selectedAnswer !== null && (
          <button 
            className="btn-primary w-full mt-6"
            onClick={nextQuestion}
          >
            {currentIndex < shuffledQuestions.length - 1 ? 'Next Question →' : 'See Results'}
          </button>
        )}
      </div>
    </div>
  )
}
