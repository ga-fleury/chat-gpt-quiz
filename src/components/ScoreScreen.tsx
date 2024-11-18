import React from "react";

interface ScoreScreenProps {
  onBack: () => void; // Prop to handle going back to start
  score: number;
}

const ScoreScreen: React.FC<ScoreScreenProps> = ({ onBack, score }) => {
  return (
    <div className="max-h-[600px] h-full grid grid-rows-3 items-center justify-center">
      <h1 className="text-3xl font-bold">Chat GPT Quiz</h1>
      {score > 0 ? (
        <div className="flex flex-col gap-8">
          <h1 className="text-2xl font-bold">Congratulations!</h1>
          <p> you scored a total of {score} points!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          <h1 className="text-2xl font-bold">Better luck next time!</h1>
          <p> you scored {score} points</p>
        </div>
      )}

      <div className="flex gap-4">
        <button onClick={onBack} className="btn btn-primary">
          Back to Start
        </button>
        <a href="https://www.google.com">
          <button className="btn btn-outline btn-outline-secondary">
            Exit
          </button>
        </a>
      </div>
    </div>
  );
};

export default ScoreScreen;
