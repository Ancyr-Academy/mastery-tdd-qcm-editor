import { CommunicationInterface } from './answer-qcm.js';
import prompt from 'prompt';

export class CliCommunication implements CommunicationInterface {
  start() {
    prompt.start();
  }

  async answer(): Promise<string> {
    const { answer } = await prompt.get([
      {
        name: 'answer',
        description: 'Answer (separated by spaces)',
      },
    ]);

    if (!answer) {
      return '';
    }

    return answer as string;
  }

  async print(message: string): Promise<void> {
    console.log(message);
  }
}
