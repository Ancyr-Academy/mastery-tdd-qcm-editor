export type Answer = {
  title: string;
  isCorrect: boolean;
};

export type Question = {
  title: string;
  answers: Answer[];
};
