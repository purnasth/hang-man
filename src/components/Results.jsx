import React from "react";

const Results = ({ userAnswer, correctAnswer, onRestart }) => {
  const isCorrect = userAnswer === correctAnswer;

  return (
    <div>
      <p className="text-lg font-bold mb-2">Your answer: {userAnswer}</p>
      <p className={`text-lg ${isCorrect ? "text-green-500" : "text-red-500"}`}>
        {isCorrect ? "Correct!" : "Incorrect!"}
      </p>
      <p className="text-lg">Correct answer: {correctAnswer}</p>
      <button
        className="bg-blue-500 text-white rounded-md p-2 m-1 cursor-pointer"
        onClick={onRestart}
      >
        Next Question
      </button>
    </div>
  );
};

export default Results;
