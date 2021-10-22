import { GET_QUESTIONS, LOADING_GAME } from '../actions/index';

const INITIAL_STATE = {
  questions: [],
  loading: true,
};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_QUESTIONS:
    return { ...state, questions: [...action.payload] };
  case LOADING_GAME:
    return { ...state, loading: false };
  default:
    return state;
  }
};

export default gameReducer;
