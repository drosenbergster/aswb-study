const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://gvgcanetyiavluugbaxc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2Z2NhbmV0eWlhdmx1dWdiYXhjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzY0MDMxMywiZXhwIjoyMDgzMjE2MzEzfQ.v2ykOm2V-QCSeVQ3JuUmE-BDZUrMjXfthJuMWeRpL3M'
);

// Questions generated from LMSW Social Work Exam Study Guide (Made 2022) by Rachel
const studyGuideQuestions = [
  // =============== HUMAN DEVELOPMENT THEORIES ===============
  {
    category: 'Human Development, Diversity, and Behavior in the Environment',
    vignette: 'A social worker is assessing a 7-year-old child who has difficulty understanding that the same amount of water poured into different shaped containers remains the same quantity.',
    question: 'According to Piaget\'s theory, which cognitive milestone has this child NOT yet achieved?',
    options: JSON.stringify([
      'Object permanence',
      'Conservation',
      'Abstract thinking',
      'Symbolic representation'
    ]),
    correct_index: 1,
    explanation: 'Conservation is achieved during the Concrete Operations stage (7-11 years). Understanding that quantity remains the same despite changes in appearance is a key milestone of this stage. The child is likely at the beginning of this stage or still in Preoperational thinking.',
    source: 'LMSW Study Guide - Piaget\'s Cognitive Development'
  },
  {
    category: 'Human Development, Diversity, and Behavior in the Environment',
    vignette: 'A 45-year-old client expresses concern about feeling unfulfilled in life. They work long hours but feel they haven\'t contributed anything meaningful to future generations.',
    question: 'According to Erikson, this client is struggling with which psychosocial stage?',
    options: JSON.stringify([
      'Intimacy vs. Isolation',
      'Identity vs. Role Confusion',
      'Generativity vs. Stagnation',
      'Ego Integrity vs. Despair'
    ]),
    correct_index: 2,
    explanation: 'Generativity vs. Stagnation occurs in middle adulthood (40s-Mid 60s). This stage involves establishing careers, settling down, and developing a sense of being part of the bigger picture. Feeling unfulfilled about one\'s contributions to future generations indicates a struggle with generativity.',
    source: 'LMSW Study Guide - Erikson\'s Psychosocial Development'
  },
  {
    category: 'Human Development, Diversity, and Behavior in the Environment',
    vignette: 'A teenager reports that they follow rules primarily to gain approval from their parents and teachers, and they define "right" behavior as what pleases important adults in their life.',
    question: 'According to Kohlberg, this adolescent is at which level of moral development?',
    options: JSON.stringify([
      'Preconventional',
      'Conventional',
      'Postconventional',
      'Autonomous'
    ]),
    correct_index: 1,
    explanation: 'The Conventional level (early adolescence) is characterized by the "good boy/girl" orientation where individuals act to gain approval from others and follow stereotypic terms of morality. They obey laws and fulfill obligations to maintain the social system.',
    source: 'LMSW Study Guide - Kohlberg\'s Moral Development'
  },
  {
    category: 'Human Development, Diversity, and Behavior in the Environment',
    vignette: 'A 2-year-old toddler becomes very distressed when their mother leaves the room but quickly calms down when she returns. The child brings toys to show mother and seeks her out as a "home base" when exploring.',
    question: 'According to Mahler\'s object relations theory, this child is in which phase?',
    options: JSON.stringify([
      'Normal Symbiotic phase',
      'Differentiation subphase',
      'Rapprochement subphase',
      'Object Constancy'
    ]),
    correct_index: 2,
    explanation: 'The Rapprochement subphase (15 months-2 years) is characterized by the child walking independently, being more aware of physical separateness, and trying to bridge the gap between self and mother - often by bringing objects to mom. The child wants to be soothed by mom but may struggle to accept her help.',
    source: 'LMSW Study Guide - Mahler Object Relations Theory'
  },
  {
    category: 'Human Development, Diversity, and Behavior in the Environment',
    vignette: 'A client recently lost their job and is struggling to pay rent. They report they cannot focus on their feelings about the job loss or relationship issues until they know where they will live.',
    question: 'This client\'s response aligns with which theory?',
    options: JSON.stringify([
      'Erikson\'s Psychosocial Development',
      'Kohlberg\'s Moral Development',
      'Maslow\'s Hierarchy of Needs',
      'Freud\'s Psychosexual Development'
    ]),
    correct_index: 2,
    explanation: 'Maslow\'s Hierarchy of Needs states that basic physiological and safety needs (food, water, shelter, protection) must be met before a person can focus on higher-level needs like belongingness, esteem, and self-actualization.',
    source: 'LMSW Study Guide - Maslow\'s Hierarchy of Needs'
  },
  {
    category: 'Human Development, Diversity, and Behavior in the Environment',
    vignette: 'A client in therapy frequently talks about childhood experiences but has difficulty remembering specific events from ages 3-5. According to Freud, these would fall within which developmental stage?',
    question: 'Based on Freud\'s Psychosexual Development, this period corresponds to which stage?',
    options: JSON.stringify([
      'Oral stage',
      'Anal stage',
      'Phallic stage',
      'Latent stage'
    ]),
    correct_index: 2,
    explanation: 'The Phallic stage occurs between ages 3-5. Fixation at this stage can result in guilt or anxiety about sex. The Oedipus and Electra complexes are theorized to occur during this stage.',
    source: 'LMSW Study Guide - Freud\'s Psychosexual Development'
  },

  // =============== BEHAVIORAL THERAPY ===============
  {
    category: 'Interventions with Clients/Client Systems',
    vignette: 'A social worker is treating a client with a dog phobia. The therapist teaches relaxation techniques and then gradually introduces pictures of dogs, then videos, then small dogs at a distance, moving closer as the client maintains relaxation.',
    question: 'This treatment approach is BEST described as:',
    options: JSON.stringify([
      'Flooding',
      'Systematic desensitization',
      'Aversion therapy',
      'Operant conditioning'
    ]),
    correct_index: 1,
    explanation: 'Systematic desensitization pairs an anxiety-producing stimulus with a relaxation-producing response, moving through a hierarchy from least to most anxiety-provoking situations. Eventually, the anxiety-producing stimulus produces a relaxation response instead.',
    source: 'LMSW Study Guide - Behaviorism'
  },
  {
    category: 'Interventions with Clients/Client Systems',
    vignette: 'A parent tells their child, "If you clean your room, you don\'t have to do the dishes tonight." The child cleans their room to avoid the unpleasant task of dishes.',
    question: 'This is an example of:',
    options: JSON.stringify([
      'Positive reinforcement',
      'Negative reinforcement',
      'Positive punishment',
      'Negative punishment'
    ]),
    correct_index: 1,
    explanation: 'Negative reinforcement encourages desired behaviors by removing an aversive (unpleasant) stimulus. The removal of the dishes task (aversive stimulus) increases the likelihood of room-cleaning behavior. Reinforcement always increases behavior.',
    source: 'LMSW Study Guide - Operant Conditioning'
  },
  {
    category: 'Interventions with Clients/Client Systems',
    vignette: 'A social worker asks a client, "What evidence do you have that your boss hates you? What evidence contradicts that belief?" The goal is to help the client identify and challenge distorted thinking patterns.',
    question: 'This intervention is BEST described as:',
    options: JSON.stringify([
      'Rational Emotive Therapy',
      'Cognitive restructuring',
      'Systematic desensitization',
      'Free association'
    ]),
    correct_index: 1,
    explanation: 'Cognitive restructuring is a CBT technique that involves identifying dysfunctional beliefs and patterns of thought, examining evidence for and against them, and rewarding success in changing these patterns.',
    source: 'LMSW Study Guide - Cognitive Behavioral Therapy'
  },
  {
    category: 'Interventions with Clients/Client Systems',
    vignette: 'A client comes to therapy because they want to run away from home. They list multiple reasons including problems with parents, issues at school, conflict with siblings, and financial stress in the family.',
    question: 'Which technique would be MOST helpful for the social worker to use?',
    options: JSON.stringify([
      'Free association',
      'Confrontation',
      'Partialization',
      'Interpretation'
    ]),
    correct_index: 2,
    explanation: 'Partialization involves breaking down complex issues into simpler, more manageable parts. This helps the client and social worker address each element systematically rather than feeling overwhelmed by the entire situation.',
    source: 'LMSW Study Guide - CBT Techniques'
  },

  // =============== FAMILY AND GROUP THERAPY ===============
  {
    category: 'Interventions with Clients/Client Systems',
    vignette: 'A family therapist creates a visual diagram showing the client\'s family structure across three generations, including births, deaths, marriages, divorces, and significant health conditions.',
    question: 'This tool is called a:',
    options: JSON.stringify([
      'Ecomap',
      'Genogram',
      'Sociogram',
      'Timeline'
    ]),
    correct_index: 1,
    explanation: 'A genogram shows the composition and structure of one\'s family across generations, including genetics and family relationships. An ecomap, in contrast, shows personal and family social relationships with external systems.',
    source: 'LMSW Study Guide - Family Therapy'
  },
  {
    category: 'Interventions with Clients/Client Systems',
    vignette: 'A family therapist analyzes how family members interact during sessions, observing who sits where, who speaks for whom, and identifying coalitions and boundaries within the family system.',
    question: 'This approach is MOST consistent with which family therapy model?',
    options: JSON.stringify([
      'Strategic family therapy',
      'Structural family therapy',
      'Bowenian family therapy',
      'Narrative family therapy'
    ]),
    correct_index: 1,
    explanation: 'Structural family therapy analyzes the family structure based on family relationships, behaviors, and patterns during therapy. It focuses on boundaries, subsystems, and hierarchies within the family.',
    source: 'LMSW Study Guide - Family Therapy'
  },
  {
    category: 'Interventions with Clients/Client Systems',
    vignette: 'A family therapist helps a young adult client differentiate from their enmeshed family system while maintaining emotional contact with family members. The therapist explores how intergenerational patterns affect current functioning.',
    question: 'This approach is MOST consistent with which family therapy model?',
    options: JSON.stringify([
      'Strategic family therapy',
      'Structural family therapy',
      'Bowenian family therapy',
      'Solution-focused therapy'
    ]),
    correct_index: 2,
    explanation: 'Bowenian/Family Systems therapy focuses on intergenerational influences and differentiation - the ability to be an individual while maintaining emotional contact with family. It addresses emotional fusion and triangulation in family relationships.',
    source: 'LMSW Study Guide - Family Therapy'
  },
  {
    category: 'Interventions with Clients/Client Systems',
    vignette: 'In a therapy group, a member brings up a concern privately to the group leader between sessions. The member is frustrated with another group member and considering leaving the group.',
    question: 'The group leader should FIRST:',
    options: JSON.stringify([
      'Address the issue in an individual session',
      'Tell the member they cannot leave a closed group',
      'Encourage the member to bring this up in the next group session',
      'Speak to the other group member about their behavior'
    ]),
    correct_index: 2,
    explanation: 'When working with groups, issues that arise about the group should be kept within the group. The social worker should encourage the client to address their feelings with the group, which promotes cohesion and helps members develop interpersonal skills.',
    source: 'LMSW Study Guide - Group Work'
  },
  {
    category: 'Interventions with Clients/Client Systems',
    vignette: 'A newly formed therapy group has been meeting for two sessions. Members are polite but distant, sharing only surface-level information and looking to the therapist for direction.',
    question: 'This group is MOST likely in which stage of group development?',
    options: JSON.stringify([
      'Power and Control (Storming)',
      'Intimacy (Norming)',
      'Differentiation (Performing)',
      'Preaffiliation (Forming)'
    ]),
    correct_index: 3,
    explanation: 'The Preaffiliation/Forming stage involves the development of trust. Members often remain different and removed until they develop relationships. The social worker identifies the purpose and their role during this stage.',
    source: 'LMSW Study Guide - Stages of Group Development'
  },
  {
    category: 'Human Development, Diversity, and Behavior in the Environment',
    vignette: 'Parents set clear expectations and rules but also explain their reasoning. They are warm and responsive, encourage independence, and use logical consequences rather than harsh punishment.',
    question: 'This parenting style is BEST described as:',
    options: JSON.stringify([
      'Authoritarian',
      'Permissive',
      'Authoritative',
      'Uninvolved'
    ]),
    correct_index: 2,
    explanation: 'Authoritative parenting combines high expectations with warmth and support. It is considered the healthiest parenting style, creating self-sufficient and confident children. It differs from authoritarian (cold, demanding) and permissive (warm but undemanding) styles.',
    source: 'LMSW Study Guide - Parenting Styles'
  },

  // =============== DEFENSE MECHANISMS ===============
  {
    category: 'Assessment and Intervention Planning',
    vignette: 'A client who was yelled at by their boss comes home and snaps at their spouse and children over minor issues. The client acknowledges they were not actually angry at their family.',
    question: 'This client is demonstrating which defense mechanism?',
    options: JSON.stringify([
      'Projection',
      'Displacement',
      'Sublimation',
      'Reaction formation'
    ]),
    correct_index: 1,
    explanation: 'Displacement occurs when anger or negative beliefs about a situation/person are acted out on another, more vulnerable person or thing. The client is redirecting their anger from boss (threatening) to family (safe).',
    source: 'LMSW Study Guide - Defense Mechanisms'
  },
  {
    category: 'Assessment and Intervention Planning',
    vignette: 'A client with aggressive impulses has channeled this energy into becoming a successful professional boxer and advocate for at-risk youth.',
    question: 'This client is demonstrating which defense mechanism?',
    options: JSON.stringify([
      'Displacement',
      'Reaction formation',
      'Sublimation',
      'Compensation'
    ]),
    correct_index: 2,
    explanation: 'Sublimation occurs when potentially maladaptive feelings or behaviors are diverted into socially acceptable, adaptive channels. Channeling aggression into athletics or advocacy is a healthy transformation of impulses.',
    source: 'LMSW Study Guide - Defense Mechanisms'
  },
  {
    category: 'Assessment and Intervention Planning',
    vignette: 'A husband who has been unfaithful constantly accuses his wife of cheating and monitors her whereabouts obsessively, despite no evidence of her infidelity.',
    question: 'This behavior BEST exemplifies which defense mechanism?',
    options: JSON.stringify([
      'Projection',
      'Displacement',
      'Rationalization',
      'Denial'
    ]),
    correct_index: 0,
    explanation: 'Projection occurs when internal negative beliefs are thrown onto another person. The cheating spouse suspects their partner of the very behavior they themselves are engaging in.',
    source: 'LMSW Study Guide - Defense Mechanisms'
  },
  {
    category: 'Assessment and Intervention Planning',
    vignette: 'A client reports intense hatred for their sibling but then mentions they just bought them an expensive gift and are planning to visit them weekly.',
    question: 'This client is demonstrating which defense mechanism?',
    options: JSON.stringify([
      'Projection',
      'Displacement',
      'Reaction formation',
      'Undoing'
    ]),
    correct_index: 2,
    explanation: 'Reaction formation involves acting opposite in affect, ideas, attitudes, or behaviors. The client expresses hatred verbally but demonstrates caring actions, which is the opposite of their stated feelings.',
    source: 'LMSW Study Guide - Defense Mechanisms'
  },
  {
    category: 'Assessment and Intervention Planning',
    vignette: 'A client with Borderline Personality Disorder describes their therapist as "the best therapist ever" one week, then says the therapist is "terrible and doesn\'t care" the next week after a minor scheduling conflict.',
    question: 'This pattern BEST exemplifies which defense mechanism?',
    options: JSON.stringify([
      'Projection',
      'Splitting',
      'Displacement',
      'Devaluation'
    ]),
    correct_index: 1,
    explanation: 'Splitting, associated with Borderline Personality Disorder, involves polarized views of self and others due to intolerable conflicting emotions. People are seen as "all good" or "all bad" with difficulty integrating both positive and negative qualities.',
    source: 'LMSW Study Guide - Defense Mechanisms'
  },

  // =============== DSM-5 AND DIAGNOSIS ===============
  {
    category: 'Assessment and Intervention Planning',
    vignette: 'A client reports depressed mood, decreased appetite, difficulty sleeping, and trouble concentrating. These symptoms have been present almost every day for the past 3 years with no period of relief lasting more than 6 weeks.',
    question: 'Based on DSM-5 criteria, the MOST likely diagnosis is:',
    options: JSON.stringify([
      'Major Depressive Disorder',
      'Persistent Depressive Disorder (Dysthymia)',
      'Adjustment Disorder with Depressed Mood',
      'Bipolar II Disorder'
    ]),
    correct_index: 1,
    explanation: 'Persistent Depressive Disorder (Dysthymia) requires symptoms present for at least 2 years in adults (1 year in children) and the person cannot be without symptoms for more than 2 months. It represents chronic, lower-grade depression.',
    source: 'LMSW Study Guide - DSM-5 Diagnostic Criteria'
  },
  {
    category: 'Assessment and Intervention Planning',
    vignette: 'A client presents with hallucinations, disorganized speech, and flat affect. These symptoms have been present for 4 months and are causing significant impairment in work and relationships.',
    question: 'Based on the duration of symptoms, the MOST appropriate diagnosis would be:',
    options: JSON.stringify([
      'Schizophrenia',
      'Schizophreniform Disorder',
      'Brief Psychotic Disorder',
      'Schizoaffective Disorder'
    ]),
    correct_index: 1,
    explanation: 'Schizophreniform Disorder has the same symptoms as schizophrenia but with duration of 1-6 months. Schizophrenia requires 6+ months of symptoms, and Brief Psychotic Disorder lasts 1 day to 1 month.',
    source: 'LMSW Study Guide - DSM-5 Diagnostic Criteria'
  },
  {
    category: 'Assessment and Intervention Planning',
    vignette: 'A 16-year-old presents with persistent irritability, severe temper outbursts occurring 3+ times weekly, and oppositional behavior at home and school. The mood between outbursts is consistently irritable. Symptoms have been present for 18 months.',
    question: 'The MOST likely diagnosis is:',
    options: JSON.stringify([
      'Oppositional Defiant Disorder',
      'Conduct Disorder',
      'Disruptive Mood Dysregulation Disorder',
      'Bipolar Disorder'
    ]),
    correct_index: 2,
    explanation: 'Disruptive Mood Dysregulation Disorder (ages 6-18) requires persistent irritability and frequent severe temper outbursts occurring 3+ times weekly in 2-3 settings for at least 12 months. It was added to DSM-5 to address over-diagnosis of pediatric bipolar disorder.',
    source: 'LMSW Study Guide - DSM-5 Diagnostic Criteria'
  },
  {
    category: 'Assessment and Intervention Planning',
    vignette: 'A client presents with extreme suspiciousness of others, believing coworkers are plotting against them. They have held this belief for 2 months. There are no hallucinations, and functioning is not significantly impaired outside of the delusional belief.',
    question: 'The MOST likely diagnosis is:',
    options: JSON.stringify([
      'Schizophrenia',
      'Paranoid Personality Disorder',
      'Delusional Disorder',
      'Brief Psychotic Disorder'
    ]),
    correct_index: 2,
    explanation: 'Delusional Disorder requires at least 1 month of delusions without other psychotic symptoms. Persecutory type involves beliefs of being maliciously treated. Unlike schizophrenia, functioning is not markedly impaired outside the delusional theme.',
    source: 'LMSW Study Guide - DSM-5 Diagnostic Criteria'
  },
  {
    category: 'Assessment and Intervention Planning',
    vignette: 'A client reports re-experiencing a traumatic event through nightmares and flashbacks. They avoid reminders of the trauma and feel emotionally numb. These symptoms began 3 weeks after a car accident.',
    question: 'Based on the timeline, the MOST appropriate diagnosis would be:',
    options: JSON.stringify([
      'Post-Traumatic Stress Disorder',
      'Acute Stress Disorder',
      'Adjustment Disorder',
      'Generalized Anxiety Disorder'
    ]),
    correct_index: 1,
    explanation: 'Acute Stress Disorder presents with PTSD-like symptoms but occurs within 1 month of the trauma. If symptoms persist beyond 1 month, the diagnosis would change to PTSD. The 3-week duration indicates Acute Stress Disorder.',
    source: 'LMSW Study Guide - DSM-5 Diagnostic Criteria'
  },

  // =============== PERSONALITY DISORDERS ===============
  {
    category: 'Assessment and Intervention Planning',
    vignette: 'A client presents as introverted and withdrawn. They report having no close friends and express no desire for relationships. They seem indifferent to praise or criticism and show restricted emotional expression.',
    question: 'This presentation is MOST consistent with which personality disorder?',
    options: JSON.stringify([
      'Avoidant Personality Disorder',
      'Schizoid Personality Disorder',
      'Schizotypal Personality Disorder',
      'Dependent Personality Disorder'
    ]),
    correct_index: 1,
    explanation: 'Schizoid Personality Disorder (Cluster A - odd/eccentric) is characterized by being introverted, withdrawn, and fearful of closeness/intimacy. Unlike Avoidant PD, schizoid individuals don\'t desire relationships rather than avoiding them due to fear of rejection.',
    source: 'LMSW Study Guide - Personality Disorders'
  },
  {
    category: 'Assessment and Intervention Planning',
    vignette: 'A client presents with odd beliefs including "magical thinking" and reports unusual perceptual experiences. They appear eccentric in appearance and manner and have difficulty with close relationships due to their suspicious nature.',
    question: 'This presentation is MOST consistent with which personality disorder?',
    options: JSON.stringify([
      'Schizoid Personality Disorder',
      'Schizotypal Personality Disorder',
      'Paranoid Personality Disorder',
      'Borderline Personality Disorder'
    ]),
    correct_index: 1,
    explanation: 'Schizotypal Personality Disorder (Cluster A) is characterized by odd, strange, or outlandish beliefs, "magical thinking," and unusual perceptual experiences. Unlike schizoid, they have cognitive/perceptual distortions and eccentricities.',
    source: 'LMSW Study Guide - Personality Disorders'
  },
  {
    category: 'Assessment and Intervention Planning',
    vignette: 'A client presents with unstable relationships, impulsive behaviors, intense mood swings, and chronic feelings of emptiness. They report a history of self-harm during periods of intense emotional distress.',
    question: 'This presentation is MOST consistent with which personality disorder?',
    options: JSON.stringify([
      'Histrionic Personality Disorder',
      'Narcissistic Personality Disorder',
      'Borderline Personality Disorder',
      'Antisocial Personality Disorder'
    ]),
    correct_index: 2,
    explanation: 'Borderline Personality Disorder (Cluster B - dramatic/emotional) is characterized by unstable interpersonal relationships, impulsivity, identity disturbance, mood instability, and recurrent self-destructive behaviors.',
    source: 'LMSW Study Guide - Personality Disorders'
  },
  {
    category: 'Assessment and Intervention Planning',
    vignette: 'A client presents seeking praise and approval, displays excessive emotionality, and uses physical appearance to draw attention. They are uncomfortable when not the center of attention and show dramatic but shallow emotional expression.',
    question: 'This presentation is MOST consistent with which personality disorder?',
    options: JSON.stringify([
      'Borderline Personality Disorder',
      'Narcissistic Personality Disorder',
      'Histrionic Personality Disorder',
      'Dependent Personality Disorder'
    ]),
    correct_index: 2,
    explanation: 'Histrionic Personality Disorder (Cluster B) is characterized by excessive emotionality and attention-seeking behavior. Individuals are uncomfortable when not the center of attention and display rapidly shifting, shallow emotions.',
    source: 'LMSW Study Guide - Personality Disorders'
  },

  // =============== MEDICATIONS ===============
  {
    category: 'Assessment and Intervention Planning',
    vignette: 'A client diagnosed with Bipolar I Disorder is being prescribed medication by their psychiatrist. The psychiatrist mentions the client will need regular blood work to monitor kidney function.',
    question: 'Which medication is the client MOST likely taking?',
    options: JSON.stringify([
      'Prozac',
      'Lithium',
      'Risperdal',
      'Xanax'
    ]),
    correct_index: 1,
    explanation: 'Lithium is a mood stabilizer commonly used for Bipolar Disorder that can cause kidney problems. Regular blood work is required to monitor lithium levels and kidney function. Tegretol and Depakote require monitoring for liver problems.',
    source: 'LMSW Study Guide - Medications'
  },
  {
    category: 'Assessment and Intervention Planning',
    vignette: 'A client with schizophrenia has been taking antipsychotic medication for several years. They have developed involuntary muscle movements of the face and tongue that their psychiatrist says may be permanent.',
    question: 'This side effect is known as:',
    options: JSON.stringify([
      'Akathisia',
      'Tardive dyskinesia',
      'Neuroleptic malignant syndrome',
      'Serotonin syndrome'
    ]),
    correct_index: 1,
    explanation: 'Tardive dyskinesia is a serious side effect of antipsychotic medications characterized by involuntary muscle movements, often affecting the face, tongue, and jaw. It can become permanent, especially with long-term use.',
    source: 'LMSW Study Guide - Medications'
  },
  {
    category: 'Assessment and Intervention Planning',
    vignette: 'A client is prescribed an MAOI antidepressant. The social worker should be aware that this medication requires:',
    question: 'Which precaution is MOST important for clients taking MAOIs?',
    options: JSON.stringify([
      'Regular blood work to monitor liver function',
      'Dietary restrictions including aged cheese and beer',
      'Monitoring for involuntary muscle movements',
      'Gradual tapering when discontinuing'
    ]),
    correct_index: 1,
    explanation: 'MAOIs (like Nardil, Parnate) require strict dietary restrictions because they can cause dangerous interactions with tyramine-containing foods such as aged cheese, beer, wine, and certain processed meats.',
    source: 'LMSW Study Guide - Medications'
  },

  // =============== STAGES OF CHANGE ===============
  {
    category: 'Interventions with Clients/Client Systems',
    vignette: 'A client has been mandated to treatment for substance use but denies having a problem. They are argumentative, miss appointments, and say "I don\'t know why I\'m here - I can stop whenever I want."',
    question: 'According to the Transtheoretical Model, this client is in which stage of change?',
    options: JSON.stringify([
      'Contemplation',
      'Precontemplation',
      'Preparation',
      'Action'
    ]),
    correct_index: 1,
    explanation: 'Precontemplation is characterized by the client being unaware, unable, or unwilling to change. Signs include arguing, denial, missing appointments, and not agreeing to change. The social worker should establish rapport and acknowledge resistance.',
    source: 'LMSW Study Guide - Stages of Change'
  },
  {
    category: 'Interventions with Clients/Client Systems',
    vignette: 'A client acknowledges their drinking is a problem and has considered cutting back. They can discuss pros and cons of change but haven\'t committed to any specific action yet. Their motivation seems to fluctuate.',
    question: 'According to the Transtheoretical Model, this client is in which stage of change?',
    options: JSON.stringify([
      'Precontemplation',
      'Contemplation',
      'Preparation',
      'Action'
    ]),
    correct_index: 1,
    explanation: 'Contemplation is characterized by ambivalence or uncertainty about behavior change. The client may be willing to look at pros and cons but is not yet committed to working toward change. Their behaviors may be unpredictable due to conflicting emotions.',
    source: 'LMSW Study Guide - Stages of Change'
  },

  // =============== ETHICS ===============
  {
    category: 'Professional Relationships, Values, and Ethics',
    vignette: 'A social worker receives a subpoena from an attorney requesting client records. The subpoena was not issued by a judge.',
    question: 'The social worker should FIRST:',
    options: JSON.stringify([
      'Turn over the records immediately',
      'Claim privilege and request written consent from the client',
      'Ignore the subpoena',
      'Contact the client\'s family'
    ]),
    correct_index: 1,
    explanation: 'When subpoenaed by a lawyer (not a judge), the social worker should claim privilege and not turn over documents unless there is written consent from the client. A court order from a judge would require compliance with efforts to limit disclosure.',
    source: 'LMSW Study Guide - Court Ethics'
  },
  {
    category: 'Professional Relationships, Values, and Ethics',
    vignette: 'A social worker receives a court order from a judge to release client records. The social worker believes releasing certain information could harm the client.',
    question: 'What should the social worker do FIRST?',
    options: JSON.stringify([
      'Refuse to release the records',
      'Release only portions they deem safe',
      'Obtain supervision and request to limit the order',
      'Immediately comply without question'
    ]),
    correct_index: 2,
    explanation: 'When a court order is received, supervision should be obtained first. The SW should request that the court withdraw or limit the order as narrowly as possible. If records must be released, discuss with the client and try to maintain records under seal.',
    source: 'LMSW Study Guide - Court Ethics'
  },
  {
    category: 'Professional Relationships, Values, and Ethics',
    vignette: 'A social worker is considering sharing personal information about their own recovery from addiction with a client struggling with substance use.',
    question: 'According to NASW guidelines, what should the social worker do FIRST?',
    options: JSON.stringify([
      'Share the information to build rapport',
      'Never self-disclose under any circumstances',
      'Consult with a supervisor about the appropriateness',
      'Ask the client if they want to hear about it'
    ]),
    correct_index: 2,
    explanation: 'Prior to engaging in any self-disclosure, social workers should consult with their supervisor about why such disclosure is being considered and whether it is professionally justified. Self-disclosure is considered a last resort by NASW.',
    source: 'LMSW Study Guide - Ethics in Therapy'
  },
  {
    category: 'Professional Relationships, Values, and Ethics',
    vignette: 'A client tells their social worker that they plan to harm their former partner. The threat appears credible and immediate.',
    question: 'The social worker\'s PRIMARY obligation is to:',
    options: JSON.stringify([
      'Maintain client confidentiality',
      'Warn the potential victim and/or notify authorities',
      'Process the feelings behind the threat',
      'Refer the client to a psychiatrist'
    ]),
    correct_index: 1,
    explanation: 'Duty to warn applies when a client threatens violence towards others. The social worker must warn the potential victim and/or notify proper authorities. This is an exception to confidentiality based on the Tarasoff ruling.',
    source: 'LMSW Study Guide - Ethics'
  },
  {
    category: 'Professional Relationships, Values, and Ethics',
    vignette: 'An HIV-positive client tells their social worker they have not disclosed their status to their sexual partner and do not plan to.',
    question: 'Regarding duty to warn, the social worker should:',
    options: JSON.stringify([
      'Immediately warn the partner',
      'Report to public health authorities',
      'Encourage the client to disclose but NOT warn the partner',
      'Terminate treatment'
    ]),
    correct_index: 2,
    explanation: 'There is NO duty to warn for HIV clients. The social worker should encourage clients to discuss their status with partners but cannot break confidentiality. This differs from threats of violence where duty to warn applies.',
    source: 'LMSW Study Guide - Ethics'
  },

  // =============== SOLVING ETHICAL DILEMMAS ===============
  {
    category: 'Professional Relationships, Values, and Ethics',
    vignette: 'A social worker is facing a complex ethical situation and needs to make a decision about how to proceed.',
    question: 'According to the NASW framework for solving ethical dilemmas, what is the FIRST step?',
    options: JSON.stringify([
      'Develop an action plan',
      'Identify the main principles and values involved',
      'Determine whether there is an ethical issue or dilemma',
      'Implement the chosen intervention'
    ]),
    correct_index: 2,
    explanation: 'The ethical decision-making framework begins with: 1) DETERMINE if there is an ethical issue, 2) IDENTIFY principles/values involved, 3) RANK relevant principles, 4) DEVELOP action plan, 5) IMPLEMENT plan, 6) REFLECT on outcome.',
    source: 'LMSW Study Guide - Solving Ethical Dilemmas'
  },

  // =============== COMMUNITY ORGANIZING ===============
  {
    category: 'Interventions with Clients/Client Systems',
    vignette: 'A social worker is helping a neighborhood association address inadequate street lighting. They facilitate meetings where residents identify solutions and take collective action. The social worker serves as an enabler and broker.',
    question: 'This approach is BEST described as:',
    options: JSON.stringify([
      'Social action',
      'Social planning',
      'Locality development',
      'Social reform'
    ]),
    correct_index: 2,
    explanation: 'Locality development operates at the common/local/neighborhood level with the social worker as enabler (empowerer) and broker. It involves working with residents, schools, and community organizations to address local issues.',
    source: 'LMSW Study Guide - Community Organizing'
  },
  {
    category: 'Interventions with Clients/Client Systems',
    vignette: 'A social worker is helping organize tenants in a low-income housing project to advocate against a landlord who is not making necessary repairs. The social worker helps form a tenant association to demand changes.',
    question: 'This approach is BEST described as:',
    options: JSON.stringify([
      'Locality development',
      'Social planning',
      'Social action',
      'Social reform'
    ]),
    correct_index: 2,
    explanation: 'Social action involves working with disadvantaged communities. It involves organizing task forces of those affected to promote solutions. Keywords include landlords, tenant issues, homeless advocacy, and rights movements.',
    source: 'LMSW Study Guide - Community Organizing'
  },

  // =============== RESEARCH ===============
  {
    category: 'Assessment and Intervention Planning',
    vignette: 'A social worker wants to evaluate whether their intervention is effective with a specific client. They measure the client\'s symptoms before treatment, during treatment, and after treatment is withdrawn.',
    question: 'This research design is BEST described as:',
    options: JSON.stringify([
      'Experimental design',
      'Quasi-experimental design',
      'Single subject design (ABA)',
      'Cross-sectional study'
    ]),
    correct_index: 2,
    explanation: 'Single subject design (ABA or ABAB) uses the client as their own control, measuring baseline (A), intervention (B), and sometimes withdrawal/reversal (A). It\'s ideal for studying behavior change in individual clients.',
    source: 'LMSW Study Guide - Research Methods'
  },
  {
    category: 'Assessment and Intervention Planning',
    vignette: 'A researcher wants to understand how people of different ages experience grief but cannot randomly assign participants to age groups.',
    question: 'This would be considered which type of research design?',
    options: JSON.stringify([
      'Experimental design',
      'Quasi-experimental design',
      'Pre-experimental design',
      'Correlational design'
    ]),
    correct_index: 1,
    explanation: 'Quasi-experimental design is used when random assignment is not possible for practical or ethical reasons. Assignment is based on self-selection or pre-existing characteristics like age. It\'s common in field research.',
    source: 'LMSW Study Guide - Research Methods'
  },
  {
    category: 'Assessment and Intervention Planning',
    vignette: 'A researcher develops a new depression screening tool and wants to ensure it actually measures depression rather than anxiety or general distress.',
    question: 'The researcher is concerned with establishing:',
    options: JSON.stringify([
      'Reliability',
      'Content validity',
      'Construct validity',
      'Predictive validity'
    ]),
    correct_index: 2,
    explanation: 'Construct validity is the degree to which a test measures the intended concept, trait, or theoretical entity. It examines whether the test measures depression specifically versus other related but distinct constructs.',
    source: 'LMSW Study Guide - Reliability and Validity'
  },

  // =============== SUPERVISION ===============
  {
    category: 'Professional Relationships, Values, and Ethics',
    vignette: 'A social worker is experiencing countertransference with a client and finds themselves becoming emotionally over-involved.',
    question: 'The MOST appropriate action is to:',
    options: JSON.stringify([
      'Process these feelings independently',
      'Discuss with the client',
      'Immediately transfer the case',
      'Bring this to supervision'
    ]),
    correct_index: 3,
    explanation: 'Social workers should ALWAYS go to supervision for countertransference issues. Supervision is also appropriate for conflicts, feeling overwhelmed, personal problems affecting work, or bias against a client that cannot be managed independently.',
    source: 'LMSW Study Guide - Supervision'
  },
  {
    category: 'Professional Relationships, Values, and Ethics',
    vignette: 'A social worker approaches a colleague in the community for advice about a challenging case. The colleague provides suggestions which the social worker can choose to follow or reject.',
    question: 'This interaction is BEST described as:',
    options: JSON.stringify([
      'Supervision',
      'Consultation',
      'Educational supervision',
      'Peer review'
    ]),
    correct_index: 1,
    explanation: 'Consultation involves structured advice from a colleague that can be rejected by the consultee. Unlike supervision, it is not an ongoing relationship with authority. Supervision involves direction and education on a continuous basis.',
    source: 'LMSW Study Guide - Supervision'
  },

  // =============== TEST-TAKING STRATEGIES (IMPORTANT!) ===============
  {
    category: 'Assessment and Intervention Planning',
    vignette: 'During a home visit, a social worker notices empty alcohol bottles around the house. The client has not mentioned any alcohol use.',
    question: 'The social worker should FIRST:',
    options: JSON.stringify([
      'Refer the client to a substance abuse program',
      'Ask the client about the alcohol bottles',
      'Report concerns to the supervisor',
      'Document concerns and monitor'
    ]),
    correct_index: 1,
    explanation: 'ASSESS BEFORE ACTION is a key principle. Never make assumptions. When observations suggest potential issues, the social worker should ask the client directly before taking action based on assumptions.',
    source: 'LMSW Study Guide - RUSAFE Mnemonic'
  },
  {
    category: 'Assessment and Intervention Planning',
    vignette: 'A client presents with headaches, weight loss, decreased appetite, and moodiness. They have been feeling this way for several weeks.',
    question: 'The social worker should FIRST:',
    options: JSON.stringify([
      'Assess for suicidality',
      'Complete a mental status exam',
      'Refer the client to a physician',
      'Begin therapy for depression'
    ]),
    correct_index: 2,
    explanation: 'According to RUSAFE, always "Rule out medical" first. Physical symptoms like headaches, weight loss, and appetite changes require medical evaluation before assuming psychological causes.',
    source: 'LMSW Study Guide - RUSAFE Mnemonic'
  },
  {
    category: 'Assessment and Intervention Planning',
    vignette: 'A client in crisis mentions they have been drinking more alcohol lately, recently lost their job, and gave away a valuable family heirloom last week.',
    question: 'Which combination of factors should MOST concern the social worker about suicide risk?',
    options: JSON.stringify([
      'Job loss and increased drinking only',
      'Giving away possessions combined with multiple losses and increased substance use',
      'The family heirloom gift only',
      'Increased drinking only'
    ]),
    correct_index: 1,
    explanation: 'SAULS HARM identifies suicide risk factors: Alcohol/drug increase (sudden change is a red flag), Multiple losses (job, money, relationships), and giving away valued possessions are all warning signs requiring suicide assessment.',
    source: 'LMSW Study Guide - SAULS HARM Mnemonic'
  },
  {
    category: 'Professional Relationships, Values, and Ethics',
    vignette: 'A social worker is considering recommending group therapy to a client who has just started individual treatment.',
    question: 'According to test-taking strategies, this recommendation should generally be:',
    options: JSON.stringify([
      'Made immediately to increase support',
      'Eliminated as a first-line answer choice',
      'Discussed with the client\'s family',
      'Documented in the treatment plan'
    ]),
    correct_index: 1,
    explanation: 'FARM GRITS ROAD identifies answer choices that appear appealing but are usually incorrect. "Recommend group therapy" is one to eliminate, along with focusing on the past, giving advice, making future appointments, giving pamphlets, etc.',
    source: 'LMSW Study Guide - FARM GRITS ROAD Mnemonic'
  },

  // =============== CRISIS INTERVENTION ===============
  {
    category: 'Interventions with Clients/Client Systems',
    vignette: 'A teenage client comes to the school social worker reporting that her 25-year-old boyfriend is threatening to harm her.',
    question: 'The social worker should FIRST:',
    options: JSON.stringify([
      'Call the police to report the adult boyfriend',
      'Ensure the client\'s immediate safety and help find shelter',
      'Contact the client\'s parents',
      'Explore the nature of the relationship'
    ]),
    correct_index: 1,
    explanation: 'In crisis situations, always focus on immediate safety before any legal action. The social worker should first ensure the client is safe (e.g., seek shelter), THEN contact proper authorities.',
    source: 'LMSW Study Guide - Crisis Intervention'
  },
  {
    category: 'Interventions with Clients/Client Systems',
    vignette: 'A client in crisis is homeless and also experiencing symptoms of depression.',
    question: 'Using a hierarchy of needs approach, the social worker should FIRST address:',
    options: JSON.stringify([
      'The depression symptoms',
      'Housing and basic safety needs',
      'Long-term employment goals',
      'Family relationship issues'
    ]),
    correct_index: 1,
    explanation: 'In crisis, always seek shelter FIRST. Using Maslow\'s hierarchy, basic needs (safety, shelter) must be addressed before higher-level needs can be effectively addressed.',
    source: 'LMSW Study Guide - Crisis Intervention'
  }
];

async function importQuestions() {
  console.log('Importing', studyGuideQuestions.length, 'questions from LMSW Study Guide...');
  
  // Import in batches of 20
  const batchSize = 20;
  let imported = 0;
  
  for (let i = 0; i < studyGuideQuestions.length; i += batchSize) {
    const batch = studyGuideQuestions.slice(i, i + batchSize);
    const { data, error } = await supabase
      .from('questions')
      .insert(batch)
      .select();
      
    if (error) {
      console.log('Error importing batch:', error.message);
    } else {
      imported += data.length;
      console.log(`Imported ${imported}/${studyGuideQuestions.length}...`);
    }
  }
  
  console.log('✅ Successfully imported', imported, 'questions from LMSW Study Guide!');
  
  // Get total count
  const { count } = await supabase.from('questions').select('*', { count: 'exact', head: true });
  console.log('📚 Total questions in database:', count);
}

importQuestions();

