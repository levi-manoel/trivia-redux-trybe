export const SAVE_USER = 'SAVE_USER';
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const LOADING_GAME = 'LOADING_GAME';

export const saveUserAction = (payload) => ({
  type: SAVE_USER,
  payload,
});

export const gameAction = (payload) => ({
  type: GET_QUESTIONS,
  payload,
});

export const loadingGame = () => ({
  type: LOADING_GAME,
});

export const getTrivia = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = await response.json();
    const questionsObj = data.results;
    dispatch(gameAction(questionsObj));
    return dispatch(loadingGame());
  } catch (error) {
    console.log(error);
  }
};
