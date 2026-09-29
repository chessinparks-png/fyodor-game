/*
  THE NOTE FROM BELOW — chamber 01.
  Core problem: who is speaking, and why distrust him without dismissing him?
  SPITE asks why he harms himself. This chamber asks how to read a voice that
  frames, performs, pre-empts and retracts itself.
*/
UNDERGROUND.register('note', {
  contentVersion: 1,

  concepts: ['FRAMING', 'SELF-PORTRAIT', 'CONTRADICTION', 'THE READER', 'CONFESSION', 'RELIABILITY'],

  acts: {
    1: 'ACT I — THE FRAME',
    2: 'ACT II — A SICK MAN',
    3: 'ACT III — THE REAL STING',
    4: 'ACT IV — GENTLEMEN',
    5: 'ACT V — THE CONFESSION',
    6: 'ACT VI — THE FRAME CLOSES'
  },

  found: {
    lines: ['The notes are a performance.', 'The performance is the evidence.']
  },

  steps: [
    /* ─────────────────────────── ACT I — THE FRAME ───────────────────────────
       before he speaks, someone else introduces him */
    { type: 'act', act: 1 },

    { type: 'question', id: 'n01', scored: true, kind: 'choice', label: 'FRAME',
      concepts: ['FRAMING'],
      quotes: [
        { text: 'The author of the diary and the diary itself are, of course, imaginary.', src: 'PART I · NOTE' },
        { text: 'He is one of the representatives of a generation still living.', src: 'PART I · NOTE' }
      ],
      prompt: ['What does this note ask of the reader?'],
      options: [
        'To read the notes as the author’s own confession.',
        'To trust his account, since the author vouches for it.',
        'To dismiss his ideas as the author’s parody of a rival.',
        'To treat him as invented, yet socially real: a type.'
      ],
      answer: 3,
      right: { label: 'INSIGHT', body: 'Fictional and representative at once: neither autobiography nor caricature.' },
      wrong: { body: 'The note calls the diary imaginary, so not a confession; and it claims him as a real type, so not mere parody.' }
    },

    { type: 'question', id: 'n02', scored: true, kind: 'choice', label: 'FRAME',
      concepts: ['FRAMING'],
      quotes: [{ text: 'not only may, but positively must, exist in our society', src: 'PART I · NOTE' }],
      prompt: ['What does “must” add that “may” would not?'],
      options: [
        'That such a man is plausible, though rare.',
        'That the author knew men like him personally.',
        'That his society makes him inevitable.',
        'That he is a warning about the future.'
      ],
      answer: 2,
      right: { label: 'THAT’S THE DISTINCTION', body: 'The word “may” allows him; “must” explains him — as a consequence of the circumstances that formed him.' },
      wrong: { body: 'The word “may” would only make him possible; “must” makes him a product of his society — of “a generation still living,” not the future.' }
    },

    /* ─────────────────────────── ACT II — A SICK MAN ───────────────────────────
       the self-portrait, and the hand that keeps revising it */
    { type: 'act', act: 2 },

    { type: 'question', id: 'n03', scored: true, kind: 'choice', label: 'SELF-PORTRAIT',
      concepts: ['SELF-PORTRAIT', 'THE READER'],
      quotes: [{ text: 'I am a sick man. ... I am a spiteful man. I am an unattractive man.', src: 'PART I · I' }],
      prompt: ['Read with the rest of chapter I, which reading fits best?'],
      options: [
        'A diagnosis, offered so the reader will make allowances.',
        'He claims the worst terms before anyone else can.',
        'A plea for pity, disguised as blunt honesty.',
        'A parody of the confessions of his day.'
      ],
      answer: 1,
      right: { label: 'INSIGHT', body: 'He names himself first and worst — the move he will make on every page.' },
      wrong: { body: 'He never asks for allowances or pity; he keeps pre-empting judgment. The opening is the first instance of it.' }
    },

    { type: 'question', id: 'n04', scored: true, kind: 'choice', label: 'SELF-PORTRAIT',
      concepts: ['SELF-PORTRAIT', 'CONFESSION'],
      quotes: [{ text: 'A poor jest, but I will not scratch it out. ... I will not scratch it out on purpose!', src: 'PART I · I' }],
      prompt: ['What does “on purpose” add?'],
      options: [
        'It marks the jest as a record kept for honesty’s sake.',
        'It concedes your judgment before you can make it.',
        'It shows he no longer cares how he appears.',
        'It turns exposing himself into an act of defiance.'
      ],
      answer: 3,
      right: { label: 'YOU CAUGHT THE LOOPHOLE', body: 'He exposes the cheap effect — then keeps it as a gesture. Honesty becomes a performance of will.' },
      wrong: { body: 'Keeping it for honesty would not need “on purpose.” The phrase makes the confession an act of defiance.' }
    },

    { type: 'question', id: 'n05', scored: true, kind: 'choice', label: 'CONTRADICTION',
      concepts: ['CONTRADICTION', 'SELF-PORTRAIT'],
      quotes: [
        { text: 'To live longer than forty years is bad manners, is vulgar, immoral.', src: 'PART I · I' },
        { text: 'I shall go on living to sixty myself. To seventy! To eighty!', src: 'PART I · I' }
      ],
      prompt: ['What is this contradiction doing?'],
      options: [
        'Exposing a slip he does not notice making.',
        'Revealing a fear of death he cannot admit.',
        'Mocking old men, whom he openly despises.',
        'Staging inconsistency as a provocation.'
      ],
      answer: 3,
      right: { label: 'YES', body: 'He states the rule and breaks it in one breath — then pauses to enjoy the effect.' },
      wrong: { body: 'He notices: “Stay, let me take breath.” The inconsistency is displayed, not committed by accident.' }
    },

    { type: 'question', id: 'n06', scored: true, kind: 'multi', label: 'MULTISELECT',
      concepts: ['THE READER'],
      prompt: ['In chapter I alone, which moves does he make toward you?'],
      hint: 'Select all that apply.',
      options: [
        'Predicts what you are thinking.',
        'Asks you outright for sympathy.',
        'Denies caring what you conclude.',
        'Promises to tell the whole truth.',
        'Corrects assumptions you have not voiced.'
      ],
      answer: [0, 2, 4],
      right: { label: 'YES', body: 'He predicts you, dismisses you, corrects you — and never asks you for anything.' },
      wrong: { body: 'He fancies your thoughts, says he does not care, and tells you “You are mistaken in that, too.” He neither pleads nor promises.' }
    },

    { type: 'rise', to: -88 },

    { type: 'interrupt', id: 'i1',
      line: 'You keep looking for the real me. Which one would satisfy you?',
      responses: [
        { text: 'THE ONE WHO LIES.', reply: 'Only one? You flatter me.',
          aside: 'Catching the lie is where reading begins, not where it ends.' },
        { text: 'THE ONE WHO WROTE THIS.', reply: 'Then you have all of them at once.', best: true,
          aside: 'The performance is the person you can read.' },
        { text: 'NONE OF THEM.', reply: 'Then close the notebook. No? I thought not.',
          aside: 'Dismissal is only belief turned inside out.' }
      ]
    },

    /* ─────────────────────────── ACT III — THE REAL STING ───────────────────────────
       the spite he claims, and the shame underneath it */
    { type: 'act', act: 3 },

    { type: 'question', id: 'n07', scored: true, kind: 'choice', label: 'CLAIM',
      concepts: ['CONTRADICTION', 'SELF-PORTRAIT'],
      quotes: [{ text: 'I was inwardly conscious with shame that I was not only not a spiteful but not even an embittered man', src: 'PART I · I' }],
      prompt: ['By his account, what was the real sting?'],
      options: [
        'That others saw through his spite and laughed.',
        'That his spite was real, and he was ashamed of it.',
        'That even raging, he knew the spite was not his.',
        'That he could not stop being spiteful, though he tried.'
      ],
      answer: 2,
      right: { label: 'INSIGHT', body: 'The shame is not in the spite. It is in knowing the spite is hollow.' },
      wrong: { body: 'He is ashamed that he was not spiteful — not even embittered. The sting is the emptiness of his own rage.' }
    },

    { type: 'question', id: 'n08', scored: true, kind: 'choice', label: 'IMAGE',
      concepts: ['SELF-PORTRAIT'],
      quotes: [{ text: 'I might foam at the mouth, but bring me a doll to play with, give me a cup of tea with sugar in it, and maybe I should be appeased.', src: 'PART I · I' }],
      prompt: ['What does this image do to his rage?'],
      options: [
        'Shrinks it to a mood a trifle could soothe.',
        'Proves the rage was feigned from the start.',
        'Reveals a gentleness he wants you to admire.',
        'Shows a man who never grew out of childhood.'
      ],
      answer: 0,
      right: { label: 'YES', body: 'The foam is real; what it rests on is not. A doll could end it.' },
      wrong: { body: 'He does foam at the mouth — the rage is felt. But it is hollow enough for a trifle to dissolve.' }
    },

    { type: 'question', id: 'n09', scored: true, kind: 'choice', label: 'CONTRADICTION',
      concepts: ['CONTRADICTION', 'RELIABILITY'],
      quotes: [{ text: 'I was simply amusing myself with the petitioners and with the officer, and in reality I never could become spiteful.', src: 'PART I · I' }],
      prompt: ['He has just said he enjoyed making petitioners unhappy. Which reading keeps both claims?'],
      options: [
        'He was never spiteful, so none of it was cruel.',
        'He lied before, so this later line can be trusted.',
        'The petitioners, not he, provoked all the spite.',
        'His spite was play-acting that still hurt people.'
      ],
      answer: 3,
      right: { label: 'THAT’S THE DISTINCTION', body: 'Performed spite is still spite to the petitioner. Hollow is not harmless.' },
      wrong: { body: 'Trusting the later line throws the earlier one away. Both hold: he was acting, and the acting made people unhappy.' }
    },

    { type: 'question', id: 'n10', scored: true, kind: 'choice', label: 'SELF-PORTRAIT',
      concepts: ['SELF-PORTRAIT', 'RELIABILITY'],
      quotes: [{ text: 'taunting myself with the spiteful and useless consolation that an intelligent man cannot become anything seriously, and it is only the fool who becomes anything.', src: 'PART I · I' }],
      prompt: ['Which reading accounts for both “spiteful” and “useless”?'],
      options: [
        'It insults the fools who manage to become something.',
        'It consoles him, but only for a moment at a time.',
        'It is false, since intelligent men do succeed.',
        'It scorns others to flatter him, and does nothing.'
      ],
      answer: 3,
      right: { label: 'INSIGHT', body: 'Spiteful toward others, useless to himself — and he says so while repeating it.' },
      wrong: { body: 'Insulting the fools explains “spiteful” but not “useless.” The consolation flatters him and changes nothing.' }
    },

    { type: 'found', title: 'SELF-PERFORMANCE', line: 'He tells the truth by showing how badly he can lie about himself.' },

    /* ─────────────────────────── ACT IV — GENTLEMEN ───────────────────────────
       the reader he invents, answers, and needs */
    { type: 'act', act: 4 },

    { type: 'question', id: 'n11', scored: true, kind: 'choice', label: 'THE READER',
      concepts: ['THE READER'],
      quotes: [{ text: 'Now, are not you fancying, gentlemen, that I am expressing remorse for something now, that I am asking your forgiveness for something?', src: 'PART I · I' }],
      prompt: ['He then says he does not care if you are. What does the move accomplish?'],
      options: [
        'It refuses your reading before you can form it.',
        'It shows he truly does not care what you think.',
        'It asks forgiveness without having to say so.',
        'It mocks readers who expect a moral lesson.'
      ],
      answer: 0,
      right: { label: 'YOU CAUGHT THE LOOPHOLE', body: 'By naming your reading first, he keeps the right to deny it.' },
      wrong: { body: 'The question is what the move does, not what he feels. Naming your reading first lets him refuse it before it lands.' }
    },

    { type: 'question', id: 'n12', scored: true, kind: 'sequence', label: 'SEQUENCE',
      concepts: ['THE READER', 'CONTRADICTION'],
      prompt: ['Build the move, as chapter II makes it.'],
      hint: 'Tap the steps in order. Tap a step to take it back.',
      tiles: ['HE CONCEDES: “MY CONTENTION WAS ABSURD”', 'HE CLAIMS: CONSCIOUSNESS IS A DISEASE', 'HE KEEPS IT: “I STICK TO THAT”', 'HE VOICES YOUR SUSPICION: AFFECTATION'],
      answer: [1, 3, 0, 2],
      right: { label: 'YES' },
      wrong: { body: 'Claim; your suspected objection; concession; the claim kept anyway. He grants the point so he can keep it.' },
      quote: { text: 'We will not dispute it; my contention was absurd.', src: 'PART I · II' }
    },

    { type: 'question', id: 'n13', scored: true, kind: 'choice', label: 'THE READER',
      concepts: ['THE READER', 'CONFESSION'],
      quotes: [
        { text: 'You may have sincerity, but you have no modesty', src: 'PART I · XI' },
        { text: 'Of course I have myself made up all the things you say.', src: 'PART I · XI' }
      ],
      prompt: ['Who is really accusing him?'],
      options: [
        'The men of action he despises, answering back.',
        'He is — speaking in the reader’s voice.',
        'His conscience, which he now obeys at last.',
        'The reader, whose objections he records fairly.'
      ],
      answer: 1,
      right: { label: 'INSIGHT', body: 'The prosecution is his own. He writes your verdict so that it is his.' },
      wrong: { body: 'He says he made it all up himself. The accuser is his own voice, wearing yours.' }
    },

    { type: 'question', id: 'n14', scored: true, kind: 'choice', label: 'THE READER',
      concepts: ['THE READER', 'SELF-PORTRAIT'],
      quotes: [{ text: 'And perhaps that I purposely imagine an audience before me in order that I may be more dignified while I write.', src: 'PART I · XI' }],
      prompt: ['In this passage, what does the imagined audience give him?'],
      options: [
        'Company, since he has no one else to talk to.',
        'A pose to hold: dignity needs a witness.',
        'A way to test his arguments against objections.',
        'Freedom to lie, since no real reader will check.'
      ],
      answer: 1,
      right: { label: 'YES', body: 'Even alone, he writes for a witness. Without one, there is no dignity to perform.' },
      wrong: { body: 'Loneliness is real in him, but this passage names the reason: to be “more dignified.”' }
    },

    { type: 'rise', to: -85 },

    { type: 'interrupt', id: 'i2',
      line: 'You call me a performance. Is your reading not a performance too?',
      responses: [
        { text: 'YES — BUT YOURS IS WORSE.', reply: 'At last, a verdict. How it must relieve you.',
          aside: 'You traded interpretation for a judgment.' },
        { text: 'THEN NOTHING CAN BE KNOWN.', reply: 'Splendid. Then leave me in peace.',
          aside: 'Unreliable is not the same as meaningless.' },
        { text: 'MINE CAN BE CHECKED.', reply: 'Against what? My words?', best: true,
          aside: 'Against the text — including the lines that contradict him.' }
      ]
    },

    /* ─────────────────────────── ACT V — THE CONFESSION ───────────────────────────
       can a man be honest with himself on paper? */
    { type: 'act', act: 5 },

    { type: 'question', id: 'n15', scored: true, kind: 'choice', label: 'CONFESSION',
      concepts: ['CONFESSION'],
      quotes: [{ text: 'Heine says that a true autobiography is almost an impossibility, and that man is bound to lie about himself.', src: 'PART I · XI' }],
      prompt: ['He agrees with Heine, then exempts himself. On what grounds?'],
      options: [
        'He confesses his crimes, not his virtues.',
        'He has no vanity left to lie out of.',
        'He does not write for the public.',
        'He writes in the heat of the moment.'
      ],
      answer: 2,
      right: { label: 'YES', body: 'Heine judged public confessions. He claims to write for himself alone.' },
      wrong: { body: 'He concedes the vanity. His exemption is the audience: “Heine judged of people who made their confessions to the public.”' }
    },

    { type: 'question', id: 'n16', scored: true, kind: 'choice', label: 'COUNTER',
      concepts: ['CONFESSION', 'RELIABILITY'],
      prompt: ['Given his own admissions in chapter XI, which critique of that exemption is strongest?'],
      options: [
        'Nobody can write for himself alone.',
        'Heine was wrong, so no exemption is needed.',
        'Vanity works on an audience he imagines.',
        'Writing for oneself is dishonest by definition.'
      ],
      answer: 2,
      right: { label: 'THE SYSTEM BREAKS HERE', body: 'He admits he imagines an audience to feel dignified. The public he escapes, he reinvents.' },
      wrong: { body: 'The strongest critique uses his own words: he imagines readers “in order that I may be more dignified.”' }
    },

    { type: 'question', id: 'n17', scored: true, kind: 'choice', label: 'CONFESSION',
      concepts: ['CONFESSION'],
      quotes: [
        { text: 'But there are other things which a man is afraid to tell even to himself', src: 'PART I · XI' },
        { text: 'I want to try the experiment whether one can, even with oneself, be perfectly open and not take fright at the whole truth.', src: 'PART I · XI' }
      ],
      prompt: ['Which aim fits both passages?'],
      options: [
        'Honesty toward himself, as an experiment.',
        'Forgiveness, won from a sympathetic reader.',
        'A record of his crimes, for justice’s sake.',
        'A defence of his life against his critics.'
      ],
      answer: 0,
      right: { label: 'INSIGHT', body: 'The hardest audience is himself. The confession is a test of nerve, not a plea.' },
      wrong: { body: 'He sets out to be open “even with oneself.” The audience that matters is the one he fears most: himself.' }
    },

    { type: 'question', id: 'n18', scored: true, kind: 'choice', label: 'RELIABILITY',
      concepts: ['RELIABILITY', 'CONTRADICTION'],
      quotes: [{ text: 'That is, I believe it, perhaps, but at the same time I feel and suspect that I am lying like a cobbler.', src: 'PART I · XI' }],
      prompt: ['What does this sentence do to everything before it?'],
      options: [
        'Cancels it: the notes can now be set aside.',
        'It stands, but unstable: belief and doubt at once.',
        'Confirms it: honesty about lying proves sincerity.',
        'Reveals the whole of Part I as a deliberate joke.'
      ],
      answer: 1,
      headline: 'UNRELIABLE DOES NOT MEAN MEANINGLESS.',
      right: { label: 'THAT’S THE DISTINCTION', body: 'He believes it and suspects it at once. You read the tension, not a verdict.' },
      wrong: { body: 'Admitting doubt neither cancels the notes nor certifies them. It holds belief and suspicion together.' }
    },

    { type: 'beat', lines: ['UNRELIABLE', 'DOES NOT MEAN MEANINGLESS.'], full: true },

    { type: 'rise', to: -82 },

    /* ─────────────────────────── ACT VI — THE FRAME CLOSES ───────────────────────────
       what the notes became, and who ends them */
    { type: 'act', act: 6 },

    { type: 'question', id: 'n19', scored: true, kind: 'choice', label: 'CONFESSION',
      concepts: ['CONFESSION', 'FRAMING'],
      quotes: [
        { text: 'Besides, I shall perhaps obtain actual relief from writing.', src: 'PART I · XI' },
        { text: 'I have felt ashamed all the time I’ve been writing this story; so it’s hardly literature so much as a corrective punishment.', src: 'PART II · X' }
      ],
      prompt: ['What has the writing become?'],
      options: [
        'The relief he hoped for, arriving late.',
        'Literature after all, despite his denials.',
        'A penance: the writing itself is the shame.',
        'Proof that confession cures, once finished.'
      ],
      answer: 2,
      right: { label: 'INSIGHT', body: 'He hoped writing would release him. It became the punishment.' },
      wrong: { body: 'He calls it “hardly literature” and says he felt ashamed throughout. The relief turned into penance.' }
    },

    { type: 'question', id: 'n20', scored: true, kind: 'choice', label: 'SELF-PORTRAIT',
      concepts: ['SELF-PORTRAIT', 'FRAMING'],
      quotes: [{ text: 'a novel needs a hero, and all the traits for an anti-hero are EXPRESSLY gathered together here', src: 'PART II · X' }],
      prompt: ['What does “EXPRESSLY” admit?'],
      options: [
        'That the anti-hero was assembled on purpose.',
        'That Dostoevsky, not the diarist, speaks here.',
        'That he has told the unvarnished truth at last.',
        'That he regrets the portrait and would redo it.'
      ],
      answer: 0,
      right: { label: 'YOU CAUGHT THE LOOPHOLE', body: 'The self on these pages was composed. Even his worst traits are arranged.' },
      wrong: { body: 'The diarist is still speaking — this is his own last entry. “EXPRESSLY” admits the portrait was built.' }
    },

    { type: 'question', id: 'n21', scored: true, kind: 'choice', label: 'FRAME',
      concepts: ['FRAMING', 'RELIABILITY'],
      quotes: [{ text: 'He could not refrain from going on with them, but it seems to us that we may stop here.', src: 'PART II · X' }],
      prompt: ['Who ends the book, and what does that do?'],
      options: [
        'The frame’s voice: he cannot stop, so it stops him.',
        'The diarist, who has at last run out of things to say.',
        'A censor, who cut whatever the notes said next.',
        'An editor, because the rest of the notes were lost.'
      ],
      answer: 0,
      right: { label: 'INSIGHT', body: 'The frame opens and closes him. His voice never finishes; it is ended.' },
      wrong: { body: '“He could not refrain from going on” — so a voice outside the notes decides to stop. The frame has the last word.' }
    },

    { type: 'question', id: 'n22', scored: true, kind: 'choice', label: 'FINAL SURFACE CHECK', final: true,
      concepts: ['RELIABILITY', 'FRAMING'],
      prompt: ['How should the Underground Man be read? Which answer fits the whole chamber?'],
      options: [
        'As a liar whose claims fall once they are caught.',
        'As a performance whose contradictions are evidence.',
        'As Dostoevsky’s mouthpiece for his own views.',
        'As a sincere confessor proven by his contradictions.'
      ],
      answer: 1,
      coda: ['He tells the truth', 'by showing how badly he can lie about himself.'],
      right: { label: 'INSIGHT' },
      wrong: { body: 'Not a liar to discard, not a mouthpiece, not a certified confessor: a performance you read through its contradictions.' }
    },

    { type: 'rise', from: -91, to: -79, final: true },

    { type: 'clear' }
  ],

  review: [
    { id: 'r-frame', concept: 'FRAMING', sources: ['n01', 'n02', 'n21'],
      variants: [
        { prompt: ['A reader says: “Dostoevsky wrote this, so these are Dostoevsky’s opinions.” What does the frame say against it?'],
          options: [
            'That he is imaginary, a type of his time.',
            'Nothing: the frame endorses the diarist.',
            'That the diary was found, not written.',
            'That the author rejects every word of it.'
          ],
          answer: 0,
          right: 'The frame makes him an imagined representative, not the author’s voice.',
          wrong: 'The note calls him imaginary and representative. It neither endorses nor rejects him.' },
        { prompt: ['The book begins and ends with a voice that is not his. What does that structure suggest?'],
          options: [
            'That he is shown, and held at a distance.',
            'That he is being quoted, not believed.',
            'That his notes were censored at both ends.',
            'That the author wants him forgotten quickly.'
          ],
          answer: 0,
          right: 'The frame presents him and closes him: exhibited, not endorsed.',
          wrong: 'The frame does not censor or bury him. It holds him up to view from outside.' }
      ] },

    { id: 'r-portrait', concept: 'SELF-PORTRAIT', sources: ['n03', 'n04', 'n08', 'n10', 'n20'],
      variants: [
        { quotes: [{ text: 'I invented adventures for myself and made up a life, so as at least to live in some way.', src: 'PART I · V' }],
          prompt: ['What does this suggest about his self-portrait?'],
          options: [
            'It is accurate, since he admits inventing.',
            'It may be one more invented adventure.',
            'It is fiction, and tells us nothing.',
            'It is an apology for his past lies.'
          ],
          answer: 1,
          right: 'A man who invents a life to feel alive may be doing so on the page.',
          wrong: 'Admitting invention neither certifies nor empties the portrait. It may itself be invented.' }
      ] },

    { id: 'r-contra', concept: 'CONTRADICTION', sources: ['n05', 'n07', 'n09'],
      variants: [
        { quotes: [{ text: 'Oh, but even now I am lying!', src: 'PART I · XI' }],
          prompt: ['He interrupts his own claim. What should you do with it?'],
          options: [
            'Drop it; he admits it is false.',
            'Believe the correction, as it comes later.',
            'Keep it, and ask why he cannot hold it.',
            'Ignore both, since he lies either way.'
          ],
          answer: 2,
          right: 'The claim and its retraction together show what he cannot settle.',
          wrong: 'Choosing either side, or neither, throws away the evidence: the interruption itself.' }
      ] },

    { id: 'r-reader', concept: 'THE READER', sources: ['n06', 'n11', 'n12', 'n13', 'n14'],
      variants: [
        { quotes: [{ text: 'I have been for forty years listening to you through a crack under the floor.', src: 'PART I · XI' }],
          prompt: ['What does this image say about his reader?'],
          options: [
            'He has spied on real readers for years.',
            'He fears readers and hides from them.',
            'He knows what real readers think.',
            'His reader is a voice he rehearsed.'
          ],
          answer: 3,
          right: 'The “you” was invented underground and learned by heart.',
          wrong: 'He has just said he invented these voices himself. The reader is rehearsed, not met.' }
      ] },

    { id: 'r-confess', concept: 'CONFESSION', sources: ['n15', 'n16', 'n17', 'n19'],
      variants: [
        { quotes: [{ text: 'I shall not attempt any system or method.', src: 'PART I · XI' }],
          prompt: ['An imagined reader asks why he makes such rules on paper at all. What does the question expose?'],
          options: [
            'He has a method that he is concealing from us.',
            'He cannot write at all without some rules.',
            'The reader is right to distrust him entirely.',
            'Even refusing method is addressed to someone.'
          ],
          answer: 3,
          right: 'A private notebook needs no announcements. The rule is performed for a reader.',
          wrong: 'The point is the address: why explain yourself to no one?' }
      ] },

    { id: 'r-reliable', concept: 'RELIABILITY', sources: ['n18', 'n22'],
      variants: [
        { prompt: ['A friend says: “If he admits he lies, nothing he says counts.” What is wrong with this?'],
          options: [
            'Nothing: admitted lies void the notes entirely.',
            'His contradictions show how he builds himself.',
            'He never actually admits to lying in the notes.',
            'His lies are rare, so most of what he says counts.'
          ],
          answer: 1,
          right: 'Unreliable does not mean meaningless.',
          wrong: 'He does admit it, often. What counts is what the lying reveals.' }
      ] }
  ]
});
