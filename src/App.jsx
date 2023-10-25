import React, { useState, useEffect } from "react";
import Question from "./components/Question";
import Results from "./components/Results";
import questionsData from "./json/questions.json";

const App = () => {
  const [questions, setQuestions] = useState(questionsData);
  const [currentRound, setCurrentRound] = useState(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [userAnswer, setUserAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showNextRoundPrompt, setShowNextRoundPrompt] = useState(false);

  const maxRounds = 10;
  const questionsPerRound = 10;

  const roundQuestions = questions.slice(
    (currentRound - 1) * questionsPerRound,
    currentRound * questionsPerRound
  );

  const handleAnswer = (selectedAnswer) => {
    setUserAnswer(selectedAnswer);
    checkAnswer(selectedAnswer);
    setShowResults(true);

    setTimeout(() => {
      handleNextQuestion();
    }, 2000); // Automatically transition to the next question after 2 seconds
  };

  const checkAnswer = (selectedAnswer) => {
    const currentQuestion = roundQuestions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setUserAnswer(null);
    if (currentQuestionIndex < questionsPerRound - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowResults(false);
    } else {
      if (currentRound < maxRounds) {
        setCurrentRound(currentRound + 1);
        setCurrentQuestionIndex(0);
        setShowResults(false);
        setShowNextRoundPrompt(true);
      } else {
        alert("End of the quiz");
      }
    }
  };

  const handleNextRound = () => {
    setCurrentRound(currentRound + 1);
    setCurrentQuestionIndex(0);
    setShowResults(false);
    setShowNextRoundPrompt(false);
  };

  const currentQuestion = roundQuestions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-4 rounded-md shadow-md relative">
        {showResults && (
          <Results
            userAnswer={userAnswer}
            correctAnswer={currentQuestion.correctAnswer}
            score={score}
          />
        )}
        {!showResults && currentQuestion && (
          <Question
            dialogue={currentQuestion.dialogue}
            options={currentQuestion.options}
            onAnswer={handleAnswer}
          />
        )}
        <div className="absolute top-4 right-4">
          <p className="text-lg font-bold">
            {currentQuestionIndex + 1}/{questionsPerRound}
          </p>
          {showNextRoundPrompt ? (
            <div>
              <p className="text-lg">Round {currentRound - 1} is over.</p>
              <button
                onClick={handleNextRound}
                className="bg-blue-500 text-white rounded-md p-2 m-1 cursor-pointer"
              >
                Play Round {currentRound}
              </button>
            </div>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="bg-blue-500 text-white rounded-md p-2 m-1 cursor-pointer"
            >
              Next Question
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
