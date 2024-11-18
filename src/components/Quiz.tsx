import React, { useState, useEffect } from "react";
import Question from "./Question";
import type { QuestionType } from "../types/questionType";
import { AnimatePresence } from "motion/react"

interface QuizProps {
  questions: QuestionType[];
  onComplete: (score: number) => void;
}

const Quiz: React.FC<QuizProps> = ({ questions, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  useEffect(() => {
    if (!questions.length) {
      return;
    }
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else {
      setShowCorrectAnswer(true);
    }
  }, [timeLeft, currentQuestionIndex, questions]);

  const handleAnswer = (selectedOption: string) => {
    if (
      selectedOption === questions[currentQuestionIndex].parsedArguments.answer &&
      !showCorrectAnswer
    ) {
      setScore(score + 1);
    }
    setShowCorrectAnswer(true);
  };

  const handleNextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
      setTimeLeft(15);
      setShowCorrectAnswer(false);
    } else {
      onComplete(score); // Final score when quiz is complete
    }
  };

  return (
    <div className="max-h-[100vh] h-full grid grid-rows-3 items-center justify-center">
      <div className="flex items-center gap-8 mb-8">
        <h2>
          Your Score: <span className="whitespace-nowrap">{score} / {questions.length} </span>
        </h2>
        <h1 className="text-3xl font-bold">Chat GPT Quiz</h1>
        {showCorrectAnswer ? (
          <h4 className="">Time left: <span className="whitespace-nowrap">00 seconds</span></h4>
        ) : (
          <h4 className="">Time left: <span className="whitespace-nowrap">{String(timeLeft).padStart(2, '0')} seconds</span></h4>
        )}
      </div>
      {questions.length ? (
        <AnimatePresence>
        <Question
          key={questions[currentQuestionIndex].id}
          question={questions[currentQuestionIndex]}
          showCorrectAnswer={showCorrectAnswer}
          handleAnswer={handleAnswer}
        />
        </AnimatePresence>
      ) : (
        <div className="skeleton h-[530px] w-[470px] self-center mx-auto flex justify-center items-center">Loading your questions... be prepared!</div>
      )}
      {currentQuestionIndex < questions.length && showCorrectAnswer ? (
        <div>
          <button
            className="btn btn-secondary absolute bottom-[7vw] left-[calc(50%-100px)] w-[200px]"
            disabled={!showCorrectAnswer}
            onClick={handleNextQuestion}
          >
            Next Question
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Quiz;
