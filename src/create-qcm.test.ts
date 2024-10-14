import { Question } from './types.js';
import { CreateQCM, PromptInterface, QCMStorage } from './create-qcm.js';

test('no questions', async () => {
  const storage = new RamStorage();
  const createQCM = new CreateQCM(new ManyQuestionManyAnswersPrompt(), storage);
  await createQCM.execute();

  expect(storage.questions).toEqual([]);
});

test('single question', async () => {
  const storage = new RamStorage();
  const createQCM = new CreateQCM(
    new ManyQuestionManyAnswersPrompt([
      {
        title: 'Quelle est la capitale de la France ?',
        answers: [],
      },
    ]),
    storage,
  );

  await createQCM.execute();

  expect(storage.questions).toEqual([
    {
      title: 'Quelle est la capitale de la France ?',
      answers: [],
    },
  ]);
});

test('single question and a single answer', async () => {
  const storage = new RamStorage();
  const createQCM = new CreateQCM(
    new ManyQuestionManyAnswersPrompt([
      {
        title: 'Quelle est la capitale de la France ?',
        answers: [{ title: 'Paris', isCorrect: true }],
      },
    ]),
    storage,
  );

  await createQCM.execute();

  expect(storage.questions).toEqual([
    {
      title: 'Quelle est la capitale de la France ?',
      answers: [{ title: 'Paris', isCorrect: true }],
    },
  ]);
});

test('single question and a wrong answer', async () => {
  const storage = new RamStorage();
  const createQCM = new CreateQCM(
    new ManyQuestionManyAnswersPrompt([
      {
        title: 'Quelle est la capitale de la France ?',
        answers: [{ title: 'Berlin', isCorrect: false }],
      },
    ]),
    storage,
  );

  await createQCM.execute();

  expect(storage.questions).toEqual([
    {
      title: 'Quelle est la capitale de la France ?',
      answers: [{ title: 'Berlin', isCorrect: false }],
    },
  ]);
});

test('single question, many answers', async () => {
  const storage = new RamStorage();
  const createQCM = new CreateQCM(
    new ManyQuestionManyAnswersPrompt([
      {
        title: 'Quelle est la capitale de la France ?',
        answers: [
          { title: 'Paris', isCorrect: true },
          { title: 'Berlin', isCorrect: false },
        ],
      },
    ]),
    storage,
  );

  await createQCM.execute();

  expect(storage.questions).toEqual([
    {
      title: 'Quelle est la capitale de la France ?',
      answers: [
        { title: 'Paris', isCorrect: true },
        { title: 'Berlin', isCorrect: false },
      ],
    },
  ]);
});

test('many questions', async () => {
  const storage = new RamStorage();
  const createQCM = new CreateQCM(
    new ManyQuestionManyAnswersPrompt([
      {
        title: 'Quelle est la capitale de la France ?',
        answers: [
          { title: 'Paris', isCorrect: true },
          { title: 'Berlin', isCorrect: false },
        ],
      },
      {
        title: 'Quelle est la capitale de la Grèce ?',
        answers: [
          { title: 'Athènes', isCorrect: true },
          { title: 'Londres', isCorrect: false },
        ],
      },
    ]),
    storage,
  );

  await createQCM.execute();

  expect(storage.questions).toEqual([
    {
      title: 'Quelle est la capitale de la France ?',
      answers: [
        { title: 'Paris', isCorrect: true },
        { title: 'Berlin', isCorrect: false },
      ],
    },
    {
      title: 'Quelle est la capitale de la Grèce ?',
      answers: [
        { title: 'Athènes', isCorrect: true },
        { title: 'Londres', isCorrect: false },
      ],
    },
  ]);
});

test('saving the QCM into storage', async () => {
  const storage = new RamStorage();
  const createQCM = new CreateQCM(
    new ManyQuestionManyAnswersPrompt([
      {
        title: 'Quelle est la capitale de la France ?',
        answers: [
          { title: 'Paris', isCorrect: true },
          { title: 'Berlin', isCorrect: false },
        ],
      },
      {
        title: 'Quelle est la capitale de la Grèce ?',
        answers: [
          { title: 'Athènes', isCorrect: true },
          { title: 'Londres', isCorrect: false },
        ],
      },
    ]),
    storage,
  );

  await createQCM.execute();

  expect(storage.questions).toEqual([
    {
      title: 'Quelle est la capitale de la France ?',
      answers: [
        { title: 'Paris', isCorrect: true },
        { title: 'Berlin', isCorrect: false },
      ],
    },
    {
      title: 'Quelle est la capitale de la Grèce ?',
      answers: [
        { title: 'Athènes', isCorrect: true },
        { title: 'Londres', isCorrect: false },
      ],
    },
  ]);
});

class ManyQuestionManyAnswersPrompt implements PromptInterface {
  private currentQuestion: Question | null = null;

  constructor(private readonly questions: Question[] = []) {}

  async nextQuestion() {
    const next = this.questions.shift();
    if (!next) {
      return null;
    }

    this.currentQuestion = next;
    return this.currentQuestion.title;
  }

  async nextAnswer() {
    if (!this.currentQuestion) {
      throw new Error('No question defined');
    }

    const next = this.currentQuestion.answers.shift();
    if (!next) {
      return null;
    }

    return next;
  }
}

class RamStorage implements QCMStorage {
  public questions: Question[] = [];
  async save(questions: Question[]): Promise<void> {
    this.questions = questions;
  }
}
