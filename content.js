/*
  UNDERGROUND — chamber content.

  Everything a chamber says lives here; app.js only knows how to stage it.
  A future chamber is another entry in UNDERGROUND.chambers with the same shape.

  QUOTATIONS
  Anything written as { text, src } is a verbatim excerpt from Constance
  Garnett's translation of Notes from Underground (the copy in this repository,
  notes-from-the-underground.pdf). `src` is the part and chapter, shown as a
  small tag. Within `text`, " ... " marks an omission; each piece between
  omissions must appear in the novel exactly, in order. The check lives in
  tools/verify-quotes.js.
  Plain strings spoken by the Underground Man are game-authored dialogue and are
  never styled as quotations.

  Step types
    act        — quiet act change (updates the header, no splash)
    concept    — non-scored explanatory card
    question   — scored interaction (scored: true) or unscored (scored: false)
    beat       — short full-screen reveal
    found      — "CONCEPT FOUND" reveal
    interrupt  — the Underground Man addresses the player (never scored)
    rise       — depth animates upward
    clear      — chamber completion

  Question kinds
    choice     — single answer            (answer: index)
    multi      — select all that apply    (answer: [indices])
    sequence   — tap tiles into order     (answer: [tile indices in order])

  Every scored question is tagged with one or more concepts; mastery is
  computed from first-attempt correctness over those tags.
*/

window.UNDERGROUND = {
  contentVersion: 2,

  concepts: ['SPITE', 'FREEDOM', 'RATIONAL EGOISM', 'SELF-DECEPTION', 'SUFFERING', 'RECOGNITION'],

  chambers: [
    { id: 'note',      n: '01', name: 'THE NOTE FROM BELOW', playable: false },
    { id: 'conscious', n: '02', name: 'TOO CONSCIOUS',       playable: false },
    { id: 'formula',   n: '03', name: 'THE FORMULA',         playable: false },
    { id: 'advantage', n: '04', name: 'THE ADVANTAGE',       playable: false },
    { id: 'spite',     n: '05', name: 'SPITE',               playable: true,
      question: 'Why hurt yourself when you know better?',
      startDepth: -43, endDepth: -31 },
    { id: 'wall',      n: '06', name: 'THE WALL',            playable: false },
    { id: 'liza',      n: '07', name: 'LIZA',                playable: false },
    { id: 'surface',   n: '08', name: 'SURFACE',             playable: false }
  ],

  acts: {
    1: 'ACT I — FROM SPITE',
    2: 'ACT II — THE TOOTHACHE',
    3: 'ACT III — ADVANTAGE',
    4: 'ACT IV — THE PIANO KEY',
    5: 'ACT V — THE PRISON',
    6: 'ACT VI — LIZA'
  },

  spite: {
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
        prompt: [
          'He believes his liver is diseased. He says he respects medicine.',
          'Against whom is this spite directed?'
        ],
        options: [
          'The doctors, whose authority he resents even while claiming to respect it.',
          'Himself, as a punishment he feels he has earned by his past conduct.',
          'No one he can name: he knows he is injuring himself and no one else.',
          'The reader, whom this opening confession is designed to provoke.'
        ],
        answer: 2,
        right: { label: 'INSIGHT', body: 'He cannot say whom he is mortifying. The only one injured is himself, and he knows it. Spite without a target is no longer simple hostility.' },
        wrong: { body: 'He rules out the doctors himself, and he never calls it a punishment. The spite has no one to injure but him, and he chooses it knowing that.' },
        quote: { text: 'I am perfectly well aware that I cannot ‘pay out’ the doctors by not consulting them; I know better than anyone that by all this I am only injuring myself and no one else.', src: 'PART I · I' }
      },

      { type: 'question', id: 'q02', scored: true, kind: 'choice', label: 'CLAIM',
        concepts: ['SPITE', 'RATIONAL EGOISM'],
        prompt: ['What makes this more than an ordinary bad decision?'],
        options: [
          'He has judged his interest correctly, and the judgment does not settle his choice.',
          'He has misjudged the risk, and better information would change his mind.',
          'He secretly wants the illness, since it justifies the bitterness he already feels.',
          'He is refusing on principle, out of a moral objection he has not yet stated.'
        ],
        answer: 0,
        headline: 'KNOWING IS NOT CHOOSING.',
        right: { label: 'THE SYSTEM BREAKS HERE', body: 'A mistake can be corrected with better information. His information is already correct.' },
        wrong: { body: 'Nothing in the passage is misjudged, wanted, or principled. He sees his interest clearly — “My liver is bad, well—let it get worse!” — and the seeing decides nothing.' }
      },

      { type: 'question', id: 'q03', scored: true, kind: 'choice', label: 'CONTRADICTION',
        concepts: ['SELF-DECEPTION', 'SPITE'],
        quotes: [
          { text: 'I was a spiteful official.', src: 'PART I · I' },
          { text: 'I was lying when I said just now that I was a spiteful official. I was lying from spite.', src: 'PART I · I' }
        ],
        prompt: ['What is the most careful way to read the retraction?'],
        options: [
          'The retraction is the real confession: the spite was a pose, and he now admits it.',
          'The first line is the real confession; the retraction only provokes the reader.',
          'The retraction is itself made “from spite,” so it performs what it denies.',
          'Once he admits to lying, the notes are evidence of his style and not of himself.'
        ],
        answer: 2,
        headline: 'UNRELIABLE DOES NOT MEAN MEANINGLESS.',
        right: { label: 'YOU CAUGHT THE LOOPHOLE', body: 'He takes back the claim to spite — and says he took it back from spite. The contradiction is not noise. It is the evidence.' },
        wrong: { body: 'Choosing one line lets him off the hook; discarding both does too. Look at how the retraction is made: “from spite.” It repeats the act it denies.' }
      },

      { type: 'question', id: 'q04', scored: true, kind: 'choice', label: 'CLAIM',
        concepts: ['SPITE', 'FREEDOM'],
        quotes: [{ text: 'I did not know how to become anything; neither spiteful nor kind, neither a rascal nor an honest man, neither a hero nor an insect.', src: 'PART I · I' }],
        prompt: [
          'He opened with “I am a spiteful man.” Now he says he never could become spiteful.',
          'What does this do to the word?'
        ],
        options: [
          'It exposes the opening as a lie, so that “spite” names nothing real in him.',
          'It makes spite a stance he keeps taking up without becoming what it names.',
          'It shows real malice hidden behind a show of harmless self-mockery.',
          'It makes spite a mood of his whole generation rather than a trait of his.'
        ],
        answer: 1,
        right: { label: 'YES', body: 'He keeps acting “from spite,” yet cannot become spiteful. Treat spite as a working interpretation: a stance taken up, not a settled trait.' },
        wrong: { body: 'He goes on acting from spite, so the word still names something — but not a character he possesses. Spite is a stance he keeps adopting and cannot fully become.' }
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
        prompt: [
          'The educated man’s moans relieve nothing, and his whole household listens with loathing.',
          'Where, by the Underground Man’s account, does the enjoyment lie?'
        ],
        options: [
          'In a relief that comes from voicing the pain instead of bearing it silently.',
          'In the sympathy he can wring from a household that would rather be asleep.',
          'In the reassurance that he suffers more deeply than anyone around him.',
          'In the humiliation itself: knowing it is futile, and being seen through.'
        ],
        answer: 3,
        right: { label: 'INSIGHT', body: ['The pain happens to him. The consciousness of it — futile, loathed, exposed — is where the pleasure lives.'] },
        wrong: { body: 'He says the moans do him “no sort of good” and that the family listens “with loathing.” The pleasure is in the humiliation itself, consciously undergone.' },
        quote: { text: 'Well, in all these recognitions and disgraces it is that there lies a voluptuous pleasure.', src: 'PART I · IV' }
      },

      { type: 'question', id: 'q06', scored: true, kind: 'sequence', label: 'SEQUENCE',
        concepts: ['SUFFERING', 'SPITE'],
        prompt: ['Build the chain.'],
        hint: 'Tap the links in order. Tap a placed link to take it back.',
        tiles: ['MALIGNANT MOANS', 'PAIN', 'PLEASURE IN BEING SEEN THROUGH', 'CONSCIOUSNESS OF HUMILIATION'],
        answer: [1, 3, 0, 2],
        coda: ['He cannot command the tooth.', 'HE CAN COMMAND THE MOAN.'],
        right: { label: 'YES' },
        wrong: { body: 'Pain comes first; consciousness finds it humiliating; the moans broadcast that humiliation to the household; and the pleasure arrives when they see through him.' },
        quote: { text: 'I am very glad that you see through me.', src: 'PART I · IV' }
      },

      { type: 'question', id: 'q07', scored: true, kind: 'choice', label: 'CLAIM',
        concepts: ['SUFFERING'],
        quotes: [{ text: 'Perhaps suffering is just as great a benefit to him as well-being?', src: 'PART I · IX' }],
        prompt: ['Later he asks this outright. Does he go on to argue that suffering is good?'],
        options: [
          'Yes: he concludes that suffering is the true good that reason overlooks.',
          'No: he refuses to side with suffering; what he defends is his own caprice.',
          'No: he treats suffering as an evil that the Palace of Crystal will abolish.',
          'Yes: suffering is good because it alone makes a person morally serious.'
        ],
        answer: 1,
        headline: 'TOO SIMPLE.',
        right: { label: 'THAT’S THE DISTINCTION', body: 'He flirts with the praise of suffering, then declines to take its side. Suffering matters to him because it belongs to consciousness and choice — not because it is good.' },
        wrong: { body: 'He can prize suffering without calling it good. He says so plainly, and names what he is really defending.' },
        quote: { text: 'I hold no brief for suffering nor for well-being either. I am standing for ... my caprice', src: 'PART I · IX' }
      },

      { type: 'question', id: 'q08', scored: true, kind: 'choice', label: 'CLAIM',
        concepts: ['SPITE', 'SUFFERING'],
        prompt: [
          'He contrasts the moans of the first day with the moans of the second or third.',
          'What has changed?'
        ],
        options: [
          'He moans knowing it helps nothing, and aims the moans at the household.',
          'The pain has worsened, so the moans have grown louder and more frequent.',
          'He has begun to doubt the pain is real, and moans to convince himself.',
          'He has found a medical excuse, and moans to be released from his duties.'
        ],
        answer: 0,
        right: { label: 'YES', body: 'The first day’s moan is a reaction to pain. The later moan is an act — useless, and known to be useless, and performed anyway.' },
        wrong: { body: 'The first day he moans “simply because he has toothache.” Later he moans knowing it does him no good, and at the people who must hear it.' }
      },

      { type: 'found', title: 'CONSCIOUS SPITE', line: 'It matters that he knows.' },

      /* ─────────────────────────── ACT III — ADVANTAGE ───────────────────────────
         rational egoism → deliberate disadvantage → the most advantageous advantage */
      { type: 'act', act: 3 },

      { type: 'concept', title: 'RATIONAL EGOISM',
        body: [
          'The view he attacks:',
          'people do wrong only because they misunderstand their interests. Enlighten them, and they will do good — by necessity.'
        ],
        quote: { text: 'not one man can, consciously, act against his own interests', src: 'PART I · VII' },
        note: 'Readers usually identify the target as Chernyshevsky’s novel What Is to Be Done? The Underground Man never names him.'
      },

      { type: 'question', id: 'q09', scored: true, kind: 'choice', label: 'CLAIM',
        concepts: ['RATIONAL EGOISM'],
        prompt: ['Which person creates the hardest problem for that model?'],
        options: [
          'Someone who harms himself by mistake, having misread where his interest lay.',
          'Someone whose passion overpowers his reason at the decisive moment.',
          'Someone who gives up his own interest for a cause he believes is good.',
          'Someone who grasps his interest and turns from it to keep the choice his.'
        ],
        answer: 3,
        headline: 'DEFIANCE IS THE HARDER CASE.',
        right: { label: 'THE SYSTEM BREAKS HERE', body: 'Mistakes and passions can be treated as errors to correct. The enlightened egoist can even see his advantage in a good cause. Knowing refusal cannot be absorbed.' },
        wrong: { body: 'Error and passion fit the model as defects to be educated away, and a good cause fits it as enlightened interest. The hard case is someone who understands — and refuses.' },
        quote: { text: 'men, CONSCIOUSLY, that is fully understanding their real interests, have left them in the background', src: 'PART I · VII' }
      },

      { type: 'question', id: 'q10', scored: true, kind: 'choice', label: 'CLAIM',
        concepts: ['RATIONAL EGOISM', 'FREEDOM'],
        prompt: [
          'He calls independent choice the “most advantageous advantage.”',
          'His opponents could simply add it to their list of advantages. Why, by his account, would that fail?'
        ],
        options: [
          'It is worth more than all the rest, so every other entry would stop mattering.',
          'It consists in not being bound by any reckoning — including one that lists it.',
          'It is a moral good, while their list counts only material goods like wealth.',
          'No one can define freedom precisely enough to give it a place on any list.'
        ],
        answer: 1,
        right: { label: 'THAT’S THE DISTINCTION', body: 'The problem is not its weight but its kind. An advantage that consists in escaping calculation cannot be one more item in the calculation.' },
        wrong: { body: 'He does say it is dearer than all the rest — but that is not why it breaks the list. It breaks the list because it is the freedom not to be reckoned.' },
        quote: { text: 'this strange advantage does not fall under any classification and is not in place in any list.', src: 'PART I · VII' }
      },

      { type: 'question', id: 'q11', scored: true, kind: 'choice', label: 'CLAIM',
        concepts: ['FREEDOM', 'RATIONAL EGOISM'],
        prompt: ['Which is the most accurate statement of his claim?'],
        options: [
          'People who choose freely tend, over a lifetime, to fare better than those who don’t.',
          'Choice matters only when some authority is trying to impose an outcome on us.',
          'Reason is usually wrong about what benefits people, so choice is the safer guide.',
          'Almost everyone holds something dearer than his greatest advantages: his own choice.'
        ],
        answer: 3,
        right: { label: 'YES', body: 'He does not defend choice as a better route to welfare. He puts it above welfare — and says it can be a wild caprice.' },
        wrong: { body: 'Each of the others turns choice into a means to some further good. His claim is that choice is prized above the goods themselves.' },
        quote: { text: 'One’s own free unfettered choice, one’s own caprice, however wild it may be, one’s own fancy worked up at times to frenzy', src: 'PART I · VII' }
      },

      { type: 'beat', lines: ['THE MOST ADVANTAGEOUS ADVANTAGE'], sub: 'THE ADVANTAGE OF BEING ABLE TO REJECT YOUR ADVANTAGES.' },

      { type: 'question', id: 'q12', scored: true, kind: 'choice', label: 'APPLICATION',
        concepts: ['FREEDOM', 'SPITE'],
        prompt: [
          'A man is given two options. A clearly benefits him. B clearly harms him.',
          'He chooses B because everyone insists he must choose A.',
          'For the Underground Man, what matters most in this choice?'
        ],
        options: [
          'The harm itself, which he has come to welcome as a proof of seriousness.',
          'The satisfaction of frustrating the people who pressed him to choose A.',
          'The chance to show that his wanting cannot be dictated by his advantage.',
          'The discovery of whether he truly prefers B, which only trying can reveal.'
        ],
        answer: 2,
        right: { label: 'INSIGHT', body: 'The harm is the price, not the point. The point is the right to want for himself.' },
        wrong: { body: 'Neither the harm nor the others’ frustration is the aim. He names the aim himself, and it is a right, not an outcome.' },
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
        prompt: ['What would a piano key lack that he refuses to lose?'],
        options: [
          'A place in a larger instrument that gives its single sound a meaning.',
          'The power to sound except when struck, as the instrument dictates.',
          'The ability to be heard distinctly above the other keys around it.',
          'The range to play more than one note in the course of a whole piece.'
        ],
        answer: 1,
        right: { label: 'YES', body: 'A key has a place, and a sound, and it can ring out. What it cannot do is sound of itself.' },
        wrong: { body: 'A key has a place in the instrument; that is the problem, not the loss. What it lacks is any sound that is not produced by being struck.' },
        quote: { text: 'everything he does is not done by his willing it, but is done of itself, by the laws of nature.', src: 'PART I · VII' }
      },

      { type: 'question', id: 'q14', scored: true, kind: 'choice', label: 'COUNTERARGUMENT',
        concepts: ['FREEDOM'],
        prompt: [
          'Suppose science one day explains why people rebel, sabotage themselves, and act from spite.',
          'What follows for his argument?'
        ],
        options: [
          'Rebellion could be caused like anything else; defiance alone proves no freedom.',
          'Nothing follows: an act that defies reason cannot, by its nature, be explained.',
          'His argument wins, since science would have to concede that people defy advantage.',
          'Rational egoism wins outright, since spite becomes one more calculable interest.'
        ],
        answer: 0,
        headline: 'IRRATIONAL ≠ FREE.',
        right: { label: 'THAT’S THE DISTINCTION', body: 'Defying advantage and escaping causation are different achievements. The first does not deliver the second.' },
        wrong: { body: 'Explanation would not make rebellion vanish, and it would not hand rational egoism a victory. It would show that defiance, too, can have causes.' }
      },

      { type: 'question', id: 'q15', scored: true, kind: 'choice', label: 'COUNTER', voice: true,
        concepts: ['FREEDOM'],
        speech: { text: 'If you say that all this, too, can be calculated and tabulated ... then man would purposely go mad in order to be rid of reason and gain his point!', src: 'PART I · VIII' },
        prompt: ['He has already anticipated your objection. What is the strongest reply?'],
        options: [
          'Deliberate madness is still an event with causes; the same problem returns.',
          'Madness is not a choice at all, so it cannot be offered as a use of freedom.',
          'If his rebellion can be predicted it is not rebellion, so he loses at once.',
          'Going mad on purpose shows that his will is stronger than any reasoning.'
        ],
        answer: 0,
        headline: 'YOU SEPARATED HIS ARGUMENT FROM HIS CONCLUSION.',
        right: { label: 'INSIGHT', body: 'His answer to calculation is another act — and any act can be calculated. The regress restarts; it does not end.' },
        wrong: { body: 'He says “purposely,” so madness is offered as a choice, and a predicted rebellion is still a rebellion. The weak point is that deliberate madness could be caused too.' }
      },

      { type: 'question', id: 'q16', scored: true, kind: 'choice', label: 'DISTINCTION',
        concepts: ['FREEDOM', 'RATIONAL EGOISM'],
        quotes: [{ text: 'no one is touching my free will, that all they are concerned with is that my will should of itself, of its own free will, coincide with my own normal interests', src: 'PART I · VIII' }],
        prompt: ['This is his opponents’ reply. On their view, which act could be free?'],
        options: [
          'Only an act that goes against what the agent has calculated to be his interest.',
          'No act at all, since every act follows from the laws of nature.',
          'Only an act whose causes remain unknown to science.',
          'An act that follows reason, when the agent’s own will endorses it.'
        ],
        answer: 3,
        right: { label: 'THAT’S THE DISTINCTION', body: 'For them, a rational act can be fully free. The two sides are not only arguing about whether we are free — they disagree about what freedom is.' },
        wrong: { body: 'His opponents do not deny freedom; they locate it in reason. On their view a will that freely agrees with its interests is free. Rational and free are separate questions.' }
      },

      /* ─────────────────────────── ACT V — THE PRISON ───────────────────────────
         spite as an attempt, not a proof → rebellion that repeats and confines */
      { type: 'act', act: 5 },

      { type: 'question', id: 'q17', scored: true, kind: 'multi', label: 'MULTISELECT',
        concepts: ['SPITE', 'FREEDOM'],
        prompt: ['Across the notes, what does spite do for him — and to him?'],
        hint: 'Select all that apply.',
        options: [
          'It lets him act when reflection has left him no reason to act.',
          'It gives him a way to insist that his will is his own.',
          'It brings him lasting relief once the spiteful act is done.',
          'It returns him, again and again, to the same corner and the same shame.',
          'It reconciles him, at last, to the laws of nature he rails against.'
        ],
        answer: [0, 1, 3],
        right: { label: 'YES', body: 'Spite starts him moving when reflection has stalled him, and lets him insist on his will. Then it returns him to the corner. It never brings relief or reconciliation.' },
        wrong: { body: 'Three are true together. Spite stands in for a reason to act and asserts his will — and each time it ends in the same shame. Relief and reconciliation never come.' },
        quote: { text: 'Spite, of course, might overcome everything, all my doubts, and so might serve quite successfully in place of a primary cause, precisely because it is not a cause.', src: 'PART I · V' }
      },

      { type: 'question', id: 'q18', scored: true, kind: 'choice', label: 'CLAIM',
        concepts: ['FREEDOM', 'SELF-DECEPTION'],
        quotes: [{ text: 'the whole work of man really seems to consist in nothing but proving to himself every minute that he is a man and not a piano-key!', src: 'PART I · VIII' }],
        prompt: ['Which statement is most defensible?'],
        options: [
          'Spite proves he is free, since no law of nature could have required it of him.',
          'Spite proves he is unfree, since it runs in grooves as fixed as any law.',
          'Spite settles nothing about freedom; it is only wounded pride at work.',
          'Spite is how he tries to feel free — a proof he has to renew every minute.'
        ],
        answer: 3,
        headline: 'AN ATTEMPT IS NOT A PROOF.',
        right: { label: 'THAT’S THE DISTINCTION', body: 'He says it himself: the proof must be made to himself, every minute. A proof that has to be renewed every minute has never been completed.' },
        wrong: { body: 'Neither proof holds, and pride is too small a word for it. Spite is an attempt to experience freedom — one he must keep repeating because it never settles the question.' }
      },

      { type: 'question', id: 'q19', scored: true, kind: 'choice', label: 'CLAIM',
        concepts: ['SELF-DECEPTION', 'SUFFERING'],
        quotes: [{ text: 'till at last the bitterness turned into a sort of shameful accursed sweetness, and at last—into positive real enjoyment!', src: 'PART I · II' }],
        prompt: ['He understands that his conduct is destructive. Why doesn’t that knowledge free him?'],
        options: [
          'His knowledge is only intellectual; deep down he does not believe it.',
          'He thinks his misery is deserved, and so refuses the relief change would bring.',
          'Consciousness breeds inertia, and he learns to enjoy his own degradation.',
          'He lacks the willpower that ordinary, less reflective people possess.'
        ],
        answer: 2,
        right: { label: 'INSIGHT', body: 'Knowledge does not merely fail to free him. It stalls him — and then becomes a pleasure of its own.' },
        wrong: { body: 'He believes what he knows, and he never claims to deserve his misery. He says that consciousness itself produces inertia — and that its bitterness turns sweet.' },
        quote: { text: 'the direct, legitimate fruit of consciousness is inertia', src: 'PART I · V' }
      },

      { type: 'beat', lines: ['KNOWING THE TRAP', 'IS NOT LEAVING IT.'], full: true },

      { type: 'question', id: 'q20', scored: true, kind: 'choice', label: 'SELF-DECEPTION',
        concepts: ['SELF-DECEPTION'],
        quotes: [{ text: 'I write only for myself, and I wish to declare once and for all that if I write as though I were addressing readers, that is simply because it is easier for me to write in that form.', src: 'PART I · XI' }],
        prompt: ['Moments later he asks why he calls you “gentlemen” at all. What best describes how he presents himself?'],
        options: [
          'He sees himself with complete clarity; each contradiction is deliberate irony.',
          'He deceives himself about having an audience and never notices the problem.',
          'He writes for a real public, and disguises this so that he cannot be judged.',
          'He exposes himself ruthlessly, staging the exposure for a reader he disowns.'
        ],
        answer: 3,
        right: { label: 'YOU CAUGHT THE LOOPHOLE', body: 'Each confession exposes him, and each is staged for someone. Self-exposure and self-protection happen in the same sentence.' },
        wrong: { body: 'He notices the problem himself, so it is not blindness; and the staging is not fully under control, so it is not pure irony either. He exposes and performs at once.' },
        quote: { text: 'there is not one thing, not one word of what I have written that I really believe.', src: 'PART I · XI' }
      },

      { type: 'rise', to: -33 },

      /* ─────────────────────────── ACT VI — LIZA ───────────────────────────
         the philosophy inside a relationship */
      { type: 'act', act: 6 },

      { type: 'question', id: 'q21', scored: true, kind: 'choice', label: 'CLAIM',
        concepts: ['RECOGNITION'],
        prompt: [
          'Liza comes to his rooms. He humiliates her, then breaks down in tears.',
          'She does not answer his cruelty in kind. What does she grasp?'
        ],
        options: [
          'That he is himself unhappy — she sees past the performance to the man.',
          'That his contempt for her is sincere, and she must leave with her dignity.',
          'That he wants her to give up her life and come to live with him.',
          'That he regrets his cruelty and is asking her, in his way, for forgiveness.'
        ],
        answer: 0,
        right: { label: 'YES', body: 'She sees him. Abstract philosophy never looked back at him; Liza does, and her seeing makes a claim on him.' },
        wrong: { body: 'She is not deceived by the contempt, and she is not receiving an apology. The narrator says what she understood first of all.' },
        quote: { text: 'She understood from all this what a woman understands first of all, if she feels genuine love, that is, that I was myself unhappy.', src: 'PART II · IX' }
      },

      { type: 'question', id: 'q22', scored: true, kind: 'choice', label: 'CLAIM',
        concepts: ['RECOGNITION', 'SPITE'],
        quotes: [{ text: 'our parts now were completely changed, that she was now the heroine', src: 'PART II · IX' }],
        prompt: ['Why does being seen this way turn him against her?'],
        options: [
          'He realises he does not love her, and wants her to understand that quickly.',
          'Her pity reverses their positions; he can bear her from above, not below.',
          'He suspects her tenderness is feigned, and sets out to expose it.',
          'He fears she will tell others what she has seen of his life in these rooms.'
        ],
        answer: 1,
        right: { label: 'INSIGHT', body: 'In the brothel he stood above her. Now she is the one who sees and pities. He cannot bear a relation he does not dominate.' },
        wrong: { body: 'Nothing suggests he doubts her or fears gossip. The reversal itself is intolerable — he says what loving meant for him.' },
        quote: { text: 'with me loving meant tyrannising and showing my moral superiority.', src: 'PART II · X' }
      },

      { type: 'question', id: 'q23', scored: true, kind: 'choice', label: 'CLAIM',
        concepts: ['RECOGNITION', 'SPITE'],
        quotes: [{ text: 'I will say straight out that I opened her hand and put the money in it ... from spite.', src: 'PART II · X' }],
        prompt: ['After their encounter, as she leaves, he presses money into her hand. What does the money do?'],
        options: [
          'It turns intimacy back into a transaction, and puts him above her again.',
          'It pays her, and so marks honestly what their encounter had been.',
          'It offers her the means to leave the life he had urged her to leave.',
          'It tests whether she came for love, since a woman who loved would refuse it.'
        ],
        answer: 0,
        right: { label: 'INSIGHT', body: 'A transaction has a ranking he knows how to occupy. She leaves the note on the table.' },
        wrong: { body: 'He calls it a cruelty, done on purpose and “from spite” — not payment, help, or a test. The money restores the hierarchy that her tenderness had dissolved.' }
      },

      { type: 'question', id: 'q23b', scored: false, kind: 'choice', label: 'LOOPHOLE',
        concepts: [],
        lines: ['He says he did it from spite.', 'Then that the cruelty was affected, made up, a product of books.', 'Then he rushes after her.'],
        prompt: ['What should you notice?'],
        options: [
          'The first explanation was true, and the second is an excuse.',
          'Even his cruelty cannot hold as a final definition of him.',
          'The second explanation was true, and the first was bravado.',
          'He no longer feels any spite once she has gone.'
        ],
        answer: 1,
        right: { label: 'YOU CAUGHT THE LOOPHOLE', body: 'He revises even the cruelty. Watch the revising, not any single explanation.' },
        wrong: { body: 'Don’t settle on the first or the second explanation. Watch the revision itself: even cruelty does not stay fixed as a definition of him.' },
        quote: { text: 'This cruelty was so affected, so purposely made up, so completely a product of the brain, of books, that I could not even keep it up a minute', src: 'PART II · X' }
      },

      { type: 'question', id: 'q24', scored: true, kind: 'choice', label: 'FINAL SURFACE CHECK', final: true,
        concepts: ['SPITE', 'FREEDOM'],
        prompt: ['What is spite in Notes from Underground?'],
        options: [
          'The pleasure of wounding others, dressed up afterwards as a theory of freedom.',
          'Dostoevsky’s own demonstration, through his narrator, that the will is free.',
          'An attempt to turn humiliation and powerlessness into agency, at his own cost.',
          'Irrationality under another name: the refusal of reason for its own sake.'
        ],
        answer: 2,
        coda: ['An attempt at freedom', 'can become another prison.'],
        right: { label: 'INSIGHT' },
        wrong: { body: 'Spite is neither simple cruelty nor a proof, and it is aimed at something, which irrationality alone is not. It is an attempt to make powerlessness into agency — and the attempt can close around him.' }
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
          { prompt: [
              'A computer perfectly predicts that a man will deliberately choose the worse option simply to demonstrate his independence.',
              'What problem does this create for his claim?'
            ],
            options: [
              'He is no longer acting irrationally, since the choice was foreseen.',
              'Computers eliminate free will wherever they are able to predict.',
              'Rational egoism has now been disproved by the man’s defiance.',
              'Predictable rebellion may still fail to show undetermined choice.'
            ],
            answer: 3,
            right: 'If the rebellion can be predicted, choosing the worse option does not show that the choice was undetermined.',
            wrong: 'The rebellion is still irrational, and that is the point. Irrational and undetermined are different claims, and the prediction separates them.' },
          { prompt: [
              'Two people each choose the worse option.',
              'One does it by mistake. The other does it deliberately, to prove no one can dictate to him.',
              'What does the second case establish that the first does not?'
            ],
            options: [
              'That his choice escaped causes altogether, unlike the other man’s mistake.',
              'That he is free, while the man who merely made a mistake was not.',
              'Nothing at all — in the end the two cases are really identical.',
              'That he acts from defiance — a motive whose own causes remain open.'
            ],
            answer: 3,
            right: 'Defiance is a motive, and motives can have causes. The deliberate case shows intention, not freedom from causes.',
            wrong: 'The cases differ: one has a motive of defiance. But a motive is not proof of undetermined choice.' }
        ] },

      { id: 'r-spite', concept: 'SPITE', sources: ['q01', 'q02', 'q03', 'q04'],
        variants: [
          { prompt: [
              'A clerk knows that arriving late will cost him his post. He could arrive on time.',
              'He arrives late, slowly and conspicuously, and tells himself the decision was his.',
              'Which reading best fits the Underground Man’s spite?'
            ],
            options: [
              'He has misjudged how seriously his employer will take another lateness.',
              'He is punishing an employer who will now have the trouble of replacing him.',
              'He turns a constraint he cannot escape into an act that is his own.',
              'He is idle, and has found a more flattering name for his idleness.'
            ],
            answer: 2,
            right: 'He knows the cost and pays it, because paying it is his act.',
            wrong: 'He has not misjudged anything, and the employer barely suffers. What makes it spite is that he knows the cost and chooses it as his act.' },
          { prompt: [
              'Someone tells the Underground Man: “If you understood your own interest, you’d see a doctor.”',
              'Why doesn’t this argument reach him?'
            ],
            options: [
              'He does not understand his interest, and no argument will teach him.',
              'He is too ill to go, however much he might wish to follow the advice.',
              'He understands it; the argument assumes that understanding decides.',
              'He has heard the same advice from every doctor he claims to respect.'
            ],
            answer: 2,
            right: 'The argument assumes knowledge produces action. His case is the counterexample.',
            wrong: 'He understands perfectly. What fails is the step from understanding to choosing.' }
        ] },

      { id: 'r-egoism', concept: 'RATIONAL EGOISM', sources: ['q09', 'q10', 'q11', 'q12'],
        variants: [
          { prompt: [
              'A planner designs a city in which every citizen’s true interests are calculated correctly and supplied.',
              'Which objection belongs to the Underground Man?'
            ],
            options: [
              'The calculations might contain errors that end up harming the very people served.',
              'People are too emotional to live by any plan, however correct the plan might be.',
              'Such a city would cost more than any society could ever afford to build and run.',
              'Some will reject even a correct calculation, because being calculated is the loss.'
            ],
            answer: 3,
            right: 'Better calculations would fix errors. His objection holds even if the calculation is perfect.',
            wrong: 'Errors, emotions and cost are problems a better planner could solve. His objection holds even when the calculation is perfect.' },
          { prompt: [
              'A defender of rational egoism says: “Someone who harms himself simply hasn’t understood his interests yet.”',
              'What case does this leave out?'
            ],
            options: [
              'A person who is misinformed about the likely consequences of his own choice.',
              'A person who grasps his interests and rejects them to keep the choice his.',
              'A person who harms himself by accident, through carelessness or haste.',
              'A person who acts rationally and is defeated anyway by bad circumstances.'
            ],
            answer: 1,
            right: 'The model can absorb error. It struggles with understanding followed by refusal.',
            wrong: 'Misinformation and accidents fit the defender’s explanation. The case left out is someone who understands and refuses anyway.' }
        ] },

      { id: 'r-self', concept: 'SELF-DECEPTION', sources: ['q03', 'q20'],
        variants: [
          { quotes: [{ text: 'one knows oneself, of course, that one is offended at nothing; that one is putting it on, but yet one brings oneself at last to the point of being really offended.', src: 'PART I · V' }],
            prompt: ['What does this show about his self-deception?'],
            options: [
              'He is lying: he never really feels the offence he describes.',
              'He knows the feeling is staged, and it becomes real anyway.',
              'He is unaware that the offence was ever put on.',
              'He takes offence only when someone has in fact wronged him.'
            ],
            answer: 1,
            right: 'Knowing that a feeling is performed does not stop it from becoming his. Awareness is no protection against his own performance.',
            wrong: 'He knows it is put on — and it becomes real all the same. That is the peculiar shape of his self-deception.' }
        ] },

      { id: 'r-conscious', concept: 'SELF-DECEPTION', sources: ['q19', 'q18'],
        variants: [
          { prompt: [
              'A man can explain precisely why a habit is ruining him. He continues the habit.',
              'Which account fits the Underground Man?'
            ],
            options: [
              'Heightened consciousness can deepen paralysis instead of ending it.',
              'His explanation must be wrong, or it would already have changed him.',
              'Deep down he does not believe the explanation he gives.',
              'He needs more information before he can decide what to do.'
            ],
            answer: 0,
            right: 'For him, clearer understanding brings no release. It can make him more stuck.',
            wrong: 'The explanation can be correct and sincere. The problem is that understanding does not become the ability to act.' }
        ] },

      { id: 'r-suffer', concept: 'SUFFERING', sources: ['q05', 'q06', 'q07', 'q08'],
        variants: [
          { prompt: ['Which conclusion does the toothache passage NOT support?'],
            options: [
              'Suffering is good in itself, apart from the consciousness it produces.',
              'Knowing the moaning is futile is part of what makes it pleasurable.',
              'The moaning is partly aimed at the people who must listen to it.',
              'The educated man’s later moans differ from those of the first day of pain.'
            ],
            answer: 0,
            right: 'The passage shows pleasure taken in the consciousness of suffering. That is not the claim that suffering is good in itself.',
            wrong: 'The other three are in the passage. Pleasure in the consciousness of humiliation does not make suffering good in itself.' }
        ] },

      { id: 'r-recog', concept: 'RECOGNITION', sources: ['q21', 'q22', 'q23'],
        variants: [
          { quotes: [{ text: 'I began it always with hatred and ended it with moral subjugation, and afterwards I never knew what to do with the subjugated object.', src: 'PART II · X' }],
            prompt: ['What does this confession imply about his treatment of Liza?'],
            options: [
              'He did not really want her, and his cruelty was indifference.',
              'He hated her from the start, and pretended affection to wound her.',
              'Her love could register with him as a contest he had to win.',
              'He was protecting her from a man he knew would make her unhappy.'
            ],
            answer: 2,
            right: 'For him love is a struggle with a winner. Her tenderness could only register as a threat to be subdued.',
            wrong: 'He describes a pattern, not a particular hatred or a hidden kindness: love as struggle, ending in subjugation.' }
        ] },

      { id: 'r-prison', concept: 'FREEDOM', sources: ['q17'],
        variants: [
          { quotes: [{ text: 'it is better to do nothing! Better conscious inertia!', src: 'PART I · XI' }],
            prompt: ['This is where Part I’s defence of caprice ends. What has the defence become?'],
            options: [
              'A fixed position, as settled as the laws it set out to defy.',
              'Proof that he is free, since he is the one choosing his inertia.',
              'A cure, at last, for the disease of too much consciousness.',
              'A joke, showing that he never meant the defence seriously.'
            ],
            answer: 0,
            right: 'The rebel against calculation ends in a posture that could be predicted. The escape has become a place to stay.',
            wrong: 'Choosing inertia proves nothing, and nothing is cured. The defence of caprice has settled into a fixed position.' }
        ] },

      { id: 'r-key', concept: 'RATIONAL EGOISM', sources: ['q13'],
        variants: [
          { quotes: [{ text: 'All human actions will then, of course, be tabulated according to these laws, mathematically, like tables of logarithms up to 108,000, and entered in an index', src: 'PART I · VII' }],
            prompt: ['Why is such a table a threat rather than a gift to him?'],
            options: [
              'The table might be inaccurate, and people would suffer by it.',
              'Nobody would bother to consult it, so it would be wasted labour.',
              'It would favour those who are rich enough to make good use of it.',
              'If your wants can be looked up, you are no longer their author.'
            ],
            answer: 3,
            right: 'An accurate table is worse than an inaccurate one. It would turn the person into a key being struck.',
            wrong: 'Inaccuracy is the least of it. An accurate table would be worse: it would reduce the person to a key being struck.' }
        ] },

      { id: 'r-whole', concept: 'SPITE', sources: ['q24'],
        variants: [
          { prompt: [
              'A friend summarizes: “So spite is just irrationality.”',
              'What is missing?'
            ],
            options: [
              'Nothing: irrationality is the whole of what spite amounts to.',
              'Spite has an aim: to turn powerlessness into agency.',
              'Spite is secretly rational: a calculation of long-term gain.',
              'Spite is anger at other people, not a stance toward reason.'
            ],
            answer: 1,
            right: 'Irrationality describes the act. Spite also has a purpose: to make something his.',
            wrong: 'Calling it irrationality says what the act lacks. Spite also has an aim: to turn helplessness into agency, even at his own cost.' }
        ] }
    ]
  }
};
