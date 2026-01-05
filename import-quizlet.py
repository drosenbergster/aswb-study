#!/usr/bin/env python3
"""
Parse the Quizlet ASWB Practice Exam PDF and import questions to Supabase
"""

import re
import json
from pypdf import PdfReader

# Extract text from PDF
reader = PdfReader('/Users/davidrosenberg/Desktop/AI/ASWB/quizlet.com_516494318_print.pdf')
full_text = ""
for page in reader.pages:
    full_text += page.extract_text() + "\n"

# Clean up the text
full_text = full_text.replace('\n', ' ').replace('  ', ' ')

# Pattern to match questions - they start with a number followed by period
# and contain answer options A. B. C. D. followed by the correct answer letter
question_pattern = r'(\d+)\.\s+(.*?)\s+A\.\s+(.*?)\s+B\.\s+(.*?)\s+C\.\s+(.*?)\s+D\.\s+(.*?)\s+([A-D])\s+(.*?)(?=\d+\.\s+|$)'

questions = []
matches = re.findall(question_pattern, full_text, re.DOTALL)

print(f"Found {len(matches)} questions")

# Categories based on ASWB exam content areas
def categorize_question(text):
    text_lower = text.lower()
    
    # Ethics keywords
    ethics_keywords = ['ethical', 'ethics', 'confidential', 'consent', 'dual relationship', 
                       'conflict of interest', 'self-determination', 'code of ethics', 'nasw',
                       'supervision', 'supervisor', 'mandate', 'duty to warn', 'tarasoff',
                       'hipaa', 'boundary', 'termination of services', 'fee splitting']
    
    # Human Development & Diversity keywords  
    human_dev_keywords = ['development', 'piaget', 'erikson', 'freud', 'psychosexual',
                          'cognitive development', 'attachment', 'culture', 'diversity',
                          'racial', 'ethnic', 'gender', 'sexual orientation', 'maslow',
                          'hierarchy of needs', 'stratification', 'reinforcement', 'punishment',
                          'child development', 'adolescent', 'aging', 'life stage']
    
    # Assessment keywords
    assessment_keywords = ['diagnosis', 'dsm', 'assessment', 'evaluation', 'test', 'testing',
                           'intake', 'crisis', 'suicide', 'depression', 'anxiety', 'disorder',
                           'personality disorder', 'schizophrenia', 'symptom', 'medication',
                           'mental status', 'screening', 'baseline', 'single-subject']
    
    # Interventions keywords
    intervention_keywords = ['intervention', 'therapy', 'treatment', 'group therapy', 'counseling',
                             'cbt', 'cognitive behavioral', 'psychotherapy', 'technique',
                             'crisis intervention', 'case management', 'termination',
                             'empowerment', 'advocacy', 'role play', 'modeling']
    
    # Score each category
    scores = {
        'Professional Relationships, Values, and Ethics': sum(1 for k in ethics_keywords if k in text_lower),
        'Human Development, Diversity, and Behavior in the Environment': sum(1 for k in human_dev_keywords if k in text_lower),
        'Assessment and Intervention Planning': sum(1 for k in assessment_keywords if k in text_lower),
        'Interventions with Clients/Client Systems': sum(1 for k in intervention_keywords if k in text_lower)
    }
    
    # Return category with highest score, default to Assessment
    max_category = max(scores, key=scores.get)
    if scores[max_category] == 0:
        return 'Assessment and Intervention Planning'
    return max_category

for match in matches:
    q_num, question_text, opt_a, opt_b, opt_c, opt_d, correct_letter, explanation = match
    
    # Clean up text
    question_text = question_text.strip()
    opt_a = opt_a.strip()
    opt_b = opt_b.strip()
    opt_c = opt_c.strip()
    opt_d = opt_d.strip()
    explanation = explanation.strip()
    
    # Remove page markers and headers from explanation
    explanation = re.sub(r'\d+\s*/\s*27', '', explanation)
    explanation = re.sub(r'===\s*PAGE\s*\d+\s*===', '', explanation)
    explanation = re.sub(r'ASWB Complete Practice Exam', '', explanation)
    explanation = re.sub(r'Study online at https://quizlet\.com/_8ji9ke', '', explanation)
    explanation = explanation.strip()
    
    # Convert letter to index
    correct_index = ord(correct_letter) - ord('A')
    
    # Categorize
    category = categorize_question(question_text + ' ' + explanation)
    
    questions.append({
        'category': category,
        'vignette': question_text,
        'question': 'Based on this situation, what is the correct answer?',
        'options': json.dumps([opt_a, opt_b, opt_c, opt_d]),
        'correct_index': correct_index,
        'explanation': explanation,
        'source': f'Quizlet ASWB Complete Practice Exam (Q{q_num})'
    })

print(f"\nParsed {len(questions)} questions successfully!")
print("\nSample question:")
print(json.dumps(questions[0], indent=2))

# Save to JSON for import
with open('/Users/davidrosenberg/Desktop/AI/aswb-study/quizlet-questions.json', 'w') as f:
    json.dump(questions, f, indent=2)

print(f"\nSaved {len(questions)} questions to quizlet-questions.json")

