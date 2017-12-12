import axios from "axios";
import cookie from "react-cookie";

export const fetchDecks = () => dispatch => {
  const config = { headers: { Authorization: cookie.load("token") } };

  dispatch({
    type: "FETCH_DECKS_REQUEST",
  });

  return axios.get("/api/decks", config).then(
    response => {
      dispatch({
        type: "FETCH_DECKS_SUCCESS",
        payload: response.data,
      });
    },
    error => {
      dispatch({
        type: "FETCH_DECKS_FAILURE",
        message: error.response || "Something went wrong.",
      });
    },
  );
};

export const fetchDeck = deckId => dispatch => {
  const config = { headers: { Authorization: cookie.load("token") } };

  dispatch({
    type: "FETCH_DECK_REQUEST",
    deckId: deckId,
  });

  return axios.get(`/api/decks/${deckId}`, config).then(
    response => {
      dispatch({
        type: "FETCH_DECK_SUCCESS",
        payload: response.data,
      });
    },
    error => {
      dispatch({
        type: "FETCH_DECK_FAILURE",
        message: error.response || "Something went wrong.",
      });
    },
  );
};

export const createDeck = params => dispatch => {
  const config = { headers: { Authorization: cookie.load("token") } };

  dispatch({
    type: "CREATE_DECK_REQUEST",
    deckId: deckId,
  });

  return axios.post("/api/decks", params, config).then(
    response => {
      dispatch({
        type: "CREATE_DECK_SUCCESS",
        payload: response.data,
      });
    },
    error => {
      dispatch({
        type: "CREATE_DECK_FAILURE",
        message: error.response || "Something went wrong.",
      });
    },
  );
};

export const editDeck = params => dispatch => {
  const config = { headers: { Authorization: cookie.load("token") } };

  dispatch({
    type: "EDIT_DECK_REQUEST",
    deckId: params.deckId,
  });

  return axios.put(`/api/decks/${params.deckId}`, params, config).then(
    response => {
      dispatch({
        type: "EDIT_DECK_SUCCESS",
        payload: response.data,
      });
    },
    error => {
      dispatch({
        type: "EDIT_DECK_FAILURE",
        message: error.response || "Something went wrong.",
      });
    },
  );
};

export const resetDeck = deckId => dispatch => {
  const config = { headers: { Authorization: cookie.load("token") } };

  dispatch({
    type: "EDIT_DECK_REQUEST",
    deckId: params.deckId,
  });

  return axios.post(`/api/decks/${deckId}/reset`, {}, config).then(
    response => {
      dispatch({
        type: "RESET_DECK_SUCCESS",
        payload: response.data,
      });
    },
    error => {
      dispatch({
        type: "RESET_DECK_FAILURE",
        message: error.response || "Something went wrong.",
      });
    },
  );
};

export const deleteDeck = deckId => dispatch => {
  const config = { headers: { Authorization: cookie.load("token") } };

  dispatch({
    type: "DELETE_DECK_REQUEST",
    deckId: params.deckId,
  });

  return axios.delete(`/api/decks/${deckId}`, config).then(
    response => {
      dispatch({
        type: "DELETE_DECK_SUCCESS",
        payload: { itemId },
      });
    },
    error => {
      dispatch({
        type: "DELETE_DECK_FAILURE",
        message: error.response || "Something went wrong.",
      });
    },
  );
};

export const clearDeck = () => dispatch => dispatch({ type: "CLEAR_DECK" });
