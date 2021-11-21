import axios from "./index";

class UsersApi {
  static ListUsers = () => {
    return axios.get(`${base}/users`);
  };

  static SeachUsers = (data) => {
    return axios.get(`${base}/users?filter=[{"operator":"like","value":"${data}","property":"firstName"}]`);
  };
  static DeleteUser = (data) => {
    return axios.delete(`${base}/users/${data.id}`);
  };

  static Profile = (data) => {
    return axios.get(`${base}/users/${data.id}`);
  };
}

let base = "v1";

export default UsersApi;
