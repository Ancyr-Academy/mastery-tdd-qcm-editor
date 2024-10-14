import { Answer, Question } from './types.js';

export interface LoadQCMInterface {
  load(): Promise<Question[]>;
}

export interface CommunicationInterface {
  print(message: string): Promise<void>;

  answer(): Promise<string>;
}

export class AnswerQCM {
  constructor(
    private readonly loadQcmInterface: LoadQCMInterface,
    private readonly communication: CommunicationInterface,
  ) {}

  private score: number = 0;

  async execute() {
    const qcm = await this.loadQcmInterface.load();
    if (qcm.length === 0) {
      return;
    }

    for (let i = 0; i < qcm.length; i++) {
      await this.askQuestion(qcm[i]);
    }

    await this.communication.print(`Score: ${this.score}`);
  }

  private async askQuestion(question: Question) {
    await this.communication.print(question.title);

    for (let i = 0; i < question.answers.length; i++) {
      await this.communication.print(`${i + 1}) ${question.answers[i].title}`);
    }

    const answer = await this.communication.answer();
    const values = answer.split(' ').map((c) => parseInt(c));

    const isCorrect = this.isCorrect(values, question.answers);
    if (isCorrect) {
      this.score++;
    }
  }

  private isCorrect(indexes: number[], answers: Answer[]) {
    if (answers.length === 0) {
      return false;
    }

    return indexes.every((index) => {
      const i = index - 1;
      if (i >= answers.length || i < 0) {
        return false;
      }

      return answers[index - 1].isCorrect;
    });
  }
}
