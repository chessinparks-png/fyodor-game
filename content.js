/*
  UNDERGROUND — chamber content.

  Everything a chamber says lives here; app.js only knows how to stage it.
  A future chamber is another entry in UNDERGROUND.chambers with the same shape.

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
      lines: ['“The Underground Man doesn’t merely suffer.', 'He tries to make suffering his.”']
    },

    steps: [
      /* ─────────────────────────── ACT I — FROM SPITE ─────────────────────────── */
      { type: 'act', act: 1 },

      { type: 'question', id: 'q01', scored: true, kind: 'choice', label: 'CLAIM',
        concepts: ['SPITE'],
        prompt: [
          'The Underground Man believes something is wrong with him.',
          'He respects medicine.',
          'He understands that refusing treatment will hurt nobody but himself.',
          'Yet he refuses.',
          'Why?'
        ],
        options: [
          'He distrusts doctors.',
          'He wants to punish the doctors.',
          'He knowingly acts against his welfare and calls the act spite.',
          'He cannot afford treatment.'
        ],
        answer: 2,
        right: { label: 'INSIGHT', body: 'He knows who loses: himself.' },
        wrong: { body: 'The important detail is not merely that the choice is foolish. He knows the choice hurts him and chooses it anyway.' }
      },

      { type: 'question', id: 'q02', scored: true, kind: 'choice', label: 'CLAIM',
        concepts: ['SPITE', 'RATIONAL EGOISM'],
        prompt: ['What makes this more interesting than an ordinary bad decision?'],
        options: [
          'He makes a mistake about what is good for him.',
          'He knows what is good for him and resists it anyway.',
          'He enjoys illness.',
          'He wants sympathy.'
        ],
        answer: 1,
        headline: 'KNOWLEDGE DOESN’T PRODUCE ACTION.',
        right: { label: 'THE SYSTEM BREAKS HERE', body: 'A mistake can be corrected with better information. His information is already correct.' },
        wrong: { body: 'An ordinary bad decision is a mistake: fix the information, fix the choice. His information is already correct, and he resists it.' }
      },

      { type: 'question', id: 'q03', scored: true, kind: 'choice', label: 'CLAIM',
        concepts: ['SPITE', 'FREEDOM'],
        prompt: ['What does “spite” begin to mean here?'],
        options: [
          'Hatred of another person',
          'Random irrationality',
          'An attempt to assert oneself even through self-damage',
          'A desire for revenge'
        ],
        answer: 2,
        right: { label: 'YES', body: 'Treat this as a working interpretation, not a dictionary definition.' },
        wrong: { body: 'No one else is the target, and the act is not random: it has a point. Treat “self-assertion through self-damage” as a working interpretation, not a dictionary definition.' }
      },

      { type: 'question', id: 'q04', scored: true, kind: 'choice', label: 'CONTRADICTION',
        concepts: ['SELF-DECEPTION'],
        quotes: ['“I was a spiteful official.”', '“I was lying when I said I was spiteful.”'],
        prompt: ['What should you do?'],
        options: [
          'Believe the second statement.',
          'Believe the first statement.',
          'Treat both statements as evidence about how he constructs himself.',
          'Ignore both because he is unreliable.'
        ],
        answer: 2,
        headline: 'UNRELIABLE DOES NOT MEAN MEANINGLESS.',
        right: { label: 'THAT’S THE DISTINCTION', body: 'He asserts, then retracts. Both moves show how he builds himself.' },
        wrong: { body: 'Picking one statement lets him off the hook. So does discarding both. The contradiction is itself the evidence.' }
      },

      { type: 'rise', to: -40 },

      { type: 'interrupt', id: 'i1',
        line: '“So now you think you understand me?”',
        responses: [
          { text: 'YOU CONTRADICTED YOURSELF.', reply: '“Naturally. You were meant to notice. And?”',
            aside: 'He wanted a verdict. You gave him one.' },
          { text: 'YOU WERE LYING.', reply: '“Which time?”',
            aside: 'He wanted a verdict. You gave him one.' },
          { text: 'I DON’T NEED TO DECIDE YET.', reply: '“Hm.”', best: true,
            aside: 'Hold the verdict. Keep reading.' }
        ]
      },

      /* ─────────────────────────── ACT II — THE TOOTHACHE ─────────────────────────── */
      { type: 'act', act: 2 },

      { type: 'question', id: 'q05', scored: true, kind: 'choice', label: 'CLAIM',
        concepts: ['SUFFERING', 'SPITE'],
        prompt: [
          'The Underground Man describes a person with a toothache who knows that theatrical moaning helps nothing, annoys everyone around him, and yet intensifies it.',
          'Where is the pleasure?'
        ],
        options: [
          'In the physical pain',
          'In receiving sympathy',
          'In turning helpless pain into something he can actively inflict on others',
          'In pretending the pain is worse than it is'
        ],
        answer: 2,
        right: { label: 'INSIGHT', body: ['The pain happens to him.', 'The performance is something he does.'] },
        wrong: { body: 'The moaning helps nothing and wins him nothing, so the pleasure isn’t relief or sympathy. The pain happens to him. The performance is something he does.' }
      },

      { type: 'question', id: 'q06', scored: true, kind: 'sequence', label: 'SEQUENCE',
        concepts: ['SUFFERING', 'SPITE'],
        prompt: ['Build the chain.'],
        hint: 'Tap the links in order. Tap a placed link to take it back.',
        tiles: ['CONSCIOUSNESS', 'PLEASURE', 'POWERLESSNESS', 'SPITEFUL PERFORMANCE'],
        answer: [2, 0, 3, 1],
        coda: ['He cannot command the tooth.', 'HE CAN COMMAND THE MOAN.'],
        right: { label: 'YES' },
        wrong: { body: 'Start with what he cannot control: the pain. Next comes his awareness of that helplessness. The performance answers it, and the pleasure is in the performance.' }
      },

      { type: 'question', id: 'q07', scored: true, kind: 'choice', label: 'TRUE / FALSE', layout: 'row',
        concepts: ['SUFFERING'],
        prompt: ['The Underground Man therefore believes suffering is good.'],
        options: ['TRUE', 'FALSE'],
        answer: 1,
        headline: 'TOO SIMPLE.',
        right: { label: 'THAT’S THE DISTINCTION', body: 'He can derive identity, intensity, or pleasure from suffering without establishing that suffering itself is good.' },
        wrong: { body: 'He can derive identity, intensity, or pleasure from suffering without establishing that suffering itself is good.' }
      },

      { type: 'question', id: 'q08', scored: true, kind: 'choice', label: 'CLAIM',
        concepts: ['SPITE', 'SUFFERING'],
        prompt: ['What makes the spiteful moaning different from simply crying out because something hurts?'],
        options: [
          'He knows an audience is present.',
          'He knows the performance is useless and performs it anyway.',
          'The pain is not real.',
          'He wants medical care.'
        ],
        answer: 1,
        right: { label: 'YES', body: 'Crying out is a reaction. His moan is chosen, with full knowledge that it is useless.' },
        wrong: { body: 'A child who cries also has an audience. What sets him apart is that he knows the moaning is futile and does it anyway.' }
      },

      { type: 'found', title: 'CONSCIOUS SPITE', line: '“It matters that he knows.”' },

      /* ─────────────────────────── ACT III — ADVANTAGE ─────────────────────────── */
      { type: 'act', act: 3 },

      { type: 'concept', title: 'RATIONAL EGOISM',
        body: [
          'A simplified model:',
          'if people correctly understand their interests and act rationally, they should choose what benefits them.'
        ],
        note: 'This is the view the Underground Man argues against. Watch where it strains.'
      },

      { type: 'question', id: 'q09', scored: true, kind: 'choice', label: 'CLAIM',
        concepts: ['RATIONAL EGOISM'],
        prompt: ['Which person creates the hardest problem for that model?'],
        options: [
          'Someone who accidentally harms himself',
          'Someone who misunderstands his interests',
          'Someone who knowingly rejects his advantage because he wants the choice to remain his',
          'Someone who becomes emotional'
        ],
        answer: 2,
        headline: 'DEFIANCE IS THE HARDER CASE.',
        right: { label: 'THE SYSTEM BREAKS HERE', body: 'A mistake can still fit the system.' },
        wrong: { body: 'Accidents, misunderstanding and emotion can all be treated as errors to correct. A mistake can still fit the system.' }
      },

      { type: 'question', id: 'q10', scored: true, kind: 'choice', label: 'CLAIM',
        concepts: ['RATIONAL EGOISM', 'FREEDOM'],
        prompt: ['The Underground Man calls something the “most advantageous advantage.”', 'What is it?'],
        options: ['Happiness', 'Prosperity', 'Rational self-interest', 'Independent choice'],
        answer: 3,
        right: { label: 'YES', body: 'It is the one advantage that a list of advantages leaves out: choosing for yourself.' },
        wrong: { body: 'Happiness, prosperity and self-interest are exactly what the model already offers. He means what every such list leaves out: independent choice.' }
      },

      { type: 'question', id: 'q11', scored: true, kind: 'choice', label: 'CLAIM',
        concepts: ['FREEDOM', 'RATIONAL EGOISM'],
        prompt: ['Which explanation is strongest?'],
        options: [
          'Humans always choose what is irrational.',
          'Humans sometimes value having a choice more than obtaining the supposedly best outcome.',
          'Rational decisions are never free.',
          'Humans do not understand happiness.'
        ],
        answer: 1,
        right: { label: 'THAT’S THE DISTINCTION', body: 'The claim is not “always” and not “never”. Sometimes the choosing outweighs what is chosen.' },
        wrong: { body: '“Always” and “never” go too far. The claim is narrower and harder to dismiss: sometimes people value the choosing over the outcome.' }
      },

      { type: 'beat', lines: ['THE MOST ADVANTAGEOUS ADVANTAGE'], sub: 'THE ADVANTAGE OF BEING ABLE TO REJECT YOUR ADVANTAGES.' },

      { type: 'question', id: 'q12', scored: true, kind: 'choice', label: 'APPLICATION',
        concepts: ['FREEDOM', 'SPITE'],
        prompt: [
          'A person is given two options.',
          'Option A clearly benefits him.',
          'Option B clearly harms him.',
          'He chooses B specifically because everyone insists he must choose A.',
          'What matters most to the Underground Man?'
        ],
        options: [
          'The harmful outcome itself',
          'The chance to demonstrate that his will cannot simply be dictated by advantage',
          'Proving that pain is enjoyable',
          'Making other people angry'
        ],
        answer: 1,
        right: { label: 'INSIGHT', body: 'The harm is the price, not the point. The point is that advantage does not get to dictate his choice.' },
        wrong: { body: 'The pain and the anger are side effects. He chooses B because everyone insists on A. What he protects is that the choice is his.' }
      },

      { type: 'rise', to: -37 },

      { type: 'interrupt', id: 'i2',
        line: '“What man wants is independent choice.”',
        responses: [
          { text: 'EVEN IF IT DESTROYS HIM?', reply: '“Especially then, perhaps.”', best: true,
            aside: 'You pressed on the cost.' },
          { text: 'THEN FREEDOM IS GOOD.', reply: '“Good? I said wanted. You are the one who needs it to be good.”',
            aside: 'You accepted his premise and drew the conclusion for him.' },
          { text: 'THEN REASON IS BAD.', reply: '“Bad? I said insufficient. Don’t make me simpler than I am.”',
            aside: 'You accepted his premise and drew the conclusion for him.' }
        ]
      },

      /* ─────────────────────────── ACT IV — THE PIANO KEY ─────────────────────────── */
      { type: 'act', act: 4 },

      { type: 'question', id: 'q13', scored: true, kind: 'choice', label: 'METAPHOR',
        concepts: ['FREEDOM', 'RATIONAL EGOISM'],
        prompt: ['Why does the image of becoming a “piano key” horrify him?'],
        options: [
          'It symbolizes social conformity.',
          'It symbolizes a person reduced to something operated according to laws rather than an independent chooser.',
          'It symbolizes technology.',
          'It symbolizes boredom.'
        ],
        answer: 1,
        right: { label: 'YES', body: 'A key does not choose. It sounds when struck, as the instrument requires.' },
        wrong: { body: 'Conformity and machinery are close, but they miss what horrifies him: a person who sounds only when struck, according to laws.' }
      },

      { type: 'question', id: 'q14', scored: true, kind: 'choice', label: 'COUNTERARGUMENT', layout: 'row',
        concepts: ['FREEDOM'],
        prompt: [
          'Suppose science eventually explains why people rebel, self-sabotage, and act spitefully.',
          'Would irrational behavior by itself still prove freedom?'
        ],
        options: ['YES', 'NO'],
        answer: 1,
        headline: 'IRRATIONAL ≠ FREE.',
        right: { label: 'THAT’S THE DISTINCTION', body: 'If science can explain the rebellion, the rebellion may be just another caused event.' },
        wrong: { body: 'Irrational behavior can still have causes. If science can explain the rebellion, the rebellion proves nothing about freedom.' }
      },

      { type: 'question', id: 'q15', scored: true, kind: 'choice', label: 'DISTINCTION', layout: 'pair',
        concepts: ['FREEDOM'],
        prompt: ['Which distinction actually matters more?'],
        options: ['Rational / Irrational', 'Determined / Freely Chosen'],
        answer: 1,
        right: { label: 'THAT’S THE DISTINCTION', body: ['An irrational act might still have causes.', 'A rational act need not automatically be unfree.'] },
        wrong: { body: ['The Underground Man often treats these as the same distinction. They are not.', 'An irrational act might still have causes. A rational act need not automatically be unfree.'] }
      },

      { type: 'question', id: 'q16', scored: true, kind: 'choice', label: 'COUNTER', voice: true,
        concepts: ['FREEDOM'],
        speech: '“Then I’ll purposely go mad just to defeat your calculations.”',
        prompt: ['Best reply:'],
        options: [
          'That proves your freedom.',
          'Deliberately doing the opposite still does not establish that your choice escaped determination.',
          'Madness cannot be explained.',
          'You are contradicting yourself.'
        ],
        answer: 1,
        headline: 'YOU SEPARATED HIS ARGUMENT FROM HIS CONCLUSION.',
        right: { label: 'INSIGHT', body: 'Doing the opposite on purpose shows defiance. It does not show that the defiance had no cause.' },
        wrong: { body: 'The weak point is not a contradiction or a mystery. Deliberate opposition could still be caused, so it cannot settle the question he needs it to settle.' }
      },

      /* ─────────────────────────── ACT V — THE PRISON ─────────────────────────── */
      { type: 'act', act: 5 },

      { type: 'question', id: 'q17', scored: true, kind: 'multi', label: 'MULTISELECT',
        concepts: ['SPITE', 'FREEDOM'],
        prompt: ['The Underground Man uses spite to:'],
        hint: 'Select all that apply.',
        options: [
          'Assert control',
          'Demonstrate independence',
          'Become peaceful',
          'Repeatedly trap himself in the same patterns'
        ],
        answer: [0, 1, 3],
        right: { label: 'YES', body: 'Control and independence, and the same trap again and again. Spite never makes him peaceful.' },
        wrong: { body: 'Three are true together: spite asserts control, demonstrates independence and returns him to the same patterns. It never makes him peaceful.' }
      },

      { type: 'question', id: 'q18', scored: true, kind: 'choice', label: 'CLAIM', layout: 'pair',
        concepts: ['FREEDOM', 'SELF-DECEPTION'],
        prompt: ['Which statement is more defensible?'],
        options: [
          'Spite proves that he is free.',
          'Spite is one way he attempts to experience himself as free.'
        ],
        answer: 1,
        headline: 'AN ATTEMPT IS NOT A PROOF.',
        right: { label: 'THAT’S THE DISTINCTION', body: 'Trying to experience freedom is not the same as showing that you have it.' },
        wrong: { body: 'A is his conclusion. The book does not simply hand it to you. Spite shows that he is trying to be free, not that he is.' }
      },

      { type: 'question', id: 'q19', scored: true, kind: 'choice', label: 'CLAIM',
        concepts: ['SELF-DECEPTION'],
        prompt: [
          'He often understands that his behavior is destructive.',
          'Why doesn’t that knowledge save him?'
        ],
        options: [
          'He is not intelligent.',
          'Consciousness and the capacity to act are not the same thing.',
          'He secretly likes everything about himself.',
          'He does not understand morality.'
        ],
        answer: 1,
        right: { label: 'INSIGHT', body: 'Seeing clearly and being able to act are different capacities. He has too much of the first.' },
        wrong: { body: 'He is highly intelligent, and that is the problem. Consciousness gives him insight without giving him a way out.' }
      },

      { type: 'beat', lines: ['KNOWING THE TRAP', 'IS NOT LEAVING IT.'], full: true },

      { type: 'question', id: 'q20', scored: true, kind: 'choice', label: 'SELF-DECEPTION',
        concepts: ['SELF-DECEPTION'],
        prompt: ['Which description fits him better?'],
        options: [
          'He simply lies to himself.',
          'He simply sees himself clearly.',
          'He alternates between ruthless self-exposure and new ways of protecting his ego.',
          'He has no awareness of what he does.'
        ],
        answer: 2,
        right: { label: 'YOU CAUGHT THE LOOPHOLE', body: 'Each confession exposes him, and each becomes a new place to hide.' },
        wrong: { body: 'Neither pure lying nor pure clarity fits. He exposes himself ruthlessly, then turns the exposure into a new defense.' }
      },

      { type: 'rise', to: -33 },

      /* ─────────────────────────── ACT VI — LIZA ─────────────────────────── */
      { type: 'act', act: 6 },

      { type: 'question', id: 'q21', scored: true, kind: 'choice', label: 'CLAIM',
        concepts: ['RECOGNITION'],
        prompt: [
          'Liza responds to him with vulnerability and concern.',
          'What does she introduce that abstract philosophy does not?'
        ],
        options: [
          'Sexual desire',
          'Another consciousness with claims upon him',
          'Rational calculation',
          'Political reform'
        ],
        answer: 1,
        right: { label: 'YES', body: 'He can win an argument alone. Liza is someone who looks back at him and asks something of him.' },
        wrong: { body: 'Desire is present, but it is not the new element. Philosophy never gave him another consciousness: someone who sees him and has claims on him.' }
      },

      { type: 'question', id: 'q22', scored: true, kind: 'choice', label: 'CLAIM',
        concepts: ['RECOGNITION', 'SPITE'],
        prompt: ['Why does he lash out when Liza sees his vulnerability?'],
        options: [
          'He realizes he dislikes her.',
          'Her presence threatens the superior position from which he wants to define their relationship.',
          'She insults him.',
          'He no longer remembers their first meeting.'
        ],
        answer: 1,
        right: { label: 'INSIGHT', body: 'He can bear her only from above. Being seen as vulnerable takes that position away.' },
        wrong: { body: 'She does not insult him, and dislike does not explain the violence of his reaction. She threatens his position: he wants to be the one who defines what is between them.' }
      },

      { type: 'question', id: 'q23', scored: true, kind: 'choice', label: 'CLAIM',
        concepts: ['RECOGNITION', 'SPITE'],
        prompt: [
          'After their intimate encounter, he puts money into Liza’s hand “from spite.”',
          'What is the strongest interpretation?'
        ],
        options: [
          'He is simply paying her.',
          'He tries to restore hierarchy by converting a threateningly human encounter back into a transaction.',
          'He wants to help her financially.',
          'He wants her to return.'
        ],
        answer: 1,
        right: { label: 'INSIGHT', body: 'Money turns a human encounter back into a transaction, and a transaction has a ranking he knows how to occupy.' },
        wrong: { body: 'This is not payment and not help. The money restores the hierarchy that intimacy had just dissolved.' }
      },

      { type: 'question', id: 'q23b', scored: false, kind: 'choice', label: 'LOOPHOLE',
        concepts: [],
        lines: ['He calls the cruelty deliberate.', 'Then artificial.', 'Then he runs after her.'],
        prompt: ['What should you notice?'],
        options: [
          'The first explanation was false.',
          'The second explanation was true.',
          'Even his cruelty cannot remain a final definition of himself.',
          'He no longer feels spite.'
        ],
        answer: 2,
        right: { label: 'YOU CAUGHT THE LOOPHOLE', body: 'Even cruelty does not get to be the final word about him.' },
        wrong: { body: 'Don’t settle on the first or second explanation. Watch the revision itself: even cruelty does not stay fixed as a definition of him.' }
      },

      { type: 'question', id: 'q24', scored: true, kind: 'choice', label: 'FINAL SURFACE CHECK', final: true,
        concepts: ['SPITE', 'FREEDOM'],
        prompt: ['What is spite in Notes from Underground?'],
        options: [
          'The pleasure of hurting people.',
          'Dostoevsky’s proof that free will exists.',
          'A recurring attempt to transform constraint, humiliation, or powerlessness into an assertion of agency — even at the cost of self-damage.',
          'A synonym for irrationality.'
        ],
        answer: 2,
        coda: ['An attempt at freedom', 'can become another prison.'],
        right: { label: 'INSIGHT' },
        wrong: { body: 'Spite is neither simple cruelty nor a proof. It is an attempt to make powerlessness into agency, and the attempt can close around him.' }
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
              'He is no longer acting irrationally.',
              'Predictable rebellion may still fail to demonstrate undetermined choice.',
              'Computers eliminate free will.',
              'Rational egoism has automatically been disproved.'
            ],
            answer: 1,
            right: 'If the rebellion can be predicted, choosing the worse option does not show that the choice was undetermined.',
            wrong: 'The rebellion is still irrational, and that is the point. Irrational and undetermined are different claims, and the prediction separates them.' },
          { prompt: [
              'Two people each choose the worse option.',
              'One does it by mistake. The other does it deliberately, to prove no one can dictate to him.',
              'What does the second case establish that the first does not?'
            ],
            options: [
              'That his choice had no causes.',
              'That he is free and the first person is not.',
              'That he acts from a motive of defiance. Whether that motive was itself caused is still open.',
              'Nothing. The two cases are identical.'
            ],
            answer: 2,
            right: 'Defiance is a motive, and motives can have causes. The deliberate case shows intention, not freedom from causes.',
            wrong: 'The cases differ: one has a motive of defiance. But a motive is not proof of undetermined choice.' }
        ] },

      { id: 'r-spite', concept: 'SPITE', sources: ['q01', 'q02', 'q03'],
        variants: [
          { prompt: [
              'A clerk knows that arriving late will cost him his post. He could arrive on time.',
              'He arrives late, slowly and conspicuously, and tells himself the decision was his.',
              'Which reading best fits the Underground Man’s spite?'
            ],
            options: [
              'He has misjudged the consequences.',
              'He is punishing his employer.',
              'He turns a constraint he can’t escape into an act that is at least his own, at his own expense.',
              'He is simply lazy.'
            ],
            answer: 2,
            right: 'He knows the cost and pays it, because paying it is his act.',
            wrong: 'He has not misjudged anything, and the employer barely suffers. What makes it spite is that he knows the cost and chooses it as his act.' },
          { prompt: [
              'Someone tells the Underground Man: “If you understood your own interest, you’d see a doctor.”',
              'Why doesn’t this argument reach him?'
            ],
            options: [
              'He doesn’t understand his interest.',
              'He does understand it. The argument assumes that understanding produces the choice.',
              'He is too ill to go.',
              'He has already seen a doctor.'
            ],
            answer: 1,
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
              'The calculations might contain errors.',
              'Some will reject even a correct calculation, because being calculated is itself the loss.',
              'People are too emotional for planning.',
              'The city would be too expensive.'
            ],
            answer: 1,
            right: 'Better calculations would fix errors. His objection holds even if the calculation is perfect.',
            wrong: 'Errors, emotions and cost are problems a better planner could solve. His objection holds even when the calculation is perfect.' },
          { prompt: [
              'A defender of rational egoism says: “Someone who harms himself simply hasn’t understood his interests yet.”',
              'What case does this leave out?'
            ],
            options: [
              'A person who understands his interests and rejects them so the choice stays his own.',
              'A person who is misinformed.',
              'A person who harms himself by accident.',
              'A person who acts rationally.'
            ],
            answer: 0,
            right: 'The model can absorb error. It struggles with understanding followed by refusal.',
            wrong: 'Misinformation and accidents fit the defender’s explanation. The case left out is someone who understands and refuses anyway.' }
        ] },

      { id: 'r-self', concept: 'SELF-DECEPTION', sources: ['q04', 'q20'],
        variants: [
          { prompt: [
              'He insists he is writing only for himself.',
              'Yet throughout the notes he addresses “gentlemen” and answers objections he imagines they will raise.',
              'What should you make of this?'
            ],
            options: [
              'He forgot he had an audience.',
              'The first claim is false, so the notes can be dismissed.',
              'Even his confession is staged: he exposes himself for a reader he claims not to need.',
              'He is writing a letter to friends.'
            ],
            answer: 2,
            right: 'The contradiction is not noise. It shows him exposing himself and performing at once.',
            wrong: 'Catching him in a contradiction is where reading starts, not where it ends. He is exposing himself and performing at the same time.' }
        ] },

      { id: 'r-conscious', concept: 'SELF-DECEPTION', sources: ['q19', 'q18'],
        variants: [
          { prompt: [
              'A man can explain precisely why a habit is ruining him. He continues the habit.',
              'Which account fits the Underground Man?'
            ],
            options: [
              'His explanation must be wrong.',
              'He doesn’t really believe his explanation.',
              'Heightened consciousness can deepen paralysis instead of ending it.',
              'He needs more information.'
            ],
            answer: 2,
            right: 'For him, clearer understanding brings no release. It can make him more stuck.',
            wrong: 'The explanation can be correct and sincere. The problem is that understanding does not become the ability to act.' }
        ] },

      { id: 'r-suffer', concept: 'SUFFERING', sources: ['q05', 'q06', 'q07', 'q08'],
        variants: [
          { prompt: ['Which conclusion does the toothache passage NOT support?'],
            options: [
              'Knowing the moaning is futile is part of what makes it pleasurable.',
              'The performance gives him something to do when he can do nothing.',
              'The moaning is partly aimed at other people.',
              'Suffering is good in itself.'
            ],
            answer: 3,
            right: 'The passage shows pleasure taken in performing suffering. That is not the claim that suffering is good.',
            wrong: 'The first three are in the passage. The last goes further than the passage: getting pleasure from performing suffering does not make suffering good.' }
        ] },

      { id: 'r-recog', concept: 'RECOGNITION', sources: ['q21', 'q22', 'q23'],
        variants: [
          { prompt: [
              'When Liza comforts him, he feels that their roles have been reversed.',
              'Why is that intolerable to him?'
            ],
            options: [
              'He doesn’t want comfort from anyone.',
              'Being cared for puts him in the position of the one in need, and he can only bear a relationship he dominates.',
              'He believes she is pretending.',
              'He is ashamed of crying in front of her.'
            ],
            answer: 1,
            right: 'Receiving care is a position too. He cannot tolerate being the one who is seen and helped.',
            wrong: 'Shame is present, but the deeper problem is the reversal of position. Being cared for makes him the one in need.' }
        ] },

      { id: 'r-prison', concept: 'FREEDOM', sources: ['q17'],
        variants: [
          { prompt: [
              'For twenty years he has defended his right to refuse.',
              'What has the refusal become?'
            ],
            options: [
              'Proof that he is free.',
              'A cure for his consciousness.',
              'Irrelevant to who he is.',
              'A pattern as predictable as the laws he meant to defy.'
            ],
            answer: 3,
            right: 'An assertion repeated for twenty years becomes a habit. The escape has turned into a routine.',
            wrong: 'Refusal repeated for twenty years stops being an escape. It becomes a pattern as fixed as the laws it defied.' }
        ] },

      { id: 'r-key', concept: 'RATIONAL EGOISM', sources: ['q13'],
        variants: [
          { prompt: [
              'Imagine a published table that lists, in advance, what every person will want.',
              'Why is that a threat rather than a gift to the Underground Man?'
            ],
            options: [
              'The table might be inaccurate.',
              'If your wants can be looked up in advance, you are no longer their author.',
              'Nobody would read it.',
              'It would favor the rich.'
            ],
            answer: 1,
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
              'Nothing. That is the whole idea.',
              'Spite is aimed at something: turning powerlessness into agency, at his own cost.',
              'Spite is actually rational.',
              'Spite is only anger at other people.'
            ],
            answer: 1,
            right: 'Irrationality describes the act. Spite also has a purpose: to be his.',
            wrong: 'Calling it irrationality says what the act lacks. Spite also has an aim: to turn helplessness into agency, even at his own cost.' }
        ] }
    ]
  }
};
