import axios from 'axios';

export const EMAIL_SIGN_UP_PRELAUNCH = 'emailSignUpPrelaunch';
export const EMAIL_SIGN_UP_PRELAUNCH_ERROR = 'emailSignUpPrelaunchError';

export const prelaunchSignUp = params => {
  return dispatch => {
    axios
      .post('/api/emails/prelaunch', params)
      .then(response => {
        dispatch({
          type: EMAIL_SIGN_UP_PRELAUNCH,
          payload: response.data
        });
      })
      .catch(error => {
        dispatch({
          type: EMAIL_SIGN_UP_PRELAUNCH_ERROR,
          payload: error.response.data
        });
      });
  };
};
