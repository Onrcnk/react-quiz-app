import React from "react";

export default function Question(props) {
  const a = props.questions.map((question) => {
    return <h1>{question}</h1>;
  });

  return (
    <div>
        {a}
    </div>
  );
}
