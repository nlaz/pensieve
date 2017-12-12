import axios from "axios";
import cookie from "react-cookie";

export const FETCH_STUDY_TYPES = "fetchStudyTypes";

export const fetchStudyTypes = () => dispatch => {
  const config = { headers: { Authorization: cookie.load("token") } };

  dispatch({
    type: "FETCH_STUDY_TYPES_REQUEST",
  });

  return axios.get("/api/study_types", config).then(
    response => {
      dispatch({
        type: "FETCH_STUDY_TYPES_SUCCESS",
        payload: response.data,
      });
    },
    error => {
      dispatch({
        type: "FETCH_STUDY_TYPES_FAILURE",
        message: error.response || "Something went wrong.",
      });
    },
  );
};
