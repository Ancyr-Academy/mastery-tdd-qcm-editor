import { program } from 'commander';
import { CreateQCM } from './create-qcm.js';
import { CliPrompt } from './cli-prompt.js';
import { FileQCMStorage } from './file-qcm-storage.js';

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

program.parse();
