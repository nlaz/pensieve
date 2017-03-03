import axios from 'axios';
import { browserHistory } from 'react-router';
import { CREATE_ITEM, FETCH_ITEMS, FETCH_ITEM } from './types';
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

export function createItem({ title, description }) {
	return function (dispatch) {
		axios.post(ITEMS_API_URL, {
			headers: { Authorization: cookie.load('token') },
			title: title,
			descrption: description,
		})
		.then((response) => {
			dispatch({
				type: CREATE_ITEM,
				payload: response.data,
			});
			browserHistory.push(`/item/view/${response.data.id}`);
		})
		.catch((error) => {
			console.error('Error', error);
		});
	};
}

