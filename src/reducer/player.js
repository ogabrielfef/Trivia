import { TRANSFORM_EMAIL } from '../actions';

const INITIAL_STATE = {

  name: '',
  assertions: '',
  score: '',
  gravatarEmail: '',

};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TRANSFORM_EMAIL:
    return {
      ...state,
      gravatarEmail: action.payload.gravatarEmail,
      name: action.payload.name,
    };
  default:
    return state;
  }
};

export default player;
