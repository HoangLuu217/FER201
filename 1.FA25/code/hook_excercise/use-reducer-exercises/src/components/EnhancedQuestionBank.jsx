import React, { useReducer, useEffect, useState } from "react";
import { Button, Container, Card, ProgressBar, Alert } from "react-bootstrap";
import { FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa";

const initialState = {
  questions: [
    {
      id: 1,
      question: "What is the capital of Australia?",
      options: ["Sydney", "Canberra", "Melbourne", "Perth"],
      answer: "Canberra",
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      answer: "Mars",
    },
    {
      id: 3,
      question: "What is the largest ocean on Earth?",
      options: [
        "Atlantic Ocean",
        "Indian Ocean",
        "Pacific Ocean",
        "Arctic Ocean",
      ],
      answer: "Pacific Ocean",
    },
  ],
  currentQuestion: 0,
  selectedOption: "",
  score: 0,
  showScore: false,
  showFeedback: false,
  isCorrect: false,
  correctAnswer: "",
  timeLeft: 10,
  isTimerActive: true,
};

function quizReducer(state, action) {
  switch (action.type) {
    case "SELECT_OPTION":
      return { ...state, selectedOption: action.payload };

    case "NEXT_QUESTION":
      const isCorrect =
        state.selectedOption === state.questions[state.currentQuestion].answer;
      const correctAnswer = state.questions[state.currentQuestion].answer;
      
      return {
        ...state,
        score: isCorrect ? state.score + 1 : state.score,
        currentQuestion: state.currentQuestion + 1,
        selectedOption: "",
        showScore: state.currentQuestion + 1 === state.questions.length,
        showFeedback: false,
        timeLeft: 10,
        isTimerActive: true,
        isCorrect,
        correctAnswer,
      };

    case "SHOW_FEEDBACK":
      const correct = state.selectedOption === state.questions[state.currentQuestion].answer;
      return {
        ...state,
        showFeedback: true,
        isCorrect: correct,
        correctAnswer: state.questions[state.currentQuestion].answer,
        isTimerActive: false,
      };

    case "RESTART_QUIZ":
      return {
        ...initialState,
        timeLeft: 10,
        isTimerActive: true,
      };

    case "TIMER_TICK":
      if (state.timeLeft <= 1) {
        return {
          ...state,
          timeLeft: 0,
          isTimerActive: false,
          showFeedback: true,
          isCorrect: false,
          correctAnswer: state.questions[state.currentQuestion].answer,
        };
      }
      return {
        ...state,
        timeLeft: state.timeLeft - 1,
      };

    default:
      return state;
  }
}

function EnhancedQuestionBank() {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const { 
    questions, 
    currentQuestion, 
    selectedOption, 
    score, 
    showScore, 
    showFeedback,
    isCorrect,
    correctAnswer,
    timeLeft,
    isTimerActive
  } = state;

  const [highScore, setHighScore] = useState(0);

  // Load high score from localStorage on component mount
  useEffect(() => {
    const savedHighScore = localStorage.getItem('quizHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }
  }, []);

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (isTimerActive && timeLeft > 0 && !showScore) {
      interval = setInterval(() => {
        dispatch({ type: "TIMER_TICK" });
      }, 1000);
    } else if (timeLeft === 0 && !showFeedback) {
      dispatch({ type: "SHOW_FEEDBACK" });
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft, showScore, showFeedback]);

  const handleOptionSelect = (option) => {
    if (!showFeedback) {
      dispatch({ type: "SELECT_OPTION", payload: option });
    }
  };

  const handleNextQuestion = () => {
    if (showFeedback) {
      dispatch({ type: "NEXT_QUESTION" });
    } else {
      dispatch({ type: "SHOW_FEEDBACK" });
    }
  };

  const handleRestartQuiz = () => {
    dispatch({ type: "RESTART_QUIZ" });
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  // Update high score when quiz ends
  useEffect(() => {
    if (showScore && score > highScore) {
      setHighScore(score);
      localStorage.setItem('quizHighScore', score.toString());
    }
  }, [showScore, score, highScore]);

  return (
    <Container className="mt-4">
      <Card className="p-4">
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h5>Tiến trình: {currentQuestion + 1}/{questions.length}</h5>
            <div className="d-flex align-items-center">
              <FaClock className="me-2" />
              <span 
                className={`fw-bold ${timeLeft <= 5 ? 'text-danger' : 'text-primary'}`}
              >
                {timeLeft}s
              </span>
            </div>
          </div>
          <ProgressBar 
            now={progress} 
            label={`${Math.round(progress)}%`}
            variant={timeLeft <= 5 ? 'danger' : 'primary'}
          />
        </div>

        {showScore ? (
          <div className="text-center">
            <h2 className="mb-4">Kết quả Quiz</h2>
            <div className="mb-4">
              <h3 className={`${score === questions.length ? 'text-success' : 'text-primary'}`}>
                Điểm của bạn: {score} / {questions.length}
              </h3>
              <p className="text-muted">
                Tỷ lệ đúng: {Math.round((score / questions.length) * 100)}%
              </p>
            </div>
            
            {highScore > 0 && (
              <Alert variant="info" className="mb-4">
                <h5>🏆 Điểm cao nhất: {highScore}</h5>
              </Alert>
            )}

            <Button variant="primary" size="lg" onClick={handleRestartQuiz}>
              Làm lại Quiz
            </Button>
          </div>
        ) : (
          <div>
            <h4 className="mb-4">
              Câu hỏi {questions[currentQuestion].id}:<br />
              {questions[currentQuestion].question}
            </h4>

            {/* Feedback Display */}
            {showFeedback && (
              <Alert 
                variant={isCorrect ? "success" : "danger"} 
                className="mb-4"
              >
                <div className="d-flex align-items-center">
                  {isCorrect ? (
                    <>
                      <FaCheckCircle className="me-2" />
                      <strong>Chính xác! 🎉</strong>
                    </>
                  ) : (
                    <>
                      <FaTimesCircle className="me-2" />
                      <strong>Sai rồi! Đáp án đúng là: {correctAnswer}</strong>
                    </>
                  )}
                </div>
              </Alert>
            )}

            <div className="mt-3">
              {questions[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  variant={
                    showFeedback 
                      ? (option === correctAnswer ? "success" : 
                         selectedOption === option ? "danger" : "outline-secondary")
                      : (selectedOption === option ? "primary" : "outline-secondary")
                  }
                  className="m-2"
                  onClick={() => handleOptionSelect(option)}
                  disabled={showFeedback}
                >
                  {option}
                </Button>
              ))}
            </div>

            <div className="mt-4">
              <Button
                variant="primary"
                size="lg"
                disabled={!selectedOption && !showFeedback}
                onClick={handleNextQuestion}
              >
                {showFeedback 
                  ? (currentQuestion === questions.length - 1 ? "Kết thúc Quiz" : "Câu tiếp theo")
                  : "Kiểm tra đáp án"
                }
              </Button>
            </div>
          </div>
        )}
      </Card>
    </Container>
  );
}

export default EnhancedQuestionBank;
