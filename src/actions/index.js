import md5 from 'crypto-js/md5';

export const TRANSFORM_EMAIL = 'TRANSFORM_EMAIL';
export const transformEmail = (gravatarEmail, name) => ({
  type: TRANSFORM_EMAIL,
  payload: {
    gravatarEmail,
    name,
  },
});

export const fetchEmailGravatarThunk = (gravatarEmail, name) => async (dispatch) => {
  const emailGravatar = md5(gravatarEmail).toString();
  dispatch(transformEmail(emailGravatar, name));
};

export const NEXT_QUESTION = 'NEXT_QUESTION';

export const nextQuestionAction = () => ({
  type: NEXT_QUESTION,
});

export const POINT_SCORE = 'POINT_SCORE';

export const pointScore = () => ({
  type: POINT_SCORE,
});

export const DISABLE_OPTIONS_TRUE = 'DISABLE_OPTIONS_TRUE';

export const disableOptionsTrue = () => ({
  type: DISABLE_OPTIONS_TRUE,
});

export const DISABLE_OPTIONS_FALSE = 'DISABLE_OPTIONS_FALSE';

export const disableOptionsFalse = () => ({
  type: DISABLE_OPTIONS_FALSE,
});

export const RESET_SCORE = 'RESET_SCORE';

export const resetScore = () => ({
  type: RESET_SCORE,
});
