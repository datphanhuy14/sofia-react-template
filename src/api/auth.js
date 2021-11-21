import axios from "./index";

class AuthApi {
  static Login = (data) => {
    return axios.post(`${base}/auth`, data);
  };

  static Register = (data) => {
    return axios.post(`${base}/register`, data);
  };

  static Logout = (data) => {
    return axios.post(`${base}/logout`, data);
  };
}

let base = "v1";

export default AuthApi;
