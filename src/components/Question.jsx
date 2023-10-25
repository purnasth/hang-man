import React from "react";

const Question = ({
  dialogue,
  options,
  onAnswer,
  showResults,
  userAnswer,
  correctAnswer,
}) => {
  return (
    <div>
      <p className="text-lg font-bold mb-2">{dialogue}</p>
      <div>
        {options.map((option) => (
          <button
            key={option}
            className="bg-blue-500 text-white rounded-md p-2 m-1 cursor-pointer"
            onClick={() => onAnswer(option)}
            disabled={showResults}
          >
            {option}
          </button>
        ))}
      </div>
      {showResults && (
        <div>
          <p className="text-lg font-bold mb-2">Your answer: {userAnswer}</p>
          <p
            className={`text-lg ${
              userAnswer === correctAnswer ? "text-green-500" : "text-red-500"
            }`}
          >
            {userAnswer === correctAnswer ? "Correct!" : "Incorrect!"}
          </p>
          <p className="text-lg">Correct answer: {correctAnswer}</p>
        </div>
      )}
    </div>
  );
};

export default Question;
