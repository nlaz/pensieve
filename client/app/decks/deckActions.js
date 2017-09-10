import axios from 'axios';
import {
	CREATE_DECK,
	FETCH_DECKS,
	FETCH_DECK,
	EDIT_DECK,
	DELETE_DECK,
	UPDATE_MESSAGE,
	DECK_ERROR
} from './types';
import cookie from 'react-cookie';

const DECKS_API = '/api/decks';

export const fetchDecks = () => dispatch => {
	const config = { headers: { Authorization: cookie.load('token') } };

	axios
		.get(DECKS_API, config)
		.then(resp => dispatch({ type: FETCH_DECKS, payload: resp.data }))
		.catch(error => dispatch({ type: DECK_ERROR, payload: { error: error.response } }));
};

export const fetchDeck = deckId => dispatch => {
	const config = { headers: { Authorization: cookie.load('token') } };

	axios
		.get(`${DECKS_API}/${deckId}`, config)
		.then(resp => dispatch({ type: FETCH_DECK, payload: resp.data }))
		.catch(error => dispatch({ type: DECK_ERROR, payload: { error: error.response } }));
};

export const createDeck = params => dispatch => {
	const config = { headers: { Authorization: cookie.load('token') } };

	axios
		.post(DECKS_API, params, config)
		.then(resp => dispatch({ type: CREATE_DECK, payload: resp.data }))
		.catch(error => dispatch({ type: DECK_ERROR, payload: { error: error.response } }));
};

export const editDeck = params => dispatch => {
	const config = { headers: { Authorization: cookie.load('token') } };

	axios
		.put(`${DECKS_API}/${params.deckId}`, params, config)
		.then(resp => dispatch({ type: EDIT_DECK, payload: resp.data }))
		.catch(error => dispatch({ type: DECK_ERROR, payload: { error: error.response } }));
};

export const deleteDeck = itemId => dispatch => {
	const config = { headers: { Authorization: cookie.load('token') } };

	axios
		.delete(`${DECKS_API}/${itemId}`, config)
		.then(() => {
			dispatch({ type: DELETE_DECK, payload: { itemId } });
			dispatch({
				type: UPDATE_MESSAGE,
				payload: { message: 'That deck was wiped from memory.' }
			});
		})
		.catch(error => dispatch({ type: DECK_ERROR, payload: { error: error.response } }));
};
