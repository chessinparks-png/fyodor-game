/*
  SURFACE — chamber 08.
  Core problem: what does he bring up with him — and what stays below?
  The hardest synthesis: the frame against the voice, Part I against Part II,
  Dostoevsky against the Underground Man, and later lenses (existentialist,
  anti-rationalist) held as lenses. No optimism: the book shows where you stand,
  not the way out.
*/
UNDERGROUND.register('surface', {
  contentVersion: 1,

  concepts: ['THE FRAME', 'PART I / PART II', 'AUTHOR AND CHARACTER', 'LENSES', 'THE READER', 'UNRESOLVED'],

  acts: {
    1: 'ACT I — BOUND TO APPEAR',
    2: 'ACT II — THE ARGUMENT AND THE LIFE',
    3: 'ACT III — AUTHOR AND CHARACTER',
    4: 'ACT IV — LENSES',
    5: 'ACT V — UNRESOLVED',
    6: 'ACT VI — SURFACE'
  },

  found: {
    lines: ['He proved that freedom matters', 'and could not live it.']
  },

  steps: [
    /* ─────────────────────────── ACT I — BOUND TO APPEAR ───────────────────────────
       the note returns: a product of circumstance, a rebel against necessity */
    { type: 'act', act: 1 },

    { type: 'question', id: 's01', scored: true, kind: 'choice', label: 'FRAME',
      concepts: ['THE FRAME'],
      quotes: [{ text: 'tries to explain the causes owing to which he has made his appearance and was bound to make his appearance in our midst.', src: 'PART I · NOTE' }],
      prompt: ['After THE WALL, what irony does “bound to make his appearance” carry?'],
      options: [
        'The rebel against necessity is framed as necessary.',
        'The author mocks the character’s wish to be seen.',
        'The note promises he will appear in a later book.',
        'The note admits that he is the author, in disguise.'
      ],
      answer: 0,
      right: { label: 'YOU CAUGHT THE LOOPHOLE', body: 'The man who refuses to be a piano-key is introduced as something society had to produce.' },
      wrong: { body: 'The words “causes” and “bound to”: the note speaks the language of necessity about a man who rebels against it.' }
    },

    { type: 'question', id: 's02', scored: true, kind: 'choice', label: 'FRAME',
      concepts: ['THE FRAME', 'THE READER'],
      quotes: [{ text: 'when we consider the circumstances in the midst of which our society is formed.', src: 'PART I · NOTE' }],
      prompt: ['Where does the note locate the cause of such men?'],
      options: [
        'In a personal illness of the liver.',
        'In a sin that each of them committed.',
        'In the conditions of their society.',
        'In a lack of education and reading.'
      ],
      answer: 2,
      right: { label: 'INSIGHT', body: 'Not a freak but a symptom: “one of the representatives of a generation still living.”' },
      wrong: { body: 'The note points outward, to “circumstances” — and he is, if anything, over-read, not under-read.' }
    },

    { type: 'question', id: 's03', scored: true, kind: 'choice', label: 'STRUCTURE',
      concepts: ['PART I / PART II'],
      prompt: ['Part II happens when he is twenty-four; Part I is written when he is forty. Why put the earlier events second?'],
      options: [
        'So the book can end on a love story.',
        'Because he forgot the events until later.',
        'Because Part II was in fact written first of all.',
        'So the ideas are heard before their origin.'
      ],
      answer: 3,
      right: { label: 'INSIGHT', body: 'We meet the argument, then the life it grew from. The order makes us test it.' },
      wrong: { body: 'The note itself sets it up: first his views, then “the actual notes” of events. Argument, then evidence.' }
    },

    /* ─────────────────────────── ACT II — THE ARGUMENT AND THE LIFE ───────────────────────────
       Part I’s claims in action → freedom for himself, not for her */
    { type: 'act', act: 2 },

    { type: 'question', id: 's04', scored: true, kind: 'choice', label: 'SYNTHESIS',
      concepts: ['PART I / PART II'],
      quotes: [{ text: 'I was fully conscious of the disgusting meanness of my spiteful stupidity, and yet at the same time I could not restrain myself.', src: 'PART II · IX' }],
      prompt: ['Part I says consciousness paralyses. In Part II he acts all the time. How do the parts fit?'],
      options: [
        'Part II refutes Part I: he is a man of action.',
        'Part II is set before he became conscious.',
        'His actions come as compulsions, not choices.',
        'Part II is fiction, while Part I is his truth.'
      ],
      answer: 2,
      right: { label: 'THAT’S THE DISTINCTION', body: 'Inertia and frenzy are two faces of one unfreedom. He sees, and cannot stop.' },
      wrong: { body: 'He is fully conscious and still “could not restrain” himself. Lucidity without command, as Part I said.' }
    },

    { type: 'question', id: 's05', scored: true, kind: 'choice', label: 'SYNTHESIS',
      concepts: ['PART I / PART II', 'AUTHOR AND CHARACTER'],
      quotes: [{ text: 'I cannot get on without domineering and tyrannising over someone', src: 'PART II · IX' }],
      prompt: ['What does this confession do to Part I’s defence of free choice?'],
      options: [
        'It proves that Part I was a lie from the start.',
        'It shows his freedom has room for no one else’s.',
        'It shows his freedom was never tested by anyone.',
        'It proves that freedom must always mean cruelty.'
      ],
      answer: 1,
      right: { label: 'INSIGHT', body: 'He defended his right to choose. With Liza, her choosing becomes something to conquer.' },
      wrong: { body: 'Part I is not simply false, and freedom is not proved cruel. His version of it cannot share the room.' }
    },

    { type: 'question', id: 's06', scored: true, kind: 'multi', label: 'MULTISELECT',
      concepts: ['PART I / PART II'],
      prompt: ['Which Part I claims does Part II show in action?'],
      hint: 'Select all that apply.',
      options: [
        'Knowing a motive does not stop it.',
        'Enlightened interest makes people good.',
        'People act against their own interest.',
        'A table can predict his every act.',
        'Books can stand in for living.'
      ],
      answer: [0, 2, 4],
      right: { label: 'YES', body: 'He knows, and acts; he harms himself; he speaks “like a book.” Part II enacts what Part I asserted.' },
      wrong: { body: 'No enlightenment makes him good, and no table appears. Self-knowledge, self-harm and bookishness do.' }
    },

    { type: 'interrupt', id: 'i1',
      line: 'You have climbed all this way to leave me behind. What exactly are you taking with you?',
      responses: [
        { text: 'YOUR QUESTIONS.', reply: 'Keep them. They are the only thing I ever made.', best: true,
          aside: 'The arguments outlive the man who could not live them.' },
        { text: 'A WARNING.', reply: 'Against me? Or against the part of you I describe?',
          aside: 'He insists the diagnosis includes the reader.' },
        { text: 'NOTHING.', reply: 'Liar. You will think of the wall the next time someone shows you a table.',
          aside: 'You cannot unread the chambers.' }
      ]
    },

    { type: 'rise', to: -5 },

    /* ─────────────────────────── ACT III — AUTHOR AND CHARACTER ───────────────────────────
       who speaks, who frames, who is implicated */
    { type: 'act', act: 3 },

    { type: 'question', id: 's07', scored: true, kind: 'choice', label: 'AUTHOR',
      concepts: ['AUTHOR AND CHARACTER'],
      prompt: ['A reader calls the book Dostoevsky’s anti-rationalist manifesto. What in the text makes that harder to say?'],
      options: [
        'Dostoevsky signs each argument in person.',
        'The rationalists win every exchange in it.',
        'The case is voiced by a man the book exposes.',
        'The book never argues against reason at any point.'
      ],
      answer: 2,
      right: { label: 'THAT’S THE DISTINCTION', body: 'The arguments are strong; the arguer is shown failing. A manifesto would not frame its speaker so.' },
      wrong: { body: 'The arguments against reason are real and unanswered — but they belong to a character the note, Part II and the editor all hold at a distance.' }
    },

    { type: 'question', id: 's08', scored: true, kind: 'choice', label: 'CLAIM',
      concepts: ['THE READER'],
      quotes: [{ text: 'I have only in my life carried to an extreme what you have not dared to carry halfway, and what’s more, you have taken your cowardice for good sense', src: 'PART II · X' }],
      prompt: ['Whom does the ending implicate?'],
      options: [
        'The reader, as a milder case of the same.',
        'Only the schoolfellows who humiliated him.',
        'Only the rationalists of the crystal palace.',
        'No one else: he takes all the blame himself.'
      ],
      answer: 0,
      right: { label: 'INSIGHT', body: 'He is not the exception but the extreme. You differ in degree, and call it good sense.' },
      wrong: { body: 'He speaks to “you” — the gentlemen reading — and refuses to be the only case.' }
    },

    { type: 'question', id: 's09', scored: true, kind: 'choice', label: 'FRAME',
      concepts: ['THE FRAME', 'THE READER'],
      quotes: [{ text: 'we are all divorced from life, we are all cripples, every one of us, more or less.', src: 'PART II · X' }],
      prompt: ['How does the author’s note support this “all of us”?'],
      options: [
        'It names every reader of the book personally.',
        'It says he represents a whole living generation.',
        'It says his illness is common among clerks.',
        'It denies that he could represent anyone at all.'
      ],
      answer: 1,
      right: { label: 'THAT’S THE DISTINCTION', body: 'Frame and voice agree on one thing: he is a type, one of the “representatives of a generation still living.”' },
      wrong: { body: 'The note calls him “one of the representatives of a generation still living.” Voice and frame both generalise.' }
    },

    { type: 'question', id: 's10', scored: true, kind: 'choice', label: 'STRUCTURE',
      concepts: ['AUTHOR AND CHARACTER', 'THE FRAME'],
      prompt: ['The book offers no moral. Where, then, does its judgment of him lie?'],
      options: [
        'In a closing sermon from the author himself.',
        'In his own last verdict on himself.',
        'In its structure: note, Part II, the cut.',
        'Nowhere: it withholds any judgment.'
      ],
      answer: 2,
      right: { label: 'INSIGHT', body: 'A note that calls him a type, a story that tests him, an editor who stops him. Judgment by arrangement.' },
      wrong: { body: 'No sermon, and his own verdicts are unreliable by his own admission. The shape of the book does the judging.' }
    },

    { type: 'rise', to: -3 },

    /* ─────────────────────────── ACT IV — LENSES ───────────────────────────
       later readings, held as lenses: existentialist, anti-rationalist, Hannon’s two freedoms */
    { type: 'act', act: 4 },

    { type: 'concept', title: 'LENSES',
      body: [
        'EXISTENTIALIST — a person defines himself by choice, with no given essence.',
        'ANTI-RATIONALIST — reason cannot explain or govern the whole person.'
      ],
      note: 'Context, not text. Nasir, Gul and Ullah (PLHR) and Rapoport read the book as existentialist; PLHR reports Walter Kaufmann’s praise of Part I as an introduction to existentialism, and notes that Dostoevsky never identified as an existentialist. The word came later.'
    },

    { type: 'question', id: 's11', scored: true, kind: 'choice', label: 'CONTEXT',
      concepts: ['LENSES'],
      prompt: ['What is the strongest caution in calling this an existentialist book?'],
      options: [
        'Dostoevsky called himself an existentialist.',
        'The label came later; it names his themes.',
        'Existentialists reject all talk of freedom.',
        'The novel has no philosophical content.'
      ],
      answer: 1,
      right: { label: 'THAT’S THE DISTINCTION', body: 'A lens, applied afterwards. It shows the themes; it does not give the author a creed.' },
      wrong: { body: 'The sources say he never identified as an existentialist. The lens is later readers’, and useful as that.' }
    },

    { type: 'question', id: 's12', scored: true, kind: 'choice', label: 'CLAIM',
      concepts: ['LENSES'],
      quotes: [{ text: 'reason is an excellent thing, there’s no disputing that', src: 'PART I · VIII' }],
      prompt: ['Is anti-rationalist the right word for his position?'],
      options: [
        'Yes: he wants reason abolished outright.',
        'No: he sides with the rationalists in the end.',
        'Yes: he says reason is always mistaken.',
        'Only loosely: he denies reason the whole man.'
      ],
      answer: 3,
      right: { label: 'INSIGHT', body: 'He praises reason and refuses its sovereignty: reason is “one twentieth of my capacity for life.”' },
      wrong: { body: 'He calls reason excellent. What he denies is that it is the whole of a person.' }
    },

    { type: 'question', id: 's13', scored: true, kind: 'choice', label: 'CONTEXT',
      concepts: ['LENSES', 'UNRESOLVED'],
      prompt: ['Hannon argues that the Underground Man and the rational egoists mean different things by freedom. What follows?'],
      options: [
        'The egoists win the argument by definition.',
        'Neither side wins until freedom is defined.',
        'The narrator wins by refusing to define it.',
        'Freedom turns out not to matter to either.'
      ],
      answer: 1,
      right: { label: 'INSIGHT', body: 'For Hannon the quarrel rests on rival pictures of human nature — and the book does not settle which is true.' },
      wrong: { body: 'Hannon says both sides prize freedom and judges the dispute unresolved. That is a scholar’s reading, not the text’s claim.' }
    },

    { type: 'question', id: 's14', scored: true, kind: 'choice', label: 'COUNTERARGUMENT',
      concepts: ['LENSES', 'PART I / PART II'],
      prompt: ['A student writes: “He is an existentialist hero who freely creates himself.” What does Part II say against it?'],
      options: [
        'Part II shows that he has no freedom of any kind.',
        'His self-making collapses into rule and shame.',
        'Part II shows him becoming a man of action.',
        'Existentialists had no interest in heroes.'
      ],
      answer: 1,
      right: { label: 'THAT’S THE DISTINCTION', body: 'He tries to author himself, and writes the same scene: domination, humiliation, retreat. An anti-hero, by his own word.' },
      wrong: { body: 'He is not simply unfree, and not transformed. His self-creation keeps producing the same failure.' }
    },

    { type: 'interrupt', id: 'i2',
      line: 'Now you will write that Dostoevsky disagreed with me. How convenient for you both.',
      responses: [
        { text: 'HE AGREED WITH YOU.', reply: 'Then why did he show me with Liza?',
          aside: 'Part II complicates any simple identification.' },
        { text: 'HE DISAGREED.', reply: 'Then why did he give me the best lines?',
          aside: 'The frame distances; it does not refute.' },
        { text: 'THE TEXT DOESN’T SAY.', reply: 'At last, someone who reads.', best: true,
          aside: 'The novel frames him. It never states which arguments its author accepts.' }
      ]
    },

    { type: 'rise', to: -1 },

    /* ─────────────────────────── ACT V — UNRESOLVED ───────────────────────────
       freedom unbearable → born from an idea → the notes as one more book → no answer */
    { type: 'act', act: 5 },

    { type: 'question', id: 's15', scored: true, kind: 'choice', label: 'CLAIM',
      concepts: ['UNRESOLVED', 'THE READER'],
      quotes: [{ text: 'we should be begging to be under control again at once.', src: 'PART II · X' }],
      prompt: ['Give them more independence, he says, and this follows. What does it do to Part I?'],
      options: [
        'It retracts his case for free choice.',
        'It shows that control is what is best for all.',
        'It proves the palace builders right.',
        'It admits the free may not bear freedom.'
      ],
      answer: 3,
      right: { label: 'INSIGHT', body: 'Freedom stays precious and becomes unbearable. He does not retract; he complicates.' },
      wrong: { body: 'He does not say control is good. He says we could not endure the freedom we demand.' }
    },

    { type: 'question', id: 's16', scored: true, kind: 'choice', label: 'IMAGE',
      concepts: ['UNRESOLVED'],
      quotes: [
        { text: 'We are stillborn, and for generations past have been begotten, not by living fathers', src: 'PART II · X' },
        { text: 'Soon we shall contrive to be born somehow from an idea.', src: 'PART II · X' }
      ],
      prompt: ['What is “born somehow from an idea” an image of?'],
      options: [
        'Lives shaped by books, not by living.',
        'Children raised without any fathers at all.',
        'A future science of making people.',
        'The birth of a new national idea.'
      ],
      answer: 0,
      right: { label: 'INSIGHT', body: 'Liza’s “like a book,” turned into a diagnosis of a generation.' },
      wrong: { body: 'He means his own kind: people who, left “without books,” would not know what to love or hate.' }
    },

    { type: 'question', id: 's17', scored: true, kind: 'choice', label: 'LOOPHOLE',
      concepts: ['UNRESOLVED', 'AUTHOR AND CHARACTER'],
      quotes: [{ text: 'Leave us alone without books and we shall be lost and in confusion at once.', src: 'PART II · X' }],
      prompt: ['What does this imply about the notes themselves?'],
      options: [
        'They are the one book that is free of it.',
        'They were written to be burned at once.',
        'They prove he has escaped from books.',
        'They are one more book to cling to.'
      ],
      answer: 3,
      right: { label: 'YOU CAUGHT THE LOOPHOLE', body: 'The diagnosis includes its own page. He cannot stop writing — the editor has to stop him.' },
      wrong: { body: 'He is writing a book as he says it. The notes are an instance of the illness they describe.' }
    },

    { type: 'question', id: 's18', scored: true, kind: 'choice', label: 'SYNTHESIS',
      concepts: ['UNRESOLVED'],
      quotes: [{ text: 'Why, we don’t even know what living means now, what it is, and what it is called?', src: 'PART II · X' }],
      prompt: ['The book leaves this unanswered. Which reason fits its argument best?'],
      options: [
        'An answer would be one more formula.',
        'The answer was given back in Part I.',
        'The editor cut the answer from the text.',
        'The question is a joke with no meaning.'
      ],
      answer: 0,
      right: { label: 'INSIGHT', body: 'A definition of living would be a table of living. The book will not build the palace it attacked.' },
      wrong: { body: 'Part I gives no answer, and the editor cuts only the continuation. A formula for life is what the book resists.' }
    },

    { type: 'beat', lines: ['NO WAY OUT IS GIVEN.', 'THE PLACE IS SHOWN.'], full: true },

    /* ─────────────────────────── ACT VI — SURFACE ───────────────────────────
       what the author can be said to claim → the book in a sentence → what surfacing means */
    { type: 'act', act: 6 },

    { type: 'question', id: 's19', scored: true, kind: 'choice', label: 'AUTHOR',
      concepts: ['AUTHOR AND CHARACTER', 'THE FRAME'],
      prompt: ['Which claim can the text safely attribute to Dostoevsky as author?'],
      options: [
        'That such men must exist among us.',
        'That twice two sometimes makes five.',
        'That the crystal palace must fall.',
        'That Liza should have stayed with him.'
      ],
      answer: 0,
      right: { label: 'THAT’S THE DISTINCTION', body: 'Only the signed note speaks as author: such persons “positively must, exist in our society.”' },
      wrong: { body: 'Everything else is the character’s. The one signed claim is the AUTHOR’S NOTE: such men must exist.' }
    },

    { type: 'question', id: 's20', scored: true, kind: 'choice', label: 'SYNTHESIS',
      concepts: ['PART I / PART II', 'UNRESOLVED'],
      prompt: ['Which one-sentence account of the whole book is strongest?'],
      options: [
        'Reason is bad; freedom means defying it.',
        'Society made him, so he bears no blame.',
        'Suffering purifies, as the ending shows.',
        'He shows freedom matters, and fails it.'
      ],
      answer: 3,
      right: { label: 'INSIGHT', body: 'The argument for freedom stands; the life that argues it fails. The book keeps both.' },
      wrong: { body: 'Reason is not simply bad, blame is not lifted, and “purification” was his fantasy about Liza.' }
    },

    { type: 'question', id: 's21', scored: true, kind: 'choice', label: 'SYNTHESIS',
      concepts: ['UNRESOLVED', 'THE READER'],
      prompt: ['In chapter XI he says underground is not better — something different is. Does the book name it?'],
      options: [
        'Yes: the crystal palace, rebuilt on truth.',
        'No: it marks a lack it will not fill.',
        'Yes: Liza’s love, which he finally accepts.',
        'Yes: the life of the plain man of action.'
      ],
      answer: 1,
      right: { label: 'INSIGHT', body: 'The thirst is real; its object is never named. The book will not fake an exit.' },
      wrong: { body: 'He rejects the palace, loses Liza, and refuses to become the man of action. The “something different” stays unnamed.' }
    },

    { type: 'question', id: 's22', scored: true, kind: 'choice', label: 'FINAL SURFACE CHECK', final: true,
      concepts: ['UNRESOLVED', 'THE READER', 'THE FRAME'],
      prompt: ['What does coming up to the surface mean, at the end of this book?'],
      options: [
        'Escape: the book shows the way out.',
        'Despair: nothing can ever change.',
        'Clarity, with no way out supplied.',
        'Victory: reason is finally refuted.'
      ],
      answer: 2,
      coda: ['He proved that freedom matters', 'and could not live it.'],
      right: { label: 'INSIGHT' },
      wrong: { body: 'No exit, no verdict of despair, no victory over reason. You come up seeing where he stood — and where you do.' }
    },

    { type: 'rise', from: -7, to: 0, final: true },

    { type: 'clear' }
  ],

  review: [
    { id: 'r-frame', concept: 'THE FRAME', sources: ['s01', 's02', 's03'],
      variants: [
        { quotes: [{ text: 'I have tried to expose to the view of the public more distinctly than is commonly done, one of the characters of the recent past.', src: 'PART I · NOTE' }],
          prompt: ['What does “expose to the view” suggest about the author’s aim?'],
          options: [
            'To defend a friend from his critics.',
            'To confess his own private sins.',
            'To display a type, not to endorse him.',
            'To shock the public simply for its own sake.'
          ],
          answer: 2,
          right: 'Exposure is display: he is shown, “more distinctly than is commonly done.”',
          wrong: 'The note speaks of showing a character of the recent past, not of defending or confessing.' }
      ] },

    { id: 'r-parts', concept: 'PART I / PART II', sources: ['s04', 's05', 's06'],
      variants: [
        { prompt: ['Someone says Part II is only a story added for colour. What does it actually do?'],
          options: [
            'It restates Part I in simpler words.',
            'It tests Part I against a lived life.',
            'It cancels Part I as a youthful error.',
            'It gives Part I a happy conclusion.'
          ],
          answer: 1,
          right: 'The arguments meet a person. Some survive; the arguer does not.',
          wrong: 'Part II neither repeats nor cancels Part I, and it is not happy. It puts the arguments to work.' }
      ] },

    { id: 'r-author', concept: 'AUTHOR AND CHARACTER', sources: ['s07', 's08', 's09', 's10'],
      variants: [
        { quotes: [{ text: 'Speak for yourself, you will say, and for your miseries in your underground holes, and don’t dare to say all of us', src: 'PART II · X' }],
          prompt: ['Whose objection is this, and how is it treated?'],
          options: [
            'The editor’s, and it ends the book.',
            'Liza’s, which he finally accepts from her.',
            'Dostoevsky’s, stepping in at last to correct him.',
            'The reader’s, which he foresees and refuses.'
          ],
          answer: 3,
          right: 'He writes the reader’s protest himself, then says it is only cowardice taken for good sense.',
          wrong: 'It is the imagined “you,” the gentlemen readers. He anticipates the exemption and denies it.' }
      ] },

    { id: 'r-lens', concept: 'LENSES', sources: ['s11', 's12', 's13', 's14'],
      variants: [
        { prompt: ['Which statement about the book and existentialism is safest?'],
          options: [
            'Later readers found existentialist themes in it.',
            'Dostoevsky founded existentialism as a formal school.',
            'The novel calls itself an existentialist work.',
            'Existentialists wrote the book’s author’s note.'
          ],
          answer: 0,
          right: 'A later lens, as PLHR and Rapoport use it. Not the author’s own label.',
          wrong: 'Dostoevsky founded no school and used no such word. Readers applied the lens afterwards.' }
      ] },

    { id: 'r-unresolved', concept: 'UNRESOLVED', sources: ['s15', 's16', 's17', 's18'],
      variants: [
        { quotes: [{ text: 'It would be the worse for us if our petulant prayers were answered.', src: 'PART II · X' }],
          prompt: ['What does this admit about his demands?'],
          options: [
            'They were modest, and could easily be met.',
            'They were the demands of others.',
            'They were only ever a figure of speech.',
            'They could not survive being granted.'
          ],
          answer: 3,
          right: 'The protest needs its refusal. Granted, it would turn into a plea for control.',
          wrong: 'He calls them petulant prayers that would harm him if answered — demands that live on being denied.' }
      ] },

    { id: 'r-surface', concept: 'THE READER', sources: ['s19', 's20', 's21', 's22'],
      variants: [
        { prompt: ['A reader closes the book and says: “So the lesson is: think less and act.” What is the best reply?'],
          options: [
            'Yes: that is how Part I closes.',
            'Yes: that is what Liza teaches him.',
            'He envies that man, and will not be him.',
            'No: the lesson is to think harder than ever.'
          ],
          answer: 2,
          right: 'The man of action is envied and refused. The book offers no such simple exit.',
          wrong: 'Part I ends with conscious inertia and a thirst for something else. No lesson, in either direction, is given.' }
      ] }
  ]
});
