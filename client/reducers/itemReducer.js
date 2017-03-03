import { FETCH_ITEM, FETCH_ITEMS } from '../actions/types';

const INITIAL_STATE = { error: '' };

export default function (state = INITIAL_STATE, action) {
	switch (action.type) {
		case FETCH_ITEMS:
			return { ...state, items: action.payload };
		case FETCH_ITEM:
			return { ...state, item: action.payload };
	}

	return state;
}
