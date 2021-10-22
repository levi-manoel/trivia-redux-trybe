export const SAVE_USER = 'SAVE_USER';
export const GET_QUESTIONS = 'GET_QUESTIONS';

export const saveUserAction = (payload) => ({
  type: SAVE_USER,
  payload,
});

export const gameAction = (payload) => ({
  type: GET_QUESTIONS,
  payload,
});
