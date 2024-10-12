# QCM Editor

Write a program that allows a user to create and respond to a Multiple-Choice Questionnaire (QCM).

This console program will allow the user to execute two commands:

- Create a QCM
- Answer the QCM

### Create a QCM

The command launches an interactive program in which the user is asked to submit a question, and then propose answers.  
For each answer, the user is asked if the answer is correct.

When the user has no more answers to submit, they are offered to add a new question.  
If there are no more questions, the QCM is saved.

Note: If a QCM already existed, this one replaces it. The system only manages one QCM at a time.

### Answer the QCM

The command launches an interactive program displaying the saved QCM questions and provides a score.

The user earns one point for each question where they select all the correct answers.

### Notes

The requirements are intentionally vague on some aspects of the program.  
Can you identify them?

Even though this is a multiple-choice system, proceed step by step.

### Follow-up
- Add the ability to save and load multiple QCMs.
- Save/Load from a MongoDB database.
- Save the user's answers to the QCM.
- Add a "joker" option that eliminates a wrong answer (usable once).
- Handle cases of half-points when the user provides a correct answer but missed others.

## Resources
Repository Link -> To be done