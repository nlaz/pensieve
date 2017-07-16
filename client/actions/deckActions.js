import axios from 'axios';
import { FETCH_DECKS, DECK_ERROR } from './types';
import cookie from 'react-cookie';

export function fetchDecks() {
  return function (dispatch) {
    axios.get('/api/decks', {
      headers: { Authorization: cookie.load('token') }
    })
    .then((response) => {
      dispatch({
        type: FETCH_DECKS,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: DECK_ERROR,
        payload: {
          error: error.response.data.error,
          message: 'Issue retrieving your decks'
        }
      });
    });
  };
}
