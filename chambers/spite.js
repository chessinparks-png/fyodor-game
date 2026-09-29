/*
  SPITE — chamber 05. Content only; the engine lives in app.js.
  Schema: see content.js.
*/
UNDERGROUND.register('spite', {
  contentVersion: 2,

  concepts: ['SPITE', 'FREEDOM', 'RATIONAL EGOISM', 'SELF-DECEPTION', 'SUFFERING', 'RECOGNITION'],

  acts: {
    1: 'ACT I — FROM SPITE',
    2: 'ACT II — THE TOOTHACHE',
    3: 'ACT III — ADVANTAGE',
    4: 'ACT IV — THE PIANO KEY',
    5: 'ACT V — THE PRISON',
    6: 'ACT VI — LIZA'
  },
  moods: { 6: 'warm' },

  found: {
    lines: ['The Underground Man doesn’t merely suffer.', 'He tries to make suffering his.']
  },

  steps: [
    /* ─────────────────────────── ACT I — FROM SPITE ───────────────────────────
       spite as hostility → conscious self-damage → a stance he cannot become */
    { type: 'act', act: 1 },

    { type: 'question', id: 'q01', scored: true, kind: 'choice', label: 'CLAIM',
      concepts: ['SPITE'],
      quotes: [{ text: 'No, I refuse to consult a doctor from spite.', src: 'PART I · I' }],
      prompt: ['By his own account, whom is this spite against?'],
      options: [
        'The doctors, whose authority he resents.',
        'Himself, as a punishment he has earned.',
        'No one he can name; the harm is his alone.',
        'The reader, whom the confession provokes.'
      ],
      answer: 2,
      right: { label: 'INSIGHT', body: 'He cannot say whom he mortifies. Spite without a target is no longer simple hostility.' },
      wrong: { body: 'He rules out the doctors himself, and never speaks of deserved punishment. He cannot name a target at all.' },
      quote: { text: 'Of course, I can’t explain who it is precisely that I am mortifying in this case by my spite: I am perfectly well aware that I cannot ‘pay out’ the doctors by not consulting them', src: 'PART I · I' }
    },

    { type: 'question', id: 'q02', scored: true, kind: 'choice', label: 'CLAIM',
      concepts: ['SPITE', 'RATIONAL EGOISM'],
      prompt: ['Why does this trouble the view that people act on their known interest?'],
      options: [
        'He judges his interest correctly, and it decides nothing.',
        'He misjudges the risk; better information would correct him.',
        'He secretly wants the illness, to justify his bitterness.',
        'He refuses on a moral principle he has not yet stated.'
      ],
      answer: 0,
      headline: 'KNOWING IS NOT CHOOSING.',
      right: { label: 'THE SYSTEM BREAKS HERE', body: 'A mistake can be corrected. His information is already correct.' },
      wrong: { body: 'A misjudgment or a hidden motive would leave the view intact. He sees his interest clearly — and the seeing decides nothing.' }
    },

    { type: 'question', id: 'q03', scored: true, kind: 'choice', label: 'CONTRADICTION',
      concepts: ['SELF-DECEPTION', 'SPITE'],
      quotes: [
        { text: 'I was a spiteful official.', src: 'PART I · I' },
        { text: 'I was lying when I said just now that I was a spiteful official. I was lying from spite.', src: 'PART I · I' }
      ],
      prompt: ['Which reading keeps both lines?'],
      options: [
        'The retraction is the real confession: the spite was a pose.',
        'The first line is the real confession; the retraction provokes.',
        'The retraction, made “from spite,” enacts what it denies.',
        'Once he admits lying, the notes show his style, not himself.'
      ],
      answer: 2,
      headline: 'UNRELIABLE DOES NOT MEAN MEANINGLESS.',
      right: { label: 'YOU CAUGHT THE LOOPHOLE', body: 'He retracts his spite — from spite. The contradiction is the evidence.' },
      wrong: { body: 'Each of the others throws a line away. Only one keeps both: the retraction repeats the act it denies.' }
    },

    { type: 'question', id: 'q04', scored: true, kind: 'choice', label: 'CLAIM',
      concepts: ['SPITE', 'FREEDOM'],
      quotes: [{ text: 'I did not know how to become anything; neither spiteful nor kind, neither a rascal nor an honest man, neither a hero nor an insect.', src: 'PART I · I' }],
      prompt: ['Yet he still acts “from spite.” Which reading fits both?'],
      options: [
        'The opening was a lie; “spite” names nothing real in him.',
        'Spite is a stance he keeps taking without becoming it.',
        'Real malice is hiding behind harmless self-mockery.',
        'Spite is his generation’s mood, not his own trait.'
      ],
      answer: 1,
      right: { label: 'YES', body: 'He acts from spite but cannot become spiteful. A stance taken up, not a trait possessed.' },
      wrong: { body: 'He blames his century for “characterless” men, but that does not explain his present act. He keeps taking up spite without becoming it.' }
    },

    { type: 'rise', to: -40 },

    { type: 'interrupt', id: 'i1',
      line: 'So now you think you understand me?',
      responses: [
        { text: 'YOU CONTRADICTED YOURSELF.', reply: 'Naturally. You were meant to notice. And?',
          aside: 'He wanted a verdict. You gave him one.' },
        { text: 'YOU WERE LYING.', reply: 'Which time?',
          aside: 'He wanted a verdict. You gave him one.' },
        { text: 'I DON’T NEED TO DECIDE YET.', reply: 'Hm.', best: true,
          aside: 'Hold the verdict. Keep reading.' }
      ]
    },

    /* ─────────────────────────── ACT II — THE TOOTHACHE ───────────────────────────
       suffering → humiliating self-consciousness → the turn toward agency */
    { type: 'act', act: 2 },

    { type: 'question', id: 'q05', scored: true, kind: 'choice', label: 'CLAIM',
      concepts: ['SUFFERING', 'SPITE'],
      quotes: [{ text: '‘Well, even in toothache there is enjoyment,’ I answer.', src: 'PART I · IV' }],
      prompt: ['The moans relieve nothing; the house listens with loathing. Where does he locate the enjoyment?'],
      options: [
        'In the relief of voicing pain instead of bearing it.',
        'In the sympathy he wrings from a sleepless house.',
        'In feeling that he suffers more deeply than they do.',
        'In the humiliation itself: futile, and seen through.'
      ],
      answer: 3,
      right: { label: 'INSIGHT', body: 'The pain happens to him. The pleasure is in being conscious of it — futile, loathed, exposed.' },
      wrong: { body: 'He says the moans do him “no sort of good.” The pleasure is in the humiliation itself.' },
      quote: { text: 'Well, in all these recognitions and disgraces it is that there lies a voluptuous pleasure.', src: 'PART I · IV' }
    },

    { type: 'question', id: 'q06', scored: true, kind: 'sequence', label: 'SEQUENCE',
      concepts: ['SUFFERING', 'SPITE'],
      prompt: ['Build the chain.'],
      hint: 'As the passage orders it, cause to pleasure. Tap a link to take it back.',
      tiles: ['MALIGNANT MOANS', 'PAIN', 'PLEASURE IN BEING SEEN THROUGH', 'CONSCIOUSNESS OF HUMILIATION'],
      answer: [1, 3, 0, 2],
      coda: ['He cannot command the tooth.', 'HE CAN COMMAND THE MOAN.'],
      right: { label: 'YES' },
      wrong: { body: 'Pain; then consciousness of its humiliation; then moans aimed at the house; then pleasure when they see through him.' },
      quote: { text: 'I am very glad that you see through me.', src: 'PART I · IV' }
    },

    { type: 'question', id: 'q07', scored: true, kind: 'choice', label: 'CLAIM',
      concepts: ['SUFFERING'],
      quotes: [{ text: 'Perhaps suffering is just as great a benefit to him as well-being?', src: 'PART I · IX' }],
      prompt: ['Where does his answer finally land?'],
      options: [
        'Suffering is the true good that reason overlooks.',
        'He sides with neither; he stands for his caprice.',
        'Suffering is an evil the Palace of Crystal will end.',
        'Suffering alone makes a person morally serious.'
      ],
      answer: 1,
      headline: 'TOO SIMPLE.',
      right: { label: 'THAT’S THE DISTINCTION', body: 'He flirts with praising suffering, then declines to take its side.' },
      wrong: { body: 'He does call man “passionately, in love with suffering” — but his answer ends elsewhere.' },
      quote: { text: 'I hold no brief for suffering nor for well-being either. I am standing for ... my caprice', src: 'PART I · IX' }
    },

    { type: 'question', id: 'q08', scored: true, kind: 'choice', label: 'CLAIM',
      concepts: ['SPITE', 'SUFFERING'],
      prompt: ['What changes in the moans after the first day?'],
      options: [
        'He moans knowing it is futile, at the household.',
        'The pain has worsened, so the moans grow louder.',
        'He doubts the pain, and moans to convince himself.',
        'He has an excuse now, and moans to escape duties.'
      ],
      answer: 0,
      right: { label: 'YES', body: 'The first moan is a reaction. The later moan is an act — known to be useless, performed anyway.' },
      wrong: { body: 'At first he moans “simply because he has toothache.” Later, knowing it does no good, he moans at them.' }
    },

    { type: 'found', title: 'CONSCIOUS SPITE', line: 'It matters that he knows.' },

    /* ─────────────────────────── ACT III — ADVANTAGE ───────────────────────────
       rational egoism → deliberate disadvantage → the most advantageous advantage */
    { type: 'act', act: 3 },

    { type: 'concept', title: 'RATIONAL EGOISM',
      body: [
        'The view he attacks:',
        'people do wrong only from ignorance of their interests. Enlighten them, and they will do good — by necessity.'
      ],
      quote: { text: 'not one man can, consciously, act against his own interests', src: 'PART I · VII' },
      note: 'Readers usually identify the target as Chernyshevsky’s What Is to Be Done? The Underground Man never names him.'
    },

    { type: 'question', id: 'q09', scored: true, kind: 'choice', label: 'CLAIM',
      concepts: ['RATIONAL EGOISM'],
      prompt: ['Which case does he himself use against the model?'],
      options: [
        'Harming oneself by mistake, misreading one’s interest.',
        'Passion overpowering reason at the decisive moment.',
        'Giving up one’s interest for a cause believed good.',
        'Understanding one’s interest, and refusing it anyway.'
      ],
      answer: 3,
      headline: 'DEFIANCE IS THE HARDER CASE.',
      right: { label: 'THE SYSTEM BREAKS HERE', body: 'Error and passion can be corrected; a good cause counts as enlightened interest. Knowing refusal cannot be absorbed.' },
      wrong: { body: 'Sacrifice is the classic objection to egoism, but not his — the model has the enlightened man “see his own advantage in the good.”' },
      quote: { text: 'men, CONSCIOUSLY, that is fully understanding their real interests, have left them in the background', src: 'PART I · VII' }
    },

    { type: 'question', id: 'q10', scored: true, kind: 'choice', label: 'CLAIM',
      concepts: ['RATIONAL EGOISM', 'FREEDOM'],
      prompt: ['He calls it the “most advantageous advantage.” By his account, why can’t it just be added to the list?'],
      options: [
        'It outweighs everything, so nothing else would count.',
        'It is escape from reckoning, including any list.',
        'It is moral; their list counts only material goods.',
        'Freedom can’t be defined precisely enough to list.'
      ],
      answer: 1,
      right: { label: 'THAT’S THE DISTINCTION', body: 'Not its weight but its kind: an advantage that escapes calculation cannot be one more item in it.' },
      wrong: { body: 'He does call it dearer than all — but that is not why it breaks the list.' },
      quote: { text: 'this strange advantage does not fall under any classification and is not in place in any list.', src: 'PART I · VII' }
    },

    { type: 'question', id: 'q11', scored: true, kind: 'choice', label: 'CLAIM',
      concepts: ['FREEDOM', 'RATIONAL EGOISM'],
      prompt: ['What does he claim people prize?'],
      options: [
        'Free choice, because it tends to make lives go better.',
        'Choice, but only when someone imposes an outcome.',
        'Choice, as a safer guide than reason to their benefit.',
        'Their own choice, above their greatest advantages.'
      ],
      answer: 3,
      right: { label: 'YES', body: 'Not choice as a route to welfare — choice above it, however wild.' },
      wrong: { body: 'The others make choice a means to some benefit. He puts it above the benefits themselves.' },
      quote: { text: 'One’s own free unfettered choice, one’s own caprice, however wild it may be, one’s own fancy worked up at times to frenzy', src: 'PART I · VII' }
    },

    { type: 'beat', lines: ['THE MOST ADVANTAGEOUS ADVANTAGE'], sub: 'THE ADVANTAGE OF BEING ABLE TO REJECT YOUR ADVANTAGES.' },

    { type: 'question', id: 'q12', scored: true, kind: 'choice', label: 'APPLICATION',
      concepts: ['FREEDOM', 'SPITE'],
      prompt: ['A man takes the option that harms him because everyone insists on the one that helps. How would the Underground Man explain it?'],
      options: [
        'He welcomes the harm as a proof of seriousness.',
        'He wants to frustrate the people pressing him.',
        'He claims a right to want even what harms him.',
        'He wants to learn whether he truly prefers it.'
      ],
      answer: 2,
      right: { label: 'INSIGHT', body: 'The harm is the price, not the point. The point is a right.' },
      wrong: { body: 'Frustrating the others is the obvious reading, not his account. He names the aim himself.' },
      quote: { text: 'simply in order to have the right to desire for himself even what is very stupid', src: 'PART I · VIII' }
    },

    { type: 'rise', to: -37 },

    { type: 'interrupt', id: 'i2',
      line: { text: 'What man wants is simply INDEPENDENT choice ...', src: 'PART I · VII' },
      responses: [
        { text: 'EVEN IF IT DESTROYS HIM?', reply: 'Especially then, perhaps.', best: true,
          aside: 'You pressed on the cost.' },
        { text: 'THEN FREEDOM IS GOOD.', reply: 'Good? I said wanted. You are the one who needs it to be good.',
          aside: 'You accepted his premise and drew the conclusion for him.' },
        { text: 'THEN REASON IS BAD.', reply: 'Bad? I said insufficient. Don’t make me simpler than I am.',
          aside: 'You accepted his premise and drew the conclusion for him.' }
      ]
    },

    /* ─────────────────────────── ACT IV — THE PIANO KEY ───────────────────────────
       caprice and the piano key → irrational ≠ free → he anticipates the objection */
    { type: 'act', act: 4 },

    { type: 'question', id: 'q13', scored: true, kind: 'choice', label: 'METAPHOR',
      concepts: ['FREEDOM', 'RATIONAL EGOISM'],
      quotes: [{ text: 'he himself is something of the nature of a piano-key or the stop of an organ', src: 'PART I · VII' }],
      prompt: ['In this passage, what does a key lack?'],
      options: [
        'A place in an instrument that gives its note meaning.',
        'Any sound not produced by its being struck.',
        'The power to be heard above the other keys.',
        'The range to play more than a single note.'
      ],
      answer: 1,
      right: { label: 'YES', body: 'A key has a place and a sound. It cannot sound of itself.' },
      wrong: { body: 'A key does have a place — that is the problem. It lacks any sound of its own.' },
      quote: { text: 'everything he does is not done by his willing it, but is done of itself, by the laws of nature.', src: 'PART I · VII' }
    },

    { type: 'question', id: 'q14', scored: true, kind: 'choice', label: 'COUNTERARGUMENT',
      concepts: ['FREEDOM'],
      prompt: ['Suppose science explains why people rebel and act from spite. Which critique of his claim is strongest?'],
      options: [
        'Defiance can be caused too; it proves no freedom.',
        'None: defiance, by its nature, cannot be explained.',
        'None: science must admit that people defy advantage.',
        'Egoism wins: spite becomes one more calculable interest.'
      ],
      answer: 0,
      headline: 'IRRATIONAL ≠ FREE.',
      right: { label: 'THAT’S THE DISTINCTION', body: 'Defying advantage and escaping causation are different things.' },
      wrong: { body: 'Inexplicable defiance is his hope, not a critique; and egoism does not simply win. Defiance, too, can have causes.' }
    },

    { type: 'question', id: 'q15', scored: true, kind: 'choice', label: 'COUNTER', voice: true,
      concepts: ['FREEDOM'],
      speech: { text: 'If you say that all this, too, can be calculated and tabulated ... then man would purposely go mad in order to be rid of reason and gain his point!', src: 'PART I · VIII' },
      prompt: ['Which critique of this move is strongest?'],
      options: [
        'Chosen madness has causes too; the problem returns.',
        'Madness is no choice, so it cannot express freedom.',
        'A predicted rebellion is no rebellion, so he loses.',
        'Chosen madness shows his will outranks reason.'
      ],
      answer: 0,
      headline: 'YOU SEPARATED HIS ARGUMENT FROM HIS CONCLUSION.',
      right: { label: 'INSIGHT', body: 'His answer to calculation is another act — and acts can be calculated.' },
      wrong: { body: 'He says “purposely,” so madness is offered as a choice. The weak point: it could be caused too.' }
    },

    { type: 'question', id: 'q16', scored: true, kind: 'choice', label: 'DISTINCTION',
      concepts: ['FREEDOM', 'RATIONAL EGOISM'],
      quotes: [{ text: 'no one is touching my free will, that all they are concerned with is that my will should of itself, of its own free will, coincide with my own normal interests', src: 'PART I · VIII' }],
      prompt: ['In this reply, what counts as a free act?'],
      options: [
        'Only acting against one’s calculated interest.',
        'Nothing, since every act follows natural law.',
        'Only what science cannot yet explain.',
        'Acting on reason, when one’s will endorses it.'
      ],
      answer: 3,
      right: { label: 'THAT’S THE DISTINCTION', body: 'For them a rational act can be fully free. The sides disagree about what freedom is.' },
      wrong: { body: 'Elsewhere they deny choice altogether — not here. Here freedom is a will that agrees with reason.' }
    },

    /* ─────────────────────────── ACT V — THE PRISON ───────────────────────────
       spite as an attempt, not a proof → rebellion that repeats and confines */
    { type: 'act', act: 5 },

    { type: 'question', id: 'q17', scored: true, kind: 'multi', label: 'MULTISELECT',
      concepts: ['SPITE', 'FREEDOM'],
      prompt: ['What can spite do for him — and to him?'],
      hint: 'Select all that apply.',
      options: [
        'Stand in for a reason to act.',
        'Let him insist his will is his own.',
        'Bring lasting relief once done.',
        'Return him to the same corner and shame.',
        'Reconcile him to the laws of nature.'
      ],
      answer: [0, 1, 3],
      right: { label: 'YES', body: 'It starts him moving and asserts his will. Then it returns him to the corner.' },
      wrong: { body: 'Three are true together. Relief and reconciliation never come.' },
      quote: { text: 'Spite, of course, might overcome everything, all my doubts, and so might serve quite successfully in place of a primary cause, precisely because it is not a cause.', src: 'PART I · V' }
    },

    { type: 'question', id: 'q18', scored: true, kind: 'choice', label: 'CLAIM',
      concepts: ['FREEDOM', 'SELF-DECEPTION'],
      quotes: [{ text: 'the whole work of man really seems to consist in nothing but proving to himself every minute that he is a man and not a piano-key!', src: 'PART I · VIII' }],
      prompt: ['Which statement fits this passage?'],
      options: [
        'Spite proves he is free: no law could require it.',
        'Spite proves he is unfree: it runs in fixed grooves.',
        'Spite settles nothing; it is only wounded pride.',
        'Spite is how he tries to feel free, every minute.'
      ],
      answer: 3,
      headline: 'AN ATTEMPT IS NOT A PROOF.',
      right: { label: 'THAT’S THE DISTINCTION', body: 'A proof renewed every minute has never been completed.' },
      wrong: { body: 'Repetition shows confinement, not proof. The passage speaks of proving it to himself — every minute.' }
    },

    { type: 'question', id: 'q19', scored: true, kind: 'choice', label: 'CLAIM',
      concepts: ['SELF-DECEPTION', 'SUFFERING'],
      quotes: [{ text: 'till at last the bitterness turned into a sort of shameful accursed sweetness, and at last—into positive real enjoyment!', src: 'PART I · II' }],
      prompt: ['By his own account, why doesn’t knowing free him?'],
      options: [
        'Deep down he doesn’t believe what he knows.',
        'He thinks his misery is deserved, and refuses relief.',
        'Consciousness breeds inertia; bitterness turns sweet.',
        'He lacks the will that simpler, active men possess.'
      ],
      answer: 2,
      right: { label: 'INSIGHT', body: 'Knowledge stalls him — then becomes a pleasure of its own.' },
      wrong: { body: 'He later doubts his words, but that is a reader’s diagnosis, not his explanation.' },
      quote: { text: 'the direct, legitimate fruit of consciousness is inertia', src: 'PART I · V' }
    },

    { type: 'beat', lines: ['KNOWING THE TRAP', 'IS NOT LEAVING IT.'], full: true },

    { type: 'question', id: 'q20', scored: true, kind: 'choice', label: 'SELF-DECEPTION',
      concepts: ['SELF-DECEPTION'],
      quotes: [{ text: 'I write only for myself, and I wish to declare once and for all that if I write as though I were addressing readers, that is simply because it is easier for me to write in that form.', src: 'PART I · XI' }],
      prompt: ['Then he asks why he calls you “gentlemen” at all. Which reading fits the whole passage?'],
      options: [
        'He sees himself clearly; each contradiction is irony.',
        'He is blind to his audience, and never notices.',
        'He writes for a real public, disguised to avoid judgment.',
        'He exposes himself, staging it for a reader he disowns.'
      ],
      answer: 3,
      right: { label: 'YOU CAUGHT THE LOOPHOLE', body: 'Self-exposure and self-protection in the same sentence.' },
      wrong: { body: 'He notices the problem himself, and the staging is not fully in his control. He exposes and performs at once.' },
      quote: { text: 'there is not one thing, not one word of what I have written that I really believe.', src: 'PART I · XI' }
    },

    { type: 'rise', to: -33 },

    /* ─────────────────────────── ACT VI — LIZA ───────────────────────────
       the philosophy inside a relationship */
    { type: 'act', act: 6 },

    { type: 'question', id: 'q21', scored: true, kind: 'choice', label: 'CLAIM',
      concepts: ['RECOGNITION'],
      prompt: ['He humiliates Liza, then breaks down in tears. What did she understand first of all?'],
      options: [
        'That he is himself unhappy.',
        'That his contempt for her is sincere.',
        'That he wants her to live with him.',
        'That he is asking her forgiveness.'
      ],
      answer: 0,
      right: { label: 'YES', body: 'She sees him. Philosophy never looked back at him; Liza does.' },
      wrong: { body: 'The narrator says exactly what she understood first of all.' },
      quote: { text: 'She understood from all this what a woman understands first of all, if she feels genuine love, that is, that I was myself unhappy.', src: 'PART II · IX' }
    },

    { type: 'question', id: 'q22', scored: true, kind: 'choice', label: 'CLAIM',
      concepts: ['RECOGNITION', 'SPITE'],
      quotes: [{ text: 'our parts now were completely changed, that she was now the heroine', src: 'PART II · IX' }],
      prompt: ['Which reading fits this passage?'],
      options: [
        'He realises he does not love her, and wants her gone.',
        'Her pity reverses their places; he must be above.',
        'He suspects her tenderness is feigned, and tests it.',
        'He fears she will tell others what she has seen.'
      ],
      answer: 1,
      right: { label: 'INSIGHT', body: 'She now sees and pities. He cannot bear a relation he does not dominate.' },
      wrong: { body: 'He could not love her — but that does not explain why being seen is unbearable. The reversal does.' },
      quote: { text: 'with me loving meant tyrannising and showing my moral superiority.', src: 'PART II · X' }
    },

    { type: 'question', id: 'q23', scored: true, kind: 'choice', label: 'CLAIM',
      concepts: ['RECOGNITION', 'SPITE'],
      quotes: [{ text: 'I will say straight out that I opened her hand and put the money in it ... from spite.', src: 'PART II · X' }],
      prompt: ['As she leaves, he presses money into her hand. Which reading fits his admission?'],
      options: [
        'It turns intimacy into a transaction, with him above.',
        'It pays her, marking honestly what the night was.',
        'It gives her the means to leave the life he condemned.',
        'It tests her love: a woman who loved would refuse.'
      ],
      answer: 0,
      right: { label: 'INSIGHT', body: 'A transaction has a ranking he can occupy. She leaves the note on the table.' },
      wrong: { body: 'He calls it a cruelty, done on purpose and “from spite” — not payment, help, or a test.' }
    },

    { type: 'question', id: 'q23b', scored: false, kind: 'choice', label: 'LOOPHOLE',
      concepts: [],
      lines: ['He says he did it from spite.', 'Then that the cruelty was affected, made up, a product of books.', 'Then he rushes after her.'],
      prompt: ['What should you notice?'],
      options: [
        'The first explanation was true; the second, an excuse.',
        'Even his cruelty cannot hold as a final definition.',
        'The second explanation was true; the first, bravado.',
        'He no longer feels any spite once she has gone.'
      ],
      answer: 1,
      right: { label: 'YOU CAUGHT THE LOOPHOLE', body: 'He revises even the cruelty. Watch the revising.' },
      wrong: { body: 'Don’t settle on either explanation. Even cruelty will not stay fixed as a definition of him.' },
      quote: { text: 'This cruelty was so affected, so purposely made up, so completely a product of the brain, of books, that I could not even keep it up a minute', src: 'PART II · X' }
    },

    { type: 'question', id: 'q24', scored: true, kind: 'choice', label: 'FINAL SURFACE CHECK', final: true,
      concepts: ['SPITE', 'FREEDOM'],
      prompt: ['What is spite in Notes from Underground? Which definition fits the whole text?'],
      options: [
        'Pleasure in wounding others, dressed up as theory.',
        'Dostoevsky’s demonstration that the will is free.',
        'Turning humiliation into agency, at his own cost.',
        'Irrationality: refusing reason for its own sake.'
      ],
      answer: 2,
      coda: ['An attempt at freedom', 'can become another prison.'],
      right: { label: 'INSIGHT' },
      wrong: { body: 'Not cruelty, not a proof, not mere irrationality: an attempt at agency that can close around him.' }
    },

    { type: 'rise', from: -43, to: -31, final: true },

    { type: 'clear' }
  ],

  /*
    REVIEW MISREADS
    Each group covers a set of source questions. A group opens when any of its
    sources was missed on the first descent. Answering a variant correctly on
    the first try recovers every missed source in the group. A wrong answer
    moves the group to its next variant; when variants run out it stays open.
  */
  review: [
    { id: 'r-free', concept: 'FREEDOM', sources: ['q14', 'q15', 'q16'],
      variants: [
        { prompt: ['A computer predicts that a man will choose the worse option just to show his independence. What problem does this create?'],
          options: [
            'He is no longer irrational, since it was foreseen.',
            'Computers abolish free will wherever they predict.',
            'Rational egoism has been disproved by his defiance.',
            'Foreseen rebellion may not show undetermined choice.'
          ],
          answer: 3,
          right: 'If rebellion can be predicted, choosing the worse option shows nothing undetermined.',
          wrong: 'It is still irrational — that is the point. Irrational and undetermined are different claims.' },
        { prompt: ['Two men choose the worse option: one by mistake, one to prove no one can dictate to him. What does the second case establish?'],
          options: [
            'That his choice escaped causes, unlike the mistake.',
            'That he is free, while the mistaken man was not.',
            'Nothing — the two cases are really identical.',
            'A motive of defiance, whose own causes remain open.'
          ],
          answer: 3,
          right: 'Defiance is a motive, and motives have causes. It shows intention, not freedom from causes.',
          wrong: 'The cases differ by a motive — but a motive is no proof of undetermined choice.' }
      ] },

    { id: 'r-spite', concept: 'SPITE', sources: ['q01', 'q02', 'q03', 'q04'],
      variants: [
        { prompt: ['A clerk knows lateness will cost him his post. He arrives late, conspicuously, and calls it his decision. Which reading fits the Underground Man’s spite?'],
          options: [
            'He misjudges how seriously lateness will be taken.',
            'He is punishing an employer who must replace him.',
            'He makes an inescapable constraint his own act.',
            'He is idle, and has found a flattering name for it.'
          ],
          answer: 2,
          right: 'He knows the cost and pays it, because paying it is his act.',
          wrong: 'Nothing is misjudged, and the employer barely suffers. He chooses the cost as his act.' },
        { prompt: ['“If you understood your own interest, you’d see a doctor.” Why doesn’t this reach him?'],
          options: [
            'He doesn’t understand his interest, and can’t be taught.',
            'He is too ill to go, however much he might wish to.',
            'He understands; the argument assumes that decides it.',
            'He has heard it from every doctor he claims to respect.'
          ],
          answer: 2,
          right: 'The argument assumes knowledge produces action. He is the counterexample.',
          wrong: 'He understands perfectly. The step from understanding to choosing is what fails.' }
      ] },

    { id: 'r-egoism', concept: 'RATIONAL EGOISM', sources: ['q09', 'q10', 'q11', 'q12'],
      variants: [
        { prompt: ['A planner calculates every citizen’s true interests correctly and supplies them. Which objection is the Underground Man’s?'],
          options: [
            'The calculations might contain harmful errors.',
            'People are too emotional to live by any plan.',
            'Such a city would cost more than anyone could pay.',
            'Some would refuse even a correct calculation.'
          ],
          answer: 3,
          right: 'Better planning fixes errors. His objection survives a perfect calculation.',
          wrong: 'Errors, emotion and cost are problems a better planner could solve.' },
        { prompt: ['“Someone who harms himself simply hasn’t understood his interests yet.” What case does this leave out?'],
          options: [
            'Someone misinformed about the consequences.',
            'Someone who understands, and refuses anyway.',
            'Someone who harms himself through carelessness.',
            'Someone who acts rationally and still fails.'
          ],
          answer: 1,
          right: 'The model absorbs error. It cannot absorb understanding followed by refusal.',
          wrong: 'Misinformation and accidents fit the defender’s explanation.' }
      ] },

    { id: 'r-self', concept: 'SELF-DECEPTION', sources: ['q03', 'q20'],
      variants: [
        { quotes: [{ text: 'one knows oneself, of course, that one is offended at nothing; that one is putting it on, but yet one brings oneself at last to the point of being really offended.', src: 'PART I · V' }],
          prompt: ['What does this show about his self-deception?'],
          options: [
            'He is lying; he never really feels offended.',
            'He knows it is staged, and it becomes real.',
            'He is unaware the offence was ever put on.',
            'He takes offence only when truly wronged.'
          ],
          answer: 1,
          right: 'Knowing a feeling is performed does not stop it from becoming his.',
          wrong: 'He knows it is put on — and it becomes real all the same.' }
      ] },

    { id: 'r-conscious', concept: 'SELF-DECEPTION', sources: ['q19', 'q18'],
      variants: [
        { prompt: ['A man can explain exactly why a habit ruins him, and keeps it. Which account fits the Underground Man?'],
          options: [
            'Consciousness can deepen paralysis, not end it.',
            'His explanation must be wrong, or it would work.',
            'Deep down he doesn’t believe his explanation.',
            'He needs more information before he can act.'
          ],
          answer: 0,
          right: 'Clearer understanding brings no release. It can make him more stuck.',
          wrong: 'The explanation can be correct and sincere. Understanding does not become action.' }
      ] },

    { id: 'r-suffer', concept: 'SUFFERING', sources: ['q05', 'q06', 'q07', 'q08'],
      variants: [
        { prompt: ['Which claim does the toothache passage NOT support?'],
          options: [
            'Suffering is good in itself.',
            'Knowing the moans are futile adds to the pleasure.',
            'The moans are partly aimed at the listeners.',
            'Later moans differ from those of the first day.'
          ],
          answer: 0,
          right: 'Pleasure in the consciousness of suffering is not the claim that suffering is good.',
          wrong: 'The other three are in the passage. The first goes beyond it.' }
      ] },

    { id: 'r-recog', concept: 'RECOGNITION', sources: ['q21', 'q22', 'q23'],
      variants: [
        { quotes: [{ text: 'I began it always with hatred and ended it with moral subjugation, and afterwards I never knew what to do with the subjugated object.', src: 'PART II · X' }],
          prompt: ['What does this imply about his treatment of Liza?'],
          options: [
            'He did not want her; his cruelty was indifference.',
            'He hated her from the start, and feigned affection.',
            'Her love could register as a contest to be won.',
            'He was protecting her from a man like himself.'
          ],
          answer: 2,
          right: 'Love is a struggle with a winner. Her tenderness could only be a threat.',
          wrong: 'He describes a pattern, not a particular hatred or a hidden kindness.' }
      ] },

    { id: 'r-prison', concept: 'FREEDOM', sources: ['q17'],
      variants: [
        { quotes: [{ text: 'it is better to do nothing! Better conscious inertia!', src: 'PART I · XI' }],
          prompt: ['Part I’s defence of caprice ends here. What has it become?'],
          options: [
            'A fixed position, as settled as the laws it defied.',
            'Proof he is free, since he chooses his own inertia.',
            'A cure, at last, for too much consciousness.',
            'A joke: he never meant the defence seriously.'
          ],
          answer: 0,
          right: 'The rebel against calculation ends in a posture that could be predicted.',
          wrong: 'Choosing inertia proves nothing, and nothing is cured.' }
      ] },

    { id: 'r-key', concept: 'RATIONAL EGOISM', sources: ['q13'],
      variants: [
        { quotes: [{ text: 'All human actions will then, of course, be tabulated according to these laws, mathematically, like tables of logarithms up to 108,000, and entered in an index', src: 'PART I · VII' }],
          prompt: ['Why is such a table a threat to him?'],
          options: [
            'It might be inaccurate, and people would suffer.',
            'Nobody would consult it; the labour is wasted.',
            'It would favour those rich enough to use it.',
            'If wants can be looked up, they aren’t yours.'
          ],
          answer: 3,
          right: 'An accurate table is worse than an inaccurate one.',
          wrong: 'Inaccuracy is the least of it. Accuracy would make the person a key.' }
      ] },

    { id: 'r-whole', concept: 'SPITE', sources: ['q24'],
      variants: [
        { prompt: ['A friend says: “So spite is just irrationality.” What is missing?'],
          options: [
            'Nothing: irrationality is the whole of it.',
            'An aim: turning powerlessness into agency.',
            'Spite is secretly rational, a long-term gain.',
            'Spite is anger at others, not at reason.'
          ],
          answer: 1,
          right: 'Irrationality names what the act lacks. Spite also has an aim.',
          wrong: 'Spite is aimed at something: turning helplessness into agency.' }
      ] }
  ]
});
