import React from "react";
import { useDispatch } from "react-redux";
import { setQuestionAction } from "../Redux/Actions/questionsActions";
import Question from "./Question";

export default function Main() {

  const dispatch = useDispatch();


  const [pageCondition, setPageCondition] = React.useState(true)

  const takeQuestions = () => {
    fetch("https://the-trivia-api.com/api/questions?limit=1")
      .then((res) => res.json())
      .then((data) => {
        dispatch(setQuestionAction(data));
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
    return <Question />;
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