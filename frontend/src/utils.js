import { CHECK_AUTH_URL, LOGOUT_URL } from "./constants";

export default class Utils {
  checkLogin = async () => {
    let token = localStorage.getItem("token");
    if (!token) {
      return [false, null];
    }
    console.log(token);
    let res = await fetch(CHECK_AUTH_URL, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
      }),
      credentials: "include",
    });
    if (res.status !== 200) {
      return [false, null];
    } else {
      res = await res.json();
      return [true, res.user];
    }
  };

  logout = async () => {
    let res = await fetch(LOGOUT_URL, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },

      credentials: "include",
    });
    if (res.status !== 200) {
      return [false, null];
    } else {
      res = await res.json();
      return [true, res.user];
    }
  };
}
