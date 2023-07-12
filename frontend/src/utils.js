import { CHECK_AUTH_URL } from "./constants";

export default class Utils {
  checkLogin = async () => {
    let res = await fetch(CHECK_AUTH_URL, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },

      credentials: "include",
    });
    if (res.status !== 200) {
      return false;
    } else {
      //   res = await res.json();
      return true;
    }
    return true;
  };
}
