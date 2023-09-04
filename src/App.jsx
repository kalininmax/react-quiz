import { useEffect, useReducer } from 'react';

import { questions as quizQuestions } from '../data/questions.json';
import { initialState, reducer } from './reducer';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import Loader from './components/Loader';
import Error from './components/Error';
import StartScreen from './components/StartScreen';
import Progress from './components/Progress';
import Question from './components/Question';
import Timer from './components/Timer';
import NextButton from './components/NextButton';
import FinishScreen from './components/FinishScreen';

const App = () => {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  useEffect(() => {
    // fetch('http://localhost:9000/questions')
    //   .then((res) => res.json())
    //   .then((data) => {
    //     dispatch({ type: 'dataReceived', payload: data });
    //   })
    //   .catch(() => dispatch({ type: 'dataFailed' }));

    dispatch({ type: 'dataReceived', payload: quizQuestions });
  }, []);

  return (
    <div className="app">
      <Header />

      <Main>
        {status === 'loading' && <Loader />}

        {status === 'error' && <Error />}

        {status === 'ready' && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}

        {status === 'active' && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                numQuestions={numQuestions}
                index={index}
              />
            </Footer>
          </>
        )}
        {status === 'finished' && (
          <FinishScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
};

export default App;
