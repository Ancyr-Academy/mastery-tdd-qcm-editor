import { StoreQCMInterface } from './create-qcm.js';
import { Question } from './types.js';
import path from 'path';
import fs from 'fs/promises';
import { LoadQCMInterface } from './answer-qcm.js';

export class FileQCMStorage implements StoreQCMInterface, LoadQCMInterface {
  private filePath = path.resolve('.', 'qcm.json');

  async save(questions: Question[]): Promise<void> {
    await fs.writeFile(this.filePath, JSON.stringify(questions));
  }

  async load(): Promise<Question[]> {
    const content = await fs.readFile(this.filePath, { encoding: 'utf-8' });
    return JSON.parse(content);
  }
}
