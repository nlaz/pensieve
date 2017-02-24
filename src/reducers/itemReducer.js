import { FETCH_ITEMS } from '../actions/types';

const INITIAL_STATE = { error: '' };

export default function (state = INITIAL_STATE, action) {
	switch (action.type) {
		case FETCH_ITEMS:
			return { ...state, error: '', items: action.payload };
	}

	return state;
}
