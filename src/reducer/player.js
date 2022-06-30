import {
  TRANSFORM_EMAIL,
  NEXT_QUESTION,
  POINT_SCORE,
  DISABLE_OPTIONS_TRUE,
  DISABLE_OPTIONS_FALSE,
} from '../actions';

const INITIAL_STATE = {

  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
  nextQuestion: false,
  disableOptions: false,

};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TRANSFORM_EMAIL:
    return {
      ...state,
      gravatarEmail: action.payload.gravatarEmail,
      name: action.payload.name,
    };
  case NEXT_QUESTION:
    return {
      ...state,
      nextQuestion: true,
    };
  case POINT_SCORE:
    return {
      ...state,
      score: state.score + 1,
    };
  case DISABLE_OPTIONS_TRUE:
    return {
      ...state,
      disableOptions: true,
    };
  case DISABLE_OPTIONS_FALSE:
    return {
      ...state,
      disableOptions: false,
    };
  default:
    return state;
  }
};

export default player;
