/*
  LIZA — chamber 07.
  Core problem: can he meet another person without a hierarchy?
  Part II as a test of Part I: the man who argued for freedom meets someone
  whose freedom he can bend. Liza is read as a person — her "Yes!", her
  letter, her embrace, the note she leaves — not as a device in his story.
*/
UNDERGROUND.register('liza', {
  contentVersion: 1,

  concepts: ['RESCUE', 'BOOKISHNESS', 'POWER', 'RECOGNITION', 'LOVE AS RULE', 'THE NOTE'],

  acts: {
    1: 'ACT I — TWO WIDE OPEN EYES',
    2: 'ACT II — LIKE A BOOK',
    3: 'ACT III — MY CREATION',
    4: 'ACT IV — PARTS CHANGED',
    5: 'ACT V — THE NOTE ON THE TABLE',
    6: 'ACT VI — THE SNOW'
  },
  moods: { 1: 'warm', 2: 'warm', 3: 'warm', 4: 'warm', 5: 'warm', 6: 'warm' },

  found: {
    lines: ['He could not meet her', 'except from above or below.']
  },

  steps: [
    /* ─────────────────────────── ACT I — TWO WIDE OPEN EYES ───────────────────────────
       a rescue script → a person with her own thoughts → feeling and cunning together */
    { type: 'act', act: 1 },

    { type: 'concept', title: 'PART II',
      body: [
        'Part I argues about freedom.',
        'Part II puts the arguer in a room with another person, and watches what he does with her freedom.'
      ],
      note: 'Reading Part II as a test of Part I is an interpretation — a common one — not something the novel announces.'
    },

    { type: 'question', id: 'l01', scored: true, kind: 'choice', label: 'FRAME',
      concepts: ['RESCUE'],
      quotes: [{ text: 'When from dark error’s subjugation My words of passionate exhortation Had wrenched thy fainting spirit free', src: 'PART II · EPIGRAPH' }],
      prompt: ['Part II opens with Nekrasov’s rescue of a fallen woman. What does the story do with that script?'],
      options: [
        'It turns the rescuer into the one exposed.',
        'It illustrates the poem, scene by scene.',
        'It sets the poem aside and never returns.',
        'It mocks the poem’s rhymes as clumsy verse.'
      ],
      answer: 0,
      right: { label: 'INSIGHT', body: 'The “passionate exhortation” happens — and becomes the instrument of the harm.' },
      wrong: { body: 'The poem returns in his speech, his dream, his shame. The rescue plot is replayed and turned against the rescuer.' }
    },

    { type: 'question', id: 'l02', scored: true, kind: 'choice', label: 'CLAIM',
      concepts: ['RECOGNITION'],
      quotes: [{ text: 'I had not said a single word to this creature, and had, in fact, considered it utterly superfluous', src: 'PART II · VI' }],
      prompt: ['What does “this creature” show at the start?'],
      options: [
        'He is afraid of her and hides it with scorn.',
        'He pities her too much to find the words.',
        'He is being gently affectionate with her.',
        'He has not yet met her as a person.'
      ],
      answer: 3,
      right: { label: 'INSIGHT', body: 'Two hours, no words, “utterly superfluous.” She is not yet someone to him.' },
      wrong: { body: 'Not fear or pity: silence seemed superfluous. The chapter begins with a person unrecognised.' }
    },

    { type: 'question', id: 'l03', scored: true, kind: 'choice', label: 'RECOGNITION',
      concepts: ['RECOGNITION'],
      quotes: [
        { text: 'Is that loving? Is that how one human being should meet another? It’s hideous, that’s what it is!', src: 'PART II · VI' },
        { text: 'So she, too, was capable of certain thoughts?', src: 'PART II · VI' }
      ],
      prompt: ['She answers at once: “Yes!” What does her promptness reveal?'],
      options: [
        'She says what a customer wants to hear.',
        'She hopes to be paid a little more for agreeing.',
        'His eloquence has already converted her.',
        'She had been thinking it before he spoke.'
      ],
      answer: 3,
      right: { label: 'YOU CAUGHT THE LOOPHOLE', body: 'He is astonished she can think. The reader should not be: she got there first.' },
      wrong: { body: 'The speed is the point: “the same thought may have been straying through her mind.” She is not his echo.' }
    },

    { type: 'question', id: 'l04', scored: true, kind: 'choice', label: 'MOTIVE',
      concepts: ['POWER', 'BOOKISHNESS'],
      quotes: [
        { text: 'I swear she really did interest me.', src: 'PART II · VI' },
        { text: 'And cunning so easily goes hand-in-hand with feeling.', src: 'PART II · VI' }
      ],
      prompt: ['Was his speech to her sincere, or a manipulation?'],
      options: [
        'Sincere: he felt every single word.',
        'A manipulation: he felt none of it.',
        'Both: feeling and cunning ran together.',
        'Neither: he was far too drunk to mean any of it.'
      ],
      answer: 2,
      right: { label: 'THAT’S THE DISTINCTION', body: 'Sincerity is no protection. Real feeling can be used as a lever.' },
      wrong: { body: 'He claims real interest and admits cunning in one breath. The danger is that both are true.' }
    },

    /* ─────────────────────────── ACT II — LIKE A BOOK ───────────────────────────
       her irony → his bookishness as a tool → an invented picture → her letter */
    { type: 'act', act: 2 },

    { type: 'question', id: 'l05', scored: true, kind: 'choice', label: 'CLAIM',
      concepts: ['BOOKISHNESS', 'RECOGNITION'],
      quotes: [{ text: '‘Why, you ... speak somehow like a book,’ she said, and again there was a note of irony in her voice.', src: 'PART II · VI' }],
      prompt: ['By his own later account, what was her irony?'],
      options: [
        'Contempt for an educated man’s airs.',
        'A shield for feelings he had invaded.',
        'A joke meant to lighten a grim mood.',
        'Proof that she had not been listening.'
      ],
      answer: 1,
      right: { label: 'INSIGHT', body: 'Irony as “the last refuge” of the modest when the soul is intruded on. He saw it only later.' },
      wrong: { body: 'He later writes that she was hiding her feelings under irony. At the time he heard only an insult.' }
    },

    { type: 'question', id: 'l06', scored: true, kind: 'choice', label: 'CLAIM',
      concepts: ['BOOKISHNESS', 'POWER'],
      quotes: [{ text: 'I knew I was speaking stiffly, artificially, even bookishly, in fact, I could not speak except ‘like a book.’ But that did not trouble me', src: 'PART II · VII' }],
      prompt: ['Does knowing his speech is bookish stop him?'],
      options: [
        'Yes: he falls silent once he notices.',
        'Yes: he changes to plain, honest words.',
        'No: he never notices it until the end.',
        'No: he uses the bookishness as a tool.'
      ],
      answer: 3,
      right: { label: 'INSIGHT', body: 'Part I again: knowing is not stopping. He thinks the bookishness “might be an assistance.”' },
      wrong: { body: 'He knows, and it “did not trouble” him. Awareness becomes technique.' }
    },

    { type: 'question', id: 'l07', scored: true, kind: 'choice', label: 'DIAGNOSIS',
      concepts: ['BOOKISHNESS', 'POWER'],
      quotes: [
        { text: 'A great deal of this was my invention.', src: 'PART II · VI' },
        { text: 'It was the exercise of my skill that carried me away; yet it was not merely sport', src: 'PART II · VII' }
      ],
      prompt: ['Which is true of his picture of her future?'],
      options: [
        'Accurate detail, told without any feeling.',
        'Invented detail, which she sees through.',
        'Invented detail, with real effect on her.',
        'Accurate detail, which leaves her unmoved.'
      ],
      answer: 2,
      right: { label: 'THAT’S THE DISTINCTION', body: 'The coffin and the grave are partly fiction. Her sobbing is not.' },
      wrong: { body: 'He admits the invention, and she is torn apart by it. Fiction, real wound.' }
    },

    { type: 'question', id: 'l08', scored: true, kind: 'choice', label: 'RECOGNITION',
      concepts: ['RECOGNITION'],
      quotes: [{ text: 'she did not want me to go away without knowing that she, too, was honestly and genuinely loved; that she, too, was addressed respectfully.', src: 'PART II · VII' }],
      prompt: ['Why does she show him the student’s letter?'],
      options: [
        'To make him jealous of a younger rival.',
        'To ask his advice about a marriage offer.',
        'To be seen as someone loved, not bought.',
        'To prove to him that she can read well.'
      ],
      answer: 2,
      right: { label: 'INSIGHT', body: 'She answers his speech with evidence of her own dignity. The letter is hers, not his.' },
      wrong: { body: 'No rivalry, no request: she wants him to know she was “addressed respectfully.”' }
    },

    { type: 'interrupt', id: 'i1',
      line: 'You think I used her. I also meant every word. Choose one, if you can.',
      responses: [
        { text: 'YOU USED HER.', reply: 'And the lump in my throat? Was that used too?',
          aside: 'The text gives both: real feeling and the pleasure of power.' },
        { text: 'YOU MEANT IT.', reply: 'How kind. She would disagree, by chapter nine.',
          aside: 'Meaning it did not stop him from wielding it.' },
        { text: 'BOTH. THAT IS WORSE.', reply: 'Worse? It is merely honest.', best: true,
          aside: 'Sincerity became the instrument.' }
      ]
    },

    { type: 'rise', to: -16 },

    /* ─────────────────────────── ACT III — MY CREATION ───────────────────────────
       the saviour’s dream: rescue as authorship */
    { type: 'act', act: 3 },

    { type: 'question', id: 'l09', scored: true, kind: 'choice', label: 'DIAGNOSIS',
      concepts: ['RESCUE', 'LOVE AS RULE'],
      quotes: [
        { text: 'because it would be tyranny ... it would be indelicate', src: 'PART II · VIII' },
        { text: 'now you are mine, you are my creation, you are pure, you are good, you are my noble wife.', src: 'PART II · VIII' }
      ],
      prompt: ['In his dream he refuses “tyranny” — then calls her his creation. What does this show?'],
      options: [
        'He rejects all power over her for good.',
        'He is quoting George Sand in earnest.',
        'He hopes she will one day rescue him.',
        'He names the danger, then enacts it.'
      ],
      answer: 3,
      right: { label: 'YOU CAUGHT THE LOOPHOLE', body: 'Even his scruple is a scene he directs. The rescued woman ends as his work.' },
      wrong: { body: 'The disclaimer is a flourish “a la George Sand.” The dream ends in possession: “you are mine.”' }
    },

    { type: 'question', id: 'l10', scored: true, kind: 'choice', label: 'MOTIVE',
      concepts: ['POWER', 'BOOKISHNESS'],
      quotes: [{ text: 'how little of the idyllic (and affectedly, bookishly, artificially idyllic too) had sufficed to turn a whole human life at once according to my will.', src: 'PART II · VIII' }],
      prompt: ['What pleases him, looking back on the night?'],
      options: [
        'That she will now leave the house at last.',
        'That his words alone could bend her life.',
        'That his speech was original and true.',
        'That she will soon forget the whole night.'
      ],
      answer: 1,
      right: { label: 'INSIGHT', body: 'The freedom he defended in Part I, exercised “according to my will” on someone else.' },
      wrong: { body: 'He calls the words artificial. What delights him is their power over “a whole human life.”' }
    },

    { type: 'found', title: 'RESCUE AS RULE', line: 'To save her, in his dream, is to make her his.' },

    { type: 'rise', to: -13 },

    /* ─────────────────────────── ACT IV — PARTS CHANGED ───────────────────────────
       she sees him → he passes humiliation down → she understands → shame becomes mastery */
    { type: 'act', act: 4 },

    { type: 'question', id: 'l11', scored: true, kind: 'choice', label: 'MOTIVE',
      concepts: ['POWER'],
      quotes: [{ text: 'and I dimly felt that I should make her pay dearly for ALL THIS.', src: 'PART II · IX' }],
      prompt: ['She finds him in his torn dressing-gown. What will she pay for?'],
      options: [
        'Coming to his flat without an invitation.',
        'Seeing him as he really lives.',
        'Refusing his offer of tea.',
        'Owing money to her madam.'
      ],
      answer: 1,
      right: { label: 'INSIGHT', body: 'Her only offence is to have seen. He cannot be the hero and be seen.' },
      wrong: { body: 'He gave her his address. Her crime is witnessing the dressing-gown, Apollon, the tears.' }
    },

    { type: 'question', id: 'l12', scored: true, kind: 'choice', label: 'CLAIM',
      concepts: ['POWER'],
      quotes: [{ text: 'I had been humiliated, so I wanted to humiliate; I had been treated like a rag, so I wanted to show my power', src: 'PART II · IX' }],
      prompt: ['What pattern does he confess?'],
      options: [
        'Revenge on the officer who had wronged him.',
        'Teaching her the truth about what men are.',
        'Passing his humiliation down to the weaker.',
        'Testing whether her feelings were genuine.'
      ],
      answer: 2,
      right: { label: 'INSIGHT', body: 'He could not reach the officer. She was below him, and within reach.' },
      wrong: { body: 'He says he failed to find the officer. Humiliation flows down the ladder to her.' }
    },

    { type: 'question', id: 'l13', scored: true, kind: 'choice', label: 'RECOGNITION',
      concepts: ['RECOGNITION'],
      quotes: [{ text: 'Liza, insulted and crushed by me, understood a great deal more than I imagined.', src: 'PART II · IX' }],
      prompt: ['What does this sentence concede about her?'],
      options: [
        'She has learned to flatter unhappy men.',
        'She reads him better than he reads her.',
        'She understands only what he explains.',
        'She is too crushed to understand at all.'
      ],
      answer: 1,
      right: { label: 'INSIGHT', body: 'The man who reads everything “from books” is read by the woman he lectured.' },
      wrong: { body: 'He admits she “understood a great deal more” than he imagined — without his explanation.' }
    },

    { type: 'question', id: 'l14', scored: true, kind: 'multi', label: 'MULTISELECT',
      concepts: ['RECOGNITION', 'LOVE AS RULE'],
      prompt: ['After his tirade in chapter IX, what does Liza do?'],
      hint: 'Select all that apply.',
      options: [
        'Holds out her hands to him.',
        'Answers his insults with insults.',
        'Throws her arms round him and weeps.',
        'Leaves at once, in open disgust.',
        'Sees that he is himself unhappy.'
      ],
      answer: [0, 2, 4],
      right: { label: 'YES', body: 'She answers cruelty with understanding. He is the one who cannot answer her.' },
      wrong: { body: 'She neither retaliates nor leaves. She sees his misery, reaches out, and embraces him.' },
      quote: { text: 'She suddenly leapt up from her chair with an irresistible impulse and held out her hands, yearning towards me', src: 'PART II · IX' }
    },

    { type: 'question', id: 'l15', scored: true, kind: 'choice', label: 'DIAGNOSIS',
      concepts: ['POWER', 'LOVE AS RULE'],
      quotes: [{ text: 'it was just because I was ashamed to look at her that another feeling was suddenly kindled and flamed up in my heart ... a feeling of mastery and possession.', src: 'PART II · IX' }],
      prompt: ['Why does shame turn into mastery?'],
      options: [
        'Ruling is his escape from being seen.',
        'Love, freed at last from his pride.',
        'Desire, unconnected to the scene.',
        'Gratitude he is unable to put into words.'
      ],
      answer: 0,
      right: { label: 'INSIGHT', body: 'Equal, he is exposed. Above her, he is safe. The embrace becomes “an act of vengeance.”' },
      wrong: { body: 'He ties it directly to shame: because he could not look at her, he had to master her.' }
    },

    { type: 'interrupt', id: 'i2',
      line: 'She embraced me. Do not tell me she won. Nobody won.',
      responses: [
        { text: 'SHE WAS NOT PLAYING.', reply: 'That is precisely what I could not forgive.', best: true,
          aside: 'She was never in the contest he imagines.' },
        { text: 'THEN YOU BOTH LOST.', reply: 'Put it in a formula, then.',
          aside: 'Framing it as a game is still his frame.' },
        { text: 'YOU WON.', reply: 'Then why am I still writing about it?',
          aside: 'Domination is not victory. Fifteen years later, the memory still has him.' }
      ]
    },

    { type: 'rise', to: -10 },

    /* ─────────────────────────── ACT V — THE NOTE ON THE TABLE ───────────────────────────
       love as tyranny → what she came for → the money → her answer */
    { type: 'act', act: 5 },

    { type: 'question', id: 'l16', scored: true, kind: 'choice', label: 'CLAIM',
      concepts: ['LOVE AS RULE'],
      quotes: [
        { text: 'with me loving meant tyrannising and showing my moral superiority.', src: 'PART II · X' },
        { text: 'freely given by the beloved object', src: 'PART II · X' }
      ],
      prompt: ['He comes to think love is a right to tyrannise, “freely given.” What does “freely given” do?'],
      options: [
        'It makes love a contract between equals.',
        'It shows he now rejects all domination.',
        'It turns her consent into his licence.',
        'It records a right she actually gave.'
      ],
      answer: 2,
      right: { label: 'YOU CAUGHT THE LOOPHOLE', body: 'Her freedom survives only as the act of handing it over. Part I’s value, spent on his rule.' },
      wrong: { body: 'Nothing equal and nothing given: he imagines her free choice as the source of his power over her.' }
    },

    { type: 'question', id: 'l17', scored: true, kind: 'choice', label: 'RECOGNITION',
      concepts: ['RECOGNITION', 'LOVE AS RULE'],
      quotes: [{ text: 'did not even guess that she had come not to hear fine sentiments, but to love me', src: 'PART II · X' }],
      prompt: ['What had he misread about her visit?'],
      options: [
        'She came to love him, not to be taught.',
        'She came for his money, not for his words.',
        'She came to be lectured on her life.',
        'She came to be rescued from her debts.'
      ],
      answer: 0,
      right: { label: 'INSIGHT', body: 'He prepared a sermon or an insult. She brought love, and he had no role for it.' },
      wrong: { body: 'He accused her of coming for “fine sentiments.” She had come “to love me.”' }
    },

    { type: 'question', id: 'l18', scored: true, kind: 'choice', label: 'DIAGNOSIS',
      concepts: ['THE NOTE', 'POWER'],
      quotes: [{ text: 'though I did that cruel thing purposely, it was not an impulse from the heart, but came from my evil brain.', src: 'PART II · X' }],
      prompt: ['He presses money into her hand. What does the money make of their meeting?'],
      options: [
        'An apology in the only form he has.',
        'A gift to help her leave the house for good.',
        'A loan he expects her to pay back.',
        'A purchase: she is a bought woman again.'
      ],
      answer: 3,
      right: { label: 'INSIGHT', body: 'Five roubles cancel the evening. Customer and prostitute: the one relation he can control.' },
      wrong: { body: 'He calls it cruel and purposeful. The money puts her back in the role his speech claimed to free her from.' }
    },

    { type: 'question', id: 'l19', scored: true, kind: 'choice', label: 'RECOGNITION',
      concepts: ['THE NOTE', 'RECOGNITION'],
      quotes: [
        { text: 'So she had managed to fling it from her hand on the table at the moment when I had dashed into the further corner.', src: 'PART II · X' },
        { text: 'I was so lacking in respect for my fellow-creatures that I could not even imagine she would do so.', src: 'PART II · X' }
      ],
      prompt: ['What does the note left on the table say?'],
      options: [
        'She refuses the role it gives her.',
        'She hopes he will follow and plead.',
        'She dropped it in her haste to go.',
        'She thinks five roubles too little.'
      ],
      answer: 0,
      right: { label: 'THAT’S THE DISTINCTION', body: 'Her last act is free, and it is a refusal. She will not be bought — by him.' },
      wrong: { body: 'She “managed to fling it” — deliberately. He admits he could not even imagine her capable of it.' }
    },

    { type: 'rise', to: -8 },

    /* ─────────────────────────── ACT VI — THE SNOW ───────────────────────────
       running after her → the idle question → what Part II answers */
    { type: 'act', act: 6 },

    { type: 'question', id: 'l20', scored: true, kind: 'choice', label: 'MOTIVE',
      concepts: ['LOVE AS RULE', 'RECOGNITION'],
      quotes: [{ text: 'Should I not begin to hate her, perhaps, even tomorrow, just because I had kissed her feet today?', src: 'PART II · X' }],
      prompt: ['He runs after her, then stops at the crossroads. Why?'],
      options: [
        'He foresees remorse turning into rule.',
        'He is too cold and ill to run further.',
        'He decides the student will save her.',
        'He finds that he does not care for her.'
      ],
      answer: 0,
      right: { label: 'INSIGHT', body: 'He knows his own cycle: kneeling today, hating tomorrow. Lucidity again, and again no exit.' },
      wrong: { body: 'His whole breast is “being rent to pieces.” He stops because he can predict what he would do to her.' }
    },

    { type: 'question', id: 'l21', scored: true, kind: 'choice', label: 'DIAGNOSIS',
      concepts: ['LOVE AS RULE'],
      quotes: [{ text: 'which is better—cheap happiness or exalted sufferings?', src: 'PART II · X' }],
      prompt: ['What is wrong with this question as he poses it?'],
      options: [
        'It has an obvious answer: happiness.',
        'It is a riddle borrowed from Scripture.',
        'He answers it with her suffering, not his.',
        'It is meant only as a small joke on the reader.'
      ],
      answer: 2,
      right: { label: 'YOU CAUGHT THE LOOPHOLE', body: 'Her insult is to “purify” her. He decides the value of her pain, and stays pleased with the phrase.' },
      wrong: { body: 'He dreams that resentment “will elevate and purify her.” The exalted suffering is assigned to Liza.' }
    },

    { type: 'question', id: 'l22', scored: true, kind: 'choice', label: 'SYNTHESIS',
      concepts: ['RECOGNITION', 'POWER', 'LOVE AS RULE'],
      prompt: ['Can he meet another person without a hierarchy? What does Part II show?'],
      options: [
        'Yes: the embrace in chapter IX proves it.',
        'No — and Liza shows another way was open.',
        'No, since Part I proved that no one can.',
        'Yes, once the money has settled accounts.'
      ],
      answer: 1,
      coda: ['He could not meet her', 'except from above or below.'],
      right: { label: 'INSIGHT' },
      wrong: { body: 'The embrace turns to mastery, and the money is the insult. But Liza’s love was real: the failure is his, not a law.' }
    },

    { type: 'rise', from: -19, to: -7, final: true },

    { type: 'clear' }
  ],

  review: [
    { id: 'r-meeting', concept: 'RECOGNITION', sources: ['l01', 'l02', 'l03', 'l04'],
      variants: [
        { quotes: [{ text: 'I don’t consult your wishes, but you mine.', src: 'PART II · VII' }],
          prompt: ['He says this to describe her bondage. What else does it describe?'],
          options: [
            'The way he is treating her at that moment.',
            'The student’s respect for her feelings.',
            'The madam’s kindness to her girls.',
            'The equality he hopes they will one day share.'
          ],
          answer: 0,
          right: 'His sermon on her unfreedom is itself an exercise of power over her.',
          wrong: 'The sentence fits the speaker too: he is not consulting her wishes either.' }
      ] },

    { id: 'r-book', concept: 'BOOKISHNESS', sources: ['l05', 'l06', 'l07', 'l08'],
      variants: [
        { quotes: [{ text: 'I was so accustomed to think and imagine everything from books', src: 'PART II · IX' }],
          prompt: ['How does this habit fail him with Liza?'],
          options: [
            'He cannot believe a single word of her story.',
            'He cannot take in what she actually does.',
            'He forgets which book he was quoting.',
            'He reads too slowly to answer in time.'
          ],
          answer: 1,
          right: 'Her real response is not in his script, so he cannot at once take it in.',
          wrong: 'The problem is not doubt or memory: a living person does something he had not written.' }
      ] },

    { id: 'r-dream', concept: 'RESCUE', sources: ['l09', 'l10'],
      variants: [
        { prompt: ['A reader says: “At least his dream of saving her was generous.” Which reply fits chapter VIII?'],
          options: [
            'No: in it she becomes his creation.',
            'Yes: he wants only her own happiness.',
            'No: she has no part to play in the dream.',
            'Yes: he means to go abroad with her.'
          ],
          answer: 0,
          right: 'The dream’s climax is possession: she is “my creation.”',
          wrong: 'She has a part — kneeling and sobbing. The generosity ends in ownership.' }
      ] },

    { id: 'r-reversal', concept: 'POWER', sources: ['l11', 'l12', 'l13', 'l14', 'l15'],
      variants: [
        { quotes: [{ text: 'How I hated her and how I was drawn to her at that minute! The one feeling intensified the other.', src: 'PART II · IX' }],
          prompt: ['Why do hatred and attraction feed each other here?'],
          options: [
            'He cannot tell one feeling from another.',
            'He is too drunk to know what he feels.',
            'Both are only pretence, put on for her.',
            'Both are ways of not being her equal.'
          ],
          answer: 3,
          right: 'Hating and possessing both keep him above her. Meeting her as an equal is what he cannot bear.',
          wrong: 'He is sober and knows both feelings. Each is a way to master her.' }
      ] },

    { id: 'r-love', concept: 'LOVE AS RULE', sources: ['l16', 'l17'],
      variants: [
        { quotes: [{ text: 'Real life oppressed me with its novelty so much that I could hardly breathe.', src: 'PART II · X' }],
          prompt: ['What is the “real life” that oppresses him here?'],
          options: [
            'The noise of the city at evening time.',
            'His work in the office the next morning.',
            'The debts he owes Simonov and Apollon.',
            'A woman who loves him without a script.'
          ],
          answer: 3,
          right: 'Love offered freely is the novelty. He has no form for it except rule.',
          wrong: 'It is Liza, behind the screen, still there. He wants “peace” from her presence.' }
      ] },

    { id: 'r-money', concept: 'THE NOTE', sources: ['l18', 'l19'],
      variants: [
        { quotes: [{ text: 'I opened the door in the passage and began listening. ‘Liza! Liza!’ I cried on the stairs, but in a low voice, not boldly.', src: 'PART II · X' }],
          prompt: ['What does “in a low voice, not boldly” show?'],
          options: [
            'He did not want to wake his servant.',
            'He calls her back, half-hoping to fail.',
            'He was hoarse from shouting at Apollon.',
            'He knew already that she had left.'
          ],
          answer: 1,
          right: 'He runs after her in a way designed not to reach her.',
          wrong: 'Then he calls “more loudly.” The first call is remorse that protects itself.' }
      ] },

    { id: 'r-snow', concept: 'RECOGNITION', sources: ['l20', 'l21', 'l22'],
      variants: [
        { quotes: [{ text: 'I never met Liza again and I have heard nothing of her.', src: 'PART II · X' }],
          prompt: ['Why does it matter that the story gives Liza no ending?'],
          options: [
            'Dostoevsky planned a sequel for her.',
            'Her fate is too dull to be recorded.',
            'Her life goes on beyond his story.',
            'The student’s letter is her ending.'
          ],
          answer: 2,
          right: 'He cannot narrate her to a conclusion. She leaves his book, as she left his room.',
          wrong: 'There is no sequel and no tidy close: she exceeds what he can write about her.' }
      ] }
  ]
});
