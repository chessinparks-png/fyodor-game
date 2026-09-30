/*
  THE ADVANTAGE — chamber 04.
  Core problem: what is the "most advantageous advantage"?
  Deepens WHAT IS GOOD FOR ME against WHAT I CHOOSE. The determinism problem
  is left open here; it culminates in THE WALL.
*/
UNDERGROUND.register('advantage', {
  contentVersion: 1,

  concepts: ['CHOICE', 'CAPRICE', 'CLASSIFICATION', 'THE RIGHT TO FOLLY', 'WELFARE', 'PERSONALITY'],

  acts: {
    1: 'ACT I — SOMETHING DEARER',
    2: 'ACT II — NO CLASSIFICATION',
    3: 'ACT III — CAPRICE',
    4: 'ACT IV — THE RIGHT TO FOLLY',
    5: 'ACT V — A SEA OF HAPPINESS',
    6: 'ACT VI — THE HEN-HOUSE'
  },

  found: {
    lines: ['What is good for me', 'is not the same as what I choose.']
  },

  steps: [
    /* ─────────────────────────── ACT I — SOMETHING DEARER ─────────────────────────── */
    { type: 'act', act: 1 },

    { type: 'question', id: 'a01', scored: true, kind: 'choice', label: 'CLAIM',
      concepts: ['CHOICE', 'WELFARE'],
      quotes: [{ text: 'there must really exist something that is dearer to almost every man than his greatest advantages', src: 'PART I · VII' }],
      prompt: ['What kind of claim is this?'],
      options: [
        'A claim that all benefits are illusions.',
        'A claim about what people value above benefit.',
        'A claim that most people misjudge their own benefit.',
        'A claim that great advantages are bad.'
      ],
      answer: 1,
      right: { label: 'INSIGHT', body: 'Benefits stay real. Something simply ranks above them.' },
      wrong: { body: 'He does not deny benefits or call them bad. He says something is “dearer” than the greatest of them.' }
    },

    { type: 'question', id: 'a02', scored: true, kind: 'choice', label: 'CLAIM',
      concepts: ['CLASSIFICATION', 'CHOICE'],
      quotes: [{ text: 'or (not to be illogical) there is a most advantageous advantage', src: 'PART I · VII' }],
      prompt: ['Why call it an “advantage” at all?'],
      options: [
        'Because choice is simply one more kind of benefit.',
        'Because he agrees that only advantage counts.',
        'To meet them on their terms, then break the terms.',
        'To make his own view sound more scientific.'
      ],
      answer: 2,
      right: { label: 'YOU CAUGHT THE LOOPHOLE', body: 'He borrows their vocabulary, then shows the word will not stay inside their system.' },
      wrong: { body: 'It is not one more benefit, and he does not accept their terms. He uses their word against their classification.' }
    },

    { type: 'question', id: 'a03', scored: true, kind: 'choice', label: 'DISTINCTION',
      concepts: ['CLASSIFICATION'],
      quotes: [
        { text: '‘Yes, but it’s advantage all the same,’ you will retort.', src: 'PART I · VII' },
        { text: 'it is not a case of playing upon words.', src: 'PART I · VII' }
      ],
      prompt: ['If it is not wordplay, what makes this advantage different in kind?'],
      options: [
        'It is larger than every other advantage combined.',
        'It is harder to obtain than any wealth or peace.',
        'It belongs to the soul, rather than the body.',
        'It breaks down the classifications it enters.'
      ],
      answer: 3,
      right: { label: 'THAT’S THE DISTINCTION', body: 'Not bigger — different. Placed on the list, it undoes the list.' },
      wrong: { body: 'Size and difficulty would still make it one advantage among others. Its mark is that it breaks “all our classifications.”' }
    },

    /* ─────────────────────────── ACT II — NO CLASSIFICATION ─────────────────────────── */
    { type: 'act', act: 2 },

    { type: 'question', id: 'a04', scored: true, kind: 'choice', label: 'CLAIM',
      concepts: ['CLASSIFICATION', 'WELFARE'],
      quotes: [{ text: 'continually shatters every system constructed by lovers of mankind for the benefit of mankind.', src: 'PART I · VII' }],
      prompt: ['Why are benevolent systems the ones it shatters?'],
      options: [
        'They plan benefits that choice can refuse.',
        'They are secretly designed to control people.',
        'They cost far more than they return in good.',
        'They are built by people who hate mankind.'
      ],
      answer: 0,
      right: { label: 'THE SYSTEM BREAKS HERE', body: 'A system for our benefit assumes we will accept benefit. Choice can decline.' },
      wrong: { body: 'He grants the builders are “lovers of mankind.” The trouble is structural: benefit planned for us can be refused.' }
    },

    { type: 'question', id: 'a05', scored: true, kind: 'multi', label: 'MULTISELECT',
      concepts: ['CAPRICE', 'CHOICE'],
      prompt: ['In chapter VII, what does the most advantageous advantage include?'],
      hint: 'Select all that apply.',
      options: [
        'One’s own free choice.',
        'One’s own caprice, however wild.',
        'Choices certified as reasonable.',
        'Fancy worked up at times to frenzy.',
        'Choices that turn out well.'
      ],
      answer: [0, 1, 3],
      right: { label: 'YES', body: 'Choice, caprice, frenzy — nothing in the definition requires the choice to be wise or to succeed.' },
      wrong: { body: 'Three are in his definition. Reasonableness and good outcomes are exactly what it does not require.' },
      quote: { text: 'one’s own fancy worked up at times to frenzy', src: 'PART I · VII' }
    },

    /* ─────────────────────────── ACT III — CAPRICE ─────────────────────────── */
    { type: 'act', act: 3 },

    { type: 'question', id: 'a06', scored: true, kind: 'choice', label: 'CLAIM',
      concepts: ['CAPRICE'],
      quotes: [{ text: 'And choice, of course, the devil only knows what choice.', src: 'PART I · VII' }],
      prompt: ['What does this line add to his praise of choice?'],
      options: [
        'It admits the choice may be anything, even ruin.',
        'It warns that free choice is the devil’s work.',
        'It retracts the whole praise of choice as a joke.',
        'It says what we choose is known to God alone.'
      ],
      answer: 0,
      right: { label: 'INSIGHT', body: 'He praises choice without guaranteeing its content. That is the risk he accepts.' },
      wrong: { body: 'No retraction and no theology: he concedes that free choice may choose anything at all.' }
    },

    { type: 'question', id: 'a07', scored: true, kind: 'choice', label: 'DISTINCTION',
      concepts: ['CHOICE', 'CAPRICE'],
      quotes: [{ text: 'choice can, of course, if it chooses, be in agreement with reason', src: 'PART I · VIII' }],
      prompt: ['Must free choice oppose reason, then?'],
      options: [
        'Yes: any agreement with reason is surrender.',
        'No: free choice always ends by agreeing.',
        'Yes: reason and choice are plain opposites.',
        'No: it may agree, so long as it need not.'
      ],
      answer: 3,
      right: { label: 'THAT’S THE DISTINCTION', body: 'Freedom is not defiance. It is the standing possibility of defiance.' },
      wrong: { body: 'He says choice can agree with reason — and that agreement is “sometimes even praiseworthy.”' }
    },

    { type: 'question', id: 'a08', scored: true, kind: 'choice', label: 'CLAIM',
      concepts: ['CHOICE', 'WELFARE'],
      quotes: [{ text: 'And one may choose what is contrary to one’s own interests, and sometimes one POSITIVELY OUGHT (that is my idea).', src: 'PART I · VII' }],
      prompt: ['Which reading best fits his argument for “POSITIVELY OUGHT”?'],
      options: [
        'Interests are usually miscalculated in any case.',
        'Harm teaches lessons that benefit cannot.',
        'Suffering is simply good for the character.',
        'To keep choice real, it must sometimes refuse.'
      ],
      answer: 3,
      right: { label: 'INSIGHT', body: 'A choice that never goes against interest could not be told apart from calculation.' },
      wrong: { body: 'He is not teaching lessons or praising pain. Choice must be able to refuse, or it is only reckoning.' }
    },

    { type: 'interrupt', id: 'i1',
      line: 'You keep asking what my freedom is for. Isn’t that the very question I refuse?',
      responses: [
        { text: 'IT IS FOR YOUR DIGNITY.', reply: 'You make it useful again. How quickly they recapture it.',
          aside: 'Turning freedom into a means puts it back on the list.' },
        { text: 'THEN I CAN’T JUDGE IT.', reply: 'You can. You simply can’t price it.', best: true,
          aside: 'Valuing without pricing is his whole claim.' },
        { text: 'THEN IT IS WORTHLESS.', reply: 'To an accountant, certainly.',
          aside: 'Worth that cannot be calculated is not the same as no worth.' }
      ]
    },

    { type: 'rise', to: -52 },

    /* ─────────────────────────── ACT IV — THE RIGHT TO FOLLY ─────────────────────────── */
    { type: 'act', act: 4 },

    { type: 'question', id: 'a09', scored: true, kind: 'choice', label: 'DISTINCTION',
      concepts: ['THE RIGHT TO FOLLY'],
      quotes: [{ text: 'not to be bound by an obligation to desire only what is sensible.', src: 'PART I · VIII' }],
      prompt: ['What exactly is he defending?'],
      options: [
        'Folly itself, as being better than good sense.',
        'The right to want folly, not folly itself.',
        'A new duty to desire what is foolish.',
        'Good sense, freed from any obligation.'
      ],
      answer: 1,
      right: { label: 'THAT’S THE DISTINCTION', body: 'He attacks the obligation, not the sensible. Folly is permitted, not prescribed.' },
      wrong: { body: 'He praises neither folly nor a new duty. He rejects being bound to desire only the sensible.' }
    },

    { type: 'question', id: 'a10', scored: true, kind: 'choice', label: 'CLAIM',
      concepts: ['PERSONALITY', 'CHOICE'],
      quotes: [{ text: 'it preserves for us what is most precious and most important—that is, our personality, our individuality.', src: 'PART I · VIII' }],
      prompt: ['By his account, what does caprice protect?'],
      options: [
        'Our happiness, against those who would plan it.',
        'Our reputation for being unpredictable.',
        'The pleasure we sometimes take in harm.',
        'A self that is more than its interests.'
      ],
      answer: 3,
      right: { label: 'INSIGHT', body: 'Not happiness — personhood. A self the register of interests cannot contain.' },
      wrong: { body: 'He names it: “our personality, our individuality.” Happiness is not what caprice guards.' }
    },

    { type: 'question', id: 'a11', scored: true, kind: 'choice', label: 'CLAIM',
      concepts: ['PERSONALITY', 'WELFARE'],
      quotes: [{ text: 'this caprice of ours, may be in reality, gentlemen, more advantageous for us than anything else on earth', src: 'PART I · VIII' }],
      prompt: ['Advantageous in what sense?'],
      options: [
        'It keeps us ourselves, even when it harms us.',
        'It usually turns out well for us in the long run.',
        'It makes us richer than careful planning.',
        'It pleases us more than any other good.'
      ],
      answer: 0,
      right: { label: 'YES', body: 'The advantage is not in results or pleasure. It is in remaining a person.' },
      wrong: { body: 'He adds that it may do “obvious harm.” Its advantage is keeping our individuality.' }
    },

    { type: 'question', id: 'a12', scored: true, kind: 'choice', label: 'APPLICATION',
      concepts: ['THE RIGHT TO FOLLY', 'CHOICE'],
      prompt: ['A doctor forbids a patient wine. Which patient is closest to the Underground Man’s view?'],
      options: [
        'One who drinks because he thinks it is healthy.',
        'One who drinks because he truly cannot stop.',
        'One who drinks, knowing the harm, to keep it his.',
        'One who drinks, knowing the harm, to spite the doctor.'
      ],
      answer: 2,
      right: { label: 'INSIGHT', body: 'Knowing, and choosing anyway, for the sake of choosing. Not error, not compulsion, not revenge.' },
      wrong: { body: 'Error and addiction are not free choice, and spiting the doctor makes the act about him. The view defends choosing for oneself.' }
    },

    { type: 'found', title: 'THE RIGHT TO FOLLY', line: 'He defends the right to want what is foolish — not the folly.' },

    { type: 'rise', to: -49 },

    /* ─────────────────────────── ACT V — A SEA OF HAPPINESS ─────────────────────────── */
    { type: 'act', act: 5 },

    { type: 'question', id: 'a13', scored: true, kind: 'choice', label: 'THOUGHT EXPERIMENT',
      concepts: ['WELFARE'],
      quotes: [
        { text: 'Shower upon him every earthly blessing, drown him in a sea of happiness', src: 'PART I · VIII' },
        { text: 'even then out of sheer ingratitude, sheer spite, man would play you some nasty trick.', src: 'PART I · VIII' }
      ],
      prompt: ['What does the thought experiment isolate?'],
      options: [
        'People are wicked and should not be helped.',
        'Welfare cannot be what people want most.',
        'Happiness is impossible to deliver in fact.',
        'Prosperity makes people lazy and bored.'
      ],
      answer: 1,
      right: { label: 'THE SYSTEM BREAKS HERE', body: 'Remove every want of welfare and the trick still comes. So welfare was never the deepest want.' },
      wrong: { body: 'He grants the blessings in full to test what remains. What remains is the will to play the trick.' }
    },

    { type: 'question', id: 'a14', scored: true, kind: 'choice', label: 'CLAIM',
      concepts: ['WELFARE', 'PERSONALITY'],
      quotes: [{ text: 'I believe that the best definition of man is the ungrateful biped.', src: 'PART I · VIII' }],
      prompt: ['In context, why “ungrateful”?'],
      options: [
        'He will not accept a good he did not choose.',
        'He forgets every kindness done to him.',
        'He is selfish, and never repays what he owes.',
        'He blames God for his own misfortunes.'
      ],
      answer: 0,
      right: { label: 'INSIGHT', body: 'Gratitude would mean accepting the gift as given. He insists on the choosing.' },
      wrong: { body: 'The ingratitude answers the shower of blessings: goods bestowed, not chosen.' }
    },

    { type: 'question', id: 'a15', scored: true, kind: 'choice', label: 'IMAGE',
      concepts: ['CHOICE', 'WELFARE'],
      quotes: [{ text: 'like a chess player, loves the process of the game, not the end of it.', src: 'PART I · IX' }],
      prompt: ['What does the chess image suggest about welfare?'],
      options: [
        'Life is a game, so nothing in it is serious.',
        'Pursuing a good may matter more than having it.',
        'People play only to win, and hate losing.',
        'Welfare should be won by skill, not simply given.'
      ],
      answer: 1,
      right: { label: 'YES', body: 'A completed good ends the activity that made it worth wanting.' },
      wrong: { body: 'The image is about process, not winning or seriousness: the game matters more than the end.' }
    },

    { type: 'question', id: 'a16', scored: true, kind: 'choice', label: 'CLAIM',
      concepts: ['CAPRICE', 'CHOICE'],
      quotes: [{ text: 'because he is instinctively afraid of attaining his object and completing the edifice he is constructing?', src: 'PART I · IX' }],
      prompt: ['By this account, why might a builder love destruction?'],
      options: [
        'He secretly hates everything he has built.',
        'Destroying is simply more enjoyable than building.',
        'Finishing would leave him nothing left to do.',
        'He wants to rebuild it better next time.'
      ],
      answer: 2,
      right: { label: 'INSIGHT', body: 'Completion is a kind of ending. Chaos keeps the road open.' },
      wrong: { body: 'He loves building, not the building. Destruction postpones the finish he fears.' }
    },

    { type: 'interrupt', id: 'i2',
      line: 'Give me every blessing and I will still stick out my tongue. Freedom — or childishness?',
      responses: [
        { text: 'FREEDOM.', reply: 'Thank you. I knew you had taste.',
          aside: 'You granted the premise too quickly.' },
        { text: 'CHILDISHNESS.', reply: 'And yet you would miss it, if it were gone.',
          aside: 'Contempt does not answer the argument.' },
        { text: 'IT MIGHT BE BOTH.', reply: 'That is the most dangerous answer yet.', best: true,
          aside: 'A freedom can be real and petty at once.' }
      ]
    },

    { type: 'rise', to: -46 },

    /* ─────────────────────────── ACT VI — THE HEN-HOUSE ─────────────────────────── */
    { type: 'act', act: 6 },

    { type: 'question', id: 'a17', scored: true, kind: 'choice', label: 'IMAGE',
      concepts: ['WELFARE', 'CHOICE'],
      quotes: [{ text: 'I would not call the hen-house a palace out of gratitude to it for keeping me dry.', src: 'PART I · X' }],
      prompt: ['What is he refusing?'],
      options: [
        'To let usefulness settle what he calls ideal.',
        'Shelter of any kind, even when it rains.',
        'To live anywhere at all except in a real palace.',
        'To thank anyone at all for any favour.'
      ],
      answer: 0,
      right: { label: 'THAT’S THE DISTINCTION', body: 'He will use the hen-house. He will not let its usefulness redefine his ideal.' },
      wrong: { body: 'He says he might creep in to keep dry. What he refuses is renaming it a palace.' }
    },

    { type: 'question', id: 'a18', scored: true, kind: 'choice', label: 'CLAIM',
      concepts: ['WELFARE', 'PERSONALITY'],
      quotes: [{ text: 'I will put up with any mockery rather than pretend that I am satisfied when I am hungry.', src: 'PART I · X' }],
      prompt: ['What is the hunger for?'],
      options: [
        'Food and material security above all.',
        'An ideal worth desiring, not a compromise.',
        'Power over the people who feed and house him.',
        'Revenge on those who mock his hunger.'
      ],
      answer: 1,
      right: { label: 'INSIGHT', body: 'The hunger is for something desired, not something merely adequate.' },
      wrong: { body: 'He is well enough housed. He refuses to call a compromise the crown of his desires.' }
    },

    { type: 'question', id: 'a19', scored: true, kind: 'choice', label: 'CLAIM',
      concepts: ['CHOICE', 'WELFARE'],
      quotes: [{ text: 'Destroy my desires, eradicate my ideals, show me something better, and I will follow you.', src: 'PART I · X' }],
      prompt: ['What does this concession reveal?'],
      options: [
        'He will follow anyone who promises more.',
        'He has no ideals of his own left to lose.',
        'He secretly wants someone to argue him out of it.',
        'He opposes imposed goods, not goods as such.'
      ],
      answer: 3,
      right: { label: 'INSIGHT', body: 'Show him a better ideal and he will follow. He resists goods assigned in place of desire.' },
      wrong: { body: 'He is not for sale and not empty. He would follow a better ideal — but it must be one he desires.' }
    },

    { type: 'question', id: 'a20', scored: true, kind: 'choice', label: 'FINAL SURFACE CHECK', final: true,
      concepts: ['CHOICE', 'WELFARE'],
      prompt: ['Which distinction does the whole chamber turn on?'],
      options: [
        'What is rational versus what is irrational.',
        'What is moral versus what is profitable.',
        'What is good for me versus what I choose.',
        'What is predicted versus what is free.'
      ],
      answer: 2,
      coda: ['What is good for me', 'is not the same as what I choose.'],
      right: { label: 'INSIGHT' },
      wrong: { body: 'Prediction and freedom is THE WALL’s question. Here the line runs between benefit and choice.' }
    },

    { type: 'rise', from: -55, to: -43, final: true },

    { type: 'clear' }
  ],

  review: [
    { id: 'r-dearer', concept: 'CHOICE', sources: ['a01', 'a02', 'a03'],
      variants: [
        { prompt: ['An economist says: “If people value choice, then choice is just one more utility to maximise.” What is his reply?'],
          options: [
            'Choice is worth less than utility anyway.',
            'Economists cannot measure what anyone values at all.',
            'Utility and choice are exactly the same.',
            'Then it would be classified; his breaks classes.'
          ],
          answer: 3,
          right: 'An advantage that fits the register would not be his. His is the one that breaks it.',
          wrong: 'The economist absorbs choice into the list. His claim is that it cannot be absorbed.' }
      ] },

    { id: 'r-system', concept: 'CLASSIFICATION', sources: ['a04', 'a05', 'a06'],
      variants: [
        { quotes: [{ text: 'are, in my opinion, so far, mere logical exercises!', src: 'PART I · VII' }],
          prompt: ['Why does he call the benevolent systems mere logical exercises?'],
          options: [
            'Their premises are false about arithmetic.',
            'Their authors are not really logicians.',
            'They follow from premises that leave out choice.',
            'Logic cannot be applied to human life in any form.'
          ],
          answer: 2,
          right: 'Valid on paper, they assume the chooser will accept what is calculated.',
          wrong: 'The logic holds. The premise that people pursue their calculated interest is what fails.' }
      ] },

    { id: 'r-reason', concept: 'CAPRICE', sources: ['a07', 'a08'],
      variants: [
        { prompt: ['Someone says: “So a free man must act unreasonably.” What does he actually say?'],
          options: [
            'Choice may agree with reason, if not bound to.',
            'Yes: reason is the enemy of freedom.',
            'No: freedom means following reason.',
            'He never actually discusses how reason and choice relate.'
          ],
          answer: 0,
          right: 'Agreement with reason is allowed — even praiseworthy. Obligation is what he rejects.',
          wrong: 'He grants that “choice can, of course, if it chooses, be in agreement with reason.” It must simply not be bound to.' }
      ] },

    { id: 'r-folly', concept: 'THE RIGHT TO FOLLY', sources: ['a09', 'a10', 'a11', 'a12'],
      variants: [
        { prompt: ['A friend says: “He thinks foolish choices are better than wise ones.” How should the friend be corrected?'],
          options: [
            'He thinks wise choices are impossible.',
            'He thinks the fool is happier than the wise man.',
            'He thinks nobody is ever really wise.',
            'He defends the right to folly, not its merit.'
          ],
          answer: 3,
          right: 'The claim is about permission, not preference: the right to want even what is stupid.',
          wrong: 'He never ranks folly above wisdom. He refuses the obligation to want only the sensible.' }
      ] },

    { id: 'r-blessing', concept: 'WELFARE', sources: ['a13', 'a14', 'a15', 'a16'],
      variants: [
        { quotes: [{ text: 'He would even risk his cakes and would deliberately desire the most fatal rubbish', src: 'PART I · VIII' }],
          prompt: ['What are the cakes there to test?'],
          options: [
            'Whether comfort can buy off the will.',
            'Whether people prefer sweets to bread.',
            'Whether wealth leads to gluttony.',
            'Whether hunger explains rebellion.'
          ],
          answer: 0,
          right: 'Satisfy every need, and see if the will is quieted. It is not.',
          wrong: 'The cakes stand for fully met needs. The question is whether satisfaction silences choice.' }
      ] },

    { id: 'r-henhouse', concept: 'CHOICE', sources: ['a17', 'a18', 'a19', 'a20'],
      variants: [
        { prompt: ['A planner offers him a comfortable model flat. Which response fits chapter X?'],
          options: [
            'He refuses to set foot in it at all.',
            'He may live there, but won’t call it his ideal.',
            'He accepts it gladly as the crown of all his desires.',
            'He demands a larger and grander flat.'
          ],
          answer: 1,
          right: 'He will take shelter; he will not rename shelter as his ideal.',
          wrong: 'He might creep into a hen-house to keep dry. He refuses only to call it a palace.' }
      ] }
  ]
});
