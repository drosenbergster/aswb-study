-- ============================================
-- ASWB Study Tool Database Schema
-- ============================================
-- Version: 2.0
-- Last Updated: 2026-01-05
-- 
-- Run this in Supabase SQL Editor:
-- https://supabase.com/dashboard/project/YOUR_PROJECT_ID/sql
-- ============================================

-- ============================================
-- TABLES
-- ============================================

-- Questions table - stores all practice questions
CREATE TABLE IF NOT EXISTS questions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL,                -- ASWB content domain
  vignette TEXT NOT NULL,                -- Clinical scenario/context
  question TEXT NOT NULL,                -- The actual question
  options JSONB NOT NULL,                -- Array of 4 answer options
  correct_index INTEGER NOT NULL 
    CHECK (correct_index >= 0 AND correct_index <= 3),
  explanation TEXT NOT NULL,             -- Explanation of correct answer
  source TEXT,                           -- Question source for attribution
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Study sessions table - tracks quiz sessions
CREATE TABLE IF NOT EXISTS study_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ended_at TIMESTAMP WITH TIME ZONE,
  questions_answered INTEGER DEFAULT 0,
  correct_answers INTEGER DEFAULT 0,
  category_filter TEXT                   -- NULL means all categories
);

-- Question attempts - individual answer records
CREATE TABLE IF NOT EXISTS question_attempts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
  session_id UUID REFERENCES study_sessions(id) ON DELETE SET NULL,
  selected_index INTEGER NOT NULL,
  is_correct BOOLEAN NOT NULL,
  attempted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
-- Enabled but permissive (personal use, no auth required)

ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_attempts ENABLE ROW LEVEL SECURITY;

-- Allow all operations (no authentication required)
CREATE POLICY "Allow all on questions" ON questions 
  FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on study_sessions" ON study_sessions 
  FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on question_attempts" ON question_attempts 
  FOR ALL USING (true) WITH CHECK (true);

-- ============================================
-- INDEXES
-- ============================================
-- Optimized for common query patterns

CREATE INDEX IF NOT EXISTS idx_questions_category 
  ON questions(category);
CREATE INDEX IF NOT EXISTS idx_questions_source 
  ON questions(source);
CREATE INDEX IF NOT EXISTS idx_attempts_question 
  ON question_attempts(question_id);
CREATE INDEX IF NOT EXISTS idx_attempts_session 
  ON question_attempts(session_id);
CREATE INDEX IF NOT EXISTS idx_attempts_correct 
  ON question_attempts(is_correct);
CREATE INDEX IF NOT EXISTS idx_attempts_date 
  ON question_attempts(attempted_at);

-- ============================================
-- USEFUL QUERIES
-- ============================================

-- Get question count by source
-- SELECT source, COUNT(*) FROM questions GROUP BY source ORDER BY COUNT(*) DESC;

-- Get question count by category
-- SELECT category, COUNT(*) FROM questions GROUP BY category ORDER BY COUNT(*) DESC;

-- Get user's accuracy by category
-- SELECT q.category, 
--        COUNT(*) as total_attempts,
--        SUM(CASE WHEN qa.is_correct THEN 1 ELSE 0 END) as correct,
--        ROUND(100.0 * SUM(CASE WHEN qa.is_correct THEN 1 ELSE 0 END) / COUNT(*), 1) as accuracy
-- FROM question_attempts qa
-- JOIN questions q ON qa.question_id = q.id
-- GROUP BY q.category;

-- Get most missed questions
-- SELECT q.id, q.question, 
--        COUNT(*) as attempts,
--        SUM(CASE WHEN qa.is_correct THEN 0 ELSE 1 END) as times_missed
-- FROM question_attempts qa
-- JOIN questions q ON qa.question_id = q.id
-- GROUP BY q.id, q.question
-- HAVING SUM(CASE WHEN qa.is_correct THEN 0 ELSE 1 END) > 0
-- ORDER BY times_missed DESC
-- LIMIT 10;
