# ASWB Clinical Exam Study Tool

A modern, responsive study application for preparing for the ASWB (Association of Social Work Boards) Clinical Exam. Built with Next.js and Supabase.

## Features

- 📚 **215+ Practice Questions** across all ASWB content areas
- 🎯 **Category Filtering** - Focus on specific content domains
- 📊 **Progress Tracking** - Track correct/incorrect answers and identify weak areas
- 🔄 **Review Mode** - Practice questions you've missed
- ✨ **Modern UI** - Clean, accessible interface with source attribution

## Question Database

| Source | Questions |
|--------|-----------|
| Quizlet ASWB Practice Exam | 159 |
| LMSW Study Guide (Rachel) | 39 |
| Therapist Development Center | 10 |
| ASWB Official Guidebook | 7 |
| **Total** | **215** |

### Content Categories

| Category | Questions |
|----------|-----------|
| Assessment and Intervention Planning | 99 |
| Professional Relationships, Values, and Ethics | 44 |
| Interventions with Clients/Client Systems | 42 |
| Human Development, Diversity, and Behavior | 30 |

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Database:** Supabase (PostgreSQL)
- **Styling:** Tailwind CSS with custom theme
- **Fonts:** DM Sans, Crimson Pro

## Database Schema

### Tables

```sql
-- Questions table
questions (
  id UUID PRIMARY KEY,
  category TEXT NOT NULL,
  vignette TEXT NOT NULL,
  question TEXT NOT NULL,
  options JSONB NOT NULL,        -- Array of 4 options
  correct_index INTEGER NOT NULL, -- 0-3
  explanation TEXT NOT NULL,
  source TEXT,
  created_at TIMESTAMPTZ
)

-- Study sessions
study_sessions (
  id UUID PRIMARY KEY,
  started_at TIMESTAMPTZ,
  ended_at TIMESTAMPTZ,
  questions_answered INTEGER,
  correct_answers INTEGER,
  category_filter TEXT
)

-- Question attempts
question_attempts (
  id UUID PRIMARY KEY,
  question_id UUID REFERENCES questions,
  session_id UUID REFERENCES study_sessions,
  selected_index INTEGER NOT NULL,
  is_correct BOOLEAN NOT NULL,
  attempted_at TIMESTAMPTZ
)
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables (`.env.local`):
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

## Adding Questions

### Via UI
Click "Add Question" in the app to add questions one at a time.

### Via Import
Click "Import Questions" to bulk import from JSON format:
```json
[
  {
    "category": "Assessment and Intervention Planning",
    "vignette": "Scenario description...",
    "question": "What should the social worker do FIRST?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctIndex": 0,
    "explanation": "Explanation of correct answer...",
    "source": "Source Name"
  }
]
```

## Project Structure

```
src/
├── app/
│   ├── globals.css      # Theme and styles
│   ├── layout.tsx       # Root layout with fonts
│   └── page.tsx         # Main quiz component
├── hooks/
│   ├── useQuestions.ts  # Question fetching/management
│   └── useProgress.ts   # Session/attempt tracking
└── lib/
    └── supabase.ts      # Supabase client config
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `node generate-study-guide-questions.js` | Import LMSW study guide questions |

## Contributing

To add more questions:
1. Ensure questions are from reputable sources
2. Include proper explanations for each answer
3. Categorize using ASWB content domains
4. Test the import before committing

## License

Private use - created for ASWB exam preparation.
