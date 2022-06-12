const setQuestionAction = (questions) => ({
  type: "SET_QUESTION_ACTION",
  questions,
});

const resetQuestionAction = () => ({
  type: "RESET_QUESTION_ACTION",
});

export { setQuestionAction, resetQuestionAction };
