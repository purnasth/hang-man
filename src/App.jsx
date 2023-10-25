import React, { useState } from "react";
import Question from "./components/Question";
import Results from "./components/Results";
import questionsData from "./json/questions.json";

const App = () => {
  const [questions, setQuestions] = useState(questionsData);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [userAnswer, setUserAnswer] = useState(null);
  const [score, setScore] = useState(0);

  const handleAnswer = (selectedAnswer) => {
    setUserAnswer(selectedAnswer);
    checkAnswer(selectedAnswer);
    setShowResults(true);
  };

  const checkAnswer = (selectedAnswer) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      handleNextQuestion(); // Automatically move to the next question after a delay
    }, 2000); // Adjust the delay time as needed (e.g., 2000ms = 2 seconds)
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
      <div className="bg-white p-4 rounded-md shadow-md relative">
        <div className="absolute top-4 right-4">
          <button
            onClick={handleNextQuestion}
            className="bg-blue-500 text-white rounded-md p-2 m-1 cursor-pointer"
          >
            Next Question
          </button>
        </div>
        {!showResults && ( // Only render the Question component when showResults is false
          <Question
            dialogue={currentQuestion.dialogue}
            options={currentQuestion.options}
            onAnswer={handleAnswer}
          />
        )}
        {showResults && (
          <Results
            userAnswer={userAnswer}
            correctAnswer={currentQuestion.correctAnswer}
            score={score}
          />
        )}
      </div>
    </div>
  );
};

export default App;
