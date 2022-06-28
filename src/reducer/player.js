import { ADD_NAME } from '../actions';

const INITIAL_STATE = {

  name: '',
  assertions: '',
  score: '',
  gravatarEmail: '',

};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_NAME:
    return {
      ...state,
      name: action.payload,
    };
  default:
    return state;
  }
};

export default player;
