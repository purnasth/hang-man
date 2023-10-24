import React, { useState, useEffect } from "react";
import Question from "./components/Question";
import Results from "./components/Results";
import questionsData from "./json/questions.json";

const App = () => {
  const [questions, setQuestions] = useState(questionsData);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [userAnswer, setUserAnswer] = useState(null);

  const handleAnswer = (selectedAnswer) => {
    setUserAnswer(selectedAnswer);
    setShowResults(true);
  };

  const handleNextQuestion = () => {
    setUserAnswer(null);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowResults(false);
    } else {
      alert("End of the quiz");
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-4 rounded-md shadow-md">
        {showResults ? (
          <Results
            userAnswer={userAnswer}
            correctAnswer={currentQuestion.correctAnswer}
            onRestart={handleNextQuestion}
          />
        ) : (
          <Question
            dialogue={currentQuestion.dialogue}
            options={currentQuestion.options}
            onAnswer={handleAnswer}
          />
        )}
      </div>
    </div>
  );
};

export default App;
