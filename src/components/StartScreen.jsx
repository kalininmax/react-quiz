/* eslint-disable react/prop-types */

import { useQuiz } from '../contexts/QuizContext';

const StartScreen = () => {
  const { numQuestions, dispatch } = useQuiz();

  return (
    <div className="start">
      <h2>Welcome to The&nbsp;React Quiz!</h2>
      <h3>{numQuestions}&nbsp;questions to&nbsp;test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'start' })}
      >
        Let&apos;s start
      </button>
    </div>
  );
};

export default StartScreen;
