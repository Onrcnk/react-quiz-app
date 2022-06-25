import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setQuestionAction } from '../Redux/Actions/questionsActions';

export default function Question() {
  const [count, setCount] = React.useState(1);

  const [correctAnswerCount, setCorrectAnswerCount] = React.useState(0);

  const [eventTarget, setEventTarget] = React.useState(null);

  const [isClick, setIsClick] = React.useState(false);

  const [newAnswers, setNewAnswers] = React.useState([]);

  const dispatch = useDispatch();
  const reducerQuestions = useSelector(state => state.questions);
  const questions = reducerQuestions;

  const correctAnswer = reducerQuestions?.map(results => results.correctAnswer)[0];
  const answers = reducerQuestions?.map(results => results.incorrectAnswers)[0];

  React.useEffect(() => {
    if (!!answers) {
      setNewAnswers([...answers, correctAnswer].sort());
    }
  }, [reducerQuestions]);

  const handleChange = () => {
    !!eventTarget && (eventTarget.style.backgroundColor = 'cyan');

    fetch('https://the-trivia-api.com/api/questions?limit=1')
      .then(res => res.json())
      .then(data => {
        dispatch(setQuestionAction(data));
      });
    setIsClick(false);
    setCount(count + 1)
  };

  function handleAnswer(event, answer) {
    setEventTarget(event.target);

    if (answer === correctAnswer) {
      setCorrectAnswerCount(correctAnswerCount + 1);
      event.target.style.backgroundColor = 'green';
    } else {
      event.target.style.backgroundColor = 'red';
    }

    setIsClick(true);
  }

  function Finish() {
    return (
      <div>
        <h1>Correct Answer = {correctAnswerCount} / 5</h1>
      </div>
    );
  }

  const qAndA = () => {
    if (count === 6) {
      return <Finish />;
    }

    return (
      <div>
        <div className='qAndA-table'>
          {questions.map((question, index) => (
            <div>
              <h1>
                {count}. {question.question}
              </h1>
              <div className='answer-position'>
                {newAnswers.map(answer => (
                  <button
                    className='answer-button'
                    style={{ backgroundColor: 'cyan' }}
                    disabled={isClick}
                    onClick={event => handleAnswer(event, answer)}
                  >
                    {answer}
                  </button>
                ))}
                <div>
                  <button className='next-button' onClick={handleChange}>
                    Next
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return <div>{qAndA()}</div>;
}
