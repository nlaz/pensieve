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
import { browserHistory } from 'react-router';

export function fetchDecks() {
	return function(dispatch) {
		axios
			.get('/api/decks', {
				headers: { Authorization: cookie.load('token') }
			})
			.then(response => {
				dispatch({
					type: FETCH_DECKS,
					payload: response.data
				});
			})
			.catch(error => {
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
	return function(dispatch) {
		axios
			.get(`/api/decks/${deckId}`, {
				headers: { Authorization: cookie.load('token') }
			})
			.then(response => {
				dispatch({
					type: FETCH_DECK,
					payload: response.data
				});
			})
			.catch(error => {
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

export function createDeck(params) {
	const config = { headers: { Authorization: cookie.load('token') } };

	return function(dispatch) {
		axios
			.post('/api/decks', params, config)
			.then(response => {
				dispatch({
					type: CREATE_DECK,
					payload: response.data
				});
				browserHistory.push(`/decks/${response.data.deck._id}`);
			})
			.catch(error => {
				dispatch({
					type: DECK_ERROR,
					payload: {
						error: error.response.data.error,
						message: 'Error creating your deck.'
					}
				});
			});
	};
}

export function editDeck(params) {
	const config = { headers: { Authorization: cookie.load('token') } };

	return function(dispatch) {
		axios
			.put(`/api/decks/${params.deckId}`, params, config)
			.then(response => {
				dispatch({
					type: EDIT_DECK,
					payload: response.data
				});
			})
			.catch(error => {
				dispatch({
					type: DECK_ERROR,
					payload: {
						error: error.response.data.error,
						message: 'Error creating your deck.'
					}
				});
			});
	};
}

export function deleteDeck(itemId) {
	const config = { headers: { Authorization: cookie.load('token') } };

	return function(dispatch) {
		axios
			.delete(`/api/decks/${itemId}`, config)
			.then(() => {
				browserHistory.push('/decks');
				dispatch({
					type: DELETE_DECK,
					payload: { itemId: itemId }
				});

				dispatch({
					type: UPDATE_MESSAGE,
					payload: { message: 'That deck was wiped from memory.' }
				});
			})
			.catch(error => {
				dispatch({
					type: DECK_ERROR,
					payload: {
						error: error.response.data.error,
						message:
							'There was a problem removing your deck. Doublecheck your network connection and try again.'
					}
				});
			});
	};
}
