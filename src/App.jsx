// App.jsx
import React, { useState } from "react";
import Question from "./components/Question";
import Results from "./components/Results";
import questionsData from "./json/questions.json";

const App = () => {
  const [questions, setQuestions] = useState(questionsData);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [userAnswer, setUserAnswer] = useState(null);
  const [score, setScore] = useState(0); // Added score state

  const handleAnswer = (selectedAnswer) => {
    setUserAnswer(selectedAnswer);
    checkAnswer(selectedAnswer); // Check the answer for scoring
    setShowResults(true);
  };

  const checkAnswer = (selectedAnswer) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1); // Increment the score if the answer is correct
    }
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
            score={score} // Pass the score to the Results component
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
