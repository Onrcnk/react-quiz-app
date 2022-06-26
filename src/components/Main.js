import React from 'react';
import { useDispatch } from 'react-redux';
import { setQuestionAction } from '../Redux/Actions/questionsActions';
import Question from './Question';

export default function Main() {
  const dispatch = useDispatch();

  const [pageCondition, setPageCondition] = React.useState(true);

  const takeQuestions = () => {
    fetch('https://the-trivia-api.com/api/questions?categories=general_knowledge,film_and_tv&limit=1&difficulty=medium')
      .then(res => res.json())
      .then(data => {
        dispatch(setQuestionAction(data));
      });
    handleChange();
  };

  function handleChange() {
    setPageCondition(pageCondition => !pageCondition);
  }

  function Intro() {
    return (
      <div>
        <h1 className='intro-position'>Let's Start!</h1>
        <button className="intro-button" onClick={takeQuestions}>Click Me Baby One More Time</button>
      </div>
    );
  }

  function BringQuestions() {
    return <Question />;
  }

  function ConditonalRender(props) {
    const flag = props.flag;

    if (flag === true) {
      return <Intro />;
    }
    return <BringQuestions />;
  }

  return (
    <div>
      <ConditonalRender flag={pageCondition} />
    </div>
  );
}
