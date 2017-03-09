import { CREATE_ITEM, FETCH_ITEMS, FETCH_ITEM } from '../actions/types';
import { CREATE_SESSION, FETCH_SESSIONS, FETCH_SESSION } from '../actions/types';

const INITIAL_STATE = {};

export default function (state = INITIAL_STATE, action) {
	switch (action.type) {
		case FETCH_SESSIONS:
			return { ...state, sessions: action.payload };
		case FETCH_SESSION:
			return { ...state, session: action.payload };
		case CREATE_SESSION:
			return {...state, session: action.payload.session, message: action.payload.message };

		case FETCH_ITEMS:
			return { ...state, items: action.payload };
		case FETCH_ITEM:
			return { ...state, item: action.payload };
		case CREATE_ITEM:
			return {...state, item: action.payload.item, message: action.payload.message };
	}

	return state;
}
