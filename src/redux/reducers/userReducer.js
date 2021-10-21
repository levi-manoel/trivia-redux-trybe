import { SAVE_USER } from '../actions/index';

const INITIAL_STATE = {
  email: '',
  name: '',
  token: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_USER:
    return { ...state, ...action.payload };
  default:
    return state;
  }
};

export default userReducer;
