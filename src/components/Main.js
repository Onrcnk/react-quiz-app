import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setQuestionAction } from "../Redux/Actions/questionsActions";

export default function Intro() {
  const dispatch = useDispatch();
  const reducerQuestions = useSelector((state) => state.questions);

  console.log(reducerQuestions);

  const takeQuestions = () => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then((res) => res.json())
      .then((data) => {
        dispatch(setQuestionAction(data.results));
      });
  };

  return (
    <div className="intro-position">
      <h1 className="title">Do it your BEST !</h1>
      <button
        onClick={() => {
          takeQuestions();
        }}
      >
        Click Me Baby One More Time
      </button>
    </div>
  );
}
