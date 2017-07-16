import axios from 'axios';
import { FETCH_DECKS, FETCH_DECK, DECK_ERROR } from './types';
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
          message: 'Error retrieving your decks.'
        }
      });
    });
  };
}

export function fetchDeck(deckId) {
  return function (dispatch) {
    axios.get(`/api/decks/${deckId}`, {
      headers: { Authorization: cookie.load('token') }
    })
    .then((response) => {
      dispatch({
        type: FETCH_DECK,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: DECK_ERROR,
        payload: {
          error: error.response.data.error,
          message: 'Error retrieving your deck.'
        }
      });
    });
  };
}
