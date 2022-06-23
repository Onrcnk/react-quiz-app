import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setQuestionAction } from "../Redux/Actions/questionsActions";

export default function Question() {

    const [count, setCount] = React.useState(0)

    const dispatch = useDispatch();
    const reducerQuestions = useSelector((state) => state.questions);
    const questions = reducerQuestions;
    const answers =  reducerQuestions.map((results) => results.incorrectAnswers);
    const correctAnswers =  reducerQuestions.map((results) => results.correctAnswer);

console.log(correctAnswers)

    function handleChange(){
        setCount(count +1)
        fetch("https://the-trivia-api.com/api/questions?limit=1")
        .then((res) => res.json())
        .then((data) => {
          dispatch(setQuestionAction(data));
        });
        console.log(count)
    }

    for(let i = 0; i < correctAnswers.length; i++){
    answers[i].push(correctAnswers[i])
    answers[i].sort()
    console.log(answers)
    }

    const qAndA = () =>{
        return(
            <div>
            <div className="qAndA-table">
            {questions.map((question, index) => (
            <div>
                <h1>{index + 1}. {question.question}</h1>
                <div className="answer-position">
                    {answers[index].map(element => (
                    <button className="answer-button">{element}</button>
                    ))}
                </div>
            </div>
        ))}
        </div>
        <div>
            <button onClick={handleChange}>Next</button>
        </div>
        </div>
        )
    }

    return(

        <div>{qAndA()}</div>
    )
}