import { GET_QUESTIONS } from '../actions/index';

const INITIAL_STATE = {
  questions: [],
};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_QUESTIONS:
    return { ...action.payload };
  default:
    return state;
  }
};

export default gameReducer;
