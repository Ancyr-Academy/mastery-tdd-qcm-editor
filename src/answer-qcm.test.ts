import { Question } from './types.js';
import {
  AnswerQCM,
  CommunicationInterface,
  LoadQCMInterface,
} from './answer-qcm.js';

test('printing the first question with answers', async () => {
  const communication = new RamCommunicationInterface(['2']);
  const answerQCM = new AnswerQCM(
    new RamLoadQCMInterface([
      {
        title: 'Quelle est la capitale de la France ?',
        answers: [
          { title: 'Paris', isCorrect: true },
          { title: 'Berlin', isCorrect: false },
        ],
      },
    ]),
    communication,
  );
  await answerQCM.execute();

  expect(communication.messages).toEqual([
    'Quelle est la capitale de la France ?',
    '1) Paris',
    '2) Berlin',
    'Score: 0',
  ]);
});

test('answering correctly', async () => {
  const communication = new RamCommunicationInterface(['1']);
  const answerQCM = new AnswerQCM(
    new RamLoadQCMInterface([
      {
        title: 'Quelle est la capitale de la France ?',
        answers: [
          { title: 'Paris', isCorrect: true },
          { title: 'Berlin', isCorrect: false },
        ],
      },
    ]),
    communication,
  );
  await answerQCM.execute();

  communication.expectScore(1);
});

test('answering incorrectly', async () => {
  const communication = new RamCommunicationInterface(['2']);
  const answerQCM = new AnswerQCM(
    new RamLoadQCMInterface([
      {
        title: 'Quelle est la capitale de la France ?',
        answers: [
          { title: 'Paris', isCorrect: true },
          { title: 'Berlin', isCorrect: false },
        ],
      },
    ]),
    communication,
  );
  await answerQCM.execute();

  communication.expectScore(0);
});

test('answering many answers incorrectly', async () => {
  const communication = new RamCommunicationInterface(['1 2']);
  const answerQCM = new AnswerQCM(
    new RamLoadQCMInterface([
      {
        title: 'Quelle est la capitale de la France ?',
        answers: [
          { title: 'Paris', isCorrect: true },
          { title: 'Berlin', isCorrect: false },
        ],
      },
    ]),
    communication,
  );
  await answerQCM.execute();

  communication.expectScore(0);
});

test('answering many answers correctly', async () => {
  const communication = new RamCommunicationInterface(['1 2']);
  const answerQCM = new AnswerQCM(
    new RamLoadQCMInterface([
      {
        title: 'Quelle est la capitale de la France ?',
        answers: [
          { title: 'Paris', isCorrect: true },
          { title: 'Berlin', isCorrect: true },
        ],
      },
    ]),
    communication,
  );
  await answerQCM.execute();

  communication.expectScore(1);
});

test('answering many questions', async () => {
  const communication = new RamCommunicationInterface(['1', '1']);
  const answerQCM = new AnswerQCM(
    new RamLoadQCMInterface([
      {
        title: 'Quelle est la capitale de la France ?',
        answers: [
          { title: 'Paris', isCorrect: true },
          { title: 'Berlin', isCorrect: false },
        ],
      },
      {
        title: 'Quelle est la capitale de la Belgique ?',
        answers: [
          { title: 'Bruxelles', isCorrect: true },
          { title: 'Londres', isCorrect: false },
        ],
      },
    ]),
    communication,
  );

  await answerQCM.execute();

  communication.expectScore(2);
});

class RamLoadQCMInterface implements LoadQCMInterface {
  constructor(private readonly questions: Question[] = []) {}

  async load(): Promise<Question[]> {
    return this.questions;
  }
}

class RamCommunicationInterface implements CommunicationInterface {
  public messages: string[] = [];

  constructor(private readonly answers: string[] = []) {}

  async print(message: string) {
    this.messages.push(message);
  }

  async answer(): Promise<string> {
    const next = this.answers.shift();
    if (!next) {
      return '';
    }

    return next;
  }

  expectScore(value: number) {
    expect(this.messages[this.messages.length - 1]).toBe(`Score: ${value}`);
  }
}
