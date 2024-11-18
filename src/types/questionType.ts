export type QuestionType = {
  id: number;
  parsedArguments: {
    question: string;
    options: {
      a: string;
      b: string;
      c: string;
      d: string;
    };
    answer: "a" | "b" | "c" | "d";
  };
};
