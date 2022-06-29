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
