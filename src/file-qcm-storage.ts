import { StoreQCMInterface } from './create-qcm.js';
import { Question } from './types.js';
import path from 'path';
import fs from 'fs/promises';

export class FileQCMStorage implements StoreQCMInterface {
  async save(questions: Question[]): Promise<void> {
    const filePath = path.resolve('.', 'qcm.json');
    await fs.writeFile(filePath, JSON.stringify(questions));
  }
}
