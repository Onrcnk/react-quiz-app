import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setQuestionAction } from "../Redux/Actions/questionsActions";
import Question from "./Question";

export default function Main() {
  const dispatch = useDispatch();
  const reducerQuestions = useSelector((state) => state.questions);
  const questions = reducerQuestions;
  const answers =  reducerQuestions.map((results) => results.incorrect_answers);
  const correctAnswers =  reducerQuestions.map((results) => results.correct_answer);

  console.log(questions)

  for(let i = 0; i < correctAnswers.length; i++){
    answers[i].push(correctAnswers[i])
    answers[i].sort()
  }
 

  const [pageCondition, setPageCondition] = React.useState(true)

  const takeQuestions = () => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then((res) => res.json())
      .then((data) => {
        dispatch(setQuestionAction(data.results));
      });
    handleChange() 

  };


  function handleChange(){
    setPageCondition(pageCondition => !pageCondition)
  }

  function Intro() {
    return (
      <div className="intro-position">
        <h1 className="title">Do it your BEST !</h1>
        <button
          onClick={takeQuestions
          }
        >
          Click Me Baby One More Time
        </button>
      </div>
    );
  }

  function BringQuestions(props) {
    return <Question 
    questions={questions}
    answers = {answers}
    correctAnswer = {correctAnswers} />;
  }

  function ConditonalRender(props) {
    const flag = props.flag;
    
    if ((flag === true)) {
      return <Intro />
    }
    return <BringQuestions />
  }

  return (
    <div>
      <ConditonalRender flag = {pageCondition} />
    </div>
  );
}
