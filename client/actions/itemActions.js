import axios from 'axios';
import { browserHistory } from 'react-router';
import {
	CREATE_ITEM,
	FETCH_ITEMS,
	FETCH_DUE_ITEMS,
	FETCH_ITEM,
	REVIEW_ITEM,
	EDIT_ITEM,
	DELETE_ITEM,
	ITEM_ERROR,
	UPDATE_MESSAGE
} from './types';
import cookie from 'react-cookie';

const ITEMS_API_URL = `/api/items`;

export function fetchItems() {
	return function(dispatch) {
		axios
			.get(ITEMS_API_URL, {
				headers: { Authorization: cookie.load('token') }
			})
			.then(response => {
				dispatch({
					type: FETCH_ITEMS,
					payload: response.data
				});
			})
			.catch(error => {
				dispatch({
					type: ITEM_ERROR,
					payload: {
						error: error.response.data.error,
						message:
							'Issue retrieving your items. Doublecheck your network connection and try again.'
					}
				});
			});
	};
}

export function getDueItems() {
	return function(dispatch) {
		axios
			.get('/api/due_items', {
				headers: { Authorization: cookie.load('token') }
			})
			.then(response => {
				dispatch({
					type: FETCH_DUE_ITEMS,
					payload: response.data
				});
			})
			.catch(error => {
				dispatch({
					type: ITEM_ERROR,
					payload: {
						error: error.response.data.error,
						message:
							'Issue retrieving your items. Doublecheck your network connection and try again.'
					}
				});
			});
	};
}

export function fetchItem(itemId) {
	return function(dispatch) {
		axios
			.get(`${ITEMS_API_URL}/${itemId}`, {
				headers: { Authorization: cookie.load('token') }
			})
			.then(response => {
				dispatch({
					type: FETCH_ITEM,
					payload: response.data
				});
			})
			.catch(error => {
				dispatch({
					type: ITEM_ERROR,
					payload: {
						error: error.response.data.error,
						message: 'Issue retrieving item. Doublecheck your network connection and try again.'
					}
				});
			});
	};
}

export function createItem(params) {
	const config = { headers: { Authorization: cookie.load('token') } };

	return function(dispatch) {
		axios
			.post(ITEMS_API_URL, params, config)
			.then(response => {
				dispatch({
					type: CREATE_ITEM,
					payload: response.data
				});
				browserHistory.push(`/items/${response.data.item._id}`);
			})
			.catch(error => {
				dispatch({
					type: ITEM_ERROR,
					payload: {
						error: error.response.data.error,
						message:
							'There was a problem creating your item. Doublecheck your network connection and try again.'
					}
				});
			});
	};
}

export function reviewItem(params) {
	const config = { headers: { Authorization: cookie.load('token') } };
	const route = `/api/items/${params.itemId}/review`;

	return function(dispatch) {
		axios
			.post(route, params, config)
			.then(response => {
				dispatch({
					type: REVIEW_ITEM,
					payload: response.data
				});
			})
			.catch(error => {
				console.error('Error', error);
			});
	};
}

export function toggleHideItem(item) {
	const config = { headers: { Authorization: cookie.load('token') } };
	const route = `${ITEMS_API_URL}/${item._id}`;
	const params = { hidden: !item.hidden };

	return function(dispatch) {
		axios
			.put(route, params, config)
			.then(response => {
				dispatch({
					type: EDIT_ITEM,
					payload: { item: response.data.item }
				});
			})
			.catch(error => {
				console.error('Error', error);
				dispatch({
					type: ITEM_ERROR,
					payload: {
						error: error.response.data.error,
						message:
							'There was a problem editting your item. Doublecheck your network connection and try again.'
					}
				});
			});
	};
}

export function editItem(params) {
	const config = { headers: { Authorization: cookie.load('token') } };
	const route = `${ITEMS_API_URL}/${params.itemId}`;

	return function(dispatch) {
		axios
			.put(route, params, config)
			.then(response => {
				dispatch({
					type: EDIT_ITEM,
					payload: { item: response.data.item }
				});

				dispatch({
					type: UPDATE_MESSAGE,
					payload: { message: 'Your well thought out changes were successfully saved!' }
				});
			})
			.catch(error => {
				console.error('Error', error);
				dispatch({
					type: ITEM_ERROR,
					payload: {
						error: error.response.data.error,
						message:
							'There was a problem editting your item. Doublecheck your network connection and try again.'
					}
				});
			});
	};
}

export function deleteItem(itemId) {
	const config = { headers: { Authorization: cookie.load('token') } };
	const route = `${ITEMS_API_URL}/${itemId}`;

	return function(dispatch) {
		axios
			.delete(route, config)
			.then(() => {
				browserHistory.push('/items');
				dispatch({
					type: DELETE_ITEM,
					payload: { itemId: itemId }
				});

				dispatch({
					type: UPDATE_MESSAGE,
					payload: { message: 'That item was wiped from memory.' }
				});
			})
			.catch(error => {
				dispatch({
					type: ITEM_ERROR,
					payload: {
						error: error.response.data.error,
						message:
							'There was a problem removing your item. Doublecheck your network connection and try again.'
					}
				});
			});
	};
}
