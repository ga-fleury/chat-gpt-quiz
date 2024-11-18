import React from "react";
import type { QuestionType } from "../types/questionType";
import { motion } from "motion/react";

interface QuestionProps {
  question: QuestionType;
  showCorrectAnswer: boolean;
  handleAnswer: (selectedOption: string) => void;
}

const Question: React.FC<QuestionProps> = ({
  question,
  showCorrectAnswer,
  handleAnswer,
}) => {
  return (
    //motion wrapper
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      className="flex flex-col gap-8 absolute left-[calc(50%-225px)] w-[450px]"
    >
      {/* // question card */}
      <div className="border-2 border-secondary p-[5vh] rounded-2xl flex flex-col gap-[8vh] max-h-[50vh]">
        <h3 className="text-[min(3vh,22px)] font-semibold max-w-[400px]">
          {question.parsedArguments.question}
        </h3>
        <div className="flex flex-col gap-[2vh]">
          {Object.entries(question.parsedArguments.options).map(
            ([key, value]) => {
              const isCorrect = key === question.parsedArguments.answer;
              return (
                <button
                  key={key}
                  onClick={() => handleAnswer(key)}
                  disabled={showCorrectAnswer && !isCorrect}
                  className={`${
                    showCorrectAnswer && isCorrect ? "btn btn-success" : "btn"
                  } ${showCorrectAnswer && !isCorrect ? "btn btn-error" : "btn"}
                min-h-1 h-[5vh]`}
                >
                  {value}
                </button>
              );
            }
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Question;
