import { Answer, Question } from './types.js';

export interface PromptInterface {
  nextQuestion(): Promise<string | null>;

  nextAnswer(): Promise<Answer | null>;
}

export interface StoreQCMInterface {
  save(questions: Question[]): Promise<void>;
}

export class CreateQCM {
  constructor(
    private readonly prompt: PromptInterface,
    private readonly storage: StoreQCMInterface,
  ) {}

  async execute() {
    const questions: Question[] = [];
    let questionTitle: string | null = null;

    do {
      questionTitle = await this.prompt.nextQuestion();
      if (questionTitle) {
        const answers = await this.promptAnswers();
        questions.push({
          title: questionTitle,
          answers: answers,
        });
      }
    } while (questionTitle !== null);

    await this.storage.save(questions);
  }

  private async promptAnswers() {
    let answer: Answer | null = null;
    const answers: Answer[] = [];

    do {
      answer = await this.prompt.nextAnswer();
      if (answer) {
        answers.push(answer);
      }
    } while (answer !== null);

    return answers;
  }
}
