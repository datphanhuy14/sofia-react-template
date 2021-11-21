import AuthApi from "../api/auth";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export function receiveLogin() {
  return {
    type: LOGIN_SUCCESS,
  };
}

function loginError(payload) {
  return {
    type: LOGIN_FAILURE,
    payload,
  };
}

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
  };
}

export function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
  };
}

// logs the user out
export function logoutUser() {
  return (dispatch) => {
    dispatch(requestLogout());
    localStorage.removeItem("authenticated");
    dispatch(receiveLogout());
  };
}

export  function loginUser(creds) {
  return async (dispatch) => {
    const user = await AuthApi.Login(creds);
    await dispatch(receiveLogin());
    if (user.data && user.data.id && user.data.JWT) {
      localStorage.setItem("user", user.data);
      localStorage.setItem("jwt", user.data.JWT['accessToken']);
      localStorage.setItem("authenticated", true);
    } else {
      dispatch(loginError("Something was wrong. Try again"));
    }
  };
}
