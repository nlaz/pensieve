import { CREATE_ITEM, FETCH_ITEMS, FETCH_ITEM, EDIT_ITEM, DELETE_ITEM } from '../actions/types';
import { CREATE_SESSION, FETCH_SESSIONS, FETCH_SESSION, FINISH_SESSION, SESSION_ERROR } from '../actions/types';

const INITIAL_STATE = {};

export default function (state = INITIAL_STATE, action) {
	switch (action.type) {
		case FETCH_SESSIONS:
			return { ...state, sessions: action.payload };
		case FETCH_SESSION:
			return { ...state, session: action.payload };
		case CREATE_SESSION:
			return {...state, session: action.payload.session, message: action.payload.message };
		case FINISH_SESSION:
			return {...state, session: action.payload.session, message: action.payload.message };

		case FETCH_ITEMS:
			return { ...state, items: action.payload.items };
		case FETCH_ITEM:
			return { ...state, item: action.payload.item };
		case CREATE_ITEM:
			return {...state, item: action.payload.item, message: action.payload.message };
		case EDIT_ITEM:
			return {...state, item: action.payload.item };
		case DELETE_ITEM:
			return {...state, item: {}, items: action.payload.items };
	}

	return state;
}
