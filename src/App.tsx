import React from "react";
import "./App.css";
import Quiz from "./components/Quiz";
import type { QuestionType } from "./types/questionType";
import {
  openAiClient,
  fetchQuestionsData,
} from "./services/fetchQuestionsData";
import StartScreen from "./components/StartScreen";
import ScoreScreen from "./components/ScoreScreen";

const App: React.FC = () => {
  const [screen, setScreen] = React.useState<"start" | "quiz" | "score">(
    "start"
  );
  const [error, setError] = React.useState<string | null>(null);
  const [quizQuestions, setQuizQuestions] = React.useState<QuestionType[]>([]);
  const [finalScore, setFinalScore] = React.useState<number>(0);

  const startQuiz = () => {
    setScreen("quiz");
  };

  const showRankings = (score: number) => {
    setFinalScore(score);
    setScreen("score");
  };

  const backToStart = () => {
    setScreen("start");
  };

  React.useEffect(() => {
    if (screen == "start") {
      setQuizQuestions(() => []);
      const loadQuestions = async () => {
        try {
          const response = await fetchQuestionsData(openAiClient);
          console.log(response)
          setQuizQuestions(() => response);
        } catch (err) {
          setError("Failed to load quiz questions. Please try again later.");
        }
      };

      loadQuestions();
    }
  }, [screen]);

  return (
    <div
      className="App flex flex-col items-center justify-center h-[100vh] overflow-hidden"
      data-theme="light"
    >
      {screen === "start" && <StartScreen onStart={startQuiz} />}
      {screen === "quiz" && (
        <Quiz
          questions={quizQuestions}
          onComplete={(score) => showRankings(score)}
        />
      )}
      {screen === "score" && (
        <ScoreScreen onBack={backToStart} score={finalScore} />
      )}
      {error && <div role="alert" className="alert alert-error absolute bottom-0">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 shrink-0 stroke-current"
    fill="none"
    viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
  <span>something went wrong! Did you setup your API Key correctly?</span>
</div>}
    </div>
  );
};

export default App;
