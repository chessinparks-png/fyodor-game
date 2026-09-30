/*
  THE FORMULA — chamber 03.
  Core problem: can human behaviour be rationally calculated?
  Presents rational egoism in its strongest form before the Underground Man's
  attack. Chernyshevsky appears only as marked scholarly context (Hannon):
  the novel never names him.
*/
UNDERGROUND.register('formula', {
  contentVersion: 1,

  concepts: ['THE MODEL', 'INTEREST', 'PREDICTION', 'OBJECTION', 'WILL', 'CONTEXT'],

  acts: {
    1: 'ACT I — THE MODEL',
    2: 'ACT II — THE ERROR THEORY',
    3: 'ACT III — THE FACTS',
    4: 'ACT IV — THE REGISTER',
    5: 'ACT V — THE TABLES',
    6: 'ACT VI — LOGIC AND HUMANITY'
  },

  found: {
    lines: ['The formula may be right about interests,', 'and wrong about people.']
  },

  steps: [
    /* ─────────────────────────── ACT I — THE MODEL ─────────────────────────── */
    { type: 'act', act: 1 },

    { type: 'concept', title: 'RATIONAL EGOISM',
      body: [
        'Its strongest form:',
        'people act on the interest they understand. Rightly understood, interests coincide — so enlightened people do good, and a rational society can be built.'
      ],
      note: 'Context, not text: Hannon and other readers connect this to Chernyshevsky’s What Is to Be Done?, whose heroes act from calculated self-interest that benefits all. The Underground Man never names him.'
    },

    { type: 'question', id: 'f01', scored: true, kind: 'choice', label: 'THE MODEL',
      concepts: ['THE MODEL'],
      quotes: [{ text: 'man only does nasty things because he does not know his own interests', src: 'PART I · VII' }],
      prompt: ['What makes this view attractive as a programme?'],
      options: [
        'It makes wrongdoing curable: teach, and it ends.',
        'It flatters people by denying that they do wrong.',
        'It lets every wrongdoer escape all of the blame.',
        'It assumes that people are simply good by nature.'
      ],
      answer: 0,
      right: { label: 'INSIGHT', body: 'If vice is ignorance, education is reform. That is a genuinely hopeful theory.' },
      wrong: { body: 'The view admits wrongdoing and does not rely on innate goodness. Its promise is that knowledge cures it.' }
    },

    { type: 'question', id: 'f02', scored: true, kind: 'choice', label: 'THE MODEL',
      concepts: ['THE MODEL', 'CONTEXT'],
      quotes: [{ text: 'he would see his own advantage in the good and nothing else', src: 'PART I · VII' }],
      prompt: ['Why need the rational egoist not be selfish in the ordinary sense?'],
      options: [
        'He sacrifices his own advantage for the good of all.',
        'He pretends to care for others to profit by them.',
        'He has no advantage of his own left to pursue.',
        'His true advantage turns out to lie in the good.'
      ],
      answer: 3,
      right: { label: 'THAT’S THE DISTINCTION', body: 'Egoism and virtue meet: rightly understood, self-interest is the good.' },
      wrong: { body: 'No sacrifice and no pretence: the claim is that true advantage and the good coincide.' }
    },

    { type: 'question', id: 'f03', scored: true, kind: 'choice', label: 'CLAIM',
      concepts: ['THE MODEL', 'PREDICTION'],
      quotes: [{ text: 'consequently, so to say, through necessity, he would begin doing good', src: 'PART I · VII' }],
      prompt: ['What does “through necessity” reveal about the model?'],
      options: [
        'People would have to be forced to do good.',
        'Only necessity ever makes people act at all.',
        'Doing good becomes a painful, grudging duty.',
        'Good conduct follows by law, not by choice.'
      ],
      answer: 3,
      right: { label: 'THE SYSTEM BREAKS HERE', body: 'The hope has a hidden cost: if good follows necessarily, it is not chosen.' },
      wrong: { body: 'No force is involved. Enlightened people would do good the way a stone falls — by law.' }
    },

    { type: 'question', id: 'f04', scored: true, kind: 'choice', label: 'CONTEXT',
      concepts: ['CONTEXT'],
      prompt: ['Readers link his target to Chernyshevsky’s What Is to Be Done?. How should that link be stated?'],
      options: [
        'As text: the narrator names Chernyshevsky outright.',
        'As irrelevant: the book has no historical target.',
        'As context: the view is attacked, the man unnamed.',
        'As proof that the whole book is merely a parody.'
      ],
      answer: 2,
      right: { label: 'YES', body: 'Scholarly context, well supported — but not a claim the novel itself makes.' },
      wrong: { body: 'The novel never names him, yet the target is plainly a real doctrine. The link is context, not quotation.' }
    },

    /* ─────────────────────────── ACT II — THE ERROR THEORY ─────────────────────────── */
    { type: 'act', act: 2 },

    { type: 'question', id: 'f05', scored: true, kind: 'choice', label: 'THE OPPONENT',
      concepts: ['INTEREST', 'THE MODEL'],
      quotes: [{ text: 'Our choice is usually mistaken from a false view of our advantage.', src: 'PART I · VIII' }],
      prompt: ['How does the opponent handle apparent counterexamples?'],
      options: [
        'As exceptions far too rare to trouble the model.',
        'As mistakes about advantage, curable by knowledge.',
        'As proof that people are not rational at all.',
        'As free choices the model admits it cannot explain.'
      ],
      answer: 1,
      right: { label: 'INSIGHT', body: 'Every bad choice becomes an error of calculation. The model absorbs its exceptions.' },
      wrong: { body: 'The opponent neither ignores them nor concedes freedom. He redescribes them as miscalculation.' }
    },

    { type: 'question', id: 'f06', scored: true, kind: 'choice', label: 'THE OPPONENT',
      concepts: ['INTEREST', 'PREDICTION'],
      quotes: [{ text: 'For if a desire should come into conflict with reason we shall then reason and not desire', src: 'PART I · VIII' }],
      prompt: ['In the opponent’s future, what happens to desire?'],
      options: [
        'It is satisfied more fully than ever before.',
        'It remains free, only better informed than now.',
        'It yields to reason whenever the two conflict.',
        'It is forbidden outright and punished by law.'
      ],
      answer: 2,
      right: { label: 'YES', body: 'Desire does not win or negotiate. Where it disagrees with reason, it simply gives way.' },
      wrong: { body: 'Not better-informed freedom: the opponent says outright that desire will give way.' },
      quote: { text: 'then certainly so-called desires will no longer exist.', src: 'PART I · VIII' }
    },

    { type: 'question', id: 'f07', scored: true, kind: 'choice', label: 'COUNTER',
      concepts: ['OBJECTION', 'INTEREST'],
      prompt: ['Which objection to the error theory is strongest?'],
      options: [
        'Some act against advantage while understanding it.',
        'People are far too stupid to learn their advantage.',
        'Advantage is a vulgar thing for anyone to pursue.',
        'Errors about advantage can never be corrected.'
      ],
      answer: 0,
      right: { label: 'THE SYSTEM BREAKS HERE', body: 'An error theory needs an error. Understanding followed by refusal leaves none to correct.' },
      wrong: { body: 'He denies that man is stupid, and never says errors are incurable. His case is understanding without compliance.' }
    },

    /* ─────────────────────────── ACT III — THE FACTS ─────────────────────────── */
    { type: 'act', act: 3 },

    { type: 'question', id: 'f08', scored: true, kind: 'choice', label: 'ARGUMENT',
      concepts: ['OBJECTION'],
      quotes: [{ text: 'and have rushed headlong on another path, to meet peril and danger, compelled to this course by nobody and by nothing', src: 'PART I · VII' }],
      prompt: ['What kind of argument is this?'],
      options: [
        'An appeal to evidence: history refutes it.',
        'A moral charge that the theory is wicked.',
        'An appeal to feeling: the theory is cold.',
        'A logical proof that it contradicts itself.'
      ],
      answer: 0,
      right: { label: 'INSIGHT', body: 'Here his weapon is fact — “millions” of them — not sentiment or logic.' },
      wrong: { body: 'This is an empirical move: the record of human conduct against the theory.' }
    },

    { type: 'question', id: 'f09', scored: true, kind: 'choice', label: 'CASE',
      concepts: ['WILL', 'OBJECTION'],
      quotes: [{ text: 'without any sudden outside provocation, but simply through something inside him which is stronger than all his interests, he will go off on quite a different tack', src: 'PART I · VII' }],
      prompt: ['Why choose a friend who explains his interests so eloquently?'],
      options: [
        'He is a hypocrite, and never meant a word of it.',
        'He knows his interest best, and still reverses.',
        'Something outside him changed his mind for him.',
        'He is a fool who misunderstands what reason is.'
      ],
      answer: 1,
      right: { label: 'YES', body: 'The best-informed man makes the strongest counterexample. No error to blame.' },
      wrong: { body: 'There is no “outside provocation” and no misunderstanding. He knows, and turns anyway.' }
    },

    { type: 'question', id: 'f10', scored: true, kind: 'choice', label: 'COUNTER',
      concepts: ['OBJECTION', 'PREDICTION'],
      quotes: [{ text: 'following Buckle, that through civilisation mankind becomes softer, and consequently less bloodthirsty', src: 'PART I · VII' }],
      prompt: ['How does he answer the claim that civilisation softens us?'],
      options: [
        'By conceding it, but calling softness a vice.',
        'By arguing that softness makes men stupid.',
        'With history: the civilised still kill.',
        'By denying that history can teach anything.'
      ],
      answer: 2,
      right: { label: 'INSIGHT', body: 'Progress changes our tastes, not our conduct. The logic follows; the facts do not.' },
      wrong: { body: 'He points at the century’s wars. Civilisation refines sensation; it does not stop bloodshed.' },
      quote: { text: 'The only gain of civilisation for mankind is the greater capacity for variety of sensations', src: 'PART I · VII' }
    },

    { type: 'found', title: 'THE FACTS', line: 'Knowing one’s interest has never guaranteed pursuing it.' },

    { type: 'rise', to: -64 },

    { type: 'interrupt', id: 'i1',
      line: 'You found my facts convincing. Would you believe a statistic against me?',
      responses: [
        { text: 'NO — YOU ARE RIGHT.', reply: 'Careful. You are becoming my disciple.',
          aside: 'Agreement is not the same as analysis.' },
        { text: 'YES, IF IT WERE SOUND.', reply: 'Then we share a method. How disappointing.', best: true,
          aside: 'Evidence cuts both ways — and he knows it.' },
        { text: 'FACTS DON’T MATTER HERE.', reply: 'Then why did I collect millions of them?',
          aside: 'Part of his case is empirical. Don’t wave it away.' }
      ]
    },

    /* ─────────────────────────── ACT IV — THE REGISTER ─────────────────────────── */
    { type: 'act', act: 4 },

    { type: 'question', id: 'f11', scored: true, kind: 'choice', label: 'DISTINCTION',
      concepts: ['INTEREST', 'WILL'],
      quotes: [{ text: 'Your advantages are prosperity, wealth, freedom, peace—and so on, and so on.', src: 'PART I · VII' }],
      prompt: ['Their list already includes freedom. What does he say they left out?'],
      options: [
        'Freedom from all government interference.',
        'Choosing for oneself, against the list.',
        'Wealth that is distributed far more fairly.',
        'Peace of mind, beyond merely public peace.'
      ],
      answer: 1,
      right: { label: 'THAT’S THE DISTINCTION', body: 'Freedom as an item on the list differs from the freedom to reject the list.' },
      wrong: { body: 'Political freedom is already listed. What escapes the list is choosing against it.' }
    },

    { type: 'question', id: 'f12', scored: true, kind: 'choice', label: 'CLAIM',
      concepts: ['THE MODEL', 'PREDICTION'],
      quotes: [{ text: 'taken your whole register of human advantages from the averages of statistical figures and politico-economical formulas.', src: 'PART I · VII' }],
      prompt: ['Which reading fits his complaint about their method?'],
      options: [
        'Their statistics are inaccurate, or faked.',
        'An average describes no one who actually chooses.',
        'Their economics ignores the interests of the rich.',
        'Formulas are too hard for ordinary people.'
      ],
      answer: 1,
      right: { label: 'INSIGHT', body: 'The register is built from aggregates. The person who deviates vanishes into the mean.' },
      wrong: { body: 'He does not dispute the numbers. He disputes that averages capture a chooser.' }
    },

    /* ─────────────────────────── ACT V — THE TABLES ─────────────────────────── */
    { type: 'act', act: 5 },

    { type: 'question', id: 'f13', scored: true, kind: 'choice', label: 'PREDICTION',
      concepts: ['PREDICTION'],
      quotes: [{ text: 'that there will be no more incidents or adventures in the world.', src: 'PART I · VII' }],
      prompt: ['What would perfect prediction cost?'],
      options: [
        'The freedom to disobey the laws of the state.',
        'The money spent on calculating the tables.',
        'The unforeseen: life without adventure.',
        'The comfort of knowing what lies ahead.'
      ],
      answer: 2,
      right: { label: 'YES', body: 'If everything is foreseen, nothing happens — it is only carried out.' },
      wrong: { body: 'The loss is not legal or financial. A fully calculated world has no incidents left in it.' }
    },

    { type: 'question', id: 'f14', scored: true, kind: 'choice', label: 'CLAIM',
      concepts: ['PREDICTION', 'WILL'],
      quotes: [{ text: 'there is no guaranteeing (this is my comment) that it will not be, for instance, frightfully dull then', src: 'PART I · VII' }],
      prompt: ['Is dullness a serious objection, on his account?'],
      options: [
        'No: a joke he drops as soon as he makes it.',
        'Yes: dull societies always end up poor ones.',
        'No: a dull life is a safe and a good one.',
        'Yes: boredom drives people to break it.'
      ],
      answer: 3,
      right: { label: 'THE SYSTEM BREAKS HERE', body: 'Boredom is not a complaint about taste. It is a force the system produces against itself.' },
      wrong: { body: 'He follows it through: “boredom may lead you to anything.”' },
      quote: { text: 'Of course boredom may lead you to anything.', src: 'PART I · VII' }
    },

    { type: 'question', id: 'f15', scored: true, kind: 'choice', label: 'CLAIM',
      concepts: ['WILL'],
      quotes: [{ text: 'hadn’t we better kick over the whole show and scatter rationalism to the winds', src: 'PART I · VII' }],
      prompt: ['Why would such a man find followers, by his account?'],
      options: [
        'The crystal palace would fail economically.',
        'He would promise them greater prosperity.',
        'People would be too dull to follow the tables.',
        'People prefer acting as they choose.'
      ],
      answer: 3,
      right: { label: 'INSIGHT', body: 'Not a better offer — a preference for acting by one’s own will over any offer.' },
      wrong: { body: 'He promises nothing better. The appeal is the one he names: acting as one chose.' },
      quote: { text: 'has preferred to act as he chose and not in the least as his reason and advantage dictated.', src: 'PART I · VII' }
    },

    { type: 'question', id: 'f16', scored: true, kind: 'multi', label: 'MULTISELECT',
      concepts: ['PREDICTION', 'THE MODEL'],
      prompt: ['As he reports it, what does the calculated future promise?'],
      hint: 'Select all that apply.',
      options: [
        'Tables of every human action.',
        'An end to answering for one’s actions.',
        'A greater variety of experience.',
        'An answer ready for every question.',
        'Room for caprice within the system.'
      ],
      answer: [0, 1, 3],
      right: { label: 'YES', body: 'Tabulation, no responsibility, every answer provided. Variety and caprice are what it removes.' },
      wrong: { body: 'Three are promised together. Variety and caprice are exactly what the system has no place for.' },
      quote: { text: 'man will no longer have to answer for his actions', src: 'PART I · VII' }
    },

    { type: 'rise', to: -61 },

    { type: 'interrupt', id: 'i2',
      line: 'You defend my freedom so ardently. Would you live in my cellar?',
      responses: [
        { text: 'NO.', reply: 'So you want my argument without my life.',
          aside: 'That is allowed. An argument can outlive its author’s misery.' },
        { text: 'YES.', reply: 'Liar. But a charming one.',
          aside: 'Admiring an argument is not living it.' },
        { text: 'THAT DOESN’T SETTLE IT.', reply: 'No. It only makes it uncomfortable.', best: true,
          aside: 'Whether a claim is true and whether its life is good are separate questions.' }
      ]
    },

    /* ─────────────────────────── ACT VI — LOGIC AND HUMANITY ─────────────────────────── */
    { type: 'act', act: 6 },

    { type: 'question', id: 'f17', scored: true, kind: 'choice', label: 'REVERSE',
      concepts: ['WILL', 'THE MODEL'],
      quotes: [{ text: 'reason is nothing but reason and satisfies only the rational side of man’s nature', src: 'PART I · VIII' }],
      prompt: ['Which does he NOT claim in this passage?'],
      options: [
        'That reason covers only part of human nature.',
        'That reason is worthless, to be abandoned.',
        'That will expresses the whole of a human life.',
        'That life exceeds what reason can satisfy.'
      ],
      answer: 1,
      right: { label: 'THAT’S THE DISTINCTION', body: 'He calls reason “an excellent thing.” His claim is that it is partial, not worthless.' },
      wrong: { body: 'The other three are his. He opens by granting that “reason is an excellent thing.”' }
    },

    { type: 'question', id: 'f18', scored: true, kind: 'choice', label: 'IMAGE',
      concepts: ['WILL'],
      quotes: [{ text: 'not simply one twentieth of my capacity for life.', src: 'PART I · VIII' }],
      prompt: ['What does the fraction imply about the formula?'],
      options: [
        'It treats a small part of a person as all.',
        'It is wrong nineteen times out of every twenty.',
        'It should count twenty capacities, not one.',
        'Reason is the least important capacity of all.'
      ],
      answer: 0,
      right: { label: 'INSIGHT', body: 'The formula may be accurate about its twentieth. The error is mistaking it for the person.' },
      wrong: { body: 'The fraction is not an error rate. It names how much of a life reasoning covers.' }
    },

    { type: 'question', id: 'f19', scored: true, kind: 'choice', label: 'DISTINCTION',
      concepts: ['THE MODEL', 'OBJECTION'],
      quotes: [{ text: 'It may be the law of logic, but not the law of humanity.', src: 'PART I · IX' }],
      prompt: ['What is he questioning?'],
      options: [
        'Whether logic itself is valid at all times.',
        'Whether any laws should govern humanity.',
        'Whether ordinary people can learn logic.',
        'Whether what follows is how people are.'
      ],
      answer: 3,
      right: { label: 'THAT’S THE DISTINCTION', body: 'A valid inference about interests may still be false about human beings.' },
      wrong: { body: 'He leaves logic intact. The gap is between what follows and what people do.' }
    },

    { type: 'question', id: 'f20', scored: true, kind: 'choice', label: 'COUNTER',
      concepts: ['OBJECTION'],
      quotes: [{ text: 'how do you know, not only that it is possible, but also that it is DESIRABLE to reform man in that way?', src: 'PART I · IX' }],
      prompt: ['Which challenge is this?'],
      options: [
        'Even if it were feasible, it may not be good.',
        'The reformers are dishonest about their aims.',
        'Men do not really wish to be happy at all.',
        'The reform is technically impossible to achieve.'
      ],
      answer: 0,
      right: { label: 'INSIGHT', body: 'He shifts from whether it can work to whether we should want it — a separate question.' },
      wrong: { body: 'He grants possibility for argument’s sake. The challenge is to its desirability.' }
    },

    { type: 'question', id: 'f21', scored: true, kind: 'choice', label: 'FINAL SURFACE CHECK', final: true,
      concepts: ['THE MODEL', 'WILL'],
      prompt: ['Beyond the evidence, what is his deepest objection to the formula?'],
      options: [
        'Its predictions fail in practice, often.',
        'Reason is harmful and ought to be rejected.',
        'It fits people by erasing their will.',
        'Self-interest is immoral and should be curbed.'
      ],
      answer: 2,
      coda: ['The formula may be right about interests,', 'and wrong about people.'],
      right: { label: 'INSIGHT' },
      wrong: { body: 'Inaccuracy is only his first objection; he never rejects reason or condemns self-interest. His deepest one is that the formula works by leaving the chooser out.' }
    },

    { type: 'rise', from: -67, to: -55, final: true },

    { type: 'clear' }
  ],

  review: [
    { id: 'r-model', concept: 'THE MODEL', sources: ['f01', 'f02', 'f03'],
      variants: [
        { prompt: ['A reformer says: “Teach people their true interest, and crime will vanish.” What must be true for him to be right?'],
          options: [
            'People act on the interest they understand.',
            'People are naturally good once they are fed.',
            'Crime is caused chiefly by poverty and want.',
            'Teachers know better than their pupils.'
          ],
          answer: 0,
          right: 'The programme rests on one premise: understanding produces action.',
          wrong: 'The reformer’s hope needs a single link — knowing one’s interest must mean pursuing it.' }
      ] },

    { id: 'r-context', concept: 'CONTEXT', sources: ['f04', 'f02'],
      variants: [
        { prompt: ['A study guide says: “The narrator attacks Chernyshevsky by name.” What is wrong with this?'],
          options: [
            'Nothing: he is named in chapter VII.',
            'Chernyshevsky wrote after Dostoevsky.',
            'He is unnamed; the link is context.',
            'The narrator agrees with Chernyshevsky.'
          ],
          answer: 2,
          right: 'A well-supported scholarly link is still not a quotation.',
          wrong: 'Search the text: the name never appears. The connection comes from scholarship.' }
      ] },

    { id: 'r-error', concept: 'INTEREST', sources: ['f05', 'f06', 'f07'],
      variants: [
        { prompt: ['A defender says: “He only thinks he chooses against his interest; really he misjudges it.” What does this do to his evidence?'],
          options: [
            'Proves he never chose against his interest.',
            'Shows that his facts were invented.',
            'Concedes that the model is false.',
            'Reclassifies every counterexample as error.'
          ],
          answer: 3,
          right: 'If every refusal counts as a mistake, no case could ever count against the model.',
          wrong: 'The move proves nothing; it redescribes. It makes the theory immune to counterexamples.' }
      ] },

    { id: 'r-facts', concept: 'OBJECTION', sources: ['f08', 'f09', 'f10'],
      variants: [
        { quotes: [{ text: 'blood is being spilt in streams, and in the merriest way, as though it were champagne.', src: 'PART I · VII' }],
          prompt: ['What is this meant to show?'],
          options: [
            'That war is sometimes fully justified.',
            'That progress has not made us rational.',
            'That civilisation must be abandoned.',
            'That people enjoy nothing but violence.'
          ],
          answer: 1,
          right: 'The century of progress is also a century of slaughter. The theory’s forecast failed.',
          wrong: 'It is evidence against a prediction, not a defence of war or a call to abandon civilisation.' }
      ] },

    { id: 'r-register', concept: 'WILL', sources: ['f11', 'f12'],
      variants: [
        { prompt: ['A planner adds “freedom” to the list of advantages. Why is the Underground Man still unsatisfied?'],
          options: [
            'The planner has defined freedom too narrowly.',
            'A listed freedom is assigned, not chosen.',
            'Freedom is less valuable than wealth.',
            'Lists should never contain abstractions.'
          ],
          answer: 1,
          right: 'What he wants is the power to reject the list — including its item called freedom.',
          wrong: 'Any listed good is still the planner’s. His freedom is refusing the list itself.' }
      ] },

    { id: 'r-tables', concept: 'PREDICTION', sources: ['f13', 'f14', 'f15', 'f16'],
      variants: [
        { quotes: [{ text: 'every possible question will vanish in the twinkling of an eye, simply because every possible answer to it will be provided.', src: 'PART I · VII' }],
          prompt: ['Why is this a loss, on his view?'],
          options: [
            'Some of the answers will be wrong.',
            'Scholars will lose their employment.',
            'Living consists partly in the asking.',
            'People dislike being told what to do.'
          ],
          answer: 2,
          right: 'A world with every answer supplied leaves nothing to seek.',
          wrong: 'The loss is not error or pride: the questions themselves disappear.' }
      ] },

    { id: 'r-humanity', concept: 'THE MODEL', sources: ['f17', 'f18', 'f19', 'f20', 'f21'],
      variants: [
        { prompt: ['Someone concludes: “So he thinks reason is worthless.” What does the text say?'],
          options: [
            'He agrees: reason is worthless to him.',
            'He never mentions reason directly.',
            'He says reason is dangerous to children.',
            'He calls reason excellent, but partial.'
          ],
          answer: 3,
          right: '“reason is an excellent thing” — and only one twentieth of life.',
          wrong: 'He praises reason before limiting it. Partial is not worthless.' }
      ] }
  ]
});
