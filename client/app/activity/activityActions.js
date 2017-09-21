import axios from 'axios';
import cookie from 'react-cookie';

export const FETCH_ACTIVITY = 'fetchActivity';
export const ACTIVITY_ERROR = 'activityError';

export const fetchActivity = () => {
  return dispatch => {
    axios
      .get('/api/activity', {
        headers: { Authorization: cookie.load('token') }
      })
      .then(response => {
        dispatch({
          type: FETCH_ACTIVITY,
          payload: response.data
        });
      })
      .catch(error => {
        dispatch({
          type: ACTIVITY_ERROR,
          payload: error.response
        });
      });
  };
};
