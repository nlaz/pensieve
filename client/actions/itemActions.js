import axios from 'axios';
import { browserHistory } from 'react-router';
import { CREATE_ITEM, FETCH_ITEMS, FETCH_ITEM, REVIEW_ITEM, EDIT_ITEM, DELETE_ITEM } from './types';
import cookie from 'react-cookie';

const CLIENT_ROOT_URL = 'http://localhost:3000';
const ITEMS_API_URL = `${CLIENT_ROOT_URL}/api/items`;

export function fetchItems() {
	return function (dispatch) {
		axios.get(ITEMS_API_URL, {
			headers: { Authorization: cookie.load('token') }
		})
		.then((response) => {
			dispatch({
				type: FETCH_ITEMS,
				payload: response.data,
			});
		})
		.catch((error) => {
			console.error('Error', error);
		});
	};
}


export function fetchItem(itemId) {
	return function (dispatch) {
		axios.get(`${ITEMS_API_URL}/${itemId}`, {
			headers: { Authorization: cookie.load('token') }
		})
		.then((response) => {
			dispatch({
				type: FETCH_ITEM,
				payload: response.data,
			});
		})
		.catch((error) => {
			console.error('Error', error);
		});
	};
}

export function createItem(params) {
	const config = { headers: { Authorization: cookie.load('token') }};

	return function (dispatch) {
		axios.post(ITEMS_API_URL, params, config)
		.then((response) => {
			dispatch({
				type: CREATE_ITEM,
				payload: response.data,
			});
			browserHistory.push(`/items/${response.data.item._id}`);
		})
		.catch((error) => {
			console.error('Error', error);
		});
	};
}

export function reviewItem(params) {
	const config = { headers: { Authorization: cookie.load('token') } };
	const route = `${ITEMS_API_URL}/${params.itemId}/review`;

	return function (dispatch) {
		axios.post(route, params, config)
		.then((response) => {
			dispatch({
				type: REVIEW_ITEM,
				payload: response.data,
			});
		})
		.catch((error) => {
			console.error('Error', error);
		});
	};
}

export function editItem(params) {
	const config = { headers: { Authorization: cookie.load('token') } };
	const route = `${ITEMS_API_URL}/${params.itemId}`;

	return function (dispatch) {
		axios.put(route, params, config)
		.then((response) => {
			dispatch({
				type: EDIT_ITEM,
				payload: response.data,
			});
		})
		.catch((error) => {
			console.error('Error', error);
		});
	};
}

export function deleteItem(itemId) {
	const config = { headers: { Authorization: cookie.load('token') } };
	const route = `${ITEMS_API_URL}/${itemId}`;

	return function (dispatch) {
		axios.delete(route, config)
		.then((response) => {
			browserHistory.push('/items');
			dispatch({
				type: DELETE_ITEM,
				payload: response.data,
			});
		})
		.catch((error) => {
			console.error('Error', error);
		});
	};
}

