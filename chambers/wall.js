/*
  THE WALL — chamber 06.
  Core problem: if your rebellion can itself be predicted, are you free?
  Separates four words the argument tends to run together — IRRATIONAL,
  UNPREDICTABLE, UNDETERMINED, FREELY CHOSEN — and follows the wall from
  nature (chapter III) to the table (VIII), to arithmetic (IX), to himself (X).
*/
UNDERGROUND.register('wall', {
  contentVersion: 1,

  concepts: ['THE WALL', 'THE TABLE', 'PREDICTION', 'DETERMINISM', 'FREEDOM', 'CONSTRUCTION'],

  acts: {
    1: 'ACT I — THE STONE WALL',
    2: 'ACT II — THE TABLE',
    3: 'ACT III — FOUR WORDS',
    4: 'ACT IV — THE LOOP',
    5: 'ACT V — TWICE TWO',
    6: 'ACT VI — CONSTRUCTED'
  },

  found: {
    lines: ['What cannot be foreseen', 'is not yet what is free.']
  },

  steps: [
    /* ─────────────────────────── ACT I — THE STONE WALL ───────────────────────────
       the wall is proof, not stone → submission is not reconciliation */
    { type: 'act', act: 1 },

    { type: 'question', id: 'w01', scored: true, kind: 'choice', label: 'IMAGE',
      concepts: ['THE WALL'],
      quotes: [{ text: 'The impossible means the stone wall! What stone wall? Why, of course, the laws of nature, the deductions of natural science, mathematics.', src: 'PART I · III' }],
      prompt: ['What makes something a wall, here?'],
      options: [
        'It is a conclusion no argument can move.',
        'It is an obstacle he lacks the strength to climb.',
        'It is a rule that society enforces with force.',
        'It is a fear that stops him before he acts.'
      ],
      answer: 0,
      right: { label: 'INSIGHT', body: 'The wall is made of proofs. What stops the man of action is being shown the impossible.' },
      wrong: { body: 'Not stone, not police, not nerves: laws of nature, natural science, mathematics — conclusions.' }
    },

    { type: 'question', id: 'w02', scored: true, kind: 'choice', label: 'DISTINCTION',
      concepts: ['THE WALL', 'DETERMINISM'],
      quotes: [{ text: 'one drop of your own fat must be dearer to you than a hundred thousand of your fellow-creatures', src: 'PART I · III' }],
      prompt: ['Beside descent from a monkey, what is strange about this brick in the wall?'],
      options: [
        'It is a medical finding that no one disputes.',
        'It is a religious teaching he half accepts.',
        'It is a conclusion science has since dropped.',
        'It is a moral verdict dressed as natural law.'
      ],
      answer: 3,
      right: { label: 'YOU CAUGHT THE LOOPHOLE', body: 'Selfishness is placed beside evolution as if it were proved the same way. He smells the smuggling.' },
      wrong: { body: 'Nothing medical or religious: egoist ethics is being filed under natural science, “the final solution of all so-called virtues.”' }
    },

    { type: 'question', id: 'w03', scored: true, kind: 'choice', label: 'DISTINCTION',
      concepts: ['THE WALL', 'FREEDOM'],
      quotes: [{ text: 'I am not going to be reconciled to it simply because it is a stone wall and I have not the strength.', src: 'PART I · III' }],
      prompt: ['What exactly does he refuse?'],
      options: [
        'To admit that the wall is there at all.',
        'To treat his defeat as his agreement.',
        'To stop battering his head against it.',
        'To accept any law of nature whatsoever.'
      ],
      answer: 1,
      right: { label: 'THAT’S THE DISTINCTION', body: 'He concedes he cannot break it. He will not call that consent.' },
      wrong: { body: 'He grants the wall stands and that battering fails. What he withholds is reconciliation.' }
    },

    { type: 'question', id: 'w04', scored: true, kind: 'choice', label: 'CLAIM',
      concepts: ['THE WALL'],
      quotes: [{ text: 'As though such a stone wall really were a consolation, and really did contain some word of conciliation, simply because it is as true as twice two makes four.', src: 'PART I · III' }],
      prompt: ['What confusion is he mocking?'],
      options: [
        'Taking a comfort for a truth.',
        'Taking a wall for a mere idea.',
        'Taking a truth for a comfort.',
        'Taking arithmetic for a fiction.'
      ],
      answer: 2,
      right: { label: 'INSIGHT', body: 'The wall is true. His opponents talk as if being true made it kind.' },
      wrong: { body: 'He never doubts the arithmetic. He doubts that a truth owes anyone consolation.' }
    },

    { type: 'interrupt', id: 'i1',
      line: 'You all speak of the wall as if it were a friend. What did it ever offer me?',
      responses: [
        { text: 'NOTHING. IT IS A WALL.', reply: 'At last. Someone who does not ask me to thank it.', best: true,
          aside: 'A truth need not console. That is his point in chapter III.' },
        { text: 'PEACE, IF YOU ACCEPT IT.', reply: 'That is what the defeated call their defeat.',
          aside: 'Accepting a fact and being reconciled to it are different.' },
        { text: 'CERTAINTY.', reply: 'Yes. That is the insult.',
          aside: 'True, but he wanted to know what it gives, not what it is.' }
      ]
    },

    /* ─────────────────────────── ACT II — THE TABLE ───────────────────────────
       a formula for desire → description, not command → nothing left to do */
    { type: 'act', act: 2 },

    { type: 'question', id: 'w05', scored: true, kind: 'choice', label: 'CLAIM',
      concepts: ['THE TABLE', 'DETERMINISM'],
      quotes: [
        { text: 'if there really is some day discovered a formula for all our desires and caprices ... then, most likely, man will at once cease to feel desire', src: 'PART I · VIII' },
        { text: 'For who would want to choose by rule?', src: 'PART I · VIII' }
      ],
      prompt: ['Why would desire stop, once the formula is found?'],
      options: [
        'Needs met in full leave nothing more to want.',
        'The formula would forbid most of our desires.',
        'A wish one can look up is no longer a wish.',
        'People lose interest in a puzzle once solved.'
      ],
      answer: 2,
      right: { label: 'INSIGHT', body: 'To want by rule is to consult, not to want. Desire needs to be its own.' },
      wrong: { body: 'Not satisfaction and not prohibition: knowing the rule turns choosing into looking up.' }
    },

    { type: 'question', id: 'w06', scored: true, kind: 'choice', label: 'DISTINCTION',
      concepts: ['THE TABLE'],
      quotes: [{ text: 'there may one day be something like a table constructed of them, so that we really shall choose in accordance with it.', src: 'PART I · VIII' }],
      prompt: ['Is the table an order he must obey?'],
      options: [
        'Yes: the state will enforce it as a law.',
        'Yes: reason commands whatever it proves.',
        'No: it lists only the choices that are wise.',
        'No: it records what he will do regardless.'
      ],
      answer: 3,
      right: { label: 'THAT’S THE DISTINCTION', body: 'Nothing compels him. The table simply turns out right — which is worse.' },
      wrong: { body: 'No one enforces it and it is not a list of wise choices. It describes; it does not command.' }
    },

    { type: 'question', id: 'w07', scored: true, kind: 'choice', label: 'CLAIM',
      concepts: ['DETERMINISM', 'FREEDOM'],
      quotes: [{ text: 'If, for instance, some day they calculate and prove to me that I made a long nose at someone because I could not help making a long nose at him and that I had to do it in that particular way, what FREEDOM is left me', src: 'PART I · VIII' }],
      prompt: ['What would the proof take from him?'],
      options: [
        'The thought that he could have done otherwise.',
        'The pleasure he took in making that long nose.',
        'The right to make long noses in public.',
        'The power to predict other people’s gestures.'
      ],
      answer: 0,
      right: { label: 'INSIGHT', body: 'The words “could not help” and “had to” sting. The gesture was his only if it might not have been.' },
      wrong: { body: 'No one bans the gesture or spoils it. The proof says he “could not help” it.' }
    },

    { type: 'question', id: 'w08', scored: true, kind: 'choice', label: 'IMAGE',
      concepts: ['THE TABLE', 'PREDICTION'],
      quotes: [{ text: 'Then I should be able to calculate my whole life for thirty years beforehand.', src: 'PART I · VIII' }],
      prompt: ['Why is this a nightmare, not a convenience?'],
      options: [
        'Living would add nothing to what was known.',
        'He would learn the date of his own death.',
        'Others could use the table to control him.',
        'Thirty years is far too short a life to plan.'
      ],
      answer: 0,
      right: { label: 'INSIGHT', body: 'A life read in advance is only performed. As he says, there would be “nothing left for us to do.”' },
      wrong: { body: 'The horror is not death or tyranny. It is that living would only confirm the calculation.' }
    },

    { type: 'rise', to: -28 },

    /* ─────────────────────────── ACT III — FOUR WORDS ───────────────────────────
       the game's own distinctions, to test his argument */
    { type: 'act', act: 3 },

    { type: 'concept', title: 'FOUR WORDS',
      body: [
        'IRRATIONAL — against one’s reason or interest.',
        'UNPREDICTABLE — no one can foresee it.',
        'UNDETERMINED — not fixed by what came before.',
        'FREELY CHOSEN — one’s own act.'
      ],
      note: 'These lines are the game’s, not his. He tends to run them together; the next questions pull them apart.'
    },

    { type: 'question', id: 'w09', scored: true, kind: 'choice', label: 'APPLICATION',
      concepts: ['PREDICTION', 'FREEDOM'],
      prompt: ['Every Tuesday, out of spite, a man insults the friend who lends him money. Everyone knows he will. Which words fit?'],
      options: [
        'Rational, and predictable.',
        'Irrational, and unpredictable.',
        'Irrational, yet predictable.',
        'Rational, yet unpredictable.'
      ],
      answer: 2,
      right: { label: 'THAT’S THE DISTINCTION', body: 'Spite against interest can be as regular as a clock. Irrational does not mean unforeseeable.' },
      wrong: { body: 'It harms his interest, so it is irrational; everyone expects it, so it is predictable. The two come apart.' }
    },

    { type: 'question', id: 'w10', scored: true, kind: 'choice', label: 'APPLICATION',
      concepts: ['PREDICTION', 'DETERMINISM'],
      prompt: ['No one can forecast the path of a falling leaf, though physics fixes every turn. Which words fit?'],
      options: [
        'Predictable, yet undetermined.',
        'Unpredictable, and undetermined.',
        'Predictable, and determined.',
        'Unpredictable, yet determined.'
      ],
      answer: 3,
      right: { label: 'THAT’S THE DISTINCTION', body: 'Unforeseeable is a fact about us. Undetermined is a fact about the world.' },
      wrong: { body: 'Every turn is fixed, yet no one can foresee it. Not knowing is not the same as not caused.' }
    },

    { type: 'question', id: 'w11', scored: true, kind: 'choice', label: 'APPLICATION',
      concepts: ['DETERMINISM', 'FREEDOM'],
      prompt: ['A man’s hand is jerked by a truly random event in his nerves — uncaused by anything before it. Which words fit?'],
      options: [
        'Chosen, because undetermined.',
        'Undetermined, and not chosen.',
        'Chosen, because unpredictable.',
        'Determined, and yet chosen.'
      ],
      answer: 1,
      right: { label: 'THAT’S THE DISTINCTION', body: 'Chance breaks the chain of causes without making the act his.' },
      wrong: { body: 'Nothing caused it — but he did not do it either. Randomness is not authorship.' }
    },

    { type: 'question', id: 'w12', scored: true, kind: 'multi', label: 'MULTISELECT',
      concepts: ['PREDICTION', 'THE TABLE'],
      prompt: ['In chapter VIII, which does he hope stay true?'],
      hint: 'Select all that apply.',
      options: [
        'Desire depends on something we don’t know.',
        'Reason is a poor and worthless thing.',
        'No formula for desire has yet come off.',
        'Twice two in fact makes five.',
        'Man is not a piano-key.'
      ],
      answer: [0, 2, 4],
      right: { label: 'YES', body: 'Each of his hopes is about what is not yet known — not about what is uncaused.' },
      wrong: { body: 'He calls reason “an excellent thing” and never denies the arithmetic. His hopes are ignorance, no formula, no piano-key.' },
      quote: { text: 'can one help being tempted to rejoice that it has not yet come off, and that desire still depends on something we don’t know?', src: 'PART I · VIII' }
    },

    { type: 'question', id: 'w13', scored: true, kind: 'choice', label: 'DIAGNOSIS',
      concepts: ['PREDICTION', 'DETERMINISM'],
      quotes: [{ text: 'desire still depends on something we don’t know', src: 'PART I · VIII' }],
      prompt: ['Using the four words, where is this hope weakest?'],
      options: [
        'It rests on proof that the will is uncaused.',
        'It rests on what is unknown, not what is uncaused.',
        'It rests on a faith that God will guide his desire.',
        'It rests on a law that makes desire random.'
      ],
      answer: 1,
      right: { label: 'INSIGHT', body: 'He takes shelter in our ignorance. A cause we do not know is still a cause.' },
      wrong: { body: 'He offers no proof, no theology, no law of randomness. Only something “we don’t know” — an unknown, not an absence.' }
    },

    { type: 'beat', lines: ['UNFORESEEN', 'IS NOT THE SAME AS FREE.'], full: true },

    { type: 'rise', to: -25 },

    /* ─────────────────────────── ACT IV — THE LOOP ───────────────────────────
       a predicted rebellion → an announced prediction → what free will is not */
    { type: 'act', act: 4 },

    { type: 'question', id: 'w14', scored: true, kind: 'choice', label: 'COUNTERARGUMENT',
      concepts: ['PREDICTION', 'THE TABLE'],
      quotes: [{ text: 'so that the mere possibility of calculating it all beforehand would stop it all', src: 'PART I · VIII' }],
      prompt: ['Suppose a hidden table correctly predicts that he will rebel against tables. Which follows?'],
      options: [
        'The table must be wrong, since he did rebel after all.',
        'Rebelling proves his will is undetermined.',
        'His rebellion fulfils the table, not refutes it.',
        'A hidden table has no hold on his actions.'
      ],
      answer: 2,
      right: { label: 'THAT’S THE DISTINCTION', body: 'A rebellion on schedule is an entry in the table, not an exception to it.' },
      wrong: { body: 'If the prediction was correct, the rebellion is what the table said. Defiance proves nothing about causes.' }
    },

    { type: 'question', id: 'w15', scored: true, kind: 'choice', label: 'COUNTERARGUMENT',
      concepts: ['PREDICTION', 'FREEDOM'],
      prompt: ['Now the table’s forecast is shown to him, and he does the opposite. What has he proved?'],
      options: [
        'That he can defeat a forecast he is shown.',
        'That his will stands outside the laws of nature.',
        'That no science of human action is possible.',
        'That the makers of the table were careless.'
      ],
      answer: 0,
      right: { label: 'INSIGHT', body: 'A forecast he can read becomes one more cause. Beating it shows responsiveness, not an uncaused will.' },
      wrong: { body: 'A table could predict even his reaction to its forecast. He has shown a skill, not a metaphysics.' }
    },

    { type: 'question', id: 'w16', scored: true, kind: 'choice', label: 'CLAIM',
      concepts: ['FREEDOM', 'DETERMINISM'],
      quotes: [{ text: 'Twice two makes four without my will. As if free will meant that!', src: 'PART I · VIII' }],
      prompt: ['What does he say free will is not?'],
      options: [
        'A will that is ever troubled by any arithmetic.',
        'A will that endorses what happens without it.',
        'A will that acts against its own interest.',
        'A will that could ever make a mistake.'
      ],
      answer: 1,
      right: { label: 'THAT’S THE DISTINCTION', body: 'Agreeing with the inevitable is not willing. He wants a will that makes a difference.' },
      wrong: { body: 'He rejects the reply that the will is free if it “of its own free will” coincides with the laws of arithmetic.' }
    },

    { type: 'question', id: 'w17', scored: true, kind: 'choice', label: 'SYNTHESIS',
      concepts: ['PREDICTION', 'FREEDOM'],
      prompt: ['If your rebellion can itself be predicted, are you free? Which answer can his text best support?'],
      options: [
        'Yes: freedom is authorship, whatever is foreseen.',
        'No, and he proves that no one can predict him.',
        'Yes, but only while the forecast is kept secret.',
        'He fears not — so he needs prediction to fail.'
      ],
      answer: 3,
      right: { label: 'INSIGHT', body: 'He never proves the table impossible. He hopes it fails, because he suspects that if it works, he is a key.' },
      wrong: { body: 'Authorship despite prediction is his opponents’ view; a proof of unpredictability is never given. He is left hoping.' }
    },

    { type: 'interrupt', id: 'i2',
      line: 'Suppose your table predicted even this sentence. Am I then a piano-key with a large vocabulary?',
      responses: [
        { text: 'YES.', reply: 'At least you are honest. I shall hate you for it.',
          aside: 'Being predicted does not settle the question by itself.' },
        { text: 'FORESEEN IS NOT FORCED.', reply: 'A comfortable doctrine. My enemies hold it too.', best: true,
          aside: 'This is the reply he never quite answers.' },
        { text: 'ONLY IF YOU OBEY IT.', reply: 'Then I will do the opposite. As predicted.',
          aside: 'Defying a forecast is still an event a table could list.' }
      ]
    },

    { type: 'rise', to: -22 },

    /* ─────────────────────────── ACT V — TWICE TWO ───────────────────────────
       authority, not truth → a right to want five → certainty as ending */
    { type: 'act', act: 5 },

    { type: 'question', id: 'w18', scored: true, kind: 'choice', label: 'IMAGE',
      concepts: ['THE WALL'],
      quotes: [
        { text: 'Twice two makes four is a pert coxcomb who stands with arms akimbo barring your path and spitting.', src: 'PART I · IX' },
        { text: 'I admit that twice two makes four is an excellent thing', src: 'PART I · IX' }
      ],
      prompt: ['What is his quarrel with twice two?'],
      options: [
        'Its truth, not its authority.',
        'Its errors, not its manners.',
        'Its use, and not its beauty.',
        'Its authority, not its truth.'
      ],
      answer: 3,
      right: { label: 'THAT’S THE DISTINCTION', body: 'He calls it excellent. He resents the way it bars the path.' },
      wrong: { body: 'He admits it is “an excellent thing.” The coxcomb is insufferable for his swagger, not his falsehood.' }
    },

    { type: 'question', id: 'w19', scored: true, kind: 'choice', label: 'CLAIM',
      concepts: ['FREEDOM', 'THE WALL'],
      quotes: [{ text: 'twice two makes five is sometimes a very charming thing too.', src: 'PART I · IX' }],
      prompt: ['Is he claiming that twice two makes five?'],
      options: [
        'No: he claims a right to find five charming.',
        'Yes: he says arithmetic is simply false.',
        'Yes: it is true for those who live below.',
        'No: it is a slip he corrects a line or two later.'
      ],
      answer: 0,
      right: { label: 'INSIGHT', body: 'Five is charming because it is not compelled. He wants a mind that is not merely forced.' },
      wrong: { body: 'He grants four in the same breath. Five stands for what the will may love without proof.' }
    },

    { type: 'question', id: 'w20', scored: true, kind: 'choice', label: 'CLAIM',
      concepts: ['THE WALL', 'FREEDOM'],
      quotes: [{ text: 'Consciousness, for instance, is infinitely superior to twice two makes four. Once you have mathematical certainty there is nothing left to do or to understand.', src: 'PART I · IX' }],
      prompt: ['Why rank consciousness above certainty, though he calls it a misery?'],
      options: [
        'Consciousness is the happier of the two states.',
        'Certainty is simply false, and consciousness true.',
        'Certainty closes what consciousness keeps open.',
        'Consciousness can calculate more than certainty.'
      ],
      answer: 2,
      right: { label: 'INSIGHT', body: 'Certainty finishes the question. Consciousness, even painful, keeps something to do and to understand.' },
      wrong: { body: 'Not happier and not truer: certainty leaves “nothing left to do or to understand.”' }
    },

    /* ─────────────────────────── ACT VI — CONSTRUCTED ───────────────────────────
       the wall turns inward → a refusal, not a proof → what the chamber separates */
    { type: 'act', act: 6 },

    { type: 'question', id: 'w21', scored: true, kind: 'choice', label: 'DIAGNOSIS',
      concepts: ['CONSTRUCTION', 'DETERMINISM'],
      quotes: [{ text: 'Then why am I made with such desires? Can I have been constructed simply in order to come to the conclusion that all my construction is a cheat?', src: 'PART I · X' }],
      prompt: ['Where has the wall moved?'],
      options: [
        'Onto society, which built the model flats.',
        'Inside him: his rebel desires were built too.',
        'Onto God, whom he here openly accuses of fraud.',
        'Nowhere: here he has finally escaped it.'
      ],
      answer: 1,
      right: { label: 'YOU CAUGHT THE LOOPHOLE', body: 'His desires are not outside nature. The rebel is part of the construction he rebels against.' },
      wrong: { body: 'No one else is accused. He asks why he was “made” with desires that nothing made can satisfy.' }
    },

    { type: 'question', id: 'w22', scored: true, kind: 'choice', label: 'CLAIM',
      concepts: ['CONSTRUCTION', 'FREEDOM'],
      quotes: [{ text: 'Can this be my whole purpose? I do not believe it.', src: 'PART I · X' }],
      prompt: ['What does his answer rest on?'],
      options: [
        'A proof drawn from his own logic.',
        'A refusal he cannot prove.',
        'A revelation he says he received.',
        'An experiment he describes.'
      ],
      answer: 1,
      right: { label: 'INSIGHT', body: 'Against the whole construction he sets only disbelief. It is the wall of chapter III again: not reconciled, not refuted.' },
      wrong: { body: 'No proof, vision or experiment follows. Only “I do not believe it.”' }
    },

    { type: 'question', id: 'w23', scored: true, kind: 'choice', label: 'SYNTHESIS',
      concepts: ['PREDICTION', 'FREEDOM', 'DETERMINISM'],
      prompt: ['Which distinction does the whole chamber turn on?'],
      options: [
        'What is rational versus what is irrational.',
        'What is good for me versus what I choose.',
        'What is moral versus what is merely natural.',
        'What is unforeseen versus what is my own.'
      ],
      answer: 3,
      coda: ['What cannot be foreseen', 'is not yet what is free.'],
      right: { label: 'INSIGHT' },
      wrong: { body: 'Good against chosen was THE ADVANTAGE. Here the line runs between escaping prediction and owning the act.' }
    },

    { type: 'rise', from: -31, to: -19, final: true },

    { type: 'clear' }
  ],

  review: [
    { id: 'r-wall', concept: 'THE WALL', sources: ['w01', 'w02', 'w03', 'w04'],
      variants: [
        { quotes: [{ text: 'Nature does not ask your permission, she has nothing to do with your wishes', src: 'PART I · III' }],
          prompt: ['He agrees nature does not ask permission. Then what is left to object to?'],
          options: [
            'Nothing: he gives up the argument here.',
            'The existence of any laws of nature.',
            'The scientists who first found the laws.',
            'Being asked to be glad about it as well.'
          ],
          answer: 3,
          right: 'He accepts the fact and refuses the gratitude. Submission is not reconciliation.',
          wrong: 'He never denies the laws. He denies that a truth is a consolation.' }
      ] },

    { id: 'r-table', concept: 'THE TABLE', sources: ['w05', 'w06', 'w07', 'w08'],
      variants: [
        { quotes: [{ text: 'Science has succeeded in so far analysing man that we know already that choice and what is called freedom of will is nothing else than', src: 'PART I · VIII' }],
          prompt: ['The objector breaks off mid-sentence. What threatens him in it?'],
          options: [
            'That choice will be banned by scientists.',
            'That choice will be explained without remainder.',
            'That choice will be praised as a noble instinct.',
            'That choice will turn out to be always wise.'
          ],
          answer: 1,
          right: 'The words “nothing else than” say it: the fear is a complete explanation, not a prohibition.',
          wrong: 'No one forbids choice. The threat is that it is fully accounted for.' }
      ] },

    { id: 'r-words', concept: 'PREDICTION', sources: ['w09', 'w10', 'w11', 'w12'],
      variants: [
        { prompt: ['A chess engine plays a move no human expected, fixed by its program. Which words fit?'],
          options: [
            'Undetermined, and so chosen.',
            'Predictable, yet undetermined.',
            'Unpredictable, yet determined.',
            'Irrational, and so it is free.'
          ],
          answer: 2,
          right: 'Surprising us and escaping causes are different things.',
          wrong: 'Every move follows from the program. Our surprise is about us, not about it.' }
      ] },

    { id: 'r-unknown', concept: 'DETERMINISM', sources: ['w13'],
      variants: [
        { prompt: ['A friend says: “As long as science can’t predict us, we’re free.” Which reply does this chamber support?'],
          options: [
            'No: not yet known is not yet uncaused.',
            'Yes: to be unpredictable is to be free.',
            'No: freedom requires acting on reason.',
            'Yes: science will never predict anyone.'
          ],
          answer: 0,
          right: 'Ignorance is a fact about the observer. It cannot carry the weight of freedom.',
          wrong: 'The friend treats a gap in knowledge as a gap in causes.' }
      ] },

    { id: 'r-loop', concept: 'FREEDOM', sources: ['w14', 'w15', 'w16', 'w17'],
      variants: [
        { prompt: ['He resolves to do whatever the table does not predict. Why doesn’t this settle the matter?'],
          options: [
            'He would soon grow tired of the policy.',
            'The table forbids anyone to read it.',
            'A policy of defiance can itself be tabled.',
            'Defiance is morally worse than plain obedience.'
          ],
          answer: 2,
          right: 'A rule of always doing the opposite is one more regularity a table can list.',
          wrong: 'Tiredness and morals are beside the point. Contrariness is predictable too.' }
      ] },

    { id: 'r-five', concept: 'THE WALL', sources: ['w18', 'w19', 'w20'],
      variants: [
        { quotes: [{ text: 'such positiveness is not life, gentlemen, but is the beginning of death.', src: 'PART I · IX' }],
          prompt: ['Why would positiveness be the beginning of death?'],
          options: [
            'Nothing is left to strive for or to settle.',
            'Certainty makes people careless of every danger.',
            'Mathematics has done harm to the body.',
            'Positive people tend to die the soonest.'
          ],
          answer: 0,
          right: 'Life is the attaining; a final formula ends it.',
          wrong: 'He is speaking of the goal expressed as a formula: once it is fixed, the living process stops.' }
      ] },

    { id: 'r-built', concept: 'CONSTRUCTION', sources: ['w21', 'w22', 'w23'],
      variants: [
        { quotes: [{ text: 'I would let my tongue be cut off out of gratitude if things could be so arranged that I should lose all desire to put it out.', src: 'PART I · X' }],
          prompt: ['What does this offer show about his defiance?'],
          options: [
            'He values defiance above everything else.',
            'He means to defy even his own gratitude.',
            'He has no desires left that could be changed.',
            'He would gladly be rid of the need to defy.'
          ],
          answer: 3,
          right: 'He does not love the tongue-poking. He resents a world that keeps provoking it.',
          wrong: 'He would give up the tongue itself if the desire could honestly go. Defiance is his symptom, not his ideal.' }
      ] }
  ]
});
