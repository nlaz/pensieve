const INITIAL_STATE = {};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "FETCH_ITEM_SUCCESS":
      return action.payload.item;
    case "CREATE_ITEM_SUCCESS":
      return action.payload.item;
    case "EDIT_ITEM_SUCCESS":
      return action.payload.item;
    case "RESET_ITEM_SUCCESS":
      return action.payload.item;
    case "DELETE_ITEM_SUCCESS":
      return INITIAL_STATE;
    default:
      return state;
  }
}
