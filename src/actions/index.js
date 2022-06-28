// import md5 from 'crypto-js/md5';

export const TRANSFORM_EMAIL = 'TRANSFORM_EMAIL';
export const transformEmail = (gravatarEmail, name) => ({
  type: TRANSFORM_EMAIL,
  payload: {
    gravatarEmail,
    name,
  },
});
