import React from "react";

export default function Question({questions, answers}) {

    const qAndA = () =>{
        return(
            <div>
            {questions.map((question, index) => (
            <div>
                <h1>{index + 1}.{question.question}</h1>
                <h1>{answers[index]}</h1>
            </div>
        ))}
        </div>
        )
    }



    return(

        <div>{qAndA()}</div>
    )

    

}
