import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gvgcanetyiavluugbaxc.supabase.co'
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2Z2NhbmV0eWlhdmx1dWdiYXhjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzY0MDMxMywiZXhwIjoyMDgzMjE2MzEzfQ.v2ykOm2V-QCSeVQ3JuUmE-BDZUrMjXfthJuMWeRpL3M'

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

const sampleQuestions = [
  {
    category: 'Human Development, Diversity, and Behavior in the Environment',
    vignette: 'A social worker is meeting with a 72-year-old client who recently lost her spouse of 50 years. The client reports difficulty sleeping, loss of appetite, and frequently crying when reminded of her husband. She states she sometimes talks to her husband\'s photograph. These symptoms have been present for 6 weeks.',
    question: 'What is the MOST appropriate assessment of this client\'s condition?',
    options: JSON.stringify(["Major depressive disorder requiring immediate psychiatric referral", "Normal grief response that should be monitored", "Complicated grief requiring intensive intervention", "Psychotic features requiring medication evaluation"]),
    correct_index: 1,
    explanation: 'The client is displaying normal grief responses within an expected timeframe. Talking to photographs of deceased loved ones is a common, non-pathological grief behavior. Six weeks is still early in the grieving process.',
    source: 'Sample Question'
  },
  {
    category: 'Assessment and Intervention Planning',
    vignette: 'A clinical social worker is conducting an initial assessment with a 35-year-old male client who presents with anxiety. The client mentions he drinks "a few beers" after work daily to "take the edge off." When asked to elaborate, he becomes defensive and changes the subject.',
    question: 'What should the social worker do NEXT?',
    options: JSON.stringify(["Refer the client immediately to a substance abuse program", "Focus only on the anxiety since that is the presenting problem", "Use a standardized screening tool to assess alcohol use", "Confront the client about his defensive behavior"]),
    correct_index: 2,
    explanation: 'Using a standardized screening tool (like AUDIT or CAGE) provides objective data and is less confrontational than direct questioning. It\'s important to assess potential substance use that may be contributing to or masking anxiety symptoms.',
    source: 'Sample Question'
  },
  {
    category: 'Interventions with Clients/Client Systems',
    vignette: 'A social worker has been seeing a client for 8 sessions using cognitive behavioral therapy for depression. The client reports some improvement in mood but continues to struggle with negative self-talk. The client asks, "Why do I keep thinking I\'m worthless even when good things happen?"',
    question: 'Which response BEST reflects a CBT intervention?',
    options: JSON.stringify(["Tell me more about your relationship with your parents growing up", "Let's examine the evidence for and against that thought", "It sounds like you're feeling frustrated with yourself", "These feelings will pass as you continue to heal"]),
    correct_index: 1,
    explanation: 'Examining evidence for and against automatic thoughts is a core CBT technique called cognitive restructuring. This helps clients identify and challenge distorted thinking patterns.',
    source: 'Sample Question'
  },
  {
    category: 'Professional Relationships, Values, and Ethics',
    vignette: 'A social worker in private practice discovers that a new client is the ex-spouse of another current client. The new client is unaware of this connection and is seeking therapy for issues unrelated to the divorce, which occurred 5 years ago.',
    question: 'What is the MOST appropriate course of action?',
    options: JSON.stringify(["Continue seeing both clients since their issues are unrelated", "Immediately terminate with the new client and provide referrals", "Consult with a supervisor or colleague about the potential conflict", "Disclose the situation to both clients and let them decide"]),
    correct_index: 2,
    explanation: 'Consultation is appropriate when facing an ethical dilemma. This allows the social worker to carefully consider potential conflicts of interest, confidentiality concerns, and the best course of action before making a decision.',
    source: 'Sample Question'
  },
  {
    category: 'Human Development, Diversity, and Behavior in the Environment',
    vignette: 'A school social worker is working with a 14-year-old student whose parents recently immigrated from a collectivist culture. The student expresses frustration about their parents\' expectations that they prioritize family needs over personal interests, including declining invitations to spend time with American peers.',
    question: 'Which response demonstrates the BEST understanding of this situation?',
    options: JSON.stringify(["Help the student assert independence as appropriate for their developmental stage", "Explore the cultural context while validating the student's bicultural experience", "Encourage the parents to adapt to American cultural norms", "Focus on the student's peer relationships as the priority"]),
    correct_index: 1,
    explanation: 'This response demonstrates cultural humility by acknowledging both the family\'s cultural values and the student\'s experience navigating two cultures. It avoids privileging one cultural framework over another.',
    source: 'Sample Question'
  },
  {
    category: 'Assessment and Intervention Planning',
    vignette: 'A client with a history of trauma becomes visibly distressed during a session when discussing a recent car accident. Her breathing becomes rapid, she appears disconnected, and she stops making eye contact. She says she feels like she\'s "not really here."',
    question: 'What is the social worker\'s PRIORITY intervention?',
    options: JSON.stringify(["Continue processing the trauma memory while the client is accessing it", "Use grounding techniques to help the client return to the present", "End the session early to prevent further distress", "Interpret the dissociation as resistance to treatment"]),
    correct_index: 1,
    explanation: 'When a client is dissociating, the priority is stabilization through grounding techniques. Processing trauma while a client is outside their window of tolerance is not therapeutic and can be retraumatizing.',
    source: 'Sample Question'
  }
]

async function setup() {
  console.log('🔧 Setting up ASWB Study Tool database...\n')

  // Check if questions table exists by trying to query it
  const { data: existingQuestions, error: checkError } = await supabase
    .from('questions')
    .select('id')
    .limit(1)

  if (checkError && checkError.code === '42P01') {
    console.log('❌ Tables do not exist yet.')
    console.log('\n📋 Please run the SQL schema manually in Supabase SQL Editor:')
    console.log('   https://supabase.com/dashboard/project/gvgcanetyiavluugbaxc/sql/new')
    console.log('\n   Copy the contents of supabase-schema.sql and paste it there.\n')
    process.exit(1)
  }

  if (checkError) {
    console.log('Error checking tables:', checkError.message)
    
    // Try to insert questions anyway - tables might exist
    console.log('\nAttempting to insert sample questions...')
  }

  // Check if we already have questions
  const { count } = await supabase
    .from('questions')
    .select('*', { count: 'exact', head: true })

  if (count && count > 0) {
    console.log(`✅ Database already has ${count} questions!`)
    console.log('   No setup needed - you\'re ready to study!')
    return
  }

  // Insert sample questions
  console.log('📝 Inserting sample questions...')
  
  const { data, error } = await supabase
    .from('questions')
    .insert(sampleQuestions)
    .select()

  if (error) {
    console.log('❌ Error inserting questions:', error.message)
    console.log('\n   If tables don\'t exist, please run the SQL schema first.')
    process.exit(1)
  }

  console.log(`✅ Successfully inserted ${data.length} sample questions!`)
  console.log('\n🎉 Setup complete! Refresh your app at http://localhost:3000')
}

setup().catch(console.error)

