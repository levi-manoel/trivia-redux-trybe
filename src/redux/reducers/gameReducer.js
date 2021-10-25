import {
  GET_QUESTIONS, LOADING_GAME, FAILED_TRIVIA_REQUEST, UPDATE_SCORE,
} from '../actions/index';

const INITIAL_STATE = {
  questions: [],
  score: 0,
  loading: true,
  erro: '',
};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_QUESTIONS:
    return { ...state, questions: [...action.payload] };
  case LOADING_GAME:
    return { ...state, loading: false };
  case FAILED_TRIVIA_REQUEST:
    return {
      ...state,
      error: 'Not found',
    };
  case UPDATE_SCORE:
    return {
      ...state,
      score: state.score + action.payload,
    };
  default:
    return state;
  }
};

export default gameReducer;
