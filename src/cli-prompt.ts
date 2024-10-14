import { PromptInterface } from './create-qcm.js';
import prompt from 'prompt';
import { Answer } from './types.js';

export class CliPrompt implements PromptInterface {
  start() {
    prompt.start();
  }

  async nextQuestion(): Promise<string | null> {
    const { question } = await prompt.get([
      {
        name: 'question',
        description: 'Enter a question',
      },
    ]);

    if (!question) {
      return null;
    }

    return question as string;
  }

  async nextAnswer(): Promise<Answer | null> {
    const { answer } = await prompt.get([
      {
        name: 'answer',
        description: 'Enter an answer',
      },
    ]);

    if (!answer) {
      return null;
    }

    const { isCorrect } = await prompt.get([
      {
        name: 'isCorrect',
        description: 'Is this answer correct ?',
        type: 'boolean',
      },
    ]);

    return {
      title: answer as string,
      isCorrect: !!isCorrect,
    };
  }
}
