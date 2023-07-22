if (process.env.NODE_ENV === "production") {
  module.exports = {
    SOCKET_URL: "https://jamboard-backend.onrender.com",
    REGISTER_URL: "https://jamboard-backend.onrender.com/api/user/register",
    CHECK_AUTH_URL:
      "https://jamboard-backend.onrender.com/api/user/checkloggedin",
    LOGIN_URL: "https://jamboard-backend.onrender.com/api/user/login",
    CREATE_SESSION_URL:
      "https://jamboard-backend.onrender.com/api/jamboard/create",
    LOGOUT_URL: "https://jamboard-backend.onrender.com/api/user/logout",
  };
} else {
  module.exports = {
    SOCKET_URL: "http://localhost:5000",
    REGISTER_URL: "http://localhost:5000/api/user/register",
    CHECK_AUTH_URL: "http://localhost:5000/api/user/checkloggedin",
    LOGIN_URL: "http://localhost:5000/api/user/login",
    CREATE_SESSION_URL: "http://localhost:5000/api/jamboard/create",
    LOGOUT_URL: "http://localhost:5000/api/user/logout",
  };
}
