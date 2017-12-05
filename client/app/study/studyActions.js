import axios from "axios";
import cookie from "react-cookie";

import { SHOW_ERROR } from "../appActions";

export const FETCH_STUDY_TYPES = "fetchStudyTypes";

export const fetchStudyTypes = () => dispatch => {
  const config = { headers: { Authorization: cookie.load("token") } };

  axios
    .get("/api/study_types", config)
    .then(resp => dispatch({ type: FETCH_STUDY_TYPES, payload: resp.data }))
    .catch(error => dispatch({ type: SHOW_ERROR, payload: { error: error.response } }));
};
