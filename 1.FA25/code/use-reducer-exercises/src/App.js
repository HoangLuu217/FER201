import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CounterComponent from './components/CounterComponent';
import ToggleComponent from './components/ToggleComponent';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import QuestionBank from './components/QuestionBank';
import EnhancedQuestionBank from './components/EnhancedQuestionBank';

function App() {
  const [activeExercise, setActiveExercise] = useState('counter');

  const exercises = [
    { id: 'counter', name: 'Exercise 1: Counter Component', component: CounterComponent },
    { id: 'toggle', name: 'Exercise 2: Toggle Component', component: ToggleComponent },
    { id: 'login', name: 'Exercise 3: Login Form', component: LoginForm },
    { id: 'signup', name: 'Exercise 4: SignUp Form', component: SignUpForm },
    { id: 'quiz', name: 'Exercise 5: Question Bank', component: QuestionBank },
    { id: 'enhanced-quiz', name: 'Exercise 6: Enhanced Question Bank', component: EnhancedQuestionBank },
  ];

  const ActiveComponent = exercises.find(ex => ex.id === activeExercise)?.component;

  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3 bg-light p-3" style={{ minHeight: '100vh' }}>
            <h3 className="mb-4">useReducer Exercises</h3>
            <nav className="nav flex-column">
              {exercises.map((exercise) => (
                <button
                  key={exercise.id}
                  className={`btn btn-outline-primary mb-2 text-start ${
                    activeExercise === exercise.id ? 'active' : ''
                  }`}
                  onClick={() => setActiveExercise(exercise.id)}
                >
                  {exercise.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="col-md-9 p-4">
            <div className="mb-4">
              <h1>Lab 4: useReducer Hook</h1>
            </div>
            
            {ActiveComponent && <ActiveComponent />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
