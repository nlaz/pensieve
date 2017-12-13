import axios from "axios";
import cookie from "react-cookie";
import { handleError } from "../appActions";

export const fetchItem = ({ itemId, ...params }) => dispatch => {
  const config = { headers: { Authorization: cookie.load("token") }, params };

  dispatch({
    type: "FETCH_ITEM_REQUEST",
    item: itemId,
  });

  return axios.get(`/api/items/${itemId}`, config).then(
    response => {
      dispatch({
        type: "FETCH_ITEM_SUCCESS",
        payload: response.data,
      });
    },
    error => handleError(dispatch, error.response, "FETCH_ITEM_FAILURE"),
  );
};

export const createItem = params => dispatch => {
  const config = { headers: { Authorization: cookie.load("token") } };

  dispatch({
    type: "CREATE_ITEM_REQUEST",
  });

  return axios.post("/api/items", params, config).then(
    response => {
      dispatch({
        type: "CREATE_ITEM_SUCCESS",
        payload: response.data,
      });
    },
    error => handleError(dispatch, error.response, "CREATE_ITEM_FAILURE", true),
  );
};

export const reviewItem = params => dispatch => {
  const config = { headers: { Authorization: cookie.load("token") } };
  const route = `/api/items/${params.itemId}/review`;

  dispatch({
    type: "REVIEW_ITEM_REQUEST",
  });

  return axios.post(route, params, config).then(
    response => {
      dispatch({
        type: "REVIEW_ITEM_SUCCESS",
        payload: response.data,
      });
    },
    error => handleError(dispatch, error.response, "REVIEW_ITEM_FAILURE", true),
  );
};

export const resetItem = itemId => dispatch => {
  const config = { headers: { Authorization: cookie.load("token") } };
  const route = `/api/items/${itemId}/reset`;

  dispatch({
    type: "RESET_ITEM_REQUEST",
    itemId: itemId,
  });

  return axios.post(route, {}, config).then(
    response => {
      dispatch({
        type: "RESET_ITEM_SUCCESS",
        payload: response.data,
      });
    },
    error => handleError(dispatch, error.response, "RESET_ITEM_FAILURE", true),
  );
};

export const editItem = params => dispatch => {
  const config = { headers: { Authorization: cookie.load("token") } };
  const route = `/api/items/${params.itemId}`;

  dispatch({
    type: "EDIT_ITEM_REQUEST",
    itemId: params.itemId,
  });

  return axios.put(route, params, config).then(
    response => {
      dispatch({
        type: "EDIT_ITEM_SUCCESS",
        payload: { item: response.data.item },
      });
    },
    error => handleError(dispatch, error.response, "EDIT_ITEM_FAILURE", true),
  );
};

export const deleteItem = itemId => dispatch => {
  const config = { headers: { Authorization: cookie.load("token") } };

  dispatch({
    type: "DELETE_ITEM_REQUEST",
    itemId: itemId,
  });

  return axios.delete(`/api/items/${itemId}`, config).then(
    response => {
      dispatch({
        type: "DELETE_ITEM_SUCCESS",
        payload: { itemId },
      });
    },
    error => handleError(dispatch, error.response, "DELETE_ITEM_FAILURE", true),
  );
};
