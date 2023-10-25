import React, { useState, useEffect } from "react";

const Results = ({ userAnswer, correctAnswer, score, onRestart }) => {
  const isCorrect = userAnswer === correctAnswer;
  const [showResults, setShowResults] = useState(true);

  useEffect(() => {
    // Automatically hide results after 3 seconds (adjust duration as needed)
    const timer = setTimeout(() => {
      setShowResults(false);
    }, 3000);

    return () => {
      clearTimeout(timer); // Clear the timer if the component unmounts
    };
  }, []);

  return (
    <div>
      {showResults && (
        <div className="preloader-popup">
          <p className="text-lg font-bold mb-2">Your answer: {userAnswer}</p>
          <p
            className={`text-lg ${
              isCorrect ? "text-green-500" : "text-red-500"
            }`}
          >
            {isCorrect ? "Correct!" : "Incorrect!"}
          </p>
          <p className="text-lg">Correct answer: {correctAnswer}</p>
          <p className="text-lg">Your score: {score}</p>
        </div>
      )}
    </div>
  );
};

export default Results;
