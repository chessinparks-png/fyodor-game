/*
  TOO CONSCIOUS — chamber 02.
  Core problem: why does greater consciousness make action harder, not easier?
  Not "thinking too much is bad": the chamber shows how reflection dissolves
  motive, certainty and the stopping point every action needs.
*/
UNDERGROUND.register('conscious', {
  contentVersion: 1,

  concepts: ['CONSCIOUSNESS', 'MOTIVE', 'INERTIA', 'DEGRADATION', 'SHAME', 'SELF-KNOWLEDGE'],

  acts: {
    1: 'ACT I — THE ILLNESS',
    2: 'ACT II — THE MIRE',
    3: 'ACT III — THE MOUSE',
    4: 'ACT IV — NO FIRST CAUSE',
    5: 'ACT V — THE SLUGGARD',
    6: 'ACT VI — CONSCIOUS INERTIA'
  },

  found: {
    lines: ['He sees more,', 'and therefore acts less.']
  },

  steps: [
    /* ─────────────────────────── ACT I — THE ILLNESS ─────────────────────────── */
    { type: 'act', act: 1 },

    { type: 'question', id: 'c01', scored: true, kind: 'choice', label: 'CLAIM',
      concepts: ['CONSCIOUSNESS'],
      quotes: [{ text: 'I swear, gentlemen, that to be too conscious is an illness—a real thorough-going illness.', src: 'PART I · II' }],
      prompt: ['What makes it an illness, by his account?'],
      options: [
        'It is a symptom of a disease of the body.',
        'It is a moral failing he could correct.',
        'It exceeds what everyday life requires.',
        'It is a gift that only feels painful to him.'
      ],
      answer: 2,
      right: { label: 'INSIGHT', body: 'Everyday needs would be met by “half or a quarter” of it. The excess is the sickness.' },
      wrong: { body: 'He measures it against ordinary life: half or a quarter would have been enough. The illness is surplus.' }
    },

    { type: 'question', id: 'c02', scored: true, kind: 'choice', label: 'CLAIM',
      concepts: ['CONSCIOUSNESS', 'SELF-KNOWLEDGE'],
      quotes: [{ text: 'the most theoretical and intentional town on the whole terrestrial globe', src: 'PART I · II' }],
      prompt: ['Why does he blame Petersburg?'],
      options: [
        'Its climate has been ruining his health for years.',
        'A planned, theoretical city breeds the illness.',
        'He mocks the very city he refuses to leave.',
        'It is the city where men of action prosper.'
      ],
      answer: 1,
      right: { label: 'THAT’S THE DISTINCTION', body: 'Consciousness has a setting. A city built by design produces men who live by theory.' },
      wrong: { body: 'The complaint is not about weather or mockery. A “theoretical and intentional” city fosters the over-conscious man.' }
    },

    /* ─────────────────────────── ACT II — THE MIRE ─────────────────────────── */
    { type: 'act', act: 2 },

    { type: 'question', id: 'c03', scored: true, kind: 'choice', label: 'CLAIM',
      concepts: ['DEGRADATION', 'SELF-KNOWLEDGE'],
      quotes: [{ text: 'The more conscious I was of goodness and of all that was ‘sublime and beautiful,’ the more deeply I sank into my mire', src: 'PART I · II' }],
      prompt: ['What makes this worse than ordinary weakness?'],
      options: [
        'His clearest sight of the good comes as he falls.',
        'He does not really know what the good is at all.',
        'He sinks because no one warned him until too late.',
        'He prefers the mire, and chooses it over the good.'
      ],
      answer: 0,
      right: { label: 'INSIGHT', body: 'Weakness fails to reach the good. He sees it most clearly at the moment he sinks.' },
      wrong: { body: 'He is “most conscious” of the good at the very moments he falls. Ignorance and preference both miss that.' }
    },

    { type: 'question', id: 'c04', scored: true, kind: 'choice', label: 'SELF-KNOWLEDGE',
      concepts: ['SELF-KNOWLEDGE', 'INERTIA'],
      quotes: [{ text: 'It ended by my almost believing (perhaps actually believing) that this was perhaps my normal condition.', src: 'PART I · II' }],
      prompt: ['By his account, what does calling it “normal” do?'],
      options: [
        'It cures him, since what is normal is healthy.',
        'It excuses him, at least in his reader’s eyes.',
        'It shows he never struggled against it at all.',
        'It ends the fight: what is normal needs none.'
      ],
      answer: 3,
      right: { label: 'THAT’S THE DISTINCTION', body: 'A diagnosis becomes a surrender: “all desire in me to struggle against this depravity passed.”' },
      wrong: { body: 'He did struggle — “what agonies I endured” — until naming it normal ended the fight.' }
    },

    { type: 'question', id: 'c05', scored: true, kind: 'choice', label: 'CLAIM',
      concepts: ['DEGRADATION', 'SHAME'],
      quotes: [{ text: 'the enjoyment was just from the too intense consciousness of one’s own degradation', src: 'PART I · II' }],
      prompt: ['Where exactly is the enjoyment?'],
      options: [
        'In knowing he is degraded, and cannot change.',
        'In the degrading acts themselves, as pleasures.',
        'In the secrecy of acts that no one else knows.',
        'In the hope that confessing will absolve him.'
      ],
      answer: 0,
      right: { label: 'INSIGHT', body: 'Not the act but the awareness: degradation seen whole, and seen as final.' },
      wrong: { body: 'He locates it in consciousness — of having reached “the last barrier” — not in the acts.' }
    },

    { type: 'question', id: 'c06', scored: true, kind: 'choice', label: 'COUNTER',
      concepts: ['SELF-KNOWLEDGE', 'CONSCIOUSNESS'],
      quotes: [{ text: 'one is not to blame in being a scoundrel; as though that were any consolation to the scoundrel', src: 'PART I · II' }],
      prompt: ['In this sentence, what does he do with the excuse consciousness offers?'],
      options: [
        'He accepts it: the laws of consciousness excuse him.',
        'He rejects it and insists he is fully to blame.',
        'He grants it, then shows it consoles no one.',
        'He refuses even to consider it.'
      ],
      answer: 2,
      right: { label: 'YOU CAUGHT THE LOOPHOLE', body: 'Consciousness can excuse him — and knows the excuse is worthless.' },
      wrong: { body: 'He states the excuse in full, then empties it in the same breath.' }
    },

    { type: 'interrupt', id: 'i1',
      line: 'You think I am explaining myself. Or am I excusing myself? Can you tell?',
      responses: [
        { text: 'YOU ARE EXCUSING YOURSELF.', reply: 'And if I say so first, does that excuse me too?',
          aside: 'He absorbs every accusation by making it himself.' },
        { text: 'YOU ARE EXPLAINING YOURSELF.', reply: 'How generous. And how convenient for me.',
          aside: 'Taking the analysis at face value lets him off.' },
        { text: 'BOTH — THAT IS THE PROBLEM.', reply: 'Hm. Then what would you have me do?', best: true,
          aside: 'Insight and excuse can be the same sentence.' }
      ]
    },

    { type: 'rise', to: -76 },

    /* ─────────────────────────── ACT III — THE MOUSE ─────────────────────────── */
    { type: 'act', act: 3 },

    { type: 'question', id: 'c07', scored: true, kind: 'choice', label: 'CONTRAST',
      concepts: ['MOTIVE', 'CONSCIOUSNESS'],
      quotes: [{ text: 'through his innate stupidity the latter looks upon his revenge as justice pure and simple; while in consequence of his acute consciousness the mouse does not believe in the justice of it.', src: 'PART I · III' }],
      prompt: ['What does the man of action have that the mouse lacks?'],
      options: [
        'Stronger feelings of injury and rage.',
        'A reason he can stop at, and act on.',
        'A better claim to justice in the matter.',
        'Less fear of what revenge might cost.'
      ],
      answer: 1,
      right: { label: 'INSIGHT', body: 'Not stronger feeling — the mouse has more spite. A belief firm enough to act from.' },
      wrong: { body: 'The mouse’s spite is greater, and neither has justice on his side. The man of action simply believes in his reason.' }
    },

    { type: 'question', id: 'c08', scored: true, kind: 'sequence', label: 'SEQUENCE',
      concepts: ['INERTIA', 'SHAME'],
      prompt: ['Build the mouse’s course, as chapter III tells it.'],
      hint: 'Tap the steps in order. Tap a step to take it back.',
      tiles: ['RETREAT INTO THE HOLE', 'INSULT', 'FORTY YEARS OF REMEMBERING', 'DOUBTS AND QUESTIONS'],
      answer: [1, 3, 0, 2],
      right: { label: 'YES' },
      wrong: { body: 'Insult; a brew of doubts; retreat, “with a smile of assumed contempt”; then forty years of remembering.' },
      quote: { text: 'For forty years together it will remember its injury down to the smallest, most ignominious details', src: 'PART I · III' }
    },

    { type: 'question', id: 'c09', scored: true, kind: 'choice', label: 'CLAIM',
      concepts: ['MOTIVE', 'INERTIA'],
      quotes: [{ text: 'adds to the one question so many unsettled questions that there inevitably works up around it a sort of fatal brew', src: 'PART I · III' }],
      prompt: ['Why does the mouse never strike?'],
      options: [
        'It is far too weak to hurt its enemy at all.',
        'It forgives the insult once it has reflected.',
        'It is waiting for the perfect moment to strike.',
        'Questions multiply; no motive survives them.'
      ],
      answer: 3,
      right: { label: 'THE SYSTEM BREAKS HERE', body: 'The one question multiplies until there is nothing simple left to act on.' },
      wrong: { body: 'It neither forgives nor waits: the questions multiply until the deed has no ground.' }
    },

    { type: 'question', id: 'c10', scored: true, kind: 'choice', label: 'CLAIM',
      concepts: ['CONSCIOUSNESS', 'SELF-KNOWLEDGE'],
      quotes: [{ text: 'For them a wall is not an evasion, as for us people who think and consequently do nothing; it is not an excuse for turning aside, an excuse for which we are always very glad', src: 'PART I · III' }],
      prompt: ['What does the wall become for the man who thinks?'],
      options: [
        'A comfort, as it is for the man of action.',
        'A challenge he feels bound to break through.',
        'Proof that action really is impossible for him.',
        'An excuse not to act that he is glad to find.'
      ],
      answer: 3,
      right: { label: 'YOU CAUGHT THE LOOPHOLE', body: 'Consciousness as excuse: he welcomes the wall, though he “scarcely” believes in it.' },
      wrong: { body: 'For him the wall is an evasion — welcome, and not quite believed.' }
    },

    { type: 'found', title: 'THE MOUSE', line: 'It feels more than the man of action — and can do less.' },

    /* ─────────────────────────── ACT IV — NO FIRST CAUSE ─────────────────────────── */
    { type: 'act', act: 4 },

    { type: 'question', id: 'c11', scored: true, kind: 'choice', label: 'CLAIM',
      concepts: ['MOTIVE'],
      quotes: [{ text: 'with me every primary cause at once draws after itself another still more primary, and so on to infinity.', src: 'PART I · V' }],
      prompt: ['Why does this stop him from acting?'],
      options: [
        'He cannot find any causes for acting at all.',
        'He is too idle to follow the causes through.',
        'Acting needs a stopping point he cannot reach.',
        'Each cause he finds turns out, on reflection, false.'
      ],
      answer: 2,
      right: { label: 'INSIGHT', body: 'Every reason has a reason behind it. Without a last one, there is no first move.' },
      wrong: { body: 'He finds causes endlessly — that is the trouble. None is final enough to act on.' }
    },

    { type: 'question', id: 'c12', scored: true, kind: 'choice', label: 'CONTRAST',
      concepts: ['MOTIVE', 'CONSCIOUSNESS'],
      quotes: [{ text: 'in consequence of their limitation they take immediate and secondary causes for primary ones', src: 'PART I · V' }],
      prompt: ['On this account, what is the direct man’s advantage?'],
      options: [
        'He sees the true first causes more clearly than others.',
        'He acts on instinct, with no causes at all.',
        'He is simply braver than the conscious man.',
        'A useful error: he stops at a near cause as final.'
      ],
      answer: 3,
      right: { label: 'THAT’S THE DISTINCTION', body: 'Action runs on a mistake the conscious man can no longer make.' },
      wrong: { body: 'He has causes — the wrong ones, held as final. His limitation is his engine.' }
    },

    { type: 'question', id: 'c13', scored: true, kind: 'choice', label: 'CLAIM',
      concepts: ['MOTIVE', 'INERTIA'],
      quotes: [{ text: 'anger in me is subject to chemical disintegration.', src: 'PART I · V' }],
      prompt: ['What does this do to spite as a motive?'],
      options: [
        'It makes his anger sudden and explosive.',
        'It proves that he feels nothing at all.',
        'It turns his spite into a sense of justice.',
        'Even spite dissolves once he examines it.'
      ],
      answer: 3,
      right: { label: 'INSIGHT', body: 'Spite was his last substitute for a first cause. Consciousness dissolves that too.' },
      wrong: { body: 'He feels anger; it does not survive inspection. “the object flies off into air.”' }
    },

    { type: 'question', id: 'c14', scored: true, kind: 'multi', label: 'MULTISELECT',
      concepts: ['INERTIA', 'SELF-KNOWLEDGE'],
      prompt: ['Across chapters II–V, what does acute consciousness do to him?'],
      hint: 'Select all that apply.',
      options: [
        'Dissolves the motives he might act on.',
        'Turns his degradation into a pleasure.',
        'Gives him the certainty action needs.',
        'Supplies excuses he half believes.',
        'Frees him to change, once he understands.'
      ],
      answer: [0, 1, 3],
      right: { label: 'YES', body: 'It dissolves, sweetens and excuses. It never delivers certainty or change.' },
      wrong: { body: 'Three are true together. Certainty and change are exactly what it withholds.' }
    },

    { type: 'beat', lines: ['KNOWING THE TRAP', 'IS NOT LEAVING IT.'], full: true },

    { type: 'rise', to: -73 },

    /* ─────────────────────────── ACT V — THE SLUGGARD ─────────────────────────── */
    { type: 'act', act: 5 },

    { type: 'question', id: 'c15', scored: true, kind: 'choice', label: 'CLAIM',
      concepts: ['SELF-KNOWLEDGE', 'INERTIA'],
      quotes: [{ text: 'if I had done nothing simply from laziness! Heavens, how I should have respected myself, then.', src: 'PART I · VI' }],
      prompt: ['Why would laziness be better than his inertia?'],
      options: [
        'Laziness is pleasant, while his inertia is painful.',
        'Laziness would define him; inertia defines nothing.',
        'Laziness is honest; his inertia is a pose.',
        'Laziness could be cured; his inertia cannot.'
      ],
      answer: 1,
      right: { label: 'INSIGHT', body: 'A sluggard is something. He wants to be “positively defined.”' },
      wrong: { body: 'He wants a quality he could believe in — “something to say about me.”' },
      quote: { text: 'It would mean that I was positively defined, it would mean that there was something to say about me.', src: 'PART I · VI' }
    },

    { type: 'question', id: 'c16', scored: true, kind: 'choice', label: 'CLAIM',
      concepts: ['SELF-KNOWLEDGE', 'SHAME'],
      quotes: [{ text: 'He died, not simply with a tranquil, but with a triumphant conscience, and he was quite right, too.', src: 'PART I · VI' }],
      prompt: ['He is describing a connoisseur of Lafitte. What does he envy?'],
      options: [
        'The wealth to indulge himself in fine wine.',
        'The admiration that good taste can win.',
        'One quality he believed in without doubt.',
        'A life of doing nothing, and being happy.'
      ],
      answer: 2,
      right: { label: 'YES', body: 'The connoisseur had one settled answer to “What is he?” — and never questioned it.' },
      wrong: { body: 'The envy is not for wine or wealth: he “never doubted himself.”' }
    },

    { type: 'interrupt', id: 'i2',
      line: 'You call it paralysis. I call it honesty. Which of us is flattering me?',
      responses: [
        { text: 'HONESTY, THEN.', reply: 'Thank you. You may go.',
          aside: 'You accepted his flattering name for it.' },
        { text: 'IT CAN BE BOTH.', reply: 'Worse: it usually is.', best: true,
          aside: 'Honest paralysis is still paralysis.' },
        { text: 'PARALYSIS, THEN.', reply: 'And you, of course, act without a doubt. Congratulations.',
          aside: 'He turns the diagnosis back on the diagnostician.' }
      ]
    },

    /* ─────────────────────────── ACT VI — CONSCIOUS INERTIA ─────────────────────────── */
    { type: 'act', act: 6 },

    { type: 'question', id: 'c17', scored: true, kind: 'choice', label: 'DISTINCTION',
      concepts: ['INERTIA', 'CONSCIOUSNESS'],
      quotes: [{ text: 'Better conscious inertia! And so hurrah for underground!', src: 'PART I · XI' }],
      prompt: ['What does “conscious” add to “inertia”?'],
      options: [
        'He sees himself not acting, clearly.',
        'The inertia is chosen, and therefore free.',
        'The inertia will end once it is understood.',
        'He is unaware of his own inaction.'
      ],
      answer: 0,
      right: { label: 'THAT’S THE DISTINCTION', body: 'Not unaware, not free: stalled, and seeing it.' },
      wrong: { body: 'Being conscious of inertia neither makes it free nor ends it. It only makes it visible.' }
    },

    { type: 'question', id: 'c18', scored: true, kind: 'choice', label: 'CLAIM',
      concepts: ['CONSCIOUSNESS', 'SELF-KNOWLEDGE'],
      quotes: [{ text: 'Though I have said that I envy the normal man to the last drop of my bile, yet I should not care to be in his place such as he is now', src: 'PART I · XI' }],
      prompt: ['Which reason fits both this passage and chapter IX?'],
      options: [
        'He would lose consciousness, which he prizes.',
        'The normal man is secretly unhappy as well.',
        'He despises the normal man’s plain stupidity.',
        'He fears what finally becomes of the normal man.'
      ],
      answer: 0,
      right: { label: 'INSIGHT', body: 'Consciousness is his misfortune and his possession. He will not trade it.' },
      wrong: { body: 'Chapter IX supplies the reason: man “prizes” consciousness and “would not give it up.”' }
    },

    { type: 'question', id: 'c19', scored: true, kind: 'choice', label: 'CONTRADICTION',
      concepts: ['INERTIA', 'SELF-KNOWLEDGE'],
      quotes: [{ text: 'I am lying because I know myself that it is not underground that is better, but something different, quite different, for which I am thirsting, but which I cannot find!', src: 'PART I · XI' }],
      prompt: ['What does this admission change?'],
      options: [
        'He has found what he wants, and is hiding it from us.',
        'The underground is where he stopped, not his ideal.',
        'He no longer believes in anything at all.',
        'He is ready, at last, to leave the underground.'
      ],
      answer: 1,
      right: { label: 'YES', body: 'Conscious inertia was a stopping place, not a destination. The thirst remains.' },
      wrong: { body: 'He cannot find what he thirsts for, and does not leave. The underground is where the search stalled.' }
    },

    { type: 'question', id: 'c20', scored: true, kind: 'choice', label: 'FINAL SURFACE CHECK', final: true,
      concepts: ['CONSCIOUSNESS', 'MOTIVE'],
      prompt: ['Why can’t he act? Which answer fits the whole chamber?'],
      options: [
        'His consciousness dissolves each motive it examines.',
        'He is too proud to try, and hides it in theory.',
        'He has concluded, rightly, that action is pointless.',
        'He lacks the courage that simpler men possess.'
      ],
      answer: 0,
      coda: ['He sees more,', 'and therefore acts less.'],
      right: { label: 'INSIGHT' },
      wrong: { body: 'Not cowardice or pride, and no settled conclusion: reflection keeps removing the ground he would act from.' }
    },

    { type: 'rise', from: -79, to: -67, final: true },

    { type: 'clear' }
  ],

  review: [
    { id: 'r-ill', concept: 'CONSCIOUSNESS', sources: ['c01', 'c02', 'c03'],
      variants: [
        { prompt: ['A doctor tells him: “Think less, and you’ll be well.” Why would he find that absurd?'],
          options: [
            'Doctors understand nothing of the mind.',
            'He enjoys his illness too much to stop.',
            'Thinking less would make him a fool.',
            'Trying to think less is more thinking.'
          ],
          answer: 3,
          right: 'Consciousness cannot be willed away; the effort is more consciousness.',
          wrong: 'The prescription feeds the illness: resolving to think less is another act of reflection.' }
      ] },

    { id: 'r-pleasure', concept: 'DEGRADATION', sources: ['c04', 'c05', 'c06'],
      variants: [
        { quotes: [{ text: 'in despair there are the most intense enjoyments, especially when one is very acutely conscious of the hopelessness of one’s position.', src: 'PART I · II' }],
          prompt: ['What does the enjoyment require?'],
          options: [
            'Hope that things may still improve for him.',
            'An audience to witness the despair.',
            'Hopelessness, clearly and fully seen.',
            'Forgetting how the despair began.'
          ],
          answer: 2,
          right: 'The pleasure grows with clarity about the hopelessness.',
          wrong: 'Hope and forgetting would weaken it. The enjoyment needs a hopelessness seen whole.' }
      ] },

    { id: 'r-mouse', concept: 'SHAME', sources: ['c07', 'c08', 'c09', 'c10'],
      variants: [
        { quotes: [{ text: 'while he, I daresay, will not even scratch himself.', src: 'PART I · III' }],
          prompt: ['What does this say about the mouse’s eventual revenge?'],
          options: [
            'It barely touches its target.',
            'It is finally just and complete.',
            'It frightens its enemy for years.',
            'It ends the mouse’s humiliation.'
          ],
          answer: 0,
          right: 'The mouse suffers “a hundred times more” than the one it punishes.',
          wrong: 'Its revenge is trivial and self-wounding; the enemy hardly notices.' }
      ] },

    { id: 'r-cause', concept: 'MOTIVE', sources: ['c11', 'c12', 'c13', 'c14'],
      variants: [
        { prompt: ['A friend who never doubts strikes back instantly at any insult. How would the Underground Man describe him?'],
          options: [
            'Acting freely, as he himself cannot.',
            'Mistaking a near cause for a final one.',
            'Seeing the true cause more clearly.',
            'Feeling the insult more deeply than he does.'
          ],
          answer: 1,
          right: 'The friend’s certainty rests on stopping early — a limitation that works.',
          wrong: 'The friend neither sees more nor feels more. He stops at the first cause and treats it as last.' }
      ] },

    { id: 'r-define', concept: 'SELF-KNOWLEDGE', sources: ['c15', 'c16'],
      variants: [
        { quotes: [{ text: 'Question: What is he? Answer: A sluggard; how very pleasant it would have been to hear that of oneself!', src: 'PART I · VI' }],
          prompt: ['What does he long for here?'],
          options: [
            'To be praised, at last, for doing nothing.',
            'To rest, after years of effort.',
            'To be definable: one settled answer.',
            'To be understood by his readers.'
          ],
          answer: 2,
          right: 'Any definite answer would do — even “sluggard.”',
          wrong: 'He wants a label that holds, not rest or praise.' }
      ] },

    { id: 'r-inert', concept: 'INERTIA', sources: ['c17', 'c18', 'c19', 'c20'],
      variants: [
        { prompt: ['Someone says: “Now that he understands his inertia, he can overcome it.” What does the chamber show against this?'],
          options: [
            'He does not really understand his own inertia at all.',
            'Understanding is part of what produces the inertia.',
            'Inertia is a physical illness, not a mental one.',
            'He could overcome it, but chooses not to.'
          ],
          answer: 1,
          right: 'More understanding means more causes behind causes — and less ground to act on.',
          wrong: 'He understands it very well. That is the point: understanding does not become action.' }
      ] }
  ]
});
