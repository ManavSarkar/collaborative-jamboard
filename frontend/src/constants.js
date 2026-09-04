if (process.env.NODE_ENV === "production") {
  module.exports = {
    SOCKET_URL: "https://collaborative-jamboard-backend.vercel.app",
    REGISTER_URL: "https://collaborative-jamboard-backend.vercel.app/api/user/register",
    CHECK_AUTH_URL:
      "https://collaborative-jamboard-backend.vercel.app/api/user/checkloggedin",
    LOGIN_URL: "https://collaborative-jamboard-backend.vercel.app/api/user/login",
    CREATE_SESSION_URL:
      "https://collaborative-jamboard-backend.vercel.app/api/jamboard/create",
    LOGOUT_URL: "https://collaborative-jamboard-backend.vercel.app/api/user/logout",
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
