const INITIAL_STATE = [];

const questionsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_QUESTION_ACTION":
      return [...action.questions];
      break;

    case "RESET_QUESTION_ACTION":
      return INITIAL_STATE;
      break;

    default:
      return state;
      break;
  }
};

export default questionsReducer;
