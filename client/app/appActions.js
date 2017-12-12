import { logoutUser } from "./auth/authActions";

export const DISMISS_FLASH = "DISMISS_FLASH";
export const SHOW_FLASH = "SHOW_FLASH";

export const dismissFlash = () => ({
  type: DISMISS_FLASH,
});

export const handleError = (dispatch, error, type, showFlash = false) => {
  if (error.status === 401) {
    dispatch({
      type: type,
      message: "You are not authorized to do this. Please login and try again.",
    });
    dispatch(logoutUser());
  } else {
    dispatch({
      type: type,
      error: error.data,
      message: error.data.message || "Something went wrong.",
    });
    if (showFlash) {
      dispatch({
        type: SHOW_FLASH,
        message: error.data.message || "Something went wrong.",
      });
    }
  }
};
