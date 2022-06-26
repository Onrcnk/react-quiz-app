import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setQuestionAction } from '../Redux/Actions/questionsActions';
import Confetti from 'react-confetti';

export default function Question() {
  const [count, setCount] = React.useState(0);

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
      setCount(count + 1);
      setNewAnswers([...answers, correctAnswer].sort());
    }
  }, [reducerQuestions]);

  const handleChange = () => {
    !!eventTarget && (eventTarget.style.backgroundColor = 'cyan');

    fetch('https://the-trivia-api.com/api/questions?categories=general_knowledge,film_and_tv&limit=1&difficulty=medium')
      .then(res => res.json())
      .then(data => {
        dispatch(setQuestionAction(data));
      });
    setIsClick(false);
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

  function restart() {
    setCount(1);
    setCorrectAnswerCount(0);
  }

  function Finish() {
    return (
      <div>
        <h1 className='outro-position'>Correct Answer = {correctAnswerCount} / 5</h1>
        <button className='intro-button' onClick={restart}>
          RESTART
        </button>
      </div>
    );
  }

  const Question = props => {
    const a = (
      <h1>
        {count}. {props.question}
      </h1>
    );

    return a;
  };

  const qAndA = () => {
    if (count >= 6) {
      if ( correctAnswerCount  >= 3) {
        console.log(correctAnswerCount)
        return (
          <div>
            <Confetti 
            className="confetti"/>
            <Finish />
          </div>
        );
      }else{
      return <Finish />;
      }
    }

    return (
      <div>
        <div className='qAndA-table'>
          {questions.map(question => (
            <div>
              <Question question={question.question} />
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
