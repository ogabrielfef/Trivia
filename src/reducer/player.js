const INITIAL_STATE = {

  name: nome - da - pessoa,
  assertions: número - de - acertos,
  score: pontuação,
  gravatarEmail: email - da - pessoa,

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
