import { program } from 'commander';
import { CreateQCM } from './create-qcm.js';
import { CliPrompt } from './cli-prompt.js';
import { FileQCMStorage } from './file-qcm-storage.js';
import { AnswerQCM } from './answer-qcm.js';
import { CliCommunication } from './cli-communication.js';

program
  .name('qcm-editor')
  .description('CLI to create & edit QCMs')
  .version('1.0.0');

program
  .command('create-qcm')
  .description('Create a QCM')
  .action(() => {
    const prompt = new CliPrompt();
    prompt.start();

    const createQCM = new CreateQCM(prompt, new FileQCMStorage());
    return createQCM.execute();
  });

program
  .command('answer-qcm')
  .description('Answers a QCM')
  .action(() => {
    const communication = new CliCommunication();
    communication.start();

    const createQCM = new AnswerQCM(new FileQCMStorage(), communication);
    return createQCM.execute();
  });

program.parse();
