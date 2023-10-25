import React, { useState, useEffect } from "react";
import Question from "./components/Question";
import questionsData from "./json/questions.json";

const App = () => {
  const [questions, setQuestions] = useState(questionsData);
  const [currentRound, setCurrentRound] = useState(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showNextRoundPrompt, setShowNextRoundPrompt] = useState(false);
  const [questionResults, setQuestionResults] = useState(Array(questionsData.length).fill(null));

  const maxRounds = 10;
  const questionsPerRound = 10;

  const roundQuestions = questions.slice(
    (currentRound - 1) * questionsPerRound,
    currentRound * questionsPerRound
  );

  const handleAnswer = (selectedAnswer) => {
    const currentQuestion = roundQuestions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    if (isCorrect) {
      setScore(score + 1);
    }

    const resultsCopy = [...questionResults];
    resultsCopy[currentRound - 1 + currentQuestionIndex] = {
      correctAnswer: currentQuestion.correctAnswer,
      userAnswer: selectedAnswer,
    };
    setQuestionResults(resultsCopy);

    setUserAnswer(selectedAnswer);

    setTimeout(() => {
      handleNextQuestion();
    }, 2000); // Automatically transition to the next question after 2 seconds
  };

  const handleNextQuestion = () => {
    setUserAnswer(null);
    if (currentQuestionIndex < questionsPerRound - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      if (currentRound < maxRounds) {
        setCurrentRound(currentRound + 1);
        setCurrentQuestionIndex(0);
        setShowNextRoundPrompt(true);
      } else {
        alert("End of the quiz");
      }
    }
  };

  const handleNextRound = () => {
    setCurrentRound(currentRound + 1);
    setCurrentQuestionIndex(0);
    setShowNextRoundPrompt(false);
  };

  const currentQuestion = roundQuestions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-4 rounded-md shadow-md relative">
        <div className="text-xl font-semibold mb-4">
          Round {currentRound}/{maxRounds}
        </div>
        <div className="text-lg font-bold mb-4">
          Question {currentQuestionIndex + 1}/{questionsPerRound}
        </div>
        <div className="text-lg font-semibold mb-4">
          Score: {score}
        </div>
        {showNextRoundPrompt ? (
          <div className="mb-4">
            <p className="text-lg mb-2">Round {currentRound - 1} is over.</p>
            <button
              onClick={handleNextRound}
              className="bg-blue-500 text-white rounded-md p-2 cursor-pointer"
            >
              Play Round {currentRound}
            </button>
          </div>
        ) : (
          <>
            <Question
              dialogue={currentQuestion.dialogue}
              options={currentQuestion.options}
            />
            {currentQuestion.options.map((option, index) => (
              <div
                key={index}
                className={`p-2 rounded-md m-1 cursor-pointer ${
                  userAnswer === option
                    ? option === currentQuestion.correctAnswer
                      ? "bg-green-200 transform scale-125"
                      : "bg-red-200"
                    : ""
                }`}
                onClick={() => {
                  if (!userAnswer) {
                    handleAnswer(option);
                  }
                }}
              >
                {option}
              </div>
            ))}
            <button
              onClick={handleNextQuestion}
              className="bg-blue-500 text-white rounded-md p-2 m-1 cursor-pointer mt-4"
            >
              Next Question
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
