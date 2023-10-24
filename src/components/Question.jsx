import React from "react";

const Question = ({ dialogue, options, onAnswer }) => (
  <div>
    <p className="text-lg font-bold mb-2">{dialogue}</p>
    <div>
      {options.map((option) => (
        <button
          key={option}
          className="bg-blue-500 text-white rounded-md p-2 m-1 cursor-pointer"
          onClick={() => onAnswer(option)}
        >
          {option}
        </button>
      ))}
    </div>
  </div>
);

export default Question;
