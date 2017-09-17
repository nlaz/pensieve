import axios from 'axios';

import { SHOW_ERROR } from '../appActions';

export const EMAIL_SIGN_UP_PRELAUNCH = 'emailSignUpPrelaunch';

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
          type: SHOW_ERROR,
          payload: error.response.data
        });
      });
  };
};
